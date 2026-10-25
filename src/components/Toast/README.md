# Toast

Mensagem curta que some sozinha em 4 s, para confirmar uma ação.

- Até 5 palavras, no particípio: "Salvo", "Removido dos favoritos", "Lembrete ligado".
- No celular aparece acima da tab bar; no computador, no canto inferior.
- Erro que pede ação não é toast: use Alert ou Dialog.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `tone` | `'success' \| 'danger' \| 'info'` | `'success'` |
| `children` | `ReactNode` | obrigatório |
| `onClose` | `() => void` | acréscimo: chamado quando o tempo acaba |
| `duration` | `number` (ms) | acréscimo: 4000; `0` não some |
| `data-testid` | `string` | |

O Toast não se tira da tela sozinho: quando o tempo acaba ele chama `onClose` e quem usa o remove. A posição (acima da tab bar no celular, canto inferior no computador) é da tela. É lido pelo leitor de tela com `role="status"`, sem tirar o foco.

```tsx
{aviso && <Toast onClose={() => setAviso(null)} data-testid="iris-app-saved-toast">{aviso}</Toast>}
```

## data-testid

Vai no toast. Ex.: `iris-app-offline-toast`.
