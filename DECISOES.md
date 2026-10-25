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
9. **data-testid das partes internas**: o id recebido **sem o sufixo de tipo** + nome da parte (helper `testIdParte` em `src/utils/testid.ts`). Ex.: `iris-login-email-input` → erro `iris-login-email-error`; `iris-appointments-cancel-dialog` → `iris-appointments-cancel-close-button`. Motivo: é exatamente o par de exemplo da skill `padrao-data-testid` (`iris-login-email-input` / `iris-login-email-error`). Se o id não termina em sufixo de tipo, a parte é só acrescentada. Sem `data-testid`, as partes ficam sem id. **Se o time preferir concatenar literalmente (`...-input-error`), a mudança é só no helper.**
10. **Ícones**: os dados SVG ficam em `src/icons/icons.tsx` (`renderIcon`, uso interno) já no lote 1, porque Button e campos precisam deles. O componente público `Icon` entra no lote 3, como pedido. `ICON_NAMES` e o tipo `IconName` já são exportados.
11. **Logos**: os SVGs de `referencia/logos` vão para `dist/logos/` (export `ark-design-system/logos/*`). O componente `Logo` fica para o lote 3.
12. **Button com `href` desativado ou carregando**: o `bundle.js` ignorava `loading`/`disabled` no link. Aqui o link perde o `href`, recebe `aria-disabled="true"` e não dispara `onClick` (o CSS da referência já previa `[aria-disabled="true"]`).
13. **Button e TextField repassam `ref`** (`forwardRef`), para o formulário levar o foco ao primeiro campo com erro. TextField ganhou `onBlur` e `name`, que não estão no `index.d.ts`, porque a regra "erro ao sair do campo" precisa de `onBlur`. Mudança só aditiva, documentada no README do componente.
14. **ThemeToggle não guarda a escolha**: só avisa por `onChange`, como diz o README dele. A vitrine guarda no `localStorage`.
15. **`data-testid` foi acrescentado à API de todos os componentes** (o `index.d.ts` de referência não declara). Aditivo, sem quebra.
16. **A alteração local em `.gitignore` (linha `.claude/settings.local.json`) que já estava na `develop` sem commit não foi commitada** por mim: é sua e ficou como alteração pendente na árvore.
17. **Versões**: React 19 só no desenvolvimento; `peerDependencies` aceita React 18 ou mais novo. TypeScript 6, Vite 8, Vitest 5, ESLint 10 (as atuais do npm).
