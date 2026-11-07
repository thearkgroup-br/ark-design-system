# Faq

Faixa `#duvidas`: cabeçalho (rótulo entre parênteses e título) e o Accordion (`details`/`summary`, acessível por teclado e leitor de tela).

- Pergunta sem resposta definida não vai ao ar.
- A primeira pergunta vem aberta; `defaultOpen={null}` fecha todas.

## API

| Prop | Tipo |
| --- | --- |
| `eyebrow`, `title` | cabeçalho |
| `items` | `{ q, a? }[]` |
| `defaultOpen` | índice aberto (padrão `0`) ou `null` |
| `data-testid` | base (`ark-landing-faq`) |

## data-testid

A partir de `ark-landing-faq`: `-header`, `-list`, `-item`, `-item-button`.
