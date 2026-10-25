# Badge

Selo curto de status ou destaque, sempre com texto.

- `status` usa os textos padrão: Ativo, Aguardando status, Concluído, Não compareceu, Cancelado, Aberto agora, Fechado, Bloqueado, Em breve, Novo.
- Cores são de significado: info = Ativo, warning = Aguardando, success = Concluído/Aberto, danger = Não compareceu/Bloqueado, neutro = Cancelado/Fechado/Em breve. `brand` só para destaque comercial ("Para equipes").
- Até 3 palavras. Nunca use selo só para enfeitar.
- `StatusBadge` continua disponível com o mesmo comportamento (nome antigo da Íris).

## API

| Prop | Tipo |
| --- | --- |
| `tone` | `'neutral' \| 'brand' \| 'info' \| 'success' \| 'warning' \| 'danger'` |
| `status` | `'ativo' \| 'concluido' \| 'cancelado' \| 'falta' \| 'pendente' \| 'aberto' \| 'fechado' \| 'bloqueado' \| 'embreve' \| 'novo'` |
| `children` | `ReactNode` (com `status`, troca só o texto) |
| `data-testid` | `string` |

## data-testid

Vai no selo. É dado que o teste lê, sem sufixo: `iris-appointments-item-status`.
