import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

const ID = 'ark-landing-footer';
const COLUNAS = [
  { title: 'Empresas', items: [{ label: 'Íris', href: '/iris' }, { label: 'Arca Dev', href: '/arca', id: 'arca' }] },
  { title: 'Contato', items: ['Seg a sex, 9h às 18h', '(11) 91234-5678'] },
];
const BAIXO = [{ label: 'Política de privacidade', href: '/privacidade' }, { label: 'Termos de uso', href: '/termos', id: 'terms' }];

describe('Footer', () => {
  it('repassa o data-testid para o footer e deriva os links', () => {
    render(<Footer columns={COLUNAS} bottomLinks={BAIXO} legal="© 2026 The Ark Group" data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('FOOTER');
    expect(screen.getByTestId('ark-landing-link')).toHaveTextContent('Íris');
    expect(screen.getByTestId('ark-landing-arca-link')).toHaveAttribute('href', '/arca');
    expect(screen.getByTestId('ark-landing-legal-link')).toHaveTextContent('Política de privacidade');
    expect(screen.getByTestId('ark-landing-terms-link')).toHaveAttribute('href', '/termos');
    expect(screen.getByTestId('ark-landing-legal')).toHaveTextContent('© 2026 The Ark Group');
  });

  it('item em texto fica como texto selecionável, sem link', () => {
    render(<Footer columns={COLUNAS} />);
    expect(screen.getByText('(11) 91234-5678').tagName).toBe('SPAN');
    expect(screen.queryByRole('link', { name: '(11) 91234-5678' })).not.toBeInTheDocument();
  });

  it('mostra a marca com a frase e os títulos das colunas', () => {
    render(<Footer brand="iris" tagline="Sua agenda cheia, sem viver no WhatsApp." columns={COLUNAS} />);
    expect(screen.getByRole('img', { name: 'Íris' })).toBeInTheDocument();
    expect(screen.getByText('Sua agenda cheia, sem viver no WhatsApp.')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('não quebra sem colunas nem links', () => {
    render(<Footer data-testid={ID} />);
    expect(screen.getByTestId(ID)).toBeInTheDocument();
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});
