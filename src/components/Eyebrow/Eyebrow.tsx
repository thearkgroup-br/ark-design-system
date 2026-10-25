import type { ReactNode } from 'react';
import { cx, type TestIdProps } from '../../utils';

export interface EyebrowProps extends TestIdProps {
  /** 1 a 4 palavras, primeira letra maiúscula, sem ponto. */
  children: ReactNode;
  /** `muted` quando a seção já tem muito destaque. */
  tone?: 'brand' | 'muted';
  /** Entre parênteses: "( Para quem é )". Padrão true. */
  parens?: boolean;
}

/** Rótulo curto acima do título de uma seção. */
export function Eyebrow({ children, tone = 'brand', parens = true, 'data-testid': testId }: EyebrowProps) {
  return (
    <span className={cx('ak-eyebrow', tone === 'muted' && 'ak-eyebrow-muted')} data-testid={testId}>
      {parens ? (
        <>
          ( {children} )
        </>
      ) : (
        children
      )}
    </span>
  );
}
