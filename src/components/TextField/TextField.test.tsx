import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { TextField } from './TextField';

const ID = 'iris-signup-phone-input';

describe('TextField', () => {
  it('repassa o data-testid para o input, não para a div em volta', () => {
    render(<TextField id="celular" label="Celular" data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('INPUT');
  });

  it('liga o rótulo ao campo', () => {
    render(<TextField id="celular" label="Celular" />);
    expect(screen.getByLabelText('Celular')).toHaveAttribute('id', 'celular');
  });

  it('mostra "(opcional)" só quando o campo é opcional', () => {
    const { rerender } = render(<TextField id="empresa" label="Empresa" />);
    expect(screen.queryByText('(opcional)')).not.toBeInTheDocument();
    rerender(<TextField id="empresa" label="Empresa" optional />);
    expect(screen.getByLabelText('Empresa (opcional)')).toBeInTheDocument();
  });

  it('liga a dica ao campo por aria-describedby', () => {
    render(<TextField id="celular" label="Celular" hint="Com DDD" data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveAccessibleDescription('Com DDD');
    expect(screen.getByTestId('iris-signup-phone-hint')).toHaveTextContent('Com DDD');
  });

  it('mostra o erro com ícone e texto, ligado ao campo, e esconde a dica', () => {
    render(
      <TextField id="celular" label="Celular" hint="Com DDD" error="Digite o celular com DDD: 11 números." data-testid={ID} />,
    );
    const campo = screen.getByTestId(ID);
    const erro = screen.getByTestId('iris-signup-phone-error');
    expect(erro).toHaveTextContent('Digite o celular com DDD: 11 números.');
    expect(erro.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(campo).toHaveAttribute('aria-invalid', 'true');
    expect(campo).toHaveAccessibleDescription('Digite o celular com DDD: 11 números.');
    expect(screen.queryByText('Com DDD')).not.toBeInTheDocument();
  });

  it('sem erro não marca o campo como inválido nem cria a parte de erro', () => {
    render(<TextField id="celular" label="Celular" data-testid={ID} />);
    expect(screen.getByTestId(ID)).not.toHaveAttribute('aria-invalid');
    expect(screen.queryByTestId('iris-signup-phone-error')).not.toBeInTheDocument();
  });

  it('conta os caracteres quando tem maxLength e showCount', async () => {
    render(<TextField id="msg" label="Mensagem" maxLength={500} showCount data-testid="ark-landing-contact-message-input" />);
    const contador = screen.getByTestId('ark-landing-contact-message-count');
    expect(contador).toHaveTextContent('0/500');
    expect(contador).toHaveAttribute('aria-live', 'polite');
    await userEvent.type(screen.getByLabelText('Mensagem'), 'Oi');
    expect(contador).toHaveTextContent('2/500');
  });

  it('não mostra contador sem showCount', () => {
    render(<TextField id="msg" label="Mensagem" maxLength={500} />);
    expect(screen.queryByText('0/500')).not.toBeInTheDocument();
  });

  it('com multiline vira textarea e recebe o data-testid', () => {
    render(<TextField id="msg" label="Mensagem" multiline data-testid="ark-landing-contact-message-input" />);
    const campo = screen.getByTestId('ark-landing-contact-message-input');
    expect(campo.tagName).toBe('TEXTAREA');
    expect(campo).not.toHaveAttribute('type');
  });

  it('funciona sem controle: guarda o texto e chama onChange com o evento', async () => {
    const onChange = vi.fn();
    render(<TextField id="nome" label="Seu nome" defaultValue="Ma" onChange={onChange} />);
    const campo = screen.getByLabelText('Seu nome');
    await userEvent.type(campo, 'ria');
    expect(campo).toHaveValue('Maria');
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange.mock.calls[2][0].target.value).toBe('Maria');
  });

  it('funciona controlado', async () => {
    function Controlado() {
      const [valor, setValor] = useState('');
      return <TextField id="nome" label="Seu nome" value={valor} onChange={(e) => setValor(e.target.value.toUpperCase())} />;
    }
    render(<Controlado />);
    await userEvent.type(screen.getByLabelText('Seu nome'), 'ana');
    expect(screen.getByLabelText('Seu nome')).toHaveValue('ANA');
  });

  it('repassa tipo, teclado, autocomplete, obrigatório e desativado ao input', () => {
    render(<TextField id="celular" label="Celular" type="tel" inputMode="tel" autoComplete="tel" required disabled />);
    const campo = screen.getByLabelText('Celular');
    expect(campo).toHaveAttribute('type', 'tel');
    expect(campo).toHaveAttribute('inputmode', 'tel');
    expect(campo).toHaveAttribute('autocomplete', 'tel');
    expect(campo).toBeRequired();
    expect(campo).toBeDisabled();
  });

  it('respeita o maxLength ao digitar', async () => {
    render(<TextField id="cod" label="Código de acesso" maxLength={6} />);
    await userEvent.type(screen.getByLabelText('Código de acesso'), '12345678');
    expect(screen.getByLabelText('Código de acesso')).toHaveValue('123456');
  });

  it('recebe foco pelo teclado', async () => {
    render(<TextField id="nome" label="Seu nome" />);
    await userEvent.tab();
    expect(screen.getByLabelText('Seu nome')).toHaveFocus();
  });
});
