# Dialog

Janela no centro da tela, no computador, para confirmar algo importante.

- No celular, use BottomSheet.
- Título em forma de pergunta quando pede decisão ("Cancelar o agendamento de Maria?").
- Ações à direita: secundária ("Voltar") e principal com o verbo ("Sim, cancelar").
- Fecha no X, na tecla Esc e na ação secundária; o foco volta para o botão que abriu.

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

Tocar fora **não** fecha o Dialog (para não perder uma confirmação por engano).

## data-testid

| Parte | Com `iris-appointments-cancel-dialog` |
| --- | --- |
| Painel | `iris-appointments-cancel-dialog` |
| Fechar (X) | `iris-appointments-cancel-close-button` |
| Título | `iris-appointments-cancel-title` |
| Área das ações | `iris-appointments-cancel-actions` |
| Fundo escuro | `iris-appointments-cancel-overlay` |
