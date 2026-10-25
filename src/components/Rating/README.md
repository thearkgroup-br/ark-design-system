# Rating

Nota de 1 a 5: exibição (com ou sem contagem) e entrada (`editable`).

- A nota usa vírgula: 4,8.
- Na entrada, cada estrela é um botão de 44 px com nome falado ("4 estrelas, Bom").
- Sem avaliações, escreva "Sem avaliações" em vez de mostrar 0.

## API

| Prop | Tipo |
| --- | --- |
| `value`, `count` | `number` |
| `compact` | `boolean` (uma estrela) |
| `editable`, `defaultValue`, `onChange`, `label` | entrada de nota |
| `data-testid` | `string` |

Na entrada é um grupo de radios: Tab entra numa estrela só (a escolhida), setas mudam a nota, Home/End vão a 1 e 5. Sem nota, a exibição mostra "Sem avaliações".

## data-testid

| Parte | Com `iris-review-score-group` |
| --- | --- |
| Grupo (entrada) | `iris-review-score-group` |
| Cada estrela | `iris-review-score-group-star` (o teste filtra pelo nome "4 estrelas, Bom") |

Na entrada o id termina em `-group`, que é região (skill `padrao-data-testid` 0.3.2): fica inteiro e a estrela é acrescentada no fim. Na versão 0.1.0 o `-group` saía (`iris-review-score-star`): quem usa no E2E precisa trocar.

Na exibição o id vai no elemento `role="img"` (ex.: `iris-business-rating`).
