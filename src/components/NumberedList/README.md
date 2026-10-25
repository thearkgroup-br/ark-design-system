# NumberedList

Lista com números 01, 02, 03… e divisórias. Usada em "O que você recebe" no site.

- Só quando a ordem ou a contagem importa para quem lê.
- Título de até 4 palavras + uma linha de explicação.
- 3 a 6 itens.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `items` | `{ title, text? }[]` | |
| `start` | `number` | 1 |
| `data-testid` | `string` | |

## data-testid

Vai na lista (`ol`); cada item ganha `{base}-item`.
