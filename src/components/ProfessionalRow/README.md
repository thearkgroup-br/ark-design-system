# ProfessionalRow

Linha de escolha do profissional: uma por pessoa, só o nome, sem foto.

- Escolha única (radio). "Qualquer profissional" vem primeiro e não tem favoritar.
- Nome quebra linha quando for grande.

## API

| Prop | Tipo |
| --- | --- |
| `name`, `subtitle` | `string` |
| `selected`, `onSelect` | escolha |
| `favorite`, `onFavorite` | `onFavorite` é acréscimo |
| `anyone` | "Qualquer profissional", sem favoritar |
| `data-testid` | `string` |

Coloque as linhas num grupo:

```tsx
<div role="radiogroup" aria-label="Profissional">
  <ProfessionalRow name="Qualquer profissional" anyone selected={id === null} onSelect={() => setId(null)} data-testid="iris-booking-any-professional-radio" />
  {equipe.map((p) => <ProfessionalRow key={p.id} name={p.nome} selected={id === p.id} onSelect={() => setId(p.id)} data-testid="iris-booking-professional-item" />)}
</div>
```

## data-testid

| Parte | Com `iris-booking-professional-item` |
| --- | --- |
| Radio | `iris-booking-professional-item` |
| Favoritar | `iris-booking-professional-favorite-button` |
