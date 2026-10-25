# ark-design-system

Design system da The Ark Group: tokens e componentes React usados no `iris-pwa`, no `iris-landing-page` e no `ark-landing-page`. Mudou aqui, vale em todos.

## Stack
- React + TypeScript, build de biblioteca com Vite.
- Tokens em `tokens.json` → variáveis CSS por `data-theme` (ark, ark-escuro, iris, iris-escuro, pulse, pulse-escuro).
- Testes com Vitest + Testing Library (skill `ark:teste-front`).
- Consumido pelos outros repos como dependência git com tag de versão.

## Referência
`referencia/` tem o design system como ele está no Claude: `README-design-system.md` (regras de uso), `tokens.json`, `Campos.md` (regras de campos), `components/index.d.ts` (API de cada componente), o README de cada componente, `bundle.js` e `bundle.css` (implementação de referência) e os logos.
- A API dos componentes segue o `index.d.ts`. Mudou a API, atualizar o README do componente.
- `referencia/` não é código de produção. Não importar dela.

## Regras
- Nunca cor solta: só tokens.
- Todo componente aceita `data-testid` e repassa para o elemento certo (skill `ark:padrao-data-testid`).
- Acessibilidade conforme o README do design system: foco visível, label ligado ao campo, status nunca só por cor.
- Quebra de API (renomear prop, mudar comportamento) sobe a versão maior e vai avisada no PR.

## Comandos
- Instalar: `npm install` (o `prepare` já gera o `dist/`).
- Vitrine: `npm run vitrine` → http://localhost:5180 (seletor de marca e modo escuro no topo).
- Testar: `npm test` (um arquivo: `npx vitest run src/components/Button/Button.test.tsx`).
- Cobertura: `npm run test:coverage`. Mínimo de 80% de linhas, funções e branches **por arquivo**; abaixo disso falha. Relatório em `coverage/index.html`.
- Versões: o time usa a major anterior à mais nova, desde que ela ainda tenha suporte oficial; se saiu de suporte, usa a atual (ver DECISOES.md, decisão 17).
- Lint e tipos: `npm run lint`.
- Tokens: editar `src/publico/tokens.json` e rodar `npm run tokens` (o teste falha se o `tokens.css` ficar desatualizado).
- Build: `npm run build` → `dist/` (JS, `estilos.css`, `fonte.css`, `tokens.json`, `logos/`, tipos).
- Publicar uma versão: subir `version` no `package.json`, mergear na `main` e criar a tag `vX.Y.Z` nela. Os consumidores instalam com `"ark-design-system": "git+ssh://git@github.com/<org>/ark-design-system.git#vX.Y.Z"`.

## Estrutura
- `src/components/<Nome>/`: `Nome.tsx`, `Nome.css`, `Nome.test.tsx`, `README.md` (API e data-testid), `index.ts`.
- `src/utils/testid.ts`: `testIdParte`, que deriva o data-testid das partes internas.
- `src/icons/icons.tsx`: desenho dos ícones. `src/styles/`: tokens gerados e base. `src/publico/`: vai para o `dist/` como está.
- `vitrine/`: app local de demonstração, uma seção por componente em `vitrine/secoes/`.

## Como o time trabalha
- Jira: thearkgroup.atlassian.net, projeto IRIS. Nunca usar outro site Atlassian.
- Fluxo: card → branch `feature/IRIS-123-descricao` a partir da `develop` → PR para a `develop` → a `develop` vai para a `main`. Skill: `ark:card-ao-pr`.
- Nunca fazer commit nem push direto na `develop` ou na `main`.
- Commit: `IRIS-123 o que mudou`. Sem `Co-Authored-By`, sem emoji e sem nenhuma menção a IA.
- Segredos só no `.env`, fora do git.
- Clean code e DRY: antes de criar, procurar se já existe algo para reaproveitar.
- Responder sempre em português.
