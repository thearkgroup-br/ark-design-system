Um sistema só para todas as empresas do grupo. Os componentes são os mesmos em todo lugar (site, PWA, app, painel; celular e computador); o que muda de uma marca para outra é a cor, escolhida pelo tema.

## Marcas e temas

Escolha o tema pelo atributo `data-theme` na raiz da página ou do app:

| Marca | Claro | Escuro | Cor da marca (`brand`) |
|---|---|---|---|
| The Ark Group e Arca Dev | `ark` | `ark-escuro` | preto no claro, branco no escuro |
| Íris | `iris` | `iris-escuro` | roxo |
| Pulse | `pulse` | `pulse-escuro` | laranja |

- O grupo é preto, branco e cinza. Nos materiais do grupo (LP da The Ark Group, capas, apresentações), os produtos aparecem sem a cor deles: só nome e símbolo em `ink`.
- A cor de um produto aparece só nos materiais do próprio produto (app, LP e redes da Íris, por exemplo).
- O Arca Dev usa o tema `ark` (o nome ainda está em definição).
- Toda página abre no modo claro e oferece o ThemeToggle. Guarde a escolha da pessoa no aparelho e troque `iris` ↔ `iris-escuro` (o mesmo para as outras marcas).
- Nunca escreva uma cor solta no código: use sempre os tokens (`var(--brand)`, `var(--ink)`…). É isso que faz o mesmo componente funcionar nas três marcas.

## Como escrevemos

Falamos com donos de pequenos negócios e com os clientes deles, de todas as idades, muitas vezes com pouco hábito de app.

- **Frases curtas e diretas, como alguém falaria.** "Quando fica bom?", "Tudo certo?", "Agendamento cancelado".
- **Tratamos por você.** Nada de "o usuário", "prezado cliente".
- **Botão diz o que acontece:** "Agendar horário", "Confirmar agendamento", "Sim, cancelar". Nunca "OK", "Enviar" ou "Clique aqui".
- **Erro diz como resolver:** "Digite o celular com DDD: 11 números." e não "Campo inválido". Sem pedir desculpas, sem culpar a pessoa.
- **Sem jargão:** "horário guardado", não "pré-reserva"; "faltou", não "no-show"; "link", não "URL".
- **Só fatos:** nada de números de resultado, depoimentos ou selos que a gente não pode provar. Texto ainda indefinido fica entre colchetes: "[A definir]".
- **Formatos:** datas como "Qua, 21 out · 10:00"; dinheiro "R$ 35,00"; nota "4,8"; horário "9h às 18h".
- **Maiúsculas:** só na primeira palavra de títulos e botões ("Fale com a gente"). Caixa-alta só em `label` e no nome THE ARK GROUP.
- Títulos do site terminam com ponto; botões, rótulos e selos não.
- Sem emoji na interface.

## Cores

- `bg` é o fundo da tela; tudo que é objeto (card, campo, lista, cabeçalho, sheet) é `surface`. Faixas alternadas do site usam `surface-sunken`.
- Texto principal `ink`, secundário `ink-muted`, indisponível `ink-disabled` (nunca para texto que precisa ser lido).
- `brand` em uma ação principal por tela ou seção, na aba ativa, nos rótulos de seção (Eyebrow) e nos números de listas. Não pinte áreas grandes com ela; a exceção é o card de destaque de uma seção (Card `tone="brand"`, lado "depois" do Comparison).
- Texto sobre `brand` é sempre `on-brand`; sobre `brand-soft`, `brand-ink`.
- Bordas de controle (campo, checkbox, botão secundário) usam `line-control` (3:1); divisórias usam `line`.
- Cores de status são de significado e sempre vêm com texto: `info` = Ativo, `warning` = Aguardando/prazo, `success` = Concluído/Aberto, `danger` = Não compareceu/Bloqueado/ação destrutiva.
- Todos os pares de texto passam de 4.5:1 em todos os seis temas; bordas, ícones e anel de foco passam de 3:1.

## Tipografia

Uma família para tudo: Plus Jakarta Sans (400 a 800).

- Site: `hero` no título do topo (um por página; `hero-mobile` no celular), `section` nos títulos de seção (`section-mobile` no celular), `lead` no texto de apoio do topo, `eyebrow` no rótulo entre parênteses, `stat` na faixa de destaques, `body-site` no texto corrido.
- App e painel: `title` no topo da tela, `heading` em cards e sheets, `body` no texto, `caption` no secundário, `label` em maiúsculas para separar seções, `small` em selos e abas.
- Campo de texto sempre com 16 px (evita zoom automático no iPhone).
- Títulos com `text-wrap: balance`; texto corrido com até 65 caracteres por linha.
- Os logos (THE ARK GROUP, íris) são desenhos: use o componente Logo ou os arquivos em Assets › Logos, nunca reescreva o nome em outra fonte.

## Espaço e forma

- Margem lateral: `space-5` (20 px) no app; `space-4` (16 px) no mínimo no site, dentro de `size-container` (1160 px).
- Entre cards `space-3` (app) ou `space-4` (site); entre seções do app `space-6`; respiro de seção do site `space-22` no computador e `space-16` no celular.
- Cantos: `radius-md` em campo e botão médio, `radius-lg` em card do app e botão grande, `radius-xl` em card, plano e diálogo do site e no topo do sheet, `radius-full` em botões do site (`pill`), selos, chips e avatar.
- Toque mínimo `size-touch` (44 px). Botão do rodapé do app `size-button-lg` (56 px).
- Sombra só em sobreposições: `shadow-sheet` no sheet e na tab bar, `shadow-pop` em diálogo, menu e toast. Cards não têm sombra, têm borda `line`.

## Celular e computador

Os componentes se ajustam ao espaço onde estão (não à tela inteira). Pontos de quebra: 560 px (títulos e listas), 860 px (cabeçalho do site) e 1024 px (painel).

| Situação | Celular | Computador |
|---|---|---|
| Navegação do app/painel | TabBar no rodapé + TopBar | SideNav à esquerda |
| Decisão que pede confirmação | BottomSheet | Dialog |
| Lista de dados | ListItem | Table (vira lista de cartões sozinha no estreito) |
| Cabeçalho do site | logo + botão de menu | links + ThemeToggle + botão |
| Botão principal | `size="lg"` + `block` no rodapé | tamanho do texto, à direita ou abaixo do conteúdo |
| Antes e depois, planos, cards | uma coluna | lado a lado |

- Nada rola para o lado em nenhuma tela. Listas são sempre verticais; chips e filtros quebram linha.
- Cabeçalho do site e tab bar respeitam a área segura do iPhone (`env(safe-area-inset-*)`).

## Estados

- **Foco:** anel sólido de 3 px em `focus`, com 2 px de folga, em tudo que é clicável. Nunca remova.
- **Hover (computador):** fundo `surface-sunken` em botões secundários, linhas e menus; botão primário fica um pouco mais claro.
- **Desativado:** 45% de opacidade e cursor de proibido; explique o motivo perto.
- **Carregando:** botão com `loading` ("Salvando…"); conteúdo com Skeleton no formato real (aparece após 300 ms; depois de 10 s vira mensagem com "Tentar de novo").
- **Vazio:** EmptyState com o que vai aparecer ali e uma ação.
- **Erro:** no campo, borda `danger` + ícone + texto em `danger-ink`; na tela, Alert `danger` com a saída.
- **Sem internet:** Toast "Sem conexão. Tentando de novo…" e o que já estava na tela continua visível.
- **Menos movimento:** com "reduzir movimento" ligado, brilho do skeleton, giros e transições param.

## Busca

Toda busca ignora maiúsculas, acentos e espaços extras ("joao" encontra "João"). Começa com 2 caracteres, 300 ms depois de parar de digitar.

## Ícones

Ícones de traço de 2 px, cantos arredondados, viewBox 24, em `currentColor`, entregues pelo componente Icon (lista completa no card). Sempre com texto ou `aria-label`. Nada de emoji.

## Acessibilidade e testes

- Contraste 4.5:1 no texto e 3:1 em bordas, ícones e foco, em todos os temas.
- Status nunca só por cor: sempre com palavra.
- Todo controle e todo dado que o teste confere tem `data-testid` no padrão `{marca}-{pagina}-{secao}-{elemento}`, em inglês, minúsculo e com hífen (a seção é opcional). Ex.: `iris-login-email-input`, `iris-booking-confirm-submit-button`, `iris-landing-header-theme-switch`. Os nomes das páginas e os sufixos de cada tipo ficam na skill `padrao-data-testid` do plugin do time.
- Campos sempre com `label` ligado ao `id`; o erro é lido junto (`aria-describedby`).

## Para o futuro: liquid glass

Fica combinado para quando o app nativo for feito, não agora. Hoje tudo é sólido.

- Vidro só nas camadas que ficam por cima do conteúdo: tab bar, cabeçalho fixo, sheet, menus. Nunca em cards, campos ou texto corrido.
- Fundo translúcido com desfoque sobre o conteúdo, mantendo 4.5:1 do texto em qualquer fundo que passar por baixo (teste com foto clara e escura).
- Sempre com versão sólida (`surface`) quando o aparelho pedir menos transparência ou não suportar desfoque.
- Os tokens de cor continuam os mesmos; o vidro entra como novos tokens de superfície, não como cor solta.

As regras de cada campo de formulário (limites, máscaras, mensagens) estão na seção **Regras de campos**.
