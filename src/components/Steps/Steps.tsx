import { cx, testIdParte, type TestIdProps } from '../../utils';

export interface StepsProps extends TestIdProps {
  /** 3 a 5 passos, cada um começando por verbo ("Cadastre", "Diga"). */
  items: { title: string; text?: string }[];
  /** `row` só no computador e com títulos curtos (empilha sozinho no estreito). */
  direction?: 'column' | 'row';
}

/** Passo a passo com círculo numerado. Cada passo ganha `{base}-item`. */
export function Steps({ items, direction = 'column', 'data-testid': testId }: StepsProps) {
  return (
    <ol className={cx('ak-steps', direction === 'row' && 'ak-steps-row')} data-testid={testId}>
      {items.map((it, i) => (
        <li key={`${it.title}-${i}`} className="ak-step" data-testid={testIdParte(testId, 'item')}>
          <span className="ak-step-n" aria-hidden="true">
            {i + 1}
          </span>
          <span className="ak-li-text">
            <b>{it.title}</b>
            {it.text && <span className="ak-li-sub">{it.text}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
