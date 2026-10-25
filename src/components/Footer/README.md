# Footer

Rodapé do site: marca com a frase, colunas de links e contato, e a linha legal.

- Até 3 colunas além da marca. Contato real (horário, WhatsApp como texto selecionável, e-mail).
- Sempre "Política de privacidade" e, quando houver cadastro, "Termos de uso".
- No celular, as colunas viram 2 por linha.

## API

| Prop | Tipo |
| --- | --- |
| `brand`, `brandName`, `tagline` | |
| `columns` | `{ title, items: (string \| { label, href?, id? })[] }[]` (texto fica selecionável, sem link) |
| `legal` | `string` |
| `bottomLinks` | `{ label, href?, id? }[]` |
| `data-testid` | `string` |

## data-testid

| Parte | Com `ark-landing-footer` |
| --- | --- |
| Rodapé | `ark-landing-footer` |
| Link das colunas | `ark-landing-link` (com `id`: `ark-landing-{id}-link`) |
| Links de baixo | `ark-landing-legal-link` (com `id`: `ark-landing-{id}-link`) |
| Linha legal | `ark-landing-legal` |
