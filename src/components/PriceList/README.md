# PriceList

Lista de serviços com descrição e preço (Arca Dev).

- "a partir de R$ …" quando o preço depende do escopo; "sob orçamento" quando não dá para estimar.
- Descrição em uma frase do que a pessoa recebe.
- No celular, cada linha empilha nome, descrição e preço.

## API

| Prop | Tipo |
| --- | --- |
| `items` | `{ name, desc?, price }[]` (`price` já escrito) |
| `data-testid` | `string` |

## data-testid

Vai na lista; cada linha ganha `{base}-item`.
