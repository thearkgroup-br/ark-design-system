# Logo

Logo de cada marca do grupo, desenhado em código para acompanhar o tema.

- `brand="ark"`: casco de tábuas + "THE ARK GROUP". Usa `ink` (preto no claro, branco no escuro). 
- `brand="iris"`: íris com fibras, pupila e brilho + "íris" em minúsculas. A íris usa `brand`; a pupila é sempre #17142B e o brilho é branco.
- `brand="mastro"`: mastro e vela dentro do quadrado arredondado (quadrado em `brand`, traço em `on-brand`) + "mastro" sempre em minúsculas, Plus Jakarta Sans 800 com espaçamento -0.035em. Na LP da Ark, com o tema `ark`, sai em preto e branco.
- `brand="pulse"`: só o nome, em `brand`. O Pulse ainda não tem símbolo: não desenhe um.
- `size` é a altura do símbolo em px: 26–34 no cabeçalho, 40 em telas de entrada. `markOnly` mostra só o símbolo (ícone de app, favicon).
- Nunca distorça, gire, troque a cor ou coloque sombra. Respiro mínimo em volta: metade da altura do símbolo.
- Para arquivos (redes sociais, documentos), use os SVGs do pacote: `ark-design-system/logos/ark-simbolo-preto.svg`, `iris-simbolo.svg`, `mastro-simbolo.svg` (azul), `mastro-simbolo-escuro.svg` e, para os materiais do grupo, `mastro-simbolo-preto.svg` e `mastro-simbolo-branco.svg`

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `brand` | `'ark' \| 'iris' \| 'pulse' \| 'zenno' \| 'somma' \| 'mastro'` | `'ark'` |
| `size` | `number` (altura do símbolo) | 28 |
| `markOnly` | `boolean` | |
| `name` | `string` | o nome da marca |
| `data-testid` | `string` | |

O nome falado é o da marca ("THE ARK GROUP", "Íris", "pulse" ou o `name`); o desenho e o texto ficam escondidos do leitor de tela. A pupila (#17142B) e o brilho branco da íris são cores fixas do desenho, como nos arquivos de logo.

## data-testid

Vai no elemento com `role="img"`. Ex.: `ark-landing-header-logo`.
