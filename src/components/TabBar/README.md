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

Vai no `<nav>`. Cada aba: `{id inteiro}-{id da aba}-tab`. A tab bar é região (skill `padrao-data-testid` 0.3.2): o id recebido fica inteiro, com o sufixo, e a aba é acrescentada no fim. Use ids de aba fixos e em inglês (`home`, `appointments`).

| Parte | Com `iris-app-main-tabbar` |
| --- | --- |
| Barra | `iris-app-main-tabbar` |
| Aba `home` | `iris-app-main-tabbar-home-tab` |

Na versão 0.1.0 o sufixo saía (`iris-app-main-home-tab`); na referência (`bundle.js`) o id era fixo `tabbar-{id}`. Quem usa no E2E precisa trocar.
