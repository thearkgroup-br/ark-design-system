# Segmented

Escolha única entre 2 e 4 opções curtas, lado a lado: Dia/Equipe/Semana, Agendamento/Bloqueio.

- Nunca rola para o lado. Mais de 4 opções: Select.
- Rótulos de 1 ou 2 palavras.
- Opção ativa com fundo, contorno, peso e `aria-pressed` (não só cor).

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `options` | `{ id: string; label: string }[]` | |
| `value`, `defaultValue` | `string` | a primeira opção |
| `onChange` | `(id: string) => void` | |
| `label` | `string` (nome do grupo) | `'Opções'` |
| `data-testid` | `string` | |

## data-testid

O id vai no grupo; cada opção usa o id inteiro do grupo + o `id` da opção + `-button`. O grupo é região (skill `padrao-data-testid` 0.3.2), por isso o `-group` fica. Use ids de opção fixos e em inglês (`day`, `week`), nunca valores do banco.

| Parte | Com `iris-schedule-view-group` |
| --- | --- |
| Grupo | `iris-schedule-view-group` |
| Opção `day` | `iris-schedule-view-group-day-button` |

Na versão 0.1.0 o `-group` saía (`iris-schedule-view-day-button`): quem usa no E2E precisa trocar.
