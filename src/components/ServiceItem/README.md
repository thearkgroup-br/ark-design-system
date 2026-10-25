# ServiceItem

Serviço que o cliente marca (pode escolher vários) com descrição, duração, valor e favoritar.

- Nome quebra linha; descrição em até 2 linhas.
- "a partir de" quando o valor varia.
- Valor no formato "R$ 35,00".
- Serviços favoritos aparecem primeiro.

## API

| Prop | Tipo |
| --- | --- |
| `name`, `description`, `duration` | `string` |
| `price` | `number` (vira "R$ 35,00", com ponto de milhar) |
| `priceFrom` | `boolean` |
| `selected`, `defaultSelected`, `onToggle` | marcação |
| `favorite` | `boolean` |
| `onFavorite` | `false` esconde o favoritar; função recebe o novo estado (acréscimo) |
| `data-testid` | `string` |

O favoritar fica ao lado do botão de marcar, nunca dentro (botão dentro de botão). Ordenar favoritos primeiro é de quem monta a lista.

## data-testid

| Parte | Com `iris-booking-services-item` |
| --- | --- |
| Botão de marcar (`role="checkbox"`) | `iris-booking-services-item` |
| Favoritar | `iris-booking-services-favorite-button` |
