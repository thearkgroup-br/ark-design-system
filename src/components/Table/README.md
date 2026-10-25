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

A tabela é região (skill `padrao-data-testid` 0.3.2): o id recebido fica inteiro, com o `-table`, e cada parte é acrescentada no fim.

| Parte | Com `iris-schedule-day-table` |
| --- | --- |
| Tabela | `iris-schedule-day-table` |
| Cada linha | `iris-schedule-day-table-row` |
| Mensagem de vazio | `iris-schedule-day-table-empty` |

Na versão 0.1.0 o `-table` saía (`iris-schedule-day-row`): quem usa no E2E precisa trocar.

No modo cartão (estreito) alguns leitores de tela deixam de anunciar a tabela como tabela, porque as células viram blocos; o rótulo de cada coluna continua aparecendo (`data-label`). No app do celular, prefira ListItem.
