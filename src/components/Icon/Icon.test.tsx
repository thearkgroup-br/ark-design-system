import { render, screen } from '@testing-library/react';
import { ICON_NAMES } from '../../icons/icons';
import { Icon } from './Icon';

describe('Icon', () => {
  it('repassa o data-testid para o ícone', () => {
    render(<Icon name="calendar" data-testid="iris-appointments-item-date-icon" />);
    expect(screen.getByTestId('iris-appointments-item-date-icon')).toHaveClass('ak-icon');
  });

  it.each(ICON_NAMES)('desenha o ícone %s em viewBox 24, escondido do leitor de tela', (nome) => {
    const { container } = render(<Icon name={nome} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg?.childElementCount).toBeGreaterThan(0);
  });

  it('tem 35 ícones, como a lista da referência', () => {
    expect(ICON_NAMES).toHaveLength(35);
  });

  it('usa 20 px por padrão e aceita outro tamanho', () => {
    const { container, rerender } = render(<Icon name="home" />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '20');
    rerender(<Icon name="home" size={24} />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '24');
  });

  it('preenche coração e estrela com filled', () => {
    const { container, rerender } = render(<Icon name="heart" filled />);
    expect(container.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
    rerender(<Icon name="star" />);
    expect(container.querySelector('svg')).toHaveAttribute('fill', 'none');
  });

  it('aplica a cor recebida (token)', () => {
    render(<Icon name="star" color="var(--star)" data-testid="x-icon" />);
    expect(screen.getByTestId('x-icon')).toHaveStyle({ color: 'var(--star)' });
  });

  it('com label vira imagem com nome; sem label não é anunciado', () => {
    const { rerender } = render(<Icon name="lock" label="Bloqueado" />);
    expect(screen.getByRole('img', { name: 'Bloqueado' })).toBeInTheDocument();
    rerender(<Icon name="lock" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
