# EstablishmentCard

Card do negócio na busca, na Início e nos favoritos da Íris.

- Nome em até 2 linhas e "…"; o nome completo aparece na página do negócio.
- Sem foto, mostra as iniciais na cor do negócio (contraste 4.5:1 com branco).
- Sem avaliações, mostra "Sem avaliações".

## API

| Prop | Tipo |
| --- | --- |
| `name`, `category`, `distance` | `string` |
| `rating` | `number` (sem ela: "Sem avaliações") |
| `open` | `boolean` (selo Aberto agora / Fechado) |
| `image` | `string` |
| `color` | cor de destaque do negócio (dado do cadastro, já validado com 4.5:1 sobre branco); sem ela, usa `brand` |
| `href` | `string` |
| `data-testid` | `string` |

## data-testid

| Parte | Com `iris-home-business-card` |
| --- | --- |
| Card | `iris-home-business-card` |
| Miniatura (foto ou iniciais) | `iris-home-business-thumb` |
