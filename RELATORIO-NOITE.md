# Relatório da noite: IRIS-112

25/10/2026, das 02:45 às 04:10. Trabalhei sozinho, como você pediu. Nenhum `git push`, nenhum PR aberto, nada mexido fora deste repo e nada mexido no Jira.

## Resumo

- **Os 5 lotes estão prontos**, cada um numa branch que sai da anterior:
  - `feature/IRIS-112-lote-1-base` (13 commits)
  - `feature/IRIS-112-lote-2-formularios` (+11)
  - `feature/IRIS-112-lote-3-navegacao` (+13)
  - `feature/IRIS-112-lote-4-feedback` (+13)
  - `feature/IRIS-112-lote-5-conteudo` (+16, onde está este relatório)
  - A pilha foi reescrita na manhã de 25/10 (ver "Manhã de 25/10" abaixo). A anterior está nas branches `backup/IRIS-112-lote-*`.
- São **43 componentes**, todos com teste e README (API + data-testid). Todos estão exportados e o teste `src/index.test.ts` confere isso.
- **530 testes** verdes, lint e tipos limpos, e nenhum arquivo abaixo de 80% de cobertura. Cada lote passa sozinho: 135 testes no lote 1, 206 no 2, 320 no 3, 413 no 4 e 530 no 5. Todos os commits seguem o formato `IRIS-112 …`. Os da noite passaram por lint e testes antes de entrar; na reescrita da manhã, conferi a ponta de cada lote (testes com cobertura, lint e build).
- **60 decisões** tomadas sem você estão em `DECISOES.md`, numeradas e por lote. As que mais pesam estão listadas abaixo.
- Em cada lote rodei o mesmo ciclo:
  1. plano com o agente planejador;
  2. código e testes no padrão da skill `teste-front`;
  3. revisão do agente `typescript-reviewer`, com os achados corrigidos e commitados antes de abrir a branch seguinte;
  4. teste de tela da skill `testar-pr` na vitrine, no Chrome.

## Manhã de 25/10: versões, cobertura e data-testid

Pedidos da manhã, cada um no lote a que pertence. A pilha foi reescrita (nada tinha subido) e cada lote passa sozinho.

- **Versões (decisão 17, lote 1):** a regra é a major anterior à mais nova, desde que ainda tenha suporte oficial; se saiu de suporte, a atual. Conferido na política de cada projeto:

  | Pacote | Usada | Por quê |
  | --- | --- | --- |
  | TypeScript | 6.0.3 (anterior) | Sem política publicada; a Microsoft mantém o 6.0 para ferramentas, e o `typescript-eslint` só aceita abaixo de 6.1. |
  | Vite | 7.3.7 (anterior) | O 7.3 recebe correções importantes e de segurança. |
  | Vitest | 4.1.12 (anterior) | O 4.1 recebe correções importantes e de segurança. |
  | ESLint | **10.13.0 (atual)** | O 9 está em fim de vida desde 06/08/2026. |
  | React | 18.3.1 (anterior) | Recebe só correção de segurança. |

  O React 18 e o TypeScript 6 estão no limite do que conta como "com suporte". Está explicado na decisão 17.
- **Cobertura de 80% por arquivo (decisão 18, lote 1):** os testes que faltavam foram cada um para o seu lote. No lote 1, o desenho dos ícones. No 2, o `ref` e o nome padrão do SearchField. No 3, o clique e os modificadores na TabBar e na SideNav.
- **data-testid (decisão 9, lote 1):** o `testIdParte` bate com a skill `padrao-data-testid` 0.3.1. Os sufixos são exatamente os da tabela "Elemento" da skill: entraram `-tabbar` e `-error`. As duas tabelas da skill viraram teste. Nenhum data-testid de componente mudou.
- **`.gitignore` (decisão 16, lote 1).**

## O que ficou pronto em cada lote

| Lote | Entregue |
| --- | --- |
| 1. Base | Build de biblioteca com Vite: ESM, um CSS único `estilos.css` e tipos. Tokens dos 6 temas gerados do `tokens.json`, com teste que falha se o CSS ficar desatualizado. Fonte Plus Jakarta Sans servida pelo app (`fonte.css`, sem Google Fonts). 35 ícones e os logos SVG no pacote. Vitrine local com seletor de marca e modo escuro. Button, TextField, ThemeToggle. Testes que barram cor solta e `var(--x)` inexistente. Comandos registrados no CLAUDE.md. |
| 2. Formulários | SearchField, Select, Checkbox (com erro do aceite LGPD), Switch, Segmented. Helpers de busca: sem acento, 2 caracteres, 300 ms. IconButton (antecipado do lote 3, porque o limpar da busca precisa dele). |
| 3. Navegação | Logo (3 marcas), Icon, IconButton exportado, TopBar, TabBar, SideNav, SiteHeader (menu, Esc, tema sincronizado), Footer. |
| 4. Feedback | Alert, Toast (some em 4 s), Dialog e BottomSheet. Os dois funcionam no produto: portal, foco preso, Esc, foco volta a quem abriu, página travada. O BottomSheet também fecha arrastando e tocando fora. Skeleton, SkeletonCard (regra de 300 ms e 10 s num hook), EmptyState, Badge/StatusBadge, Chip. |
| 5. Conteúdo | Card, ListItem, Avatar, Rating (entrada por teclado), FavoriteButton, ServiceItem, ProfessionalRow, EstablishmentCard, Table (vira cartões no estreito), StatBar, Eyebrow, SectionHeader, NumberedList, Steps, Accordion, Comparison, PlanCard, PriceList. Formatos de dinheiro com ponto de milhar ("R$ 1.250,00"). |

### data-testid

Todo componente aceita `data-testid` e repassa para o elemento certo: o `input`, o `select`, o botão, o painel do diálogo. Cada componente tem teste disso. As partes internas são o id recebido sem o sufixo de tipo, mais o nome da parte. O helper é um só: `testIdParte`.

- `iris-login-email-input` → erro `iris-login-email-error`. É o par exato do exemplo da skill `padrao-data-testid`.
- `iris-appointments-cancel-dialog` → fechar `iris-appointments-cancel-close-button` (Dialog e BottomSheet).
- TabBar: `{base}-{id da aba}-tab`.
- Itens de lista: `{base}-item`, o mesmo id em todos.

**Confira a decisão 9.** Se preferir concatenar literalmente (`iris-login-email-input-error`), a mudança é só no helper.

## Decisões que mais pesam (todas em DECISOES.md)

1. **Partes do data-testid sem o sufixo de tipo** (decisão 9, acima).
2. **Dialog e BottomSheet sem `hostHeight` abrem sobre a tela** (decisão 40). Com `hostHeight` continuam como prévia. Isso muda o sentido de usar sem `hostHeight` em relação à referência. Nada consome ainda, mas vale aviso no PR.
3. **Ids fixos da referência foram trocados por derivados** (decisão 34): `topbar-voltar` → `{base}-back-button` e `tabbar-{id}` → `{base}-{id}-tab`. Quem cuida do E2E precisa saber.
4. **Duas cores fixas em `.tsx`, com teste que barra qualquer outra** (decisões 30 e 51):
   - pupila e brilho do Logo da Íris, porque o README dos logos diz que são fixas;
   - texto branco sobre a cor do negócio no EstablishmentCard, pela regra "Cor de destaque: 4.5:1 com branco".
5. **A sombra solta do Segmented virou contorno de token** (decisão 24).
6. **Acréscimos à API, nenhuma quebra.** Todos estão nos READMEs:
   - `error` no Checkbox;
   - `onClose`/`open` em Dialog/BottomSheet/Toast;
   - `onFavorite` como função;
   - `id` opcional nos links do SiteHeader/Footer;
   - `label` no Icon.
7. **Correções de bugs que vinham do `bundle.css`** (decisões 38 e 48). Todos foram achados no teste de tela:
   - o SiteHeader estourava para o lado entre 861 e 990 px;
   - o logo da Ark com o menu estourava em 320 px;
   - o ThemeToggle virava um círculo de 156 px dentro do menu;
   - o SkeletonCard de agendamento estourava em 320 px.

## O que falhou, ficou pendente ou não foi coberto

- **Não testei a instalação por git de verdade** (o `prepare` gera o `dist/`), porque não posso dar push. Testei o equivalente local: `npm pack` instalado num app de teste. Lá os tipos passam com `skipLibCheck: false`, o import traz os 58 exports e o JS não puxa CSS.
- **Leitor de tela real** (NVDA/VoiceOver) não foi usado. A acessibilidade foi conferida por testes (nomes, `aria-*`, foco, teclado), por contraste medido no navegador nos 6 temas e por teclado real no Chrome.
- **Arrastar o BottomSheet com o dedo** não foi testado num celular. Testei com pointer events no jsdom.
- A janela do Chrome não redimensionou. Simulei as larguras de 320/360/560/860/1024 px com iframes da própria vitrine.
- **Pendências registradas para depois:**
  - setas entre linhas do ProfessionalRow, que pedem um componente de grupo (decisão 52);
  - `inert` fora do diálogo aberto (decisão 42);
  - pausar o Toast com foco ou mouse (decisão 43);
  - um caso raro do `useEstadoDeCarregamento` (decisão 49);
  - a Table em modo cartão perde parte da semântica de tabela em alguns leitores de tela (documentado no README).
- **Versão**: o pacote está em 0.1.0 e não criei tag. A tag sai depois do merge na `main`.
- **A linha `.claude/settings.local.json` do `.gitignore`**, que estava sem commit na `develop`, foi commitada no lote 1 na manhã de 25/10, a seu pedido (decisão 16).
- Os erros que aparecem no console da vitrine durante o trabalho vêm do recarregamento automático do Vite, enquanto o script de commit tirava e devolvia arquivos. Recarregando a página, o console fica limpo (conferido em todos os lotes).

## Como testar de manhã

```bash
git switch feature/IRIS-112-lote-5-conteudo   # tem tudo dos 5 lotes
npm install                                    # o prepare já gera o dist/
npm test                                       # 530 testes
npm run test:coverage                          # falha se algum arquivo ficar abaixo de 80%
npm run lint                                   # ESLint + tipos
npm run vitrine                                # http://localhost:5180
npm run build                                  # dist/: index.js, estilos.css, fonte.css, tokens.json, logos/, tipos
```

Na vitrine:

1. **Topo:** troque a marca (The Ark Group, Íris, Pulse) e o modo escuro. A escolha fica guardada no navegador.
2. **TextField:** digite um celular com 10 dígitos e saia do campo. Aparece "Digite o celular com DDD: 11 números.".
3. **SearchField:** digite "salao" e veja "Salão Bela Vista".
4. **Checkbox:** envie sem marcar o aceite. Aparece "Para continuar, aceite o uso dos dados.".
5. **SiteHeader e Footer:** o cabeçalho estreito abre o menu, e o Esc fecha.
6. **Dialog e BottomSheet:** "Cancelar agendamento" abre o diálogo de verdade. Teste Tab, Shift+Tab e Esc: o foco volta ao botão.
7. **Rating:** clique numa estrela e use as setas.
8. **Table:** a versão de 360 px vira cartões.

### Sugestão de PRs (quando você quiser abrir)

Os lotes são encadeados, então dá para abrir na ordem: lote 1 → `develop`, depois lote 2 → lote 1, e assim por diante. Outra opção é um PR só do lote 5 para a `develop`. Em qualquer caso, avise no PR:

- a troca dos ids fixos `topbar-voltar` e `tabbar-*`;
- o novo sentido do `hostHeight`.

Para cada lote, o comentário de teste fica no formato da skill `testar-pr`:

- Lote 1: contraste dos 6 temas, erro ao sair do campo e um bloqueio na vitrine em 360 px, corrigido.
- Lote 2: busca normalizada e erro do aceite LGPD.
- Lote 3: 3 bloqueios herdados do `bundle.css`, corrigidos.
- Lote 4: Dialog real com foco preso e Esc; Toast de 4 s; 1 bloqueio em 320 px, corrigido.
- Lote 5: Rating pelo teclado e Table em cartões; sem bloqueios.
