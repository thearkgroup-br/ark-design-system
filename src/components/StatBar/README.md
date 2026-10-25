# StatBar

Faixa com 3 destaques logo abaixo do topo do site.

- Só fatos verdadeiros e verificáveis (preço, prazo, teste grátis). Nunca números inventados de resultado.
- Destaque de até 4 palavras + uma linha de explicação.
- No celular, os itens empilham.

## API

| Prop | Tipo |
| --- | --- |
| `items` | `{ value, label }[]` (3 destaques) |
| `data-testid` | `string` |

## data-testid

Vai na lista; cada destaque ganha `{base}-item` (ex.: `ark-landing-highlights-list` → `ark-landing-highlights-item`).
