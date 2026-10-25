# Switch

Liga/desliga uma configuração que vale na hora, sem botão de salvar.

- O rótulo nomeia a configuração ("Lembrete 1 dia antes"); a descrição explica o efeito.
- Mudou? Confirme com Toast ("Lembrete ligado"). Quem mostra o Toast é a tela.
- Se a mudança precisa de "Salvar", use Checkbox.
- É um `<button role="switch">` com `aria-checked`; a bolinha muda de lado (não só de cor).

## API

| Prop | Tipo |
| --- | --- |
| `id`, `label` | `string` (obrigatórios) |
| `description` | `string` |
| `checked`, `defaultChecked` | `boolean` |
| `disabled` | `boolean` |
| `onChange` | `(checked: boolean) => void` |
| `data-testid` | `string` |

Repassa a `ref` para o botão.

## data-testid

| Parte | Com `iris-settings-reminder-day-before-switch` |
| --- | --- |
| Botão | `iris-settings-reminder-day-before-switch` |
| Descrição | `iris-settings-reminder-day-before-description` |
