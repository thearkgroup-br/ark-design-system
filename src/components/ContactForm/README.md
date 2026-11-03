# ContactForm

Formulário de contato único dos sites do grupo. O que muda de um site para o outro é a `config` e os textos.

- Campos: nome, e-mail, WhatsApp (opcional, com máscara), empresa (opcional), uma pergunta de escolha (opcional, por site), mensagem (opcional) e aceite de uso dos dados (LGPD, começa desmarcado).
- Turnstile (só carrega perto da tela e só pede interação quando precisa) e campo escondido anti-robô.
- Envio por `POST /api/contato`. A Function é a mesma nos sites: `criarFuncaoDeContato(config)` valida com as mesmas regras, confere o Turnstile e manda o e-mail pelo Resend. Nunca loga dado da pessoa.
- Segredos da Function só no painel do Pages: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `CONTATO_PARA`, `CONTATO_DE`.

## API

| Prop | Tipo |
| --- | --- |
| `config` | `{ produto, assunto, escolha? }` (`escolha`: `{ rotulo, opcoes: { valor, rotulo }[], obrigatoria? }`) |
| `texts` | aceite, política, botões, sucesso, erro e a saída alternativa (`errorAction`) |
| `enviar` | ponto único do envio (padrão `enviarContato`) |
| `turnstileSiteKey` | chave pública do widget |
| `data-testid` | base (`ark-landing-contact`) |

## data-testid

A partir de `ark-landing-contact`: `-form`, `-name-input`, `-email-input`, `-whatsapp-input`, `-company-input`, `-choice-select`, `-message-input`, `-terms-checkbox`, `-website-input`, `-verification` (e `-verification-error`), `-submit-button`, `-success-alert`, `-error-alert`, `-error-link`.

## Function

```ts
// functions/api/contato.ts
import { criarFuncaoDeContato } from 'ark-design-system';
import { CONFIG_CONTATO } from '../../src/config/contato';
export const { onRequestPost } = criarFuncaoDeContato(CONFIG_CONTATO);
```
