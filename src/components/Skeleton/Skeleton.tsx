import type { TestIdProps } from '../../utils';

export interface SkeletonProps extends TestIdProps {
  width?: number | string;
  height?: number | string;
  radius?: number;
  circle?: boolean;
}

/**
 * Bloco cinza com brilho no formato do conteúdo que está carregando. Fica escondido do leitor de tela:
 * quem anuncia o carregamento é a área que carrega (ex.: `aria-busy="true"` na lista).
 */
export function Skeleton({ width = '100%', height = 14, radius, circle, 'data-testid': testId }: SkeletonProps) {
  return (
    <span
      className="ak-sk"
      aria-hidden="true"
      style={{ width, height, borderRadius: circle ? 999 : radius }}
      data-testid={testId}
    />
  );
}
