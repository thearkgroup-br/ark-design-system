import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';

describe('Chip', () => {
  it('sem onClick é só etiqueta e recebe o data-testid', () => {
    render(<Chip data-testid="ark-landing-segments-item">Salão de beleza</Chip>);
    const chip = screen.getByTestId('ark-landing-segments-item');
    expect(chip.tagName).toBe('SPAN');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('com onClick vira filtro com aria-pressed e recebe o data-testid', async () => {
    const onClick = vi.fn();
    render(<Chip selected={false} onClick={onClick} data-testid="iris-home-filter-today-button">Hoje</Chip>);
    const filtro = screen.getByRole('button', { name: 'Hoje' });
    expect(screen.getByTestId('iris-home-filter-today-button')).toBe(filtro);
    expect(filtro).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(filtro);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('selecionado avisa aria-pressed="true" (não só pela cor)', () => {
    render(<Chip selected onClick={() => {}}>Amanhã</Chip>);
    expect(screen.getByRole('button', { name: 'Amanhã' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('ícone fica escondido', () => {
    render(<Chip icon="filter" onClick={() => {}}>Filtros</Chip>);
    expect(screen.getByRole('button', { name: 'Filtros' }).querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('filtro funciona pelo teclado', async () => {
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>Hoje</Chip>);
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
