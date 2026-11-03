# Hero

Topo do site, a faixa `#topo`: rótulo, título (h1), texto, botões e a ilustração ao lado (embaixo no celular).

- A ilustração é HTML e CSS, vai no slot `visual` e fica escondida do leitor de tela. Sem print de produto, sem número inventado.
- Exemplo com valores precisa dizer isso em `visualCaption` ("Ilustração com valores de exemplo").
- `badge` é o selo "Em breve" (pré-lançamento).

## API

| Prop | Tipo |
| --- | --- |
| `eyebrow`, `title`, `text` | rótulo, título e apoio |
| `badge` | selo acima do título |
| `primaryAction`, `secondaryAction` | `{ label, href }` |
| `note` | frase pequena abaixo dos botões |
| `visual`, `visualCaption` | ilustração e legenda |
| `data-testid` | base (`somma-landing-hero`) |

## data-testid

A partir de `somma-landing-hero`: `-header` (com `-title` e `-text`), `-badge`, `-primary-link`, `-secondary-link`, `-note`, `-visual`, `-visual-caption`.
