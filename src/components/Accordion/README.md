# Accordion

Lista de perguntas que abrem e fecham (FAQ).

- Pergunta como a pessoa faria, em primeira pessoa: "Preciso instalar algum aplicativo?"
- Resposta começa respondendo ("Não.", "Sim.", "Tem.") e explica em até 3 frases.
- 4 a 8 perguntas. Resposta ainda indefinida não vai ao ar.

## API

| Prop | Tipo |
| --- | --- |
| `items` | `{ q, a }[]` |
| `defaultOpen` | índice que já vem aberto |
| `data-testid` | `string` |

Usa `<details>`/`<summary>` nativos: teclado e leitor de tela funcionam sem código extra.

## data-testid

| Parte | Com `ark-landing-faq-list` |
| --- | --- |
| Lista | `ark-landing-faq-list` |
| Cada pergunta | `ark-landing-faq-item` |
| Abrir/fechar a pergunta | `ark-landing-faq-item-button` |
