import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('repassa o data-testid; sem foto mostra a primeira e a última inicial', () => {
    render(<Avatar name="Maria da Silva" data-testid="iris-profile-avatar" />);
    expect(screen.getByTestId('iris-profile-avatar')).toHaveTextContent('MS');
  });

  it('o nome é lido pelo leitor de tela, não as iniciais', () => {
    render(<Avatar name="Maria da Silva" data-testid="a" />);
    expect(screen.getByText('MS')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Maria da Silva')).toHaveClass('ak-sr');
  });

  it('com foto usa alt = alt ou nome', () => {
    const { rerender } = render(<Avatar name="Rafa" src="/rafa.jpg" />);
    expect(screen.getByRole('img', { name: 'Rafa' })).toHaveAttribute('src', '/rafa.jpg');
    rerender(<Avatar name="Rafa" src="/rafa.jpg" alt="Foto do Rafa" />);
    expect(screen.getByRole('img', { name: 'Foto do Rafa' })).toBeInTheDocument();
  });

  it('tamanho padrão 44 e outros tamanhos', () => {
    const { rerender } = render(<Avatar name="Rafa" data-testid="a" />);
    expect(screen.getByTestId('a')).toHaveStyle({ width: '44px', height: '44px' });
    rerender(<Avatar name="Rafa" size={56} data-testid="a" />);
    expect(screen.getByTestId('a')).toHaveStyle({ width: '56px' });
  });

  it('sem nome mostra "?"', () => {
    render(<Avatar data-testid="a" />);
    expect(screen.getByTestId('a')).toHaveTextContent('?');
  });
});
