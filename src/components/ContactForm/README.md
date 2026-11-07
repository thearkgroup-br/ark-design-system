# ContactForm

Formulário de contato único dos sites do grupo. O que muda de um site para o outro é a `config` e os textos.

- Campos: nome, e-mail, WhatsApp (opcional, com máscara), empresa (opcional), uma pergunta de escolha (opcional, por site), mensagem (opcional) e aceite de uso dos dados (LGPD, começa desmarcado).
- Turnstile (só carrega perto da tela e só pede interação quando precisa) e campo escondido anti-robô.
- Envio por `POST /api/contato`. A Function é a mesma nos sites: `criarFuncaoDeContato(config, protecao)` limita os envios por IP, recusa quem preencheu o campo armadilha, valida com as mesmas regras, confere o Turnstile (inclusive o hostname) e manda o e-mail pelo Resend. Nunca loga dado da pessoa.
- Segredos da Function só no painel do Pages: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `CONTATO_PARA`, `CONTATO_DE`.
- Campo armadilha: o input `confirmar_site` (`CAMPO_ARMADILHA`) fica fora da tela, fora do Tab e escondido do leitor de tela (`aria-hidden`, `tabIndex=-1`). Pessoa não preenche. Na tela, preenchido vira falso sucesso sem enviar nada; na Function, qualquer corpo com `confirmar_site` (ou o antigo `website`) preenchido recebe 200 `{ ok: true }` e nada sai.
- Limite por IP: 5 envios a cada 10 minutos (muda em `protecao.limite`); o sexto leva 429 com `Retry-After`. Sem o binding `CONTATO_LIMITE` o contador fica na memória do isolate. Com ele (banco D1, plano grátis) o contador é de todos os isolates. Ver "Limite por IP" abaixo.
- Hostname do Turnstile: o `hostname` da resposta do siteverify precisa ser um de `protecao.dominios` ou do Pages do projeto (`protecao.projetosPages`); senão, 403.

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
import { criarFuncaoDeContato } from 'ark-design-system/contato';
import { CONFIG_CONTATO } from '../../src/config/contato';
export const { onRequestPost } = criarFuncaoDeContato(CONFIG_CONTATO, {
  dominios: ['agendairis.com.br', 'www.agendairis.com.br'],
  projetosPages: ['iris-landing-page', 'iris-landing-page-dev'],
});
```

### Limite por IP (binding `CONTATO_LIMITE`, opcional)

O Cloudflare grátis dá duas opções de armazenamento para contar: KV e D1. O pacote usa o **D1**: o KV é eventualmente consistente (duas regiões leem o mesmo valor velho e deixam passar) e o grátis só grava 1.000 vezes por dia; o D1 é consistente e grava 100 mil vezes por dia, o que dá folga para um formulário de contato. A memória do isolate continua como reserva: se o D1 não existir ou falhar, o limite não some (cai para ela e a falha vai para o log como `limite-sem-banco`).

1. No painel do Cloudflare: Storage & Databases → D1 → Create (nome sugerido: `contato-limite`).
2. No projeto do Pages: Settings → Bindings → Add → D1 database → nome da variável `CONTATO_LIMITE`, o banco acima (em Production e em Preview, se houver).
3. Publicar de novo o projeto. A tabela `contato_limite` é criada sozinha no primeiro envio; não há SQL a rodar.

O banco guarda só um resumo do IP (SHA-256 com o segredo do Turnstile como sal), a janela e o total. Janelas velhas são apagadas aos poucos. Como o Pages grátis não tem dado pessoal aqui, nada precisa de retenção além disso.
