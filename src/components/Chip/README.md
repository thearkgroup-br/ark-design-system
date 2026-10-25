# Chip

Etiqueta (lista de tipos de negócio no site) ou filtro clicável (Hoje, Amanhã, Filtros).

- Sem `onClick` é só etiqueta; com `onClick` + `selected` vira filtro com `aria-pressed`.
- Texto de 1 a 3 palavras. Chips quebram linha, nunca rolam para o lado.

## API

| Prop | Tipo |
| --- | --- |
| `children` | `ReactNode` (obrigatório) |
| `icon` | nome de ícone |
| `selected` | `boolean` |
| `onClick` | `() => void` |
| `data-testid` | `string` |

Filtro (com `onClick` ou `selected`) tem 44 px de altura e `aria-pressed`; etiqueta tem 40 px.

## data-testid

Vai no chip (`span` ou `button`). Etiquetas que se repetem: `{...}-item`; filtro: `iris-home-filter-today-button`.
