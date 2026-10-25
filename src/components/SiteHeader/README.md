# SiteHeader

Cabeçalho fixo do site: logo, links, botão de modo claro/escuro e o botão principal.

- Fica preso no topo ao rolar (`sticky`), com fundo `surface` e linha embaixo.
- Até 5 links de 1 a 3 palavras, que levam a seções da página.
- Um botão principal no máximo ("Fale com a gente"). A Íris pode não ter.
- Abaixo de 860 px os links vão para o menu (botão "Abrir menu"); abaixo de 420 px o botão principal sai do topo e fica no menu e na página.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `brand`, `brandName`, `homeHref` | | `'ark'`, nome da marca, `'#'` |
| `links` | `{ label, href?, id? }[]` | `id` é acréscimo, só para o data-testid |
| `cta` | `{ label, href?, id? }` | |
| `pill` | `boolean` | |
| `themeToggle` | `boolean` | `true` |
| `dark`, `defaultDark`, `onThemeChange` | | o tema do topo e o do menu usam o mesmo estado |
| `sticky` | `boolean` | `true` |
| `data-testid` | `string` | |

O menu fecha no X, na tecla Esc e ao escolher um link (nos dois casos o foco volta ao botão do menu). Abaixo de 420 px o botão principal sai do topo e aparece no menu. O link do logo se chama "{marca}: início".

## data-testid

O cabeçalho é região (skill `padrao-data-testid` 0.3.2): o id recebido fica inteiro, com o `-header`, e cada parte é acrescentada no fim. Assim o mesmo link no cabeçalho e no rodapé nunca gera o mesmo id (`ark-landing-header-how-link` e `ark-landing-footer-how-link`).

| Parte | Com `ark-landing-header` |
| --- | --- |
| Cabeçalho | `ark-landing-header` |
| Link do logo | `ark-landing-header-logo-link` |
| Link com `id: 'plans'` | `ark-landing-header-plans-link` (no menu: `ark-landing-header-menu-plans-link`) |
| Link sem `id` | `ark-landing-header-nav-link` (no menu: `ark-landing-header-menu-nav-link`) |
| Botão principal | `ark-landing-header-cta-link` (faixa do celular: `ark-landing-header-mobile-cta-link`; no menu, abaixo de 420 px: `ark-landing-header-menu-cta-link`) |
| Tema | `ark-landing-header-theme-button` (no menu: `ark-landing-header-menu-theme-button`) |
| Abrir/fechar menu | `ark-landing-header-menu-button` |
| Menu aberto | `ark-landing-header-menu` |

Na versão 0.1.0 o `-header` saía (`ark-landing-logo-link`): quem usa no E2E precisa trocar.
