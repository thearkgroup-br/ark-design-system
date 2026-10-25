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

O rodapé é região (skill `padrao-data-testid` 0.3.2): o id recebido fica inteiro, com o `-footer`, e cada parte é acrescentada no fim. Assim o mesmo link no cabeçalho e no rodapé nunca gera o mesmo id (`ark-landing-header-how-link` e `ark-landing-footer-how-link`).

| Parte | Com `ark-landing-footer` |
| --- | --- |
| Rodapé | `ark-landing-footer` |
| Link das colunas | `ark-landing-footer-link` (com `id`: `ark-landing-footer-{id}-link`) |
| Links de baixo | `ark-landing-footer-legal-link` (com `id`: `ark-landing-footer-{id}-link`) |
| Linha legal | `ark-landing-footer-legal` |

Na versão 0.1.0 o `-footer` saía (`ark-landing-link`): quem usa no E2E precisa trocar.
