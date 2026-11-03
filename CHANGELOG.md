# Changelog

Mudanças de cada versão do `ark-design-system`. Os apps instalam pela tag (`#vX.Y.Z`), criada na `main` depois do merge.

## 0.3.1

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
