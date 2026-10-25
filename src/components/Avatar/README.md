# Avatar

Foto ou iniciais de uma pessoa (cliente, membro da equipe).

- Sem foto, mostra a primeira e a última inicial.
- Na escolha de profissional do app, não use avatar: a lista é só com nome.
- Tamanhos: 32 em tabelas, 40 em listas, 56 no perfil.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `name` | `string` | |
| `src`, `alt` | `string` | `alt` padrão = nome |
| `size` | `number` | 44 |
| `data-testid` | `string` | |

Sem foto, as iniciais ficam escondidas do leitor de tela e o nome é lido.

## data-testid

Vai no avatar. Ex.: `iris-profile-avatar`.
