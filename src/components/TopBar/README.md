# TopBar

Cabeçalho de tela interna do app: voltar, título e uma ação opcional.

- Título quebra linha quando necessário, nunca corta.
- Voltar com 44 px e nome falado "Voltar".
- No computador, o painel usa SideNav + título da página no conteúdo.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `title` | `string` | obrigatório |
| `back` | `boolean` | `true` |
| `backHref` | `string` | com ele o voltar vira link |
| `onBack` | `() => void` | |
| `action` | `ReactNode` | |
| `data-testid` | `string` | |

## data-testid

| Parte | Com `iris-booking-header` |
| --- | --- |
| Cabeçalho | `iris-booking-header` |
| Voltar (botão) | `iris-booking-back-button` |
| Voltar (com `backHref`) | `iris-booking-back-link` |
| Título | `iris-booking-title` |

Antes (`bundle.js`) o voltar tinha o id fixo `topbar-voltar`: quem usava esse id no E2E precisa trocar.
