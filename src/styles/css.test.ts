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

describe('CSS dos componentes', () => {
  const arquivos = [...arquivosCss(SRC), ...arquivosCss(VITRINE)].filter((f) => f !== CAMINHO_CSS);

  it.each(arquivos.map((f) => [relative(SRC, f), f]))('%s não tem cor solta (só tokens)', (_nome, caminho) => {
    const css = readFileSync(caminho, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const cores = css.match(/#[0-9a-f]{3,8}\b|\b(rgba?|hsla?|oklch|lab|lch)\(/gi);
    expect(cores).toBeNull();
  });

  it('todo var(--x) usado existe nos tokens ou é definido no próprio CSS', () => {
    const tokensCss = readFileSync(CAMINHO_CSS, 'utf8');
    const definidos = new Set([...tokensCss.matchAll(/--([\w-]+):/g)].map((m) => m[1]));
    for (const arquivo of arquivos) {
      const css = readFileSync(arquivo, 'utf8');
      for (const m of css.matchAll(/--([\w-]+):/g)) definidos.add(m[1]);
    }
    const usados = arquivos.flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/var\(--([\w-]+)/g)].map((m) => [relative(SRC, f), m[1]]));
    const faltando = usados.filter(([, nome]) => !definidos.has(nome));
    expect(faltando).toEqual([]);
  });
});
