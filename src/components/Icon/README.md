# Icon

Ícones de traço 2 px, cantos arredondados, desenhados em `currentColor`: pegam a cor do texto onde estão.

- Sempre acompanhados de texto ou de `aria-label` no botão. O ícone sozinho não explica nada.
- Tamanhos: 16 em selos e listas, 20 em botões e campos, 24 na tab bar, 26–28 em cards e estados vazios.
- Use só os nomes da lista. Precisa de um novo? Desenhe no mesmo estilo (viewBox 24, traço 2) e adicione ao conjunto.
- Nada de emoji na interface.

## API

| Prop | Tipo | Observação |
| --- | --- | --- |
| `name` | nome da lista (`ICON_NAMES`, 35 ícones) | obrigatório |
| `size` | `number` | padrão 20 |
| `filled` | `boolean` | preenche `heart` e `star` |
| `color` | `string` | só token: `var(--star)`. Sem ela, herda a cor do texto |
| `label` | `string` | acréscimo: quando o ícone sozinho tem significado, vira `role="img"` com esse nome |
| `data-testid` | `string` | |

## data-testid

Vai no `span.ak-icon`. Sem partes internas.
