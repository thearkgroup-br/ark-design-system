import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfessionalRow } from './ProfessionalRow';

const ID = 'iris-booking-professional-item';

describe('ProfessionalRow', () => {
  it('repassa o data-testid para o radio e deriva o favoritar', () => {
    render(<ProfessionalRow name="Rafa" data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveAttribute('role', 'radio');
    expect(screen.getByTestId(ID)).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByTestId('iris-booking-professional-favorite-button')).toHaveAccessibleName('Favoritar Rafa');
  });

  it('selecionado avisa aria-checked e mostra o ponto', () => {
    render(<ProfessionalRow name="Rafa" selected />);
    const radio = screen.getByRole('radio', { name: 'Rafa' });
    expect(radio).toHaveAttribute('aria-checked', 'true');
    expect(radio.querySelector('.ak-radio-dot')).not.toBeNull();
  });

  it('clicar chama onSelect', async () => {
    const onSelect = vi.fn();
    render(<ProfessionalRow name="Rafa" subtitle="Corte e barba" onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('radio', { name: /Rafa/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Corte e barba')).toBeInTheDocument();
  });

  it('"Qualquer profissional" não tem favoritar', () => {
    render(<ProfessionalRow name="Qualquer profissional" anyone />);
    expect(screen.queryByRole('button', { name: /Favoritar/ })).not.toBeInTheDocument();
  });

  it('favorito controlado com onFavorite', async () => {
    const onFavorite = vi.fn();
    render(<ProfessionalRow name="Rafa" favorite onFavorite={onFavorite} />);
    await userEvent.click(screen.getByRole('button', { name: 'Remover Rafa' }));
    expect(onFavorite).toHaveBeenCalledWith(false);
  });
});
