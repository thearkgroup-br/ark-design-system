import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoriteButton } from './FavoriteButton';

const ID = 'iris-business-favorite-button';

describe('FavoriteButton', () => {
  it('repassa o data-testid e começa desmarcado com nome "Favoritar …"', () => {
    render(<FavoriteButton label="Barbearia do Bairro" data-testid={ID} />);
    const botao = screen.getByTestId(ID);
    expect(botao).toHaveAttribute('aria-pressed', 'false');
    expect(botao).toHaveAccessibleName('Favoritar Barbearia do Bairro');
  });

  it('ao tocar vira "Remover …", preenche o coração e avisa onToggle', async () => {
    const onToggle = vi.fn();
    render(<FavoriteButton label="Barbearia do Bairro" onToggle={onToggle} data-testid={ID} />);
    await userEvent.click(screen.getByTestId(ID));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(screen.getByTestId(ID)).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId(ID)).toHaveAccessibleName('Remover Barbearia do Bairro');
    expect(screen.getByTestId(ID).querySelector('svg')).toHaveAttribute('fill', 'currentColor');
  });

  it('sem label usa "este item"', () => {
    render(<FavoriteButton />);
    expect(screen.getByRole('button', { name: 'Favoritar este item' })).toBeInTheDocument();
  });

  it('controlado não muda sozinho', async () => {
    const onToggle = vi.fn();
    render(<FavoriteButton active onToggle={onToggle} label="Corte" />);
    await userEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(false);
    expect(screen.getByRole('button', { name: 'Remover Corte' })).toBeInTheDocument();
  });
});
