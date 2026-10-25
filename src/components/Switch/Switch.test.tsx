import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

const ID = 'iris-settings-reminder-day-before-switch';

describe('Switch', () => {
  it('repassa o data-testid para o botão com role switch', () => {
    render(<Switch id="lembrete" label="Lembrete 1 dia antes" data-testid={ID} />);
    const sw = screen.getByTestId(ID);
    expect(sw.tagName).toBe('BUTTON');
    expect(sw).toHaveAttribute('role', 'switch');
    expect(sw).toHaveAttribute('type', 'button');
  });

  it('tem o rótulo como nome e começa desligado', () => {
    render(<Switch id="lembrete" label="Lembrete 1 dia antes" />);
    expect(screen.getByRole('switch', { name: 'Lembrete 1 dia antes' })).toHaveAttribute('aria-checked', 'false');
  });

  it('clicar liga e avisa onChange(true)', async () => {
    const onChange = vi.fn();
    render(<Switch id="lembrete" label="Lembrete 1 dia antes" onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('Enter e Espaço alternam pelo teclado', async () => {
    const onChange = vi.fn();
    render(<Switch id="lembrete" label="Lembrete 1 dia antes" onChange={onChange} />);
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenNthCalledWith(1, true);
    expect(onChange).toHaveBeenNthCalledWith(2, false);
  });

  it('começa ligado com defaultChecked e controlado não muda sozinho', async () => {
    const onChange = vi.fn();
    const { rerender } = render(<Switch id="a" label="Avisos" defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    rerender(<Switch id="b" label="Avisos" checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('desativado não alterna', async () => {
    const onChange = vi.fn();
    render(<Switch id="lembrete" label="Lembrete 1 dia antes" disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('liga a descrição ao switch, com id derivado', () => {
    render(<Switch id="lembrete" label="Lembrete 1 dia antes" description="Mandamos uma mensagem na véspera." data-testid={ID} />);
    expect(screen.getByRole('switch')).toHaveAccessibleDescription('Mandamos uma mensagem na véspera.');
    expect(screen.getByTestId('iris-settings-reminder-day-before-description')).toBeInTheDocument();
  });
});
