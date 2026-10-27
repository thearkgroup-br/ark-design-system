# Changelog

Mudanças de cada versão do `ark-design-system`. Os apps instalam pela tag (`#vX.Y.Z`), criada na `main` depois do merge.

## 0.2.1

### Corrigido
- **ListItem:** o `trailing` (selo, switch, valor) desce para baixo do texto quando não cabe ao lado dele. Antes o texto era espremido: a 360 px, o selo "Não compareceu" deixava a data em até 3 linhas (IRIS-128). Vale pela largura da linha, não da tela, então funciona também num cartão estreito no computador. O texto precisa de pelo menos 8rem ao lado do `trailing`: a 360 px, um valor curto ("R$ 35,00") continua ao lado, e o selo ou um valor maior ("R$ 120,00") desce. Em linha larga, nada muda.

### Para quem usa
- Sem mudança de API. O texto e o `trailing` agora ficam dentro de um `span.ak-li-main`, e o `trailing` dentro de um `span.ak-li-trailing`. Só muda algo para quem estilizava os filhos diretos de `.ak-li` no CSS do app.
- Também desce para baixo do texto, em tela estreita, o `Switch` usado como `trailing` (o rótulo dele sempre aparece).
- Para adotar: trocar `#v0.2.0` por `#v0.2.1` no `package.json` depois que a tag existir.

## 0.2.0

- `data-testid` com região (IRIS-112): `-header`, `-footer`, `-nav`, `-tabbar`, `-table` e `-group` mantêm o id inteiro nas partes internas. Quebra os ids das partes de TabBar, SiteHeader, Footer, SideNav, Segmented, Table, TopBar, SectionHeader e Rating editável. Ver `DECISOES.md`, decisão 61.

## 0.1.0

- Primeira versão: tokens dos temas ark, iris e pulse (claro e escuro), base e componentes dos lotes 1 a 5 (IRIS-112).
