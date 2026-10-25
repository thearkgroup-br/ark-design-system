import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceItem } from './ServiceItem';

const ID = 'iris-booking-services-item';

describe('ServiceItem', () => {
  it('repassa o data-testid para o botão de marcar (role checkbox) e deriva o favoritar', () => {
    render(<ServiceItem name="Corte masculino" duration="40 min" price={35} data-testid={ID} />);
    const item = screen.getByTestId(ID);
    expect(item).toHaveAttribute('role', 'checkbox');
    expect(item).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByTestId('iris-booking-services-favorite-button')).toHaveAccessibleName('Favoritar Corte masculino');
  });

  it('mostra duração e preço no formato R$ 35,00; "a partir de" quando varia', () => {
    const { rerender } = render(<ServiceItem name="Corte" duration="40 min" price={35} data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveTextContent('40 min');
    expect(screen.getByTestId(ID)).toHaveTextContent('R$ 35,00');
    expect(screen.getByTestId(ID)).not.toHaveTextContent('a partir de');
    rerender(<ServiceItem name="Coloração" duration="2 h" price={1250} priceFrom data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveTextContent('a partir deR$ 1.250,00');
  });

  it('clicar ou Espaço marca e avisa onToggle', async () => {
    const onToggle = vi.fn();
    render(<ServiceItem name="Corte" duration="40 min" price={35} onToggle={onToggle} />);
    const item = screen.getByRole('checkbox', { name: /Corte/ });
    await userEvent.click(item);
    expect(item).toHaveAttribute('aria-checked', 'true');
    await userEvent.keyboard(' ');
    expect(onToggle).toHaveBeenNthCalledWith(1, true);
    expect(onToggle).toHaveBeenNthCalledWith(2, false);
  });

  it('favoritar não marca o serviço (o coração fica fora do botão de marcar)', async () => {
    const onToggle = vi.fn();
    render(<ServiceItem name="Corte" duration="40 min" price={35} onToggle={onToggle} data-testid={ID} />);
    await userEvent.click(screen.getByTestId('iris-booking-services-favorite-button'));
    expect(onToggle).not.toHaveBeenCalled();
    expect(screen.getByTestId(ID).contains(screen.getByTestId('iris-booking-services-favorite-button'))).toBe(false);
  });

  it('onFavorite={false} esconde o favoritar; função recebe o novo estado', async () => {
    const onFavorite = vi.fn();
    const { rerender } = render(<ServiceItem name="Corte" duration="40 min" price={35} onFavorite={false} />);
    expect(screen.queryByRole('button', { name: /Favoritar/ })).not.toBeInTheDocument();
    rerender(<ServiceItem name="Corte" duration="40 min" price={35} favorite onFavorite={onFavorite} />);
    await userEvent.click(screen.getByRole('button', { name: 'Remover Corte' }));
    expect(onFavorite).toHaveBeenCalledWith(false);
  });

  it('favoritos que chegam depois acendem o coração (mesmo sem onFavorite)', async () => {
    const { rerender } = render(<ServiceItem name="Corte" duration="40 min" price={35} />);
    expect(screen.getByRole('button', { name: 'Favoritar Corte' })).toBeInTheDocument();
    rerender(<ServiceItem name="Corte" duration="40 min" price={35} favorite />);
    expect(screen.getByRole('button', { name: 'Remover Corte' })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(screen.getByRole('button', { name: 'Remover Corte' }));
    expect(screen.getByRole('button', { name: 'Favoritar Corte' })).toBeInTheDocument();
  });

  it('controlado por selected', async () => {
    const onToggle = vi.fn();
    render(<ServiceItem name="Corte" duration="40 min" price={35} selected onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(false);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });
});
