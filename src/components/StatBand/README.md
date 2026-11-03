# StatBand

Faixa de destaques logo abaixo do Hero (fundo `surface`, baixa).

- Só fatos verdadeiros e verificáveis, ou frases do próprio produto. Nunca número inventado.
- Destaque de até 4 palavras + uma linha de explicação. Aceita 3 ou 4 itens.

## API

| Prop | Tipo |
| --- | --- |
| `items` | `{ value, label }[]` |
| `label` | nome da lista para o leitor de tela |
| `data-testid` | `string` (vai na lista) |

## data-testid

Cada destaque ganha `{base}-item` (`somma-landing-highlights-list` → `somma-landing-highlights-item`).
