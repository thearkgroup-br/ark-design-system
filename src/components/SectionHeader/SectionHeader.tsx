import type { ReactNode } from 'react';
import { cx, testIdParte, type TestIdProps } from '../../utils';
import { Eyebrow } from '../Eyebrow/Eyebrow';

export interface SectionHeaderProps extends TestIdProps {
  /** Afirma algo concreto, em até 2 linhas, e termina com ponto. */
  title: ReactNode;
  eyebrow?: string;
  eyebrowTone?: 'brand' | 'muted';
  /** Uma frase de apoio, sem repetir o título. */
  text?: ReactNode;
  /** `center` só em seções curtas (FAQ, chamada final). */
  align?: 'left' | 'center';
  /** `hero` é o topo da página (um por página, com level={1}). */
  size?: 'section' | 'hero';
  level?: 1 | 2 | 3;
  actions?: ReactNode;
}

/** Rótulo + título + texto de apoio de uma seção do site. Os tamanhos mudam pela largura do próprio bloco. */
export function SectionHeader({ title, eyebrow, eyebrowTone, text, align, size, level = 2, actions, 'data-testid': testId }: SectionHeaderProps) {
  const Titulo = `h${level}` as const;
  return (
    <div className={cx('ak-sechead', align === 'center' && 'ak-center')} data-testid={testId}>
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <Titulo className={cx('ak-sechead-title', size === 'hero' && 'ak-hero-title')} data-testid={testIdParte(testId, 'title')}>
        {title}
      </Titulo>
      {text && (
        <p className={cx('ak-sechead-text', size === 'hero' && 'ak-lead')} data-testid={testIdParte(testId, 'text')}>
          {text}
        </p>
      )}
      {actions && <div className="ak-row ak-sechead-actions">{actions}</div>}
    </div>
  );
}
