import { useEffect, useRef, type ReactNode } from 'react';
import { enviarContato, type EnviarContato } from '../../contato/enviar';
import { CAMPO_ARMADILHA } from '../../contato/protecao';
import { formatarWhatsapp } from '../../contato/mascara';
import { ID_DO_CAMPO, useContato } from '../../contato/useContato';
import { EMAIL_MAXIMO, EMPRESA_MAXIMO, MENSAGEM_MAXIMO, NOME_MAXIMO, type ConfigContato } from '../../contato/validacao';
import { testIdParte, type TestIdProps } from '../../utils';
import { Alert } from '../Alert/Alert';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Icon } from '../Icon/Icon';
import { Select } from '../Select/Select';
import { TextField } from '../TextField/TextField';

export interface ContactFormTexts {
  /** Frase do aceite (LGPD), sem a política: ela é acrescentada no fim. */
  consent: ReactNode;
  /** Endereço da política de privacidade. Sem ele, o texto aparece entre colchetes e sem link. */
  privacyHref?: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successText: string;
  errorTitle: string;
  errorText: string;
  /** Saída quando o envio falha: e-mail ou WhatsApp. */
  errorAction: { label: string; href: string; external?: boolean };
  /** Título do formulário (h3), se houver. */
  title?: string;
}

export interface ContactFormProps extends TestIdProps {
  config: ConfigContato;
  texts: ContactFormTexts;
  /** Ponto único do envio. Padrão: POST /api/contato. */
  enviar?: EnviarContato;
  /** Site key do Turnstile (pública). Sem ela, a verificação não carrega e o servidor recusa o envio. */
  turnstileSiteKey?: string;
}

/**
 * Formulário de contato único dos sites do grupo: nome, e-mail, WhatsApp, empresa, uma pergunta de escolha (opcional por site),
 * mensagem, aceite de uso dos dados (LGPD), verificação Turnstile e campo escondido anti-robô.
 * Ids (a partir de `{base}`): `-form`, `-name-input`, `-email-input`, `-whatsapp-input`, `-company-input`, `-choice-select`,
 * `-message-input`, `-terms-checkbox`, `-website-input`, `-verification`, `-submit-button`, `-success-alert`, `-error-alert`, `-error-link`.
 */
export function ContactForm({ config, texts, enviar = enviarContato, turnstileSiteKey, 'data-testid': testId }: ContactFormProps) {
  const { valores, erros, estado, armadilha, setArmadilha, mudar, sair, submeter, caixaDaVerificacao, erroDaVerificacao } = useContato(
    enviar,
    config,
    turnstileSiteKey,
  );
  const aviso = useRef<HTMLDivElement>(null);
  const id = (parte: string) => testIdParte(testId, parte);

  // No sucesso o formulário some: o foco vai para a mensagem, para não se perder. O erro é lido pelo role="alert" do Alert.
  useEffect(() => {
    if (estado === 'sucesso') aviso.current?.focus();
  }, [estado]);

  if (estado === 'sucesso') {
    return (
      <div ref={aviso} tabIndex={-1} className="ak-contact-notice">
        <Alert tone="success" title={texts.successTitle} data-testid={id('success-alert')}>
          {texts.successText}
        </Alert>
      </div>
    );
  }

  const politica = texts.privacyHref ? <a href={texts.privacyHref}>Política de privacidade</a> : '[Política de privacidade]';
  const { escolha } = config;

  return (
    <form className="ak-contact" noValidate method="post" onSubmit={submeter} aria-label={texts.title ?? 'Contato'} data-testid={id('form')}>
      {texts.title && <h3 className="ak-contact-title">{texts.title}</h3>}
      <TextField
        id={ID_DO_CAMPO.nome}
        name="nome"
        label="Seu nome"
        autoComplete="name"
        maxLength={NOME_MAXIMO}
        value={valores.nome}
        error={erros.nome}
        onChange={(e) => mudar('nome', e.target.value)}
        onBlur={() => sair('nome')}
        data-testid={id('name-input')}
      />
      <TextField
        id={ID_DO_CAMPO.email}
        name="email"
        label="E-mail"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="nome@email.com"
        maxLength={EMAIL_MAXIMO}
        value={valores.email}
        error={erros.email}
        onChange={(e) => mudar('email', e.target.value)}
        onBlur={() => sair('email')}
        data-testid={id('email-input')}
      />
      <TextField
        id={ID_DO_CAMPO.whatsapp}
        name="whatsapp"
        label="WhatsApp"
        optional
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="(11) 91234-5678"
        value={valores.whatsapp}
        error={erros.whatsapp}
        onChange={(e) => mudar('whatsapp', formatarWhatsapp(e.target.value))}
        onBlur={() => sair('whatsapp')}
        data-testid={id('whatsapp-input')}
      />
      <TextField
        id={ID_DO_CAMPO.empresa}
        name="empresa"
        label="Empresa"
        optional
        autoComplete="organization"
        maxLength={EMPRESA_MAXIMO}
        value={valores.empresa}
        error={erros.empresa}
        onChange={(e) => mudar('empresa', e.target.value)}
        onBlur={() => sair('empresa')}
        data-testid={id('company-input')}
      />
      {escolha && (
        <Select
          id={ID_DO_CAMPO.escolha}
          name="escolha"
          label={escolha.rotulo}
          placeholder="Escolha uma opção"
          options={escolha.opcoes.map((opcao) => ({ value: opcao.valor, label: opcao.rotulo }))}
          value={valores.escolha}
          error={erros.escolha}
          onChange={(e) => mudar('escolha', e.target.value)}
          onBlur={() => sair('escolha')}
          data-testid={id('choice-select')}
        />
      )}
      <TextField
        id={ID_DO_CAMPO.mensagem}
        name="mensagem"
        label="Conte rapidinho"
        optional
        multiline
        maxLength={MENSAGEM_MAXIMO}
        showCount
        value={valores.mensagem}
        error={erros.mensagem}
        onChange={(e) => mudar('mensagem', e.target.value)}
        onBlur={() => sair('mensagem')}
        data-testid={id('message-input')}
      />
      {/* Anti-spam: campo fora da tela e fora do Tab. Pessoa não vê; robô preenche. */}
      <div className="ak-contact-trap" aria-hidden="true">
        <label htmlFor="contato-site">Seu site</label>
        <input
          id="contato-site"
          name={CAMPO_ARMADILHA}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          value={armadilha}
          onChange={(e) => setArmadilha(e.target.value)}
          data-testid={id('website-input')}
        />
      </div>
      <Checkbox
        id={ID_DO_CAMPO.aceite}
        name="aceite"
        label={
          <>
            {texts.consent} Veja a {politica}.
          </>
        }
        checked={valores.aceite}
        error={erros.aceite}
        onChange={(marcado) => mudar('aceite', marcado)}
        onBlur={() => sair('aceite')}
        data-testid={id('terms-checkbox')}
      />
      {/* Turnstile: só aparece quando precisa que a pessoa confirme (appearance interaction-only). */}
      {turnstileSiteKey && <div ref={caixaDaVerificacao} className="ak-contact-verification" data-testid={id('verification')} />}
      {/* Sem o token, o envio não sai: o motivo aparece como o erro de um campo (ícone + texto). */}
      {erroDaVerificacao && (
        <span className="ak-error" role="alert" data-testid={id('verification-error')}>
          <Icon name="alert" size={16} />
          <span>{erroDaVerificacao}</span>
        </span>
      )}
      {estado === 'erro' && (
        <div className="ak-contact-notice">
          <Alert
            tone="danger"
            title={texts.errorTitle}
            action={
              <Button
                href={texts.errorAction.href}
                {...(texts.errorAction.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                variant="secondary"
                size="sm"
                pill
                aria-label={texts.errorAction.external ? `${texts.errorAction.label} (abre em nova aba)` : texts.errorAction.label}
                data-testid={id('error-link')}
              >
                {texts.errorAction.label}
              </Button>
            }
            data-testid={id('error-alert')}
          >
            {texts.errorText}
          </Alert>
        </div>
      )}
      <Button type="submit" size="lg" block pill loading={estado === 'enviando'} loadingText={texts.submitting} data-testid={id('submit-button')}>
        {texts.submit}
      </Button>
    </form>
  );
}
