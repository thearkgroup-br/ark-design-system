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

| Parte | Com `ark-landing-header` |
| --- | --- |
| Cabeçalho | `ark-landing-header` |
| Link do logo | `ark-landing-logo-link` |
| Link com `id: 'plans'` | `ark-landing-plans-link` (no menu: `ark-landing-menu-plans-link`) |
| Link sem `id` | `ark-landing-nav-link` (no menu: `ark-landing-menu-nav-link`) |
| Botão principal | `ark-landing-cta-link` (faixa do celular: `ark-landing-mobile-cta-link`; no menu, abaixo de 420 px: `ark-landing-menu-cta-link`) |
| Tema | `ark-landing-theme-button` (no menu: `ark-landing-menu-theme-button`) |
| Abrir/fechar menu | `ark-landing-menu-button` |
| Menu aberto | `ark-landing-menu` |
