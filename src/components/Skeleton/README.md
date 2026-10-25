# Skeleton

Bloco cinza com brilho que mostra o formato do conteúdo enquanto carrega.

- Todo conteúdo que vem do servidor mostra skeleton no formato real (mesma altura e cantos), nunca um spinner solto.
- Só aparece se a espera passar de 300 ms. Depois de 10 s, troque por mensagem com "Tentar de novo".
- Sem brilho quando a pessoa pediu menos movimento.

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `width`, `height` | `number \| string` | `'100%'`, 14 |
| `radius` | `number` | |
| `circle` | `boolean` | |
| `data-testid` | `string` | |

Fica escondido do leitor de tela. Quem anuncia é a área que carrega (`aria-busy="true"`).

## Quando mostrar

A regra dos 300 ms e dos 10 s fica num hook exportado:

```tsx
const estado = useEstadoDeCarregamento(carregando); // 'oculto' | 'skeleton' | 'demorou'
if (estado === 'skeleton') return <SkeletonCard variant="establishment" />;
if (estado === 'demorou') return <EmptyState title="Está demorando mais que o normal" action={<Button onClick={recarregar}>Tentar de novo</Button>} />;
```

## data-testid

Vai no bloco. Sem partes internas.
