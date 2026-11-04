import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('repassa o data-testid para o logo', () => {
    render(<Logo data-testid="ark-landing-header-logo" />);
    expect(screen.getByTestId('ark-landing-header-logo')).toHaveAttribute('role', 'img');
  });

  it('Ark: casco + THE ARK GROUP, com nome falado', () => {
    const { container } = render(<Logo brand="ark" />);
    expect(screen.getByRole('img', { name: 'THE ARK GROUP' })).toHaveClass('ak-logo-ark');
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('THE ARK GROUP')).toHaveAttribute('aria-hidden', 'true');
  });

  it('Íris: símbolo + "íris" escrito, falado como "Íris"', () => {
    const { container } = render(<Logo brand="iris" />);
    expect(screen.getByRole('img', { name: 'Íris' })).toBeInTheDocument();
    expect(screen.getByText('íris')).toBeInTheDocument();
    expect(container.querySelectorAll('svg line')).toHaveLength(40);
  });

  it('Zenno: enso (círculo aberto) + "zenno" escrito', () => {
    const { container } = render(<Logo brand="zenno" />);
    expect(screen.getByRole('img', { name: 'zenno' })).toHaveClass('ak-logo-zenno');
    expect(container.querySelector('svg path')).toHaveAttribute('stroke', 'currentColor');
    expect(container.querySelector('svg circle')).toBeNull();
    expect(screen.getByText('zenno')).toHaveAttribute('aria-hidden', 'true');
  });

  it('Somma: símbolo Σ no quadrado arredondado + "somma" escrito', () => {
    const { container } = render(<Logo brand="somma" />);
    expect(screen.getByRole('img', { name: 'somma' })).toHaveClass('ak-logo-somma');
    expect(container.querySelector('svg rect')).toHaveAttribute('fill', 'currentColor');
    expect(screen.getByText('somma')).toBeInTheDocument();
  });

  it('Mastro: mastro e vela no quadrado arredondado + "mastro" escrito', () => {
    const { container } = render(<Logo brand="mastro" />);
    expect(screen.getByRole('img', { name: 'mastro' })).toHaveClass('ak-logo-mastro');
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 48 48');
    expect(container.querySelector('svg rect')).toHaveAttribute('fill', 'currentColor');
    expect(container.querySelectorAll('svg path')).toHaveLength(2);
    expect(container.querySelector('svg g')).toHaveAttribute('stroke', 'var(--on-brand)');
    expect(screen.getByText('mastro')).toHaveAttribute('aria-hidden', 'true');
  });

  it('Mastro: markOnly deixa só o símbolo', () => {
    render(<Logo brand="mastro" markOnly />);
    expect(screen.queryByText('mastro')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'mastro' })).toBeInTheDocument();
  });

  it('Zenno e Somma: markOnly deixa só o símbolo', () => {
    render(<Logo brand="zenno" markOnly />);
    expect(screen.queryByText('zenno')).not.toBeInTheDocument();
  });

  it('Pulse: só o nome, sem símbolo (mesmo com markOnly)', () => {
    const { container } = render(<Logo brand="pulse" markOnly />);
    expect(container.querySelector('svg')).toBeNull();
    expect(screen.getByRole('img', { name: 'pulse' })).toHaveTextContent('pulse');
  });

  it('markOnly mostra só o símbolo e mantém o nome falado', () => {
    render(<Logo brand="iris" markOnly />);
    expect(screen.queryByText('íris')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Íris' })).toBeInTheDocument();
  });

  it('name troca o nome (mesmo com outra marca)', () => {
    render(<Logo brand="ark" name="ACME" />);
    expect(screen.getByRole('img', { name: 'ACME' })).toHaveTextContent('ACME');
  });

  it('size é a altura do símbolo', () => {
    const { container } = render(<Logo brand="iris" size={40} />);
    expect(container.querySelector('svg')).toHaveAttribute('height', '40');
  });

  it('dois logos Ark na mesma tela usam máscaras com ids diferentes', () => {
    const { container } = render(
      <>
        <Logo brand="ark" />
        <Logo brand="ark" />
      </>,
    );
    const ids = [...container.querySelectorAll('mask')].map((m) => m.id);
    expect(new Set(ids).size).toBe(2);
    container.querySelectorAll('svg > path').forEach((p, i) => expect(p.getAttribute('mask')).toBe(`url(#${ids[i]})`));
  });
});
