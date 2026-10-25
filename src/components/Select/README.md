# Select

Lista de opções nativa (no celular abre a roda do sistema).

- Use para 5 opções ou mais. Até 4 opções curtas: Segmented. Várias escolhas: Checkbox.
- Placeholder diz a ação: "Escolha uma opção", "Escolha o motivo".
- A última opção "Outro" abre um campo de texto quando fizer sentido.
- Mesmo rótulo, dica e erro do TextField.
- Sem `placeholder` e sem valor, começa na primeira opção (é o que o navegador mostra).

## API

| Prop | Tipo | Observação |
| --- | --- | --- |
| `id`, `label` | `string` | obrigatórios |
| `options` | `(string \| { value, label })[]` | |
| `placeholder` | `string` | vira a primeira opção, desativada |
| `hint`, `error`, `optional` | | como no TextField |
| `value`, `defaultValue`, `onChange` | | `onChange` recebe o evento |
| `onBlur`, `name`, `disabled`, `required` | | `onBlur` e `name` são acréscimos ao `index.d.ts` |
| `data-testid` | `string` | |

Repassa a `ref` para o `<select>`.

## data-testid

| Parte | Com `iris-help-subject-select` |
| --- | --- |
| Select | `iris-help-subject-select` |
| Erro | `iris-help-subject-error` |
| Dica | `iris-help-subject-hint` |
