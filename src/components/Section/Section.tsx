import type { ReactNode } from 'react';
import type { TestIdProps } from '../../utils';

export interface SectionProps extends TestIdProps {
  /** Âncora da seção (`#duvidas`). */
  id?: string;
  /** `surface` nas faixas alternadas; `bg` no resto. */
  tone?: 'bg' | 'surface';
  /** `stack` empilha; `split` põe duas colunas no computador; `grid` é para cards. */
  layout?: 'stack' | 'split' | 'grid';
  /** Faixa baixa, para a de destaques. */
  dense?: boolean;
  children: ReactNode;
}

/** Faixa da página: fundo de ponta a ponta e conteúdo no container de 1160 px, com o mesmo respiro em todos os sites. */
export function Section({ id, tone = 'bg', layout = 'stack', dense, children, 'data-testid': testId }: SectionProps) {
  const conteudo = ['ak-section-in', `ak-section-${layout}`, dense ? 'ak-section-dense' : ''].filter(Boolean).join(' ');
  return (
    <section id={id} className={`ak-section ak-section-${tone}`} data-testid={testId}>
      <div className={conteudo}>{children}</div>
    </section>
  );
}
