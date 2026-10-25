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
| Voltar (botão) | `iris-booking-header-back-button` |
| Voltar (com `backHref`) | `iris-booking-header-back-link` |
| Título | `iris-booking-header-title` |

O cabeçalho é região (skill `padrao-data-testid` 0.3.2): o id recebido fica inteiro, com o `-header`, e cada parte é acrescentada no fim.

Na versão 0.1.0 o `-header` saía (`iris-booking-back-button`); antes disso (`bundle.js`) o voltar tinha o id fixo `topbar-voltar`. Quem usa no E2E precisa trocar.
