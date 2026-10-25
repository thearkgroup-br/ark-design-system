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

| Parte | Com `iris-app-side-nav` |
| --- | --- |
| Menu | `iris-app-side-nav` |
| Item `schedule` | `iris-app-side-schedule-link` |
| Contador do item | `iris-app-side-schedule-count` |
