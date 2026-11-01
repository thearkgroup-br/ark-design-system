import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { CAMINHO_CSS, CAMINHO_JSON, gerarCss } from '../../scripts/gerar-tokens.mjs';

const SRC = resolve(__dirname, '..');
const VITRINE = resolve(__dirname, '../../vitrine');

function arquivosCss(pasta: string): string[] {
  if (!existsSync(pasta)) return [];
  return readdirSync(pasta).flatMap((nome) => {
    const caminho = join(pasta, nome);
    if (statSync(caminho).isDirectory()) return arquivosCss(caminho);
    return nome.endsWith('.css') ? [caminho] : [];
  });
}

const semFimDeLinhaWindows = (texto: string) => texto.replace(/\r\n/g, '\n');
const semComentarios = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '');

describe('tokens', () => {
  it('tokens.css está em dia com o tokens.json (rode npm run tokens)', () => {
    const tokens = JSON.parse(readFileSync(CAMINHO_JSON, 'utf8'));
    expect(semFimDeLinhaWindows(readFileSync(CAMINHO_CSS, 'utf8'))).toBe(gerarCss(tokens));
  });

  it('gera um bloco para cada um dos 8 temas, com ark como padrão', () => {
    const css = readFileSync(CAMINHO_CSS, 'utf8');
    for (const tema of ['ark', 'ark-escuro', 'iris', 'iris-escuro', 'pulse', 'pulse-escuro', 'zenno', 'zenno-escuro']) {
      expect(css).toContain(`[data-theme="${tema}"]`);
    }
    expect(css).toMatch(/:root,\s*\[data-theme="ark"\]/);
  });

  it.each(['zenno', 'zenno-escuro'])('o tema %s tem contraste de texto de 4.5:1 nos pares de uso', (tema) => {
    const tokens = JSON.parse(readFileSync(CAMINHO_JSON, 'utf8'));
    const cor = (nome: string): string => tokens.color.tokens.find((t: { name: string }) => t.name === nome).value[tema];
    const luz = (hex: string): number => {
      const [r, g, b] = [1, 3, 5].map((i) => {
        const c = parseInt(hex.slice(i, i + 2), 16) / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contraste = (a: string, b: string): number => {
      const [claro, escuro] = [luz(a), luz(b)].sort((x, y) => y - x);
      return (claro + 0.05) / (escuro + 0.05);
    };
    const pares: [string, string][] = [
      ['ink', 'bg'], ['ink', 'surface'], ['ink-muted', 'bg'], ['ink-muted', 'surface'], ['ink-muted', 'surface-sunken'],
      ['on-brand', 'brand'], ['brand-ink', 'brand-soft'], ['brand', 'surface'], ['brand', 'bg'],
      ['success-ink', 'success-soft'], ['warning-ink', 'warning-soft'], ['danger-ink', 'danger-soft'], ['info-ink', 'info-soft'],
    ];
    for (const [texto, fundo] of pares) {
      expect(contraste(cor(texto), cor(fundo)), `${texto} sobre ${fundo}`).toBeGreaterThanOrEqual(4.5);
    }
    // Borda de campo e foco: 3:1 (WCAG 1.4.11).
    expect(contraste(cor('line-control'), cor('surface'))).toBeGreaterThanOrEqual(3);
    expect(contraste(cor('focus'), cor('bg'))).toBeGreaterThanOrEqual(3);
  });

  it('falha quando um token não tem valor para todos os temas', () => {
    const tokens = JSON.parse(readFileSync(CAMINHO_JSON, 'utf8'));
    delete tokens.color.tokens[0].value['pulse-escuro'];
    expect(() => gerarCss(tokens)).toThrow(/pulse-escuro/);
  });
});

const COR_EM_FUNCAO = /#[0-9a-f]{3,8}\b|\b(rgba?|hsla?|hwb|oklch|oklab|lab|lch|color|color-mix)\(/gi;
const COR_NOMEADA = /:[^;{}]*\b(white|black|red|green|blue|gray|grey|silver|orange|purple|yellow|pink|navy|teal)\b/gi;

describe('CSS dos componentes', () => {
  const arquivos = [...arquivosCss(SRC), ...arquivosCss(VITRINE)].filter((f) => f !== CAMINHO_CSS);
  const casos = arquivos.map((f) => [relative(SRC, f), f]);
  const tokens = new Set([...readFileSync(CAMINHO_CSS, 'utf8').matchAll(/--([\w-]+):/g)].map((m) => m[1]));

  it.each(casos)('%s não tem cor solta (só tokens)', (_nome, caminho) => {
    const css = semComentarios(readFileSync(caminho, 'utf8'));
    expect(css.match(COR_EM_FUNCAO)).toBeNull();
    expect(css.match(COR_NOMEADA)).toBeNull();
  });

  it.each(casos)('%s só usa var(--x) que existe nos tokens ou no próprio arquivo', (_nome, caminho) => {
    const css = semComentarios(readFileSync(caminho, 'utf8'));
    const locais = new Set([...css.matchAll(/--([\w-]+):/g)].map((m) => m[1]));
    const faltando = [...css.matchAll(/var\(--([\w-]+)/g)].map((m) => m[1]).filter((n) => !tokens.has(n) && !locais.has(n));
    expect(faltando).toEqual([]);
  });

  it('componentes .tsx não escrevem cor em hex (exceções: desenho do Logo e texto branco sobre a cor do negócio)', () => {
    const tsx = (pasta: string): string[] =>
      readdirSync(pasta).flatMap((nome) => {
        const caminho = join(pasta, nome);
        if (statSync(caminho).isDirectory()) return tsx(caminho);
        return /\.tsx?$/.test(nome) && !/\.test\.tsx?$/.test(nome) ? [caminho] : [];
      });
    const comCor = tsx(resolve(SRC, 'components'))
      .filter((f) => !f.endsWith(join('Logo', 'Logo.tsx')) && !f.endsWith(join('EstablishmentCard', 'EstablishmentCard.tsx')))
      .filter((f) => /['"`]#[0-9a-f]{3,8}['"`]/i.test(readFileSync(f, 'utf8')))
      .map((f) => relative(SRC, f));
    expect(comCor).toEqual([]);
  });

  it('todo CSS de componente entra no CSS único do pacote', () => {
    const pastaEstilos = resolve(SRC, 'styles');
    const indice = readFileSync(resolve(pastaEstilos, 'index.css'), 'utf8');
    const componentes = arquivosCss(resolve(SRC, 'components')).map((f) => relative(pastaEstilos, f).split('\\').join('/'));
    for (const css of componentes) expect(indice).toContain(`@import '${css}';`);
  });
});
