// A entrada "ark-design-system/contato" roda em Worker e não pode puxar React (nem arquivo de componente).
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, resolve, sep } from 'node:path';
import { describe, expect, it } from 'vitest';

const RAIZ = resolve(import.meta.dirname);

function resolverRelativo(de: string, alvo: string): string {
  const base = resolve(dirname(de), alvo);
  const achado = [`${base}.ts`, `${base}.tsx`, resolve(base, 'index.ts')].find((c) => existsSync(c));
  if (!achado) throw new Error(`import não resolvido: ${alvo} em ${de}`);
  return achado;
}

/** Percorre os imports e re-exports estáticos a partir da entrada. */
function grafo(entrada: string): { arquivos: Set<string>; pacotes: Set<string> } {
  const arquivos = new Set<string>();
  const pacotes = new Set<string>();
  const fila = [entrada];
  while (fila.length) {
    const atual = fila.pop() as string;
    if (arquivos.has(atual)) continue;
    arquivos.add(atual);
    const codigo = readFileSync(atual, 'utf8');
    for (const m of codigo.matchAll(/(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g)) {
      const alvo = m[1] ?? m[2] ?? m[3];
      if (alvo.startsWith('.')) fila.push(resolverRelativo(atual, alvo));
      else pacotes.add(alvo);
    }
  }
  return { arquivos, pacotes };
}

describe('entrada ark-design-system/contato', () => {
  const { arquivos, pacotes } = grafo(resolve(RAIZ, 'contato.ts'));

  it('não importa React, react-dom nem nenhum pacote de fora', () => {
    expect([...pacotes]).toEqual([]);
  });

  it('só alcança arquivos de src/contato, sem hook nem componente', () => {
    const dentro = resolve(RAIZ, 'contato') + sep;
    const ehHookOuComponente = (a: string) => basename(a).startsWith('use') || a.endsWith('.tsx');
    const fora = [...arquivos].filter((a) => a !== resolve(RAIZ, 'contato.ts') && (!a.startsWith(dentro) || ehHookOuComponente(a)));
    expect(fora).toEqual([]);
  });

  it('exporta a função de contato', async () => {
    const modulo = await import('./contato');
    expect(typeof modulo.criarFuncaoDeContato).toBe('function');
  });
});
