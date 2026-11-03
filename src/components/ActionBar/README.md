# ActionBar

Barra fixa de ação no rodapé da tela, no estilo da LP de banho e tosa da Petz: frase curta à esquerda e botão principal à direita.

- **Computador:** frase, link secundário opcional e botão principal.
- **Celular (abaixo de 560 px):** só a frase curta e o botão principal.
- **Aparece** quando o botão principal do topo (o do Hero) sai da tela por cima; **some** enquanto a seção de contato ou o rodapé estão na tela.
- **Não cobre conteúdo:** enquanto aparece, reserva no fim da página um espaço do tamanho da barra (medido ao vivo) mais `safe-area-inset-bottom`. Ponha o componente por último na página.
- Animação de 200 ms (subir e aparecer), desligada com `prefers-reduced-motion`.
- Escondida, a barra sai do foco do teclado (`visibility`, `aria-hidden` e `tabindex="-1"`).
- Só tokens do DS; vale nos temas claro e escuro de todas as marcas.
- Sem `IntersectionObserver` ou sem o elemento do gatilho na página, a barra fica escondida.

## API

| Prop | Tipo | Observação |
| --- | --- | --- |
| `message` | `string` | Frase curta (até uns 45 caracteres) |
| `primaryAction` | `{ label, href }` | Botão principal. O texto diz o que acontece |
| `secondaryAction` | `{ label, href }` | Opcional; só no computador |
| `triggerSelector` | `string` | Seletor CSS do elemento que faz a barra aparecer (ex.: `[data-testid="ark-landing-hero-primary-link"]`) |
| `hideSelectors` | `string \| string[]` | Seletor(es) do que esconde a barra (ex.: `['#contato', 'footer']`) |
| `data-testid` | `string` | Vai na barra |

```tsx
<ActionBar
  message="Pronto para começar?"
  primaryAction={{ label: 'Entrar na lista', href: '#contato' }}
  secondaryAction={{ label: 'Ver como funciona', href: '#como-funciona' }}
  triggerSelector="#topo a.ak-btn"
  hideSelectors={['#contato', 'footer']}
  data-testid="ark-landing-action-bar"
/>
```

## data-testid

| Parte | Com `ark-landing-action-bar` |
| --- | --- |
| Barra | `ark-landing-action-bar` |
| Frase | `ark-landing-action-bar-message` |
| Botão principal | `ark-landing-action-bar-primary-link` |
| Link secundário | `ark-landing-action-bar-secondary-link` |

`-bar` não está na tabela de sufixos da skill `padrao-data-testid`: é tratado como região (o id fica inteiro e a parte entra no fim).
