# BottomSheet

Painel que sobe de baixo, no celular, para decisões rápidas: aviso de limite, mesmo dia, confirmar cancelamento.

- No computador, a mesma decisão usa Dialog.
- Título diz o que aconteceu; texto em uma frase; no máximo 2 ações, a principal em cima.
- Fecha arrastando para baixo, tocando fora ou na ação secundária. Bloqueio usa `alert`.

## API

| Prop | Tipo | Observação |
| --- | --- | --- |
| `id` | `string` | obrigatório; base de `{id}-title` e `{id}-text` no DOM |
| `title`, `text` | `string` | o título é o nome do diálogo e o texto a descrição |
| `tone`, `icon` | | cor do ícone: `brand`, `warning`, `danger`, `info` |
| `alert` | `boolean` | `role="alertdialog"` |
| `actions`, `children` | `ReactNode` | a ação secundária ("Voltar") é de quem usa e chama o fechamento |
| `open` | `boolean` | acréscimo; padrão `true` |
| `onClose` | `() => void` | mostra o X e liga o Esc |
| `hostHeight` | `number` | **modo prévia**: desenha dentro de uma caixa com essa altura (vitrine, documentação) |
| `data-testid` | `string` | |

**Sem `hostHeight`** abre sobre a tela: portal no `body`, foco vai para dentro e fica preso (Tab/Shift+Tab), Esc fecha, a página atrás não rola e, ao fechar, o foco volta ao botão que abriu. Quem usa controla `open`.

O BottomSheet fecha tocando fora, arrastando a alça para baixo (mais de 80 px), no X e no Esc. Com `alert` (bloqueio) nada disso fecha: só as ações. `onClose` é acréscimo ao `index.d.ts`.

## data-testid

| Parte | Com `iris-booking-limit-sheet` |
| --- | --- |
| Painel | `iris-booking-limit-sheet` |
| Fechar (X) | `iris-booking-limit-close-button` |
| Título | `iris-booking-limit-title` |
| Área das ações | `iris-booking-limit-actions` |
| Fundo escuro (tocar fora) | `iris-booking-limit-overlay` |
| Alça de arrastar | `iris-booking-limit-grabber` |
