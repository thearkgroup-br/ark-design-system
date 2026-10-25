# ListItem

Linha de lista com ícone ou avatar, título, detalhe e seta quando leva a outra tela.

- Título de uma linha (quebra se precisar, nunca corta sem "…"); detalhe em `ink-muted`.
- Linha clicável inteira, 64 px de altura mínima.
- Seta só quando abre outra tela. Ação na própria linha (switch, valor) vai em `trailing`.

## API

| Prop | Tipo |
| --- | --- |
| `title`, `subtitle` | `ReactNode` |
| `icon` / `avatar` (nome) / `leading` | o que vai à esquerda |
| `trailing` | ação ou valor na linha |
| `href` / `onClick` | link / botão (com seta) |
| `chevron` | `false` tira a seta |
| `data-testid` | `string` |

A seta usa `ink-muted` (a referência usava `ink-disabled`, que não passa 3:1 em ícone).

## data-testid

Vai na linha. Numa lista que se repete, todas as linhas recebem o mesmo id, terminado em `-item` (ex.: `iris-appointments-upcoming-item`); o teste filtra pelo texto.
