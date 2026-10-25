# Checkbox

Caixa de seleção para ligar uma opção ou aceitar algo.

- O texto diz o que acontece quando marcado, em afirmativa: "Permitir encaixe", não "Não bloquear encaixe".
- Aceite de dados (LGPD) começa desmarcado em formulários de cadastro; em contato simples pode vir marcado só se a lei permitir. Na dúvida, desmarcado.
- A linha inteira é clicável (44 px de altura).
- Para ligar/desligar algo que vale na hora (notificações), use Switch.
- Aceite não marcado ao enviar: `error="Para continuar, aceite o uso dos dados."` (Regras de campos). O erro tem ícone e texto e entra no `aria-describedby`.
- O `label` pode ter link (política de privacidade). Clicar no link abre o link; clicar no resto do texto marca.

## API

| Prop | Tipo | Observação |
| --- | --- | --- |
| `id` | `string` | obrigatório |
| `label` | `ReactNode` | obrigatório |
| `description` | `string` | ligada por `aria-describedby` |
| `checked`, `defaultChecked`, `onChange` | | `onChange(checked: boolean, evento)` |
| `disabled` | `boolean` | |
| `error`, `required`, `name`, `onBlur` | | acréscimos ao `index.d.ts` (aditivos) |
| `data-testid` | `string` | |

## data-testid

| Parte | Com `ark-landing-contact-terms-checkbox` |
| --- | --- |
| Caixa (input) | `ark-landing-contact-terms-checkbox` |
| Erro | `ark-landing-contact-terms-error` |
| Descrição | `ark-landing-contact-terms-description` |
