# TabBar

Barra fixa de abas no rodapé do app, no celular.

- 3 a 5 abas, rótulos de 1 palavra.
- Aba atual com `aria-current="page"`, cor e peso (não só cor).
- Some no meio de fluxos (agendar, cadastrar). No computador, vira SideNav.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `items` | `NavItem[]` (`{ id, label, icon, href?, count? }`) | Início, Agendamentos, Perfil |
| `active`, `onNavigate` | | controlada ou não; `onNavigate(id)` |
| `label` | `string` | `'Navegação principal'` |
| `data-testid` | `string` | |

Aba com `href` é link; sem `href` é botão que só avisa `onNavigate` (antes era `<a href="#">`).

## data-testid

Vai no `<nav>`. Cada aba: `{id sem sufixo}-{id da aba}-tab`.

| Parte | Com `iris-app-tabbar-nav` |
| --- | --- |
| Barra | `iris-app-tabbar-nav` |
| Aba `agendamentos` | `iris-app-tabbar-agendamentos-tab` |

Antes o id era fixo `tabbar-{id}`: quem usava no E2E precisa trocar.
