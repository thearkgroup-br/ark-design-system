# SideNav

Menu lateral do painel no computador (Íris, sistemas do Arca Dev).

- Mesmos destinos da TabBar do celular, mais os que só fazem sentido no computador.
- Item atual com fundo `brand-soft`, peso e `aria-current`.
- `count` só para pendências reais (agendamentos do dia, chamados abertos).
- Abaixo de 1024 px, troque por TabBar.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `items` | `NavItem[]` | obrigatório |
| `active`, `onNavigate` | | como na TabBar |
| `brand`, `brandName` | | logo no topo |
| `footer` | `ReactNode` | |
| `label` | `string` | `'Menu do painel'` |
| `data-testid` | `string` | |

## data-testid

O menu é região (skill `padrao-data-testid` 0.3.2): o id recebido fica inteiro, com o `-nav`, e cada parte é acrescentada no fim.

| Parte | Com `iris-app-side-nav` |
| --- | --- |
| Menu | `iris-app-side-nav` |
| Item `schedule` | `iris-app-side-nav-schedule-link` |
| Contador do item | `iris-app-side-nav-schedule-count` |

Na versão 0.1.0 o `-nav` saía (`iris-app-side-schedule-link`): quem usa no E2E precisa trocar.
