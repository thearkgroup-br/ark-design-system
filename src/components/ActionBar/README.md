# ActionBar

Barra fixa de ação no rodapé da tela, no estilo da LP de banho e tosa da Petz: frase curta, WhatsApp opcional e botão principal.

- **Sempre visível**, desde o topo da página: não aparece nem some com a rolagem (até a 0.4.0 ela dependia do botão do topo e do contato).
- **Computador:** frase à esquerda; à direita, link secundário opcional, WhatsApp (ícone e texto) e botão principal.
- **Celular de 440 a 559 px:** frase em até 2 linhas e WhatsApp só com o ícone (alvo de 44 px, nome acessível "Falar no WhatsApp") ao lado do botão principal. Sem link secundário.
- **Celular de até 439 px (inclui 360 px):** a frase não cabe ao lado do WhatsApp e do botão sem ficar cortada, então sai da vista (o leitor de tela continua lendo) e o botão principal ocupa o resto da linha, com o ícone do WhatsApp ao lado.
- **Não cobre conteúdo:** reserva no fim da página um espaço do tamanho da barra (medido ao vivo, com `safe-area-inset-bottom`), inclusive abaixo do rodapé. Ponha o componente por último na página.
- Só tokens do DS; vale nos temas claro e escuro de todas as marcas. Sem animação.

## API

| Prop | Tipo | Observação |
| --- | --- | --- |
| `message` | `string` | Frase curta (até uns 45 caracteres) |
| `primaryAction` | `{ label, href }` | Botão principal. O texto diz o que acontece |
| `secondaryAction` | `{ label, href }` | Opcional; só no computador |
| `whatsapp` | `{ href, label? }` | Opcional. Abre em nova aba. `label` padrão "WhatsApp", só no computador |
| `data-testid` | `string` | Vai na barra |

Saíram na 0.5.0 as props `triggerSelector` e `hideSelectors`.

```tsx
<ActionBar
  message="Pronto para começar?"
  primaryAction={{ label: 'Entrar na lista', href: '#contato' }}
  secondaryAction={{ label: 'Ver como funciona', href: '#como-funciona' }}
  whatsapp={{ href: 'https://wa.me/5511999999999' }}
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
| WhatsApp | `ark-landing-action-bar-whatsapp-link` |

`-bar` não está na tabela de sufixos da skill `padrao-data-testid`: é tratado como região (o id fica inteiro e a parte entra no fim).
