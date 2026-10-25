# PlanCard

Plano com nome, para quem é, preço, o que inclui e o botão.

- Preço sempre com "R$" e período ("/mês").
- Um plano em destaque no máximo (`highlight`), com selo curto ("Para equipes"). Nunca "Mais escolhido" sem dado real.
- Plano que ainda não existe usa `soon`: sem preço e sem botão.
- Itens começam pelo que diferencia o plano.

## API

| Prop | Tipo |
| --- | --- |
| `name`, `description`, `price`, `period` | `string` |
| `features` | `string[]` |
| `cta` | `{ label, href?, onClick? }` (sem `href` vira botão; `onClick` é acréscimo) |
| `highlight`, `badge`, `soon` | |
| `data-testid` | `string` |

## data-testid

| Parte | Com `iris-landing-plans-card` |
| --- | --- |
| Card | `iris-landing-plans-card` |
| Preço | `iris-landing-plans-price` |
| Itens | `iris-landing-plans-feature-item` |
| Botão | `iris-landing-plans-cta-link` (com `href`) ou `-cta-button` |
