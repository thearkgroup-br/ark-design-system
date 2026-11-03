import { render, screen } from '@testing-library/react';
import { SiteFooter } from './SiteFooter';

const colunas = [{ title: 'Produto', items: [{ label: 'O que faz', href: '#oque', id: 'features' }] }];

describe('SiteFooter', () => {
  it('produto: diz "Um produto do The Ark Group" e leva a linha legal', () => {
    render(<SiteFooter brand="iris" tagline="Agenda online." columns={colunas} legal="© 2026 The Ark Group" data-testid="iris-landing-footer" />);
    expect(screen.getByTestId('iris-landing-footer-group')).toHaveTextContent('Um produto do The Ark Group');
    expect(screen.getByTestId('iris-landing-footer-legal')).toHaveTextContent('© 2026 The Ark Group');
    expect(screen.getByTestId('iris-landing-footer-features-link')).toHaveAttribute('href', '#oque');
  });

  it('o rodapé do grupo não repete a frase', () => {
    render(<SiteFooter variant="group" brand="ark" columns={colunas} data-testid="ark-landing-footer" />);
    expect(screen.queryByTestId('ark-landing-footer-group')).not.toBeInTheDocument();
  });

  it('aceita o logo da marca no lugar do desenho padrão', () => {
    render(<SiteFooter logo={<span>Logo da marca</span>} data-testid="z-footer" />);
    expect(screen.getByText('Logo da marca')).toBeInTheDocument();
  });
});
