# Button

Botão de uma ação. `primary` é a ação principal (uma por tela ou por seção do site); `secondary` e `ghost` são de apoio; `soft` é uma ação leve da marca; `danger` só confirma algo destrutivo e `danger-outline` abre esse caminho (ex.: "Cancelar agendamento").

**Texto do botão**
- É o verbo do que acontece: "Agendar horário", "Confirmar agendamento", "Sim, cancelar", "Salvar alterações". Nunca "OK", "Enviar" ou "Clique aqui".
- Até 3 palavras; começa com letra maiúscula, sem ponto final.
- Botão de carregamento diz o que está acontecendo: "Confirmando…", "Salvando…".

**Uso**
- App: `size="lg"` + `block` no botão fixo do rodapé (celular). No computador, o botão não ocupa a largura toda.
- Site: `pill` (cantos redondos) em todos os botões.
- `loading` desabilita o botão e evita clique duplo.
- `disabled` só quando a ação não é possível; explique o motivo perto do botão.
- Com `href` vira link com o mesmo visual. Link com `disabled` ou `loading` perde o `href` e recebe `aria-disabled="true"`.
- Altura mínima 44 px em qualquer tamanho tocável; `sm` (36 px) só no computador, em tabelas e barras de filtro.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'soft' \| 'danger' \| 'danger-outline'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `block` | `boolean` | |
| `pill` | `boolean` | |
| `loading` | `boolean` | |
| `loadingText` | `string` | `'Carregando…'` |
| `href` | `string` | |
| `iconLeft`, `iconRight` | nome de ícone | |
| `data-testid` | `string` | |

Aceita também todos os atributos de `<button>` e repassa a `ref`.

## data-testid

Vai no `<button>` (ou no `<a>` quando há `href`). Ex.: `iris-booking-confirm-submit-button`.

```tsx
<Button size="lg" block loading={enviando} loadingText="Confirmando…" data-testid="iris-booking-confirm-submit-button">
  Confirmar agendamento
</Button>
```
