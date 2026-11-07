# Changelog

Mudanças de cada versão do `ark-design-system`. Os apps instalam pela tag (`#vX.Y.Z`), criada na `main` depois do merge.

## 0.8.0

### Adicionado
- **Limite por IP na Function de contato** (IRIS-285): 5 envios a cada 10 minutos por IP, o sexto leva 429 com `Retry-After`. Com o binding opcional `CONTATO_LIMITE` (D1, plano grátis) o contador vale para todos os isolates; sem ele, ou se ele falhar, vale a memória do isolate. O D1 guarda só o resumo do IP.
- **Conferência do hostname do Turnstile**: o token resolvido em outro site passa a ser recusado (403).
- **Campo armadilha tratado na Function**: corpo com `confirmar_site` (ou `website`) preenchido recebe 200 e nada é enviado. O input do formulário usa o nome `CAMPO_ARMADILHA` (`confirmar_site`) e ganhou `data-1p-ignore` e `data-lpignore` para gerenciadores de senha não o preencherem.
- Exports `CAMPO_ARMADILHA`, `hostnameValido` e os tipos `ProtecaoContato` e `BancoD1` (nos dois pontos de entrada). Só em `ark-design-system/contato`: `criarLimitador`, `LIMITE_PADRAO`, `preencheuAArmadilha` e o tipo `Limitador`, para a Function própria de um site (a da Ark) usar o mesmo limite.

### Quebra de API
- `criarFuncaoDeContato(config)` agora é `criarFuncaoDeContato(config, protecao)`; `protecao` leva `dominios` e `projetosPages` (e, se quiser, `limite`). É obrigatório de propósito: sem a lista de hostnames não há como conferir o Turnstile. Quem tinha a guarda própria em `functions/_lib/protecao-contato.ts` pode apagá-la.
- Na 0.x a quebra sobe o número do meio.

## 0.7.0

### Adicionado
- **Entrada `ark-design-system/contato`** (ARK-20): exporta `criarFuncaoDeContato` e os tipos `Env`, `Contexto`, `ConfigContato`, `DadosDoContato`, `Escolha` e `OpcaoDeEscolha` sem nenhum import de React. As Pages Functions das LPs passam a importar daqui e deixam de levar o React (~157 kB) no bundle. Um teste confere que o grafo de imports da entrada não alcança React, hook nem componente.

### Mantido
- O índice (`ark-design-system`) segue exportando `criarFuncaoDeContato` como antes; nada quebra para quem já usa.

## 0.6.0

### Adicionado
- **Temas `mastro` e `mastro-escuro`** (ARK-25): `data-theme="mastro"` e `"mastro-escuro"`. Os neutros (bg, surface, ink, line, status etc.) são os mesmos do tema `ark`; só muda a marca:

  | Token | Claro | Escuro |
  | --- | --- | --- |
  | `brand` | #1D4ED8 | #7AA2FF |
  | `on-brand` | #FFFFFF | #0B1533 |
  | `brand-soft` | #E6EDFD | #14254A |
  | `brand-ink` | #1E3A8A | #C7D6FF |
  | `focus` | #1D4ED8 | #7AA2FF |

  Contraste conferido nos dois temas: texto (on-brand sobre brand, brand-ink sobre brand-soft, surface e bg, brand sobre bg e surface) de 5,7:1 a 13,5:1 (mínimo 4,5:1); foco, brand sobre brand-soft e borda de campo de 3,4:1 a 7,9:1 (mínimo 3:1).
- **Logo `brand="mastro"`**: mastro e vela dentro do quadrado arredondado (viewBox 48, quadrado em `brand`, traço em `on-brand`) + "mastro" em minúsculas, 800, espaçamento -0.035em. Com o tema `ark` o logo sai em preto e branco, como nos materiais do grupo.
- **Logos em arquivo:** `mastro-simbolo.svg`, `mastro-simbolo-escuro.svg`, `mastro-simbolo-preto.svg` e `mastro-simbolo-branco.svg`.
- Vitrine: seletor de marca com Mastro e logo do Mastro na seção Logo.

### Alterado
- Textos de exemplo que citavam "Arca Dev" passam a citar "Mastro" (README, vitrine e README de componentes). O `Logo` com `name` continua aceitando qualquer nome.
- O `SiteHeader` entende a marca `mastro` (nome acessível "Mastro").

### Para quem usa
- Sem quebra de API: `Marca` ganha o valor `'mastro'`.
- Para adotar: `ark-design-system#v0.6.0` no `package.json` depois que a tag existir.

## 0.5.0

### Alterado (quebra compatibilidade)
- **ActionBar** (ARK-24): a barra fica **sempre visível**, desde o topo, sem aparecer nem sumir com a rolagem. Saíram as props `triggerSelector` (era obrigatória) e `hideSelectors`, e o observador de rolagem. Quem passava essas props precisa tirá-las (no TypeScript, `triggerSelector` passa a ser erro de tipo). A reserva de espaço no fim da página continua, agora sempre ligada e do tamanho da barra (com `safe-area-inset-bottom`), inclusive abaixo do rodapé. A animação de entrada saiu junto.
- **ActionBar:** a barra ficou 8 px mais alta (4 px a mais em cima e embaixo), com a mesma tipografia.

### Adicionado
- **ActionBar, prop `whatsapp`** (`{ href, label? }`, opcional): ação de WhatsApp entre a frase e o botão principal. No computador, ícone e o texto ("WhatsApp" por padrão); no celular, só o ícone, com `aria-label` "Falar no WhatsApp" e alvo de 44 px, ao lado do botão principal. Abre em nova aba. `data-testid`: `{base}-whatsapp-link`.
- **Ícone `whatsapp`** no conjunto de ícones (agora 36). O `chat` continua sendo o balão simples.

### Decisão de layout a 360 px
- Frase, WhatsApp e botão principal não cabem juntos em 360 px sem cortar a frase (ela ficava com 56 a 140 px de largura, cortada em "app ou…"). Até 439 px de largura a frase sai da vista (continua lida pelo leitor de tela) e o botão principal ocupa o resto da linha, com o WhatsApp ao lado. De 440 a 559 px a frase aparece em até 2 linhas. Registrado também no README do componente.

### Para quem usa
- Tirar `triggerSelector` e `hideSelectors` do `<ActionBar>`. Passar `whatsapp` se a LP tiver número.
- Se o app tinha botão flutuante de WhatsApp, ele pode sair: a barra assume o papel.
- Para adotar: trocar `#v0.4.0` por `#v0.5.0` no `package.json` depois que a tag existir.

## 0.4.0

### Adicionado
- **ActionBar** (ARK-22): barra fixa de ação no rodapé da tela, no estilo da LP de banho e tosa da Petz. Frase curta à esquerda e botão principal à direita; no computador, também um link secundário opcional. Aparece quando o botão principal do topo (Hero) sai da tela e some quando a seção de contato ou o rodapé entram. Reserva espaço embaixo do tamanho da barra, respeita `safe-area-inset-bottom` e a animação some com `prefers-reduced-motion`. Props: `message`, `primaryAction`, `secondaryAction`, `triggerSelector`, `hideSelectors`. `data-testid`: `{base}`, `-message`, `-primary-link`, `-secondary-link`. Exemplo na vitrine, em "Modelo de LP".

### Alterado
- **SiteHeader** (ARK-21): no celular (abaixo de 860 px de largura do cabeçalho) o botão de tema vira um ícone de 44 px ao lado do botão do menu (logo à esquerda; tema e menu à direita). O `aria-label` diz o tema que vai ligar ("Ativar modo escuro" / "Ativar modo claro"). O menu aberto deixa de ter o botão de tema. Para o ícone caber, o botão principal passou a sair do topo e ir para o menu abaixo de 560 px (antes, 420 px). No computador nada muda.

### Para quem usa
- **Mudança de `data-testid` no SiteHeader:** `{base}-menu-theme-button` deixou de existir. No celular o tema é `{base}-mobile-theme-button`; `{base}-theme-button` continua sendo o do computador. Quem usa no E2E precisa trocar.
- O `ThemeToggle` com texto continua igual; só o SiteHeader passou a usar o ícone no celular.
- Para adotar: trocar `#v0.3.0` ou `#v0.3.1` por `#v0.4.0` no `package.json` depois que a tag existir. A 0.4.0 inclui a correção da 0.3.1.

## 0.3.1

Versão que ainda não recebeu tag: a correção chega aos apps junto com a 0.4.0.

### Corrigido
- **SiteFooter/Footer:** a coluna com link `mailto:` ocupa a linha toda em rodapé estreito (até 720 px de largura do rodapé). A 360 px, o e-mail não quebra mais no meio da palavra (ARK-19). Antes, cada LP corrigia isso no próprio CSS.

### Para quem usa
- Sem mudança de API. Quem tinha a correção no CSS do app pode apagá-la depois de adotar a v0.3.1.
- Para adotar: trocar `#v0.3.0` por `#v0.3.1` no `package.json` depois que a tag existir.

## 0.3.0

Modelo único de landing page (ARK-18): as LPs da Ark, da Íris, do Zenno e da Somma passam a montar a página com os mesmos blocos.

### Adicionado
- **Componentes novos:** `Section`, `Hero`, `StatBand`, `Faq`, `SiteFooter` e `ContactForm` (formulário de contato com a caixa `ak-contact-box`, aceita o Turnstile e recebe a função de envio).
- **Slot `logo`** no `SiteHeader` e no `Footer`: quando vem, substitui o `Logo` padrão da marca.
- **Temas `zenno` e `somma`** (claro e escuro): `data-theme="zenno"`, `"zenno-escuro"`, `"somma"` e `"somma-escuro"`.

### Para quem usa
- Sem quebra de API: o que já existia continua igual.
- Para adotar: trocar `#v0.2.2` por `#v0.3.0` no `package.json` depois que a tag existir.

## 0.2.2

### Corrigido
- **ListItem:** o `trailing` (selo, switch, valor) desce para baixo do texto quando não cabe ao lado dele. Antes o texto era espremido: a 360 px, o selo "Não compareceu" deixava a data em até 3 linhas (IRIS-128). Vale pela largura da linha, não da tela, então funciona também num cartão estreito no computador. O texto precisa de pelo menos 8rem ao lado do `trailing`: a 360 px, um valor curto ("R$ 35,00") continua ao lado, e o selo ou um valor maior ("R$ 120,00") desce. Em linha larga, nada muda.

### Para quem usa
- Sem mudança de API. O texto e o `trailing` agora ficam dentro de um `span.ak-li-main`, e o `trailing` dentro de um `span.ak-li-trailing`. Só muda algo para quem estilizava os filhos diretos de `.ak-li` no CSS do app.
- Também desce para baixo do texto, em tela estreita, o `Switch` usado como `trailing` (o rótulo dele sempre aparece).
- Para adotar: trocar `#v0.2.0` ou `#v0.2.1` por `#v0.2.2` no `package.json` depois que a tag existir.

## 0.2.0

- `data-testid` com região (IRIS-112): `-header`, `-footer`, `-nav`, `-tabbar`, `-table` e `-group` mantêm o id inteiro nas partes internas. Quebra os ids das partes de TabBar, SiteHeader, Footer, SideNav, Segmented, Table, TopBar, SectionHeader e Rating editável. Ver `DECISOES.md`, decisão 61.

## 0.1.0

- Primeira versão: tokens dos temas ark, iris e pulse (claro e escuro), base e componentes dos lotes 1 a 5 (IRIS-112).
