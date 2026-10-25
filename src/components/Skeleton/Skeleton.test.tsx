import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('repassa o data-testid e fica escondido do leitor de tela', () => {
    render(<Skeleton data-testid="iris-home-business-skeleton" />);
    expect(screen.getByTestId('iris-home-business-skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('ocupa a largura toda e 14 px por padrão', () => {
    render(<Skeleton data-testid="sk" />);
    expect(screen.getByTestId('sk')).toHaveStyle({ width: '100%', height: '14px' });
  });

  it('aceita tamanho, cantos e círculo', () => {
    const { rerender } = render(<Skeleton data-testid="sk" width={64} height={24} radius={12} />);
    expect(screen.getByTestId('sk')).toHaveStyle({ width: '64px', height: '24px', borderRadius: '12px' });
    rerender(<Skeleton data-testid="sk" width={44} height={44} circle />);
    expect(screen.getByTestId('sk')).toHaveStyle({ borderRadius: '999px' });
  });

  it('para o brilho quando a pessoa pede menos movimento', () => {
    const css = readFileSync(resolve(__dirname, 'Skeleton.css'), 'utf8');
    expect(css).toMatch(/prefers-reduced-motion: reduce\) \{ \.ak-sk::after \{ animation: none; \}/);
  });
});
