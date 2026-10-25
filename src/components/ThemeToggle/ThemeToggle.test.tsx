import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

const ID = 'iris-landing-header-theme-switch';

describe('ThemeToggle', () => {
  it('repassa o data-testid para o botão', () => {
    render(<ThemeToggle data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('BUTTON');
  });

  it('começa no modo claro, oferecendo "Modo escuro"', () => {
    render(<ThemeToggle data-testid={ID} />);
    const botao = screen.getByTestId(ID);
    expect(botao).toHaveTextContent('Modo escuro');
    expect(botao).toHaveAttribute('aria-pressed', 'false');
    expect(botao.querySelector('svg')).toHaveAttribute('data-icon', 'moon');
  });

  it('ao clicar passa para o escuro, oferece "Modo claro" e avisa onChange(true)', async () => {
    const onChange = vi.fn();
    render(<ThemeToggle data-testid={ID} onChange={onChange} />);
    await userEvent.click(screen.getByTestId(ID));
    const botao = screen.getByTestId(ID);
    expect(botao).toHaveTextContent('Modo claro');
    expect(botao).toHaveAttribute('aria-pressed', 'true');
    expect(botao.querySelector('svg')).toHaveAttribute('data-icon', 'sun');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('começa no escuro com defaultDark', () => {
    render(<ThemeToggle defaultDark />);
    expect(screen.getByRole('button', { name: 'Modo claro' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('controlado não troca sozinho, só avisa', async () => {
    const onChange = vi.fn();
    render(<ThemeToggle dark={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button')).toHaveTextContent('Modo escuro');
  });

  it('funciona pelo teclado com Enter e Espaço', async () => {
    const onChange = vi.fn();
    render(<ThemeToggle onChange={onChange} />);
    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenNthCalledWith(1, true);
    expect(onChange).toHaveBeenNthCalledWith(2, false);
  });
});
