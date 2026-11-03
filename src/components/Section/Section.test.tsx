import { render, screen } from '@testing-library/react';
import { Section } from './Section';

describe('Section', () => {
  it('é uma faixa com id, fundo bg por padrão e o conteúdo no container', () => {
    render(
      <Section id="sobre" data-testid="ark-landing-about-section">
        <p>Conteúdo</p>
      </Section>,
    );
    const faixa = screen.getByTestId('ark-landing-about-section');
    expect(faixa.tagName).toBe('SECTION');
    expect(faixa).toHaveAttribute('id', 'sobre');
    expect(faixa).toHaveClass('ak-section', 'ak-section-bg');
    expect(screen.getByText('Conteúdo').parentElement).toHaveClass('ak-section-in');
  });

  it('tom surface e layout split mudam as classes', () => {
    render(
      <Section tone="surface" layout="split" data-testid="s">
        <p>x</p>
      </Section>,
    );
    expect(screen.getByTestId('s')).toHaveClass('ak-section-surface');
    expect(screen.getByText('x').parentElement).toHaveClass('ak-section-split');
  });

  it('densidade compacta tira o respiro grande', () => {
    render(
      <Section dense data-testid="s">
        <p>x</p>
      </Section>,
    );
    expect(screen.getByText('x').parentElement).toHaveClass('ak-section-dense');
  });
});
