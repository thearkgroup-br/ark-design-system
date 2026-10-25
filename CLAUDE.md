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
Ainda não definidos. Quando o projeto for criado, registrar aqui como instalar, rodar a vitrine, testar, rodar o lint e publicar uma versão.

## Como o time trabalha
- Jira: thearkgroup.atlassian.net, projeto IRIS. Nunca usar outro site Atlassian.
- Fluxo: card → branch `feature/IRIS-123-descricao` a partir da `develop` → PR para a `develop` → a `develop` vai para a `main`. Skill: `ark:card-ao-pr`.
- Nunca fazer commit nem push direto na `develop` ou na `main`.
- Commit: `IRIS-123 o que mudou`. Sem `Co-Authored-By`, sem emoji e sem nenhuma menção a IA.
- Segredos só no `.env`, fora do git.
- Clean code e DRY: antes de criar, procurar se já existe algo para reaproveitar.
- Responder sempre em português.
