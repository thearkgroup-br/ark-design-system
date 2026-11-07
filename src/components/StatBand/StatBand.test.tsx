import { render, screen, within } from '@testing-library/react';
import { StatBand } from './StatBand';

const itens = [
  { value: 'Quanto entrou', label: 'recebido e a receber' },
  { value: 'Quanto sai', label: 'contas fixas e variáveis' },
  { value: 'Quanto sobra', label: 'projeção do fim do mês' },
  { value: 'Sem economês', label: 'você entende em segundos' },
];

describe('StatBand', () => {
  it('lista os destaques com ids derivados do id da lista', () => {
    render(<StatBand items={itens} label="Em resumo" data-testid="somma-landing-highlights-list" />);
    const lista = screen.getByRole('list', { name: 'Em resumo' });
    expect(lista).toHaveAttribute('data-testid', 'somma-landing-highlights-list');
    const linhas = within(lista).getAllByRole('listitem');
    expect(linhas).toHaveLength(4);
    expect(linhas[0]).toHaveAttribute('data-testid', 'somma-landing-highlights-item');
    expect(linhas[1]).toHaveTextContent('Quanto sai');
  });

  it('é uma faixa surface compacta', () => {
    const { container } = render(<StatBand items={itens} />);
    expect(container.querySelector('section')).toHaveClass('ak-section-surface');
    expect(container.querySelector('.ak-section-in')).toHaveClass('ak-section-dense');
  });
});
