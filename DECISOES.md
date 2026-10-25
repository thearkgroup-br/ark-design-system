# Decisões do IRIS-112

Decisões tomadas sem aprovação durante a noite de 25/10/2026. Em caso de dúvida, foi escolhida a opção mais conservadora. Revisar e, se discordar, abrir ajuste.

## Lote 1: base

1. **Pacote ESM só, `private: true`, versão 0.1.0.** Consumido como dependência git com tag; nada de publicar em registry.
2. **`dist/` fora do git, `prepare` roda o build.** Na instalação por git o npm instala as devDependencies e roda o `prepare`. Risco: yarn/pnpm se comportam diferente; os três repos consumidores usam npm (a confirmar).
3. **Um CSS único (`ark-design-system/estilos.css`) com tokens + componentes**, gerado pelo Vite com `cssCodeSplit: false`. O consumidor importa uma vez na raiz. A fonte fica num CSS separado (`ark-design-system/fonte.css`) para quem já carrega a fonte de outro jeito.
4. **Fonte servida pelo próprio app via `@fontsource/plus-jakarta-sans`** (dependência), pesos 400 a 800, em vez do `@import` do Google Fonts do `bundle.css`. Motivo: funciona offline no PWA e não manda dado de quem acessa para terceiros.
5. **`tokens.css` gerado por `scripts/gerar-tokens.mjs` e commitado.** Um teste falha se ele estiver desatualizado em relação ao `src/publico/tokens.json` (cópia do `referencia/tokens.json`, já que `referencia/` não pode ser importada). `:root` e `[data-theme="ark"]` = ark claro (padrão). Cada tema define `color-scheme`.
6. **Tokens de tipografia viraram atalhos `--text-{nome}` (shorthand de `font`) e `--tracking-{nome}`.** Não existem no `bundle.css`; foram adicionados para a vitrine e para quem consome.
7. **Teste de "cor solta"**: varre todo `.css` de `src/` e `vitrine/` (menos o `tokens.css`) e falha com hex, `rgb()`, `hsl()` etc. Outro teste confere que todo `var(--x)` usado existe.
8. **Classes CSS com prefixo `ak-`, iguais ao `bundle.css`**, para facilitar comparação com a referência. O foco visível (`outline 3px var(--focus)`, folga 2 px) foi repetido no CSS de cada componente, em vez da lista única do `bundle.css`.
9. **data-testid das partes internas**: o id recebido **sem o sufixo de tipo** + nome da parte (helper `testIdParte` em `src/utils/testid.ts`). Ex.: `iris-login-email-input` → erro `iris-login-email-error`; `iris-appointments-cancel-dialog` → `iris-appointments-cancel-close-button`. Motivo: é exatamente o par de exemplo da skill `padrao-data-testid` (`iris-login-email-input` / `iris-login-email-error`). Se o id não termina em sufixo de tipo, a parte é só acrescentada. Sem `data-testid`, as partes ficam sem id. **Se o time preferir concatenar literalmente (`...-input-error`), a mudança é só no helper.** **Conferido com a skill `padrao-data-testid` 0.3.1** (25/10, manhã): a lista de sufixos do helper é exatamente a tabela "Elemento" da skill, de `-button` a `-table`. Faltavam `-tabbar` (`iris-app-main-tabbar` + aba `home` dava `iris-app-main-tabbar-home-tab`, e não `iris-app-main-home-tab`) e `-error`. As duas tabelas da skill ("Elemento" e "Partes internas") estão inteiras no `testid.test.ts`, e um teste garante que fim fora da lista (`-row`, `-title`) não é cortado. Nenhum data-testid dos componentes mudou: nenhum recebe id terminado em `-tabbar` ou `-error`. O ponto que estava em aberto com a 0.3.0 (`-header`, `-footer`, `-nav`, `-group` e `-table` no helper e não na skill) fechou: a 0.3.1 lista os cinco.
10. **Ícones**: os dados SVG ficam em `src/icons/icons.tsx` (`renderIcon`, uso interno) já no lote 1, porque Button e campos precisam deles. O componente público `Icon` entra no lote 3, como pedido. `ICON_NAMES` e o tipo `IconName` já são exportados.
11. **Logos**: os SVGs de `referencia/logos` vão para `dist/logos/` (export `ark-design-system/logos/*`). O componente `Logo` fica para o lote 3.
12. **Button com `href` desativado ou carregando**: o `bundle.js` ignorava `loading`/`disabled` no link. Aqui o link perde o `href`, recebe `aria-disabled="true"` e não dispara `onClick` (o CSS da referência já previa `[aria-disabled="true"]`).
13. **Button e TextField repassam `ref`** (`forwardRef`), para o formulário levar o foco ao primeiro campo com erro. TextField ganhou `onBlur` e `name`, que não estão no `index.d.ts`, porque a regra "erro ao sair do campo" precisa de `onBlur`. Mudança só aditiva, documentada no README do componente.
14. **ThemeToggle não guarda a escolha**: só avisa por `onChange`, como diz o README dele. A vitrine guarda no `localStorage`.
15. **`data-testid` foi acrescentado à API de todos os componentes** (o `index.d.ts` de referência não declara). Aditivo, sem quebra.
16. **`.gitignore` ignora `.claude/settings.local.json`** (configurações locais do editor). A linha estava sem commit na `develop`; entrou neste lote, a seu pedido, em 25/10 de manhã.
17. **Versões: a major anterior à mais nova, desde que ela ainda tenha suporte oficial; se saiu de suporte, a atual** (regra do time; aplicada em 25/10/2026 de manhã). React só no desenvolvimento: o `peerDependencies` aceita `react >=18`. Suporte conferido na política publicada de cada projeto, em 25/10/2026:

    | Pacote | Mais nova | Anterior | Suporte da anterior | Usada |
    | --- | --- | --- | --- | --- |
    | TypeScript | 7.0.2 | 6.0.3 | Sem política publicada. A Microsoft mantém o 6.0 de propósito (pacote `@typescript/typescript6`, para ferramentas que usam a API do compilador), e o `typescript-eslint` 8.72 só aceita TypeScript abaixo de 6.1. Tratada como com suporte. | 6.0.3 |
    | Vite | 8.3.5 | 7.3.7 | Sim: o 7.3 recebe correções importantes e de segurança ([vite.dev/releases](https://vite.dev/releases)). | 7.3.7 |
    | Vitest | 5.0.5 | 4.1.12 | Sim: o 4.1 recebe correções importantes e de segurança ([vitest.dev/releases](https://vitest.dev/releases)). | 4.1.12 |
    | ESLint (+ `@eslint/js`) | 10.13.0 | 9.39.5 | **Não**: fim de vida em 06/08/2026 ([eslint.org/version-support](https://eslint.org/version-support/)); o npm marca "no longer supported". | **10.13.0** (atual) |
    | React, react-dom | 19.3.1 | 18.3.1 | Só segurança: o React publica correção de segurança para toda major afetada ([versioning-policy](https://react.dev/community/versioning-policy)); o suporte ativo do 18 acabou em 05/12/2024. Tratada como com suporte. | 18.3.1 |

    - Por dependência: `@types/react` 18.3.31 e `@types/react-dom` 18.3.7; `@vitejs/plugin-react` 5.2.0 (a 6 só aceita Vite 8); `@vitest/coverage-v8` 4.1.12, na mesma versão do Vitest. Seguem iguais porque aceitam essas versões: `typescript-eslint` 8.72 (ESLint 10 e TypeScript abaixo de 6.1), `eslint-plugin-react-hooks` 7.1, Testing Library 16 e jsdom 30.
    - O desenvolvimento roda no React 18, a versão mais baixa que o `peerDependencies` aceita: o que passa aqui passa no 18.
    - **Riscos:**
      - React 18 e TypeScript 6 estão no limite de "com suporte" (o React 18 só recebe correção de segurança; o TypeScript não publica política). Se o time ler "suporte" como "ainda recebe correção de bug", o React passa para o 19. O TypeScript 7 ainda não dá, por causa do `typescript-eslint`.
      - O Vite 7 minifica o CSS com esbuild (o 8 usa Lightning CSS). Com os 5 lotes, o `estilos.css` foi de 38,51 para 38,83 kB, sem diferença vista na vitrine.
      - O `allowScripts` do npm não rodou o `postinstall` do esbuild. O build funciona sem ele.
      - Rever a tabela a cada major nova de qualquer um dos cinco.
18. **Cobertura mínima de 80% por arquivo** (linhas, funções e branches), com `thresholds.perFile` no `vitest.config.ts`. Abaixo disso, `npm run test:coverage` falha. Por arquivo, e não só no total: o total passava com folga e escondia arquivos abaixo de 80%. Entram na conta `src/**/*.{ts,tsx}` e `scripts/**/*.mjs`. Ficam fora: `referencia/`, `vitrine/`, tipos (`*.d.ts`, `*.d.mts`), configs, testes e `src/test/`. Os `index.ts` que só reexportam têm 0 linha executável e não pesam. Provider `@vitest/coverage-v8`; `coverage/` já estava no `.gitignore`.
    - **Cada lote passa sozinho**: os testes que faltavam para um arquivo entram no lote do arquivo, e não no último. Os de cada lote ficam na decisão de revisão dele; os do lote 1, aqui.
    - Neste lote: `icons.tsx` ficava com 53% de branches (Button e TextField usam poucos ícones). Ganhou teste do desenho de todos os ícones, do preenchimento só de coração e estrela e da espessura do traço.
