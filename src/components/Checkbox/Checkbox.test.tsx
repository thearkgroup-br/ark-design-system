import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

const ID = 'ark-landing-contact-terms-checkbox';
const ERRO = 'Para continuar, aceite o uso dos dados.';

describe('Checkbox', () => {
  it('repassa o data-testid para o input', () => {
    render(<Checkbox id="aceite" label="Aceito o uso dos meus dados" data-testid={ID} />);
    const input = screen.getByTestId(ID);
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('liga o rótulo e começa desmarcado', () => {
    render(<Checkbox id="aceite" label="Aceito o uso dos meus dados" />);
    expect(screen.getByRole('checkbox', { name: 'Aceito o uso dos meus dados' })).not.toBeChecked();
  });

  it('clicar no texto marca e avisa onChange(true)', async () => {
    const onChange = vi.fn();
    render(<Checkbox id="encaixe" label="Permitir encaixe" onChange={onChange} />);
    await userEvent.click(screen.getByText('Permitir encaixe'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('Espaço alterna pelo teclado', async () => {
    render(<Checkbox id="encaixe" label="Permitir encaixe" />);
    await userEvent.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('controlado não muda sozinho', async () => {
    const onChange = vi.fn();
    render(<Checkbox id="encaixe" label="Permitir encaixe" checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('desativado não alterna', async () => {
    const onChange = vi.fn();
    render(<Checkbox id="encaixe" label="Permitir encaixe" disabled onChange={onChange} />);
    await userEvent.click(screen.getByText('Permitir encaixe'));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('liga a descrição ao campo', () => {
    render(<Checkbox id="encaixe" label="Permitir encaixe" description="O cliente pode marcar entre dois horários." data-testid="iris-settings-fit-in-checkbox" />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('O cliente pode marcar entre dois horários.');
    expect(screen.getByTestId('iris-settings-fit-in-description')).toBeInTheDocument();
  });

  it('mostra o erro do aceite de dados com ícone, ligado ao campo e com id derivado', () => {
    render(<Checkbox id="aceite" label="Aceito o uso dos meus dados" description="Usamos só para responder você." error={ERRO} data-testid={ID} />);
    const input = screen.getByTestId(ID);
    const erro = screen.getByTestId('ark-landing-contact-terms-error');
    expect(erro).toHaveTextContent(ERRO);
    expect(erro.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription(`Usamos só para responder você. ${ERRO}`);
  });

  it('aceita rótulo com link (política de privacidade)', () => {
    render(<Checkbox id="aceite" label={<>Aceito a <a href="/privacidade">política de privacidade</a></>} />);
    expect(screen.getByRole('checkbox', { name: 'Aceito a política de privacidade' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'política de privacidade' })).toHaveAttribute('href', '/privacidade');
  });

  it('repassa obrigatório e name', () => {
    render(<Checkbox id="aceite" label="Aceito" required name="aceite" />);
    expect(screen.getByRole('checkbox')).toBeRequired();
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'aceite');
  });
});
