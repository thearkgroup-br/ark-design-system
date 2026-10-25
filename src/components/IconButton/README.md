# IconButton

Botão só com ícone, para ações conhecidas: fechar, editar, menu, adicionar.

- `label` é obrigatório: vira o nome falado pelo leitor de tela e a dica ao passar o mouse ("Fechar", "Editar serviço").
- Área de toque de 44 px; `sm` (36 px) só no computador.
- `outline` em barras e cards, `plain` em cabeçalhos, `solid` para a ação principal flutuante.
- Ação que não é óbvia pelo ícone vira Button com texto.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `icon` | nome de ícone | obrigatório |
| `label` | `string` | obrigatório (nome falado e `title`) |
| `variant` | `'plain' \| 'outline' \| 'solid'` | `'outline'` |
| `size` | `'sm' \| 'md'` | `'md'` |
| `data-testid` | `string` | |

Aceita os atributos de `<button>` (`onClick`, `disabled`, `aria-expanded`…) e repassa a `ref`.

## data-testid

Vai no `<button>`. Ex.: `iris-services-item-edit-button`.
