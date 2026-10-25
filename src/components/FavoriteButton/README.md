# FavoriteButton

Coração para favoritar um item (estabelecimento, serviço, profissional).

- `aria-pressed` diz o estado; o nome falado muda entre "Favoritar …" e "Remover …".
- Ao tocar sem estar logado, peça login antes de salvar.
- Confirme com Toast: "Adicionado aos favoritos" / "Removido dos favoritos".

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `active`, `defaultActive` | `boolean` | |
| `label` | `string` | `'este item'` |
| `onToggle` | `(active: boolean) => void` | |
| `data-testid` | `string` | |

## data-testid

Vai no botão. Ex.: `iris-business-favorite-button`.
