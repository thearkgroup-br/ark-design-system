# Relatório: regiões no data-testid (IRIS-112)

25/10/2026. Branch `feature/IRIS-112-regioes-testid`, saindo da `develop` (`fb5bdb2`). Commits locais, **sem push** e sem PR aberto.

## O que foi feito

- `testIdParte` segue a skill `padrao-data-testid` 0.3.2: controle perde o sufixo; região (`-header`, `-footer`, `-nav`, `-tabbar`, `-table`, `-group`) mantém o id inteiro.
- A tabela "Partes internas" da skill virou teste, inteira, mais um teste por sufixo de controle e por sufixo de região.
- Testes e README dos componentes afetados atualizados, com o id antigo anotado para o E2E.
- Versão `0.2.0` no `package.json` e no `package-lock.json`. Instalação no README da raiz aponta para `#v0.2.0`.
- Decisão 61 no `DECISOES.md`. A decisão 9 ganhou o aviso de que foi substituída em parte.

## Conferido

| Verificação | Resultado |
| --- | --- |
| `npm test` | 45 arquivos, 535 testes, todos verdes (eram 530) |
| `npm run test:coverage` | passa; nenhum arquivo abaixo de 80% (total: 97,8% linhas, 96,2% branches, 100% funções) |
| `npm run lint` | limpo (ESLint e `tsc`) |
| `npm run build` | ok |

A vitrine não foi aberta no navegador: a mudança é só no valor do `data-testid`, sem efeito visual.

## Pontos para você decidir

1. **Mais três componentes mudam, além dos seis pedidos.** TopBar, SectionHeader e Rating (entrada) recebem id terminado em `-header`/`-group` nos exemplos e nos testes, então os ids das partes deles também mudam. Atualizei os README e os testes dos três. Se o time preferir que TopBar e SectionHeader recebam id de outro tipo, é só trocar o exemplo.
2. **`-tab`, `-item` e `-error` continuam perdendo o sufixo.** Estão na tabela "Elemento" da skill, mas a regra das "Partes internas" não cita os três em nenhum dos dois grupos. Como não são região, ficaram como controle, como já eram. Vale confirmar com quem cuida da skill.
3. **Versão 0.2.0 e não 1.0.0.** O CLAUDE.md manda subir a "versão maior" em quebra de API; na 0.x a convenção é subir o número do meio, e foi o pedido.
4. **Tag `v0.2.0`**: só depois do merge na `main`, como manda o CLAUDE.md. Não criei.

## Comentário pronto para o PR

```markdown
## IRIS-112: data-testid de região mantém o id inteiro (0.2.0)

O `testIdParte` passa a seguir a skill `padrao-data-testid` 0.3.2:

- **Controle ou peça única** (`-input`, `-button`, `-dialog`, `-list`…): perde o sufixo e ganha a parte. Não muda nada.
- **Região** (`-header`, `-footer`, `-nav`, `-tabbar`, `-table`, `-group`): **mantém o id inteiro** e ganha a parte. Assim o mesmo link no cabeçalho e no rodapé não gera mais o mesmo id.

A tabela "Partes internas" da skill virou teste (`src/utils/testid.test.ts`).

### Quebra de contrato: avisar quem cuida do E2E

O id do elemento principal não muda. Mudam as partes internas dos componentes que recebem id de região:

| Componente | Com o id | Antes (0.1.0) | Agora (0.2.0) |
| --- | --- | --- | --- |
| TabBar | `iris-app-main-tabbar` | `iris-app-main-home-tab` | `iris-app-main-tabbar-home-tab` |
| SiteHeader | `ark-landing-header` | `ark-landing-plans-link`, `ark-landing-menu-button`… | `ark-landing-header-plans-link`, `ark-landing-header-menu-button`… |
| Footer | `ark-landing-footer` | `ark-landing-link`, `ark-landing-legal` | `ark-landing-footer-link`, `ark-landing-footer-legal` |
| SideNav | `iris-app-side-nav` | `iris-app-side-schedule-link` | `iris-app-side-nav-schedule-link` |
| Segmented | `iris-schedule-view-group` | `iris-schedule-view-day-button` | `iris-schedule-view-group-day-button` |
| Table | `iris-schedule-day-table` | `iris-schedule-day-row` | `iris-schedule-day-table-row` |
| TopBar | `iris-booking-header` | `iris-booking-back-button` | `iris-booking-header-back-button` |
| SectionHeader | `ark-landing-audience-header` | `ark-landing-audience-title` | `ark-landing-audience-header-title` |
| Rating (entrada) | `iris-review-score-group` | `iris-review-score-star` | `iris-review-score-group-star` |

A tabela completa de cada um está no README do componente.

Por ser quebra, a versão sobe para **0.2.0**. Depois do merge na `main`, criar a tag `v0.2.0`. Os consumidores (`iris-pwa`, `iris-landing-page`, `ark-landing-page`) trocam a dependência para `#v0.2.0` e ajustam os seletores.

### Pontos em aberto
- `-tab`, `-item` e `-error` seguem perdendo o sufixo: estão na tabela "Elemento" da skill, mas a regra das "Partes internas" não diz em qual grupo entram. Confirmar com quem cuida da skill.

### Como foi testado
- `npm test`: 535 testes verdes.
- `npm run test:coverage`: nenhum arquivo abaixo de 80%.
- `npm run lint` e `npm run build`: limpos.

Decisão registrada no `DECISOES.md` (61).
```
