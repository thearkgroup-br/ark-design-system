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

## Lote 2: formulários

19. **Regras de busca em helpers, não dentro do SearchField.** O componente só avisa o texto a cada tecla (`onChange`, como no `index.d.ts`). `useTermoDeBusca` (2 caracteres, 300 ms), `normalizarBusca` e `buscaEncontra` (ignora maiúsculas, acentos e espaços) são exportados para toda tela usar a mesma regra. Motivo: o componente não sabe se a busca é local ou na API; assim a API não muda.
20. **SearchField sem `id` gera um id único** (`useId`) em vez do `busca` fixo do `bundle.js`, que duplicaria id com duas buscas na tela. Sem `label`, o nome falado é o placeholder (ou "Buscar"). O X de limpar devolve o foco ao campo.
21. **IconButton foi feito no lote 2** porque o limpar da busca precisa dele. Ele só passa a ser exportado no lote 3, como pedido.
22. **Checkbox ganhou `error`, `required`, `name` e `onBlur` (aditivo).** O `index.d.ts` não tem `error`, mas o Campos.md exige "Para continuar, aceite o uso dos dados." no aceite LGPD. O erro usa a mesma peça do TextField (`FieldMessage`, extraída do `FieldShell`). `onChange` continua recebendo o booleano (e o evento como 2º argumento).
23. **Select sem placeholder e sem valor começa na primeira opção**, para o estado bater com o que o navegador mostra. Ganhou `onBlur` e `name`, como o TextField.
24. **Sombra do Segmented trocada por contorno de token.** O `bundle.css` usa `rgba(0, 0, 0, .1)`, cor solta. A opção ativa ficou com fundo `surface`, contorno `inset 0 0 0 1px var(--line)`, peso 800 e `aria-pressed`. Diferença visual pequena; no escuro o contorno aparece melhor que a sombra preta.
25. **Ids das opções do Segmented**: `{grupo sem -group}-{id da opção}-button`. O `id` da opção precisa ser fixo e em inglês (`day`, `week`), nunca um valor do banco.
26. **Switch**: rótulo com id `{id}-label` (era `{id}-l`) e descrição ligada por `aria-describedby`. Clicar no texto não alterna (só o botão), igual à referência.
27. **Todo CSS de componente entra no `src/styles/index.css`** e os componentes não importam CSS (o import ia parar nos `.d.ts` e quebraria quem compila sem `skipLibCheck`). Um teste confere que nenhum CSS ficou de fora. (Ajuste feito no fim do lote 1, depois da revisão de TypeScript.)
28. **Revisão do lote 1 aplicada**: TextField repassa os atributos nativos (`readOnly`, `autoFocus`, `onFocus`, `min`, `pattern`…); Button com `href` aceita `target`, `rel`, `download` (com `target="_blank"` põe `rel="noopener noreferrer"`); teste de cor solta pega também `color-mix()`, `hwb()`, `oklab()` e cores por nome. Ficaram como sugestão, sem mudar: `role="alert"` no erro de campo (a referência pede que o erro seja lido junto pelo `aria-describedby`, o que já acontece) e Button com `loading` usando `disabled` nativo (perde o foco; segue a referência).
29. **Revisão do lote 2 aplicada**: `useTermoDeBusca` limpa o termo na hora ao apagar e busca na hora quando o valor inicial já vale; o nome falado do Checkbox é só o rótulo (a descrição vai pelo `aria-describedby`, sem ler duas vezes); opções do Segmented com altura mínima de 44 px (`--size-touch`, regra de toque do design system; a referência usava 40 px). Documentado no README do Select que `value=""` controlado precisa de `placeholder`.

## Lote 3: navegação

30. **Cores fixas do desenho do Logo ficam no `Logo.tsx`** (pupila `#17142B` e brilho branco da íris), porque o README dos logos diz que são fixas e "não trocar a cor". O resto do logo usa `currentColor` (`ink` no Ark, `brand` na Íris e no Pulse). Um teste novo falha se qualquer outro `.tsx` de componente tiver cor em hex. A máscara do casco da Ark usa `white`/`black` como valores de máscara (recorte), não como cor de interface.
31. **Ids da máscara do Logo Ark com `useId`** (sem os `:`), para dois logos na mesma tela não se misturarem.
32. **Icon mantém a prop `color` do `index.d.ts`**, com a regra no README de usar só token (`var(--star)`). Ganhou `label` (aditivo) para ícone que tem significado sozinho.
33. **TabBar e SideNav: item sem `href` vira `<button>`** que só avisa `onNavigate`, em vez de `<a href="#">` com `preventDefault` do `bundle.js` (link falso). Item com `href` continua link. O CSS cobre os dois.
34. **data-testid da navegação** (quebra os ids fixos da referência, avisar o E2E no PR):
    - TopBar: `{base}-back-button` (ou `-back-link`) e `{base}-title`, no lugar do fixo `topbar-voltar`.
    - TabBar: `{base}-{id da aba}-tab`, no lugar do fixo `tabbar-{id}`, como pedido.
    - SideNav: `{base}-{id}-link` e `{base}-{id}-count`. Usei `-link` (são destinos fixos, cada um com id) em vez de `-item`, que a skill reserva para item que se repete.
    - SiteHeader e Footer: links ganharam `id` opcional (aditivo) só para o data-testid (`{base}-{id}-link`). Sem `id`, todos usam o mesmo `{base}-nav-link` / `{base}-link` e o teste filtra pelo texto, como a skill manda (nada de índice ou texto no id). Partes que aparecem duas vezes no DOM (botão principal, tema) têm ids diferentes: `-cta-link` / `-mobile-cta-link`, `-theme-button` / `-menu-theme-button`.
35. **SiteHeader: um estado só para o tema** do topo e do menu (na referência, sem controle, os dois ThemeToggle ficavam diferentes). O menu fecha com Esc (foco volta ao botão) e ao escolher um link; o link do logo se chama "{marca}: início" (era só "Início"). A troca para o menu é por container query (largura do próprio cabeçalho), como na referência; no jsdom isso só é conferido lendo o CSS, e foi conferido na vitrine.
36. **TabBar ganhou `box-shadow: var(--shadow-sheet)`** (o README do design system manda sombra de sheet na tab bar; o `bundle.css` não tinha) e respeita a área segura de baixo do iPhone (`env(safe-area-inset-bottom)`).
37. **Título do TopBar continua `<span>`**, como na referência; não virou `<h1>` para não criar dois títulos principais em telas que já têm um.
