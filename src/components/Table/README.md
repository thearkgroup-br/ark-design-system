# Table

Tabela de dados para o painel no computador. Em espaço estreito (celular), vira uma lista de cartões com o rótulo de cada coluna.

- Primeira coluna identifica a linha (hora, nome). Valores em R$ alinhados à direita.
- Cabeçalho curto em maiúsculas. Até 6 colunas; o resto vai para o detalhe da linha.
- Lista vazia: passe `empty` com uma frase do que vai aparecer ali.
- No app do celular, prefira ListItem.

## API

| Prop | Tipo |
| --- | --- |
| `columns` | `{ key, label, align? }[]` |
| `rows` | `Record<string, ReactNode>[]` (uma `id` em cada linha mantém a linha certa se a ordem mudar) |
| `caption` | nome da tabela para o leitor de tela |
| `empty` | frase quando não há linhas |
| `data-testid` | `string` |

## data-testid

| Parte | Com `iris-schedule-day-table` |
| --- | --- |
| Tabela | `iris-schedule-day-table` |
| Cada linha | `iris-schedule-day-row` |
| Mensagem de vazio | `iris-schedule-day-empty` |

No modo cartão (estreito) alguns leitores de tela deixam de anunciar a tabela como tabela, porque as células viram blocos; o rótulo de cada coluna continua aparecendo (`data-label`). No app do celular, prefira ListItem.
