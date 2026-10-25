import { render, screen } from '@testing-library/react';
import { Button } from '../Button/Button';
import { EmptyState } from './EmptyState';

const ID = 'iris-favorites-empty';

describe('EmptyState', () => {
  it('repassa o data-testid e deriva título e texto', () => {
    render(<EmptyState title="Nenhum favorito ainda" text="Toque no coração de um estabelecimento para guardar aqui." data-testid={ID} />);
    expect(screen.getByTestId(ID)).toBeInTheDocument();
    expect(screen.getByTestId('iris-favorites-empty-title')).toHaveTextContent('Nenhum favorito ainda');
    expect(screen.getByTestId('iris-favorites-empty-text')).toHaveTextContent('Toque no coração');
  });

  it('mostra a ação que resolve', () => {
    render(<EmptyState title="Nenhum favorito ainda" action={<Button>Explorar estabelecimentos</Button>} />);
    expect(screen.getByRole('button', { name: 'Explorar estabelecimentos' })).toBeInTheDocument();
  });

  it('ícone opcional e escondido', () => {
    const { container, rerender } = render(<EmptyState title="Vazio" />);
    expect(container.querySelector('svg')).toBeNull();
    rerender(<EmptyState title="Vazio" icon="heart" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('busca sem resultado também é estado vazio', () => {
    render(<EmptyState title='Nenhum resultado para "corte".' text="Confira o nome ou busque por outro serviço." />);
    expect(screen.getByText('Nenhum resultado para "corte".')).toBeInTheDocument();
  });
});
