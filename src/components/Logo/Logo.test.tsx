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

  it('name troca o nome (Arca Dev usa o tema ark)', () => {
    render(<Logo brand="ark" name="ARCA DEV" />);
    expect(screen.getByRole('img', { name: 'ARCA DEV' })).toHaveTextContent('ARCA DEV');
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
