import { render, screen } from '@testing-library/react';
import { EstablishmentCard } from './EstablishmentCard';

const ID = 'iris-home-business-card';

describe('EstablishmentCard', () => {
  it('repassa o data-testid; com href vira link com seta', () => {
    render(<EstablishmentCard name="Barbearia do Bairro" href="/b/barbearia" data-testid={ID} />);
    const card = screen.getByTestId(ID);
    expect(card.tagName).toBe('A');
    expect(card).toHaveAttribute('href', '/b/barbearia');
    expect(card.querySelector('.ak-chev svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('mostra categoria · distância, nota e se está aberto', () => {
    render(<EstablishmentCard name="Barbearia do Bairro" category="Barbearia" distance="1,2 km" rating={4.8} open data-testid={ID} />);
    const card = screen.getByTestId(ID);
    expect(card).toHaveTextContent('Barbearia · 1,2 km');
    expect(screen.getByRole('img', { name: 'Nota 4,8 de 5' })).toBeInTheDocument();
    expect(screen.getByText('Aberto agora')).toBeInTheDocument();
  });

  it('sem avaliações escreve "Sem avaliações"; fechado mostra "Fechado"', () => {
    render(<EstablishmentCard name="Salão Novo" open={false} />);
    expect(screen.getByText('Sem avaliações')).toBeInTheDocument();
    expect(screen.getByText('Fechado')).toBeInTheDocument();
  });

  it('sem foto mostra as iniciais na cor da marca (token) ou na cor do negócio', () => {
    const { rerender } = render(<EstablishmentCard name="Barbearia do Bairro" data-testid={ID} />);
    const thumb = screen.getByTestId('iris-home-business-thumb');
    expect(thumb).toHaveTextContent('BB');
    expect(thumb).toHaveClass('ak-thumb-marca');
    rerender(<EstablishmentCard name="Barbearia do Bairro" color="#7A1F5C" data-testid={ID} />);
    expect(screen.getByTestId('iris-home-business-thumb')).not.toHaveClass('ak-thumb-marca');
    expect(screen.getByTestId('iris-home-business-thumb')).toHaveStyle({ backgroundColor: '#7A1F5C', color: '#FFFFFF' });
  });

  it('com foto usa a imagem decorativa', () => {
    const { container } = render(<EstablishmentCard name="Barbearia" image="/foto.jpg" />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('nome longo fica em até 2 linhas, com o nome completo no title', () => {
    render(<EstablishmentCard name="Barbearia e Estúdio de Beleza do Bairro da Conceição" />);
    const nome = screen.getByText('Barbearia e Estúdio de Beleza do Bairro da Conceição');
    expect(nome).toHaveClass('ak-clamp2');
    expect(nome).toHaveAttribute('title', 'Barbearia e Estúdio de Beleza do Bairro da Conceição');
  });
});
