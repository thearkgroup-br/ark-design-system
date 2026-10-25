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

  it('gera um bloco para cada um dos 6 temas, com ark como padrão', () => {
    const css = readFileSync(CAMINHO_CSS, 'utf8');
    for (const tema of ['ark', 'ark-escuro', 'iris', 'iris-escuro', 'pulse', 'pulse-escuro']) {
      expect(css).toContain(`[data-theme="${tema}"]`);
    }
    expect(css).toMatch(/:root,\s*\[data-theme="ark"\]/);
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

  it('todo CSS de componente entra no CSS único do pacote', () => {
    const pastaEstilos = resolve(SRC, 'styles');
    const indice = readFileSync(resolve(pastaEstilos, 'index.css'), 'utf8');
    const componentes = arquivosCss(resolve(SRC, 'components')).map((f) => relative(pastaEstilos, f).split('\\').join('/'));
    for (const css of componentes) expect(indice).toContain(`@import '${css}';`);
  });
});
