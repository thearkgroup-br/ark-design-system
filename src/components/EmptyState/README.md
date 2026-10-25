# EmptyState

Tela ou lista vazia: ícone, o que vai aparecer ali e uma ação.

- Título diz o estado ("Nenhum favorito ainda"); texto diz o que fazer.
- Sempre uma ação que resolve ("Explorar estabelecimentos", "Cadastrar serviço").
- Busca sem resultado também é estado vazio: "Nenhum resultado para "termo"."

## API

| Prop | Tipo |
| --- | --- |
| `title` | `string` (obrigatório) |
| `text` | `string` |
| `icon` | nome de ícone |
| `action` | `ReactNode` |
| `data-testid` | `string` |

## data-testid

| Parte | Com `iris-favorites-empty` |
| --- | --- |
| Bloco | `iris-favorites-empty` |
| Título | `iris-favorites-empty-title` |
| Texto | `iris-favorites-empty-text` |
