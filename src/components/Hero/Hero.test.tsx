import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

const base = {
  eyebrow: 'O financeiro do seu negócio',
  title: 'Tudo somado, sem susto.',
  text: 'Quanto entrou, quanto sai e quanto sobra.',
  primaryAction: { label: 'Entrar na lista', href: '#contato' },
  secondaryAction: { label: 'Ver o que faz', href: '#oque' },
  'data-testid': 'somma-landing-hero',
};

describe('Hero', () => {
  it('é a faixa #topo com o título em h1 e os dois botões com ids padronizados', () => {
    render(<Hero {...base} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Tudo somado, sem susto.' })).toBeInTheDocument();
    expect(document.getElementById('topo')).toHaveClass('ak-section-surface');
    expect(screen.getByRole('link', { name: 'Entrar na lista' })).toHaveAttribute('data-testid', 'somma-landing-hero-primary-link');
    expect(screen.getByRole('link', { name: 'Ver o que faz' })).toHaveAttribute('data-testid', 'somma-landing-hero-secondary-link');
    expect(screen.getByTestId('somma-landing-hero-header')).toHaveTextContent('( O financeiro do seu negócio )');
  });

  it('o botão secundário é opcional', () => {
    render(<Hero {...base} secondaryAction={undefined} />);
    expect(screen.queryByTestId('somma-landing-hero-secondary-link')).not.toBeInTheDocument();
  });

  it('mostra selo, nota e a ilustração com legenda, fora dos leitores de tela', () => {
    render(<Hero {...base} badge="Em breve" note="Entre na lista e a gente avisa." visual={<div>Painel</div>} visualCaption="Ilustração com valores de exemplo" />);
    expect(screen.getByTestId('somma-landing-hero-badge')).toHaveTextContent('Em breve');
    expect(screen.getByTestId('somma-landing-hero-note')).toHaveTextContent('Entre na lista e a gente avisa.');
    const visual = screen.getByTestId('somma-landing-hero-visual');
    expect(visual).toHaveAttribute('aria-hidden', 'true');
    expect(visual).toHaveTextContent('Painel');
    expect(screen.getByTestId('somma-landing-hero-visual-caption')).toHaveTextContent('Ilustração com valores de exemplo');
  });

  it('sem ilustração, só o texto', () => {
    render(<Hero {...base} />);
    expect(screen.queryByTestId('somma-landing-hero-visual')).not.toBeInTheDocument();
  });
});
