import { render, screen } from '@testing-library/react';
import { SkeletonCard } from './SkeletonCard';

describe('SkeletonCard', () => {
  it('repassa o data-testid e fica escondido do leitor de tela', () => {
    render(<SkeletonCard data-testid="iris-home-business-skeleton" />);
    expect(screen.getByTestId('iris-home-business-skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it.each([
    ['list', 4],
    ['establishment', 4],
    ['service', 5],
    ['booking', 8],
    ['card', 4],
  ] as const)('variante %s desenha %i blocos no formato do item', (variant, blocos) => {
    render(<SkeletonCard variant={variant} data-testid="sk" />);
    expect(screen.getByTestId('sk').querySelectorAll('.ak-sk')).toHaveLength(blocos);
  });

  it('o padrão é list, com avatar redondo', () => {
    render(<SkeletonCard data-testid="sk" />);
    expect(screen.getByTestId('sk').querySelector('.ak-sk')).toHaveStyle({ borderRadius: '999px' });
  });
});
