# Alert

Aviso dentro da tela, que não bloqueia.

- Título curto + uma frase dizendo o que fazer.
- `info` para regras, `warning` para prazos, `success` para confirmação que precisa ficar visível, `danger` para erro com saída ("tente de novo", "confira").
- Erro nunca pede desculpas nem culpa a pessoa.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `tone` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` |
| `title` | `string` | |
| `children` | `ReactNode` | |
| `action` | `ReactNode` (a saída) | |
| `data-testid` | `string` | |

`danger` usa `role="alert"` (anunciado na hora); os outros, `role="status"`.

## data-testid

| Parte | Com `iris-booking-confirm-error-alert` |
| --- | --- |
| Aviso | `iris-booking-confirm-error-alert` |
| Título | `iris-booking-confirm-error-title` |
