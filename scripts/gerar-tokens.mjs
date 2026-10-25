// Gera src/styles/tokens.css a partir de src/publico/tokens.json.
// Rodar com `npm run tokens`. O arquivo gerado é commitado; um teste confere se está em dia.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const CAMINHO_JSON = resolve(raiz, 'src/publico/tokens.json');
export const CAMINHO_CSS = resolve(raiz, 'src/styles/tokens.css');

const TEMA_PADRAO = 'ark';

function linhas(pares) {
  return pares.map(([nome, valor]) => `  --${nome}: ${valor};`).join('\n');
}

function estiloDeTexto(familia, estilo) {
  return `${estilo.fontWeight} ${estilo.fontSize}/${estilo.lineHeight} ${familia}`;
}

/** Monta o CSS dos tokens. Falha se algum token de tema não tiver valor para todos os temas. */
export function gerarCss(tokens) {
  const temas = tokens.color.themes.map((t) => t.id);
  const porTema = (lista) => {
    for (const token of lista) {
      const faltando = temas.filter((t) => token.value[t] === undefined);
      if (faltando.length) throw new Error(`Token "${token.name}" sem valor para: ${faltando.join(', ')}`);
    }
  };
  porTema(tokens.color.tokens);
  porTema(tokens.shadow.tokens);

  const familias = Object.entries(tokens.type.families).map(([nome, valor]) => [`font-${nome}`, valor]);
  const texto = tokens.type.groups.flatMap((grupo) =>
    grupo.styles.flatMap((estilo) => {
      const pares = [[`text-${estilo.name}`, estiloDeTexto(`var(--font-${grupo.family})`, estilo)]];
      if (estilo.letterSpacing) pares.push([`tracking-${estilo.name}`, estilo.letterSpacing]);
      return pares;
    }),
  );
  const fixos = [
    ...familias,
    ...texto,
    ...tokens.spacing.tokens.map((t) => [t.name, t.value]),
    ...tokens.radius.tokens.map((t) => [t.name, t.value]),
    ...tokens.size.tokens.map((t) => [t.name, t.value]),
  ];

  const blocos = temas.map((tema) => {
    const seletor = tema === TEMA_PADRAO ? `:root,\n[data-theme="${tema}"]` : `[data-theme="${tema}"]`;
    const pares = [
      ...tokens.color.tokens.map((t) => [t.name, t.value[tema]]),
      ...tokens.shadow.tokens.map((t) => [t.name, t.value[tema]]),
    ];
    const esquema = tema.endsWith('-escuro') ? 'dark' : 'light';
    return `${seletor} {\n  color-scheme: ${esquema};\n${linhas(pares)}\n}`;
  });

  return [
    '/* Gerado por scripts/gerar-tokens.mjs a partir de src/publico/tokens.json. Não editar à mão: rode `npm run tokens`. */',
    `:root {\n${linhas(fixos)}\n}`,
    ...blocos,
    '',
  ].join('\n\n');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const tokens = JSON.parse(readFileSync(CAMINHO_JSON, 'utf8'));
  writeFileSync(CAMINHO_CSS, gerarCss(tokens));
  console.log(`tokens.css gerado em ${CAMINHO_CSS}`);
}
