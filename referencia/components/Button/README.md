# Button

Botão de uma ação. `primary` é a ação principal (uma por tela ou por seção do site); `secondary` e `ghost` são de apoio; `danger` só confirma algo destrutivo.

**Texto do botão**
- É o verbo do que acontece: "Agendar horário", "Confirmar agendamento", "Sim, cancelar", "Salvar alterações". Nunca "OK", "Enviar" ou "Clique aqui".
- Até 3 palavras; começa com letra maiúscula, sem ponto final.
- Botão de carregamento diz o que está acontecendo: "Confirmando…", "Salvando…".

**Uso**
- App: `size="lg"` + `block` no botão fixo do rodapé (celular). No computador, o botão não ocupa a largura toda.
- Site: `pill` (cantos redondos) em todos os botões.
- `loading` desabilita o botão e evita clique duplo.
- `disabled` só quando a ação não é possível; explique o motivo perto do botão.
- Com `href` vira link com o mesmo visual.
- Altura mínima 44 px em qualquer tamanho tocável; `sm` (36 px) só no computador, em tabelas e barras de filtro.
