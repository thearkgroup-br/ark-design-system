# Eyebrow

Rótulo curto acima do título de uma seção, entre parênteses: "( Para quem é )".

- 1 a 4 palavras, primeira letra maiúscula, sem ponto.
- Cor `brand` (na Ark fica preto/branco; na Íris, roxo). `muted` quando a seção já tem muito destaque.
- Sempre seguido de um título (SectionHeader).

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `children` | `ReactNode` | |
| `tone` | `'brand' \| 'muted'` | `'brand'` |
| `parens` | `boolean` | `true` |
| `data-testid` | `string` | |

## data-testid

Vai no rótulo.
