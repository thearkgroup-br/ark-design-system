import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ErroDeValidacao } from '../../contato/enviar';
import type { ConfigContato } from '../../contato/validacao';
import { ContactForm, type ContactFormTexts } from './ContactForm';

const BASE = 'somma-landing-contact';
const id = (parte: string) => `${BASE}-${parte}`;

const CONFIG: ConfigContato = {
  produto: 'Somma',
  assunto: 'Somma: lista de espera',
  escolha: {
    rotulo: 'Usa a Íris?',
    obrigatoria: true,
    opcoes: [
      { valor: 'nao', rotulo: 'Ainda não' },
      { valor: 'sim', rotulo: 'Sim' },
    ],
  },
};

const TEXTOS: ContactFormTexts = {
  consent: 'Concordo em ser contatado sobre a Somma e com o uso dos meus dados para isso.',
  privacyHref: '/privacidade',
  submit: 'Entrar na lista',
  submitting: 'Entrando na lista…',
  successTitle: 'Você está na lista!',
  successText: 'Quando a Somma abrir, a gente avisa.',
  errorTitle: 'Não deu para entrar na lista agora.',
  errorText: 'Tente de novo daqui a pouco ou escreva para o nosso contato.',
  errorAction: { label: 'Escrever por e-mail', href: 'mailto:contato@thearkgroup.com.br' },
};

function montar(props: Partial<React.ComponentProps<typeof ContactForm>> = {}) {
  const enviar = vi.fn().mockResolvedValue(undefined);
  render(<ContactForm config={CONFIG} texts={TEXTOS} enviar={enviar} data-testid={BASE} {...props} />);
  return { enviar, usuario: userEvent.setup() };
}

async function preencherOk(usuario: ReturnType<typeof userEvent.setup>) {
  await usuario.type(screen.getByTestId(id('name-input')), 'Maria Souza');
  await usuario.type(screen.getByTestId(id('email-input')), 'maria@negocio.com.br');
  await usuario.selectOptions(screen.getByTestId(id('choice-select')), 'sim');
  await usuario.click(screen.getByTestId(id('terms-checkbox')));
}

describe('ContactForm', () => {
  it('mostra os campos do formulário único com ids padronizados', () => {
    montar();
    for (const parte of ['name-input', 'email-input', 'whatsapp-input', 'company-input', 'choice-select', 'message-input', 'terms-checkbox', 'website-input', 'submit-button']) {
      expect(screen.getByTestId(id(parte))).toBeInTheDocument();
    }
    expect(screen.getByTestId(id('form'))).toBeInTheDocument();
    expect(screen.getByLabelText('Usa a Íris?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Política de privacidade' })).toHaveAttribute('href', '/privacidade');
  });

  it('sem escolha na configuração, o campo não aparece', () => {
    montar({ config: { produto: 'Zenno', assunto: 'Zenno' } });
    expect(screen.queryByTestId(id('choice-select'))).not.toBeInTheDocument();
  });

  it('sem endereço da política, mostra o texto entre colchetes e sem link', () => {
    montar({ texts: { ...TEXTOS, privacyHref: undefined } });
    expect(screen.queryByRole('link', { name: 'Política de privacidade' })).not.toBeInTheDocument();
    expect(screen.getByText(/\[Política de privacidade\]/)).toBeInTheDocument();
  });

  it('enviar vazio mostra os erros dos campos e não envia', async () => {
    const { enviar, usuario } = montar();
    await usuario.click(screen.getByTestId(id('submit-button')));
    expect(screen.getByText('Digite seu nome.')).toBeInTheDocument();
    expect(screen.getByText('Confira o e-mail. Exemplo: nome@email.com')).toBeInTheDocument();
    expect(screen.getByText('Para continuar, aceite o uso dos dados.')).toBeInTheDocument();
    expect(screen.getByTestId(id('name-input'))).toHaveFocus();
    expect(enviar).not.toHaveBeenCalled();
  });

  it('o erro aparece ao sair do campo e some ao corrigir', async () => {
    const { usuario } = montar();
    await usuario.type(screen.getByTestId(id('email-input')), 'maria@');
    await usuario.tab();
    expect(screen.getByText('Confira o e-mail. Exemplo: nome@email.com')).toBeInTheDocument();
    await usuario.type(screen.getByTestId(id('email-input')), 'negocio.com.br');
    expect(screen.queryByText('Confira o e-mail. Exemplo: nome@email.com')).not.toBeInTheDocument();
  });

  it('envia os dados preparados e mostra o aviso de sucesso com o foco nele', async () => {
    const { enviar, usuario } = montar();
    await preencherOk(usuario);
    await usuario.type(screen.getByTestId(id('whatsapp-input')), '11912345678');
    await usuario.click(screen.getByTestId(id('submit-button')));
    await waitFor(() => expect(screen.getByTestId(id('success-alert'))).toBeInTheDocument());
    expect(enviar).toHaveBeenCalledWith(
      { nome: 'Maria Souza', email: 'maria@negocio.com.br', whatsapp: '11912345678', escolha: 'sim', aceite: true },
      '',
    );
    expect(screen.getByText('Você está na lista!')).toBeInTheDocument();
    expect(screen.queryByTestId(id('form'))).not.toBeInTheDocument();
  });

  it('aplica a máscara no WhatsApp enquanto digita', async () => {
    const { usuario } = montar();
    await usuario.type(screen.getByTestId(id('whatsapp-input')), '11912345678');
    expect(screen.getByTestId(id('whatsapp-input'))).toHaveValue('(11) 91234-5678');
  });

  it('campo escondido preenchido é robô: finge sucesso e não envia', async () => {
    const { enviar, usuario } = montar();
    await preencherOk(usuario);
    await usuario.type(screen.getByTestId(id('website-input')), 'http://spam');
    await usuario.click(screen.getByTestId(id('submit-button')));
    expect(screen.getByTestId(id('success-alert'))).toBeInTheDocument();
    expect(enviar).not.toHaveBeenCalled();
  });

  it('falha no envio mostra o alerta com a saída alternativa', async () => {
    const { usuario } = montar({ enviar: vi.fn().mockRejectedValue(new Error('Envio recusado (502).')) });
    await preencherOk(usuario);
    await usuario.click(screen.getByTestId(id('submit-button')));
    expect(await screen.findByTestId(id('error-alert'))).toHaveTextContent('Não deu para entrar na lista agora.');
    expect(screen.getByTestId(id('error-link'))).toHaveAttribute('href', 'mailto:contato@thearkgroup.com.br');
    expect(screen.getByTestId(id('form'))).toBeInTheDocument();
  });

  it('campo recusado pelo servidor volta ao formulário com o erro no campo', async () => {
    const { usuario } = montar({ enviar: vi.fn().mockRejectedValue(new ErroDeValidacao({ email: 'Confira o e-mail. Exemplo: nome@email.com' })) });
    await preencherOk(usuario);
    await usuario.click(screen.getByTestId(id('submit-button')));
    expect(await screen.findByText('Confira o e-mail. Exemplo: nome@email.com')).toBeInTheDocument();
    expect(screen.queryByTestId(id('error-alert'))).not.toBeInTheDocument();
  });

  it('com a chave do Turnstile e sem token, não envia e diz o motivo', async () => {
    const { enviar, usuario } = montar({ turnstileSiteKey: 'chave-publica' });
    await preencherOk(usuario);
    await usuario.click(screen.getByTestId(id('submit-button')));
    expect(await screen.findByTestId(id('verification-error'))).toHaveTextContent('Confirme a verificação acima para enviar.');
    expect(screen.getByTestId(id('verification'))).toBeInTheDocument();
    expect(enviar).not.toHaveBeenCalled();
  });

  it('o botão fica carregando enquanto envia e não deixa enviar duas vezes', async () => {
    let concluir: () => void = () => {};
    const enviar = vi.fn().mockImplementation(() => new Promise<void>((resolver) => (concluir = resolver)));
    const { usuario } = montar({ enviar });
    await preencherOk(usuario);
    await usuario.click(screen.getByTestId(id('submit-button')));
    expect(screen.getByTestId(id('submit-button'))).toHaveTextContent('Entrando na lista…');
    await usuario.click(screen.getByTestId(id('submit-button')));
    expect(enviar).toHaveBeenCalledTimes(1);
    concluir();
    await waitFor(() => expect(screen.getByTestId(id('success-alert'))).toBeInTheDocument());
  });
  it('empresa, WhatsApp e mensagem validam ao sair do campo', async () => {
    const { usuario } = montar();
    await usuario.type(screen.getByTestId(id('whatsapp-input')), '123');
    await usuario.tab();
    expect(screen.getByText('Digite o WhatsApp com DDD.')).toBeInTheDocument();
    await usuario.type(screen.getByTestId(id('company-input')), 'Studio Exemplo');
    await usuario.tab();
    await usuario.type(screen.getByTestId(id('message-input')), 'Oi, quero saber mais.');
    await usuario.tab();
    expect(screen.getByTestId(id('company-input'))).toHaveValue('Studio Exemplo');
    expect(screen.getByTestId(id('message-input'))).toHaveValue('Oi, quero saber mais.');
  });

  it('a escolha obrigatória sem resposta mostra o erro ao sair do campo', async () => {
    const { usuario } = montar();
    await usuario.click(screen.getByTestId(id('choice-select')));
    await usuario.tab();
    expect(screen.getByText('Escolha uma opção.')).toBeInTheDocument();
  });

  it('a saída alternativa externa abre em nova aba', async () => {
    const { usuario } = montar({
      enviar: vi.fn().mockRejectedValue(new Error('x')),
      texts: { ...TEXTOS, errorAction: { label: 'Chamar no WhatsApp', href: 'https://wa.me/5511900000000', external: true } },
    });
    await preencherOk(usuario);
    await usuario.click(screen.getByTestId(id('submit-button')));
    const link = await screen.findByTestId(id('error-link'));
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('aria-label', 'Chamar no WhatsApp (abre em nova aba)');
  });
});
