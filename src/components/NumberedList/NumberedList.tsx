import { testIdParte, type TestIdProps } from '../../utils';

export interface NumberedListProps extends TestIdProps {
  /** 3 a 6 itens: título de até 4 palavras + uma linha de explicação. */
  items: { title: string; text?: string }[];
  /** Número do primeiro item. Padrão 1. */
  start?: number;
}

const doisDigitos = (n: number) => String(n).padStart(2, '0');

/** Lista com números 01, 02, 03… e divisórias. Cada item ganha `{base}-item`. */
export function NumberedList({ items, start = 1, 'data-testid': testId }: NumberedListProps) {
  return (
    <ol className="ak-numlist" start={start} data-testid={testId}>
      {items.map((it, i) => (
        <li key={`${it.title}-${i}`} className="ak-numlist-item" data-testid={testIdParte(testId, 'item')}>
          <span className="ak-num" aria-hidden="true">
            {doisDigitos(start + i)}
          </span>
          <span className="ak-li-text">
            <b className="ak-numlist-title">{it.title}</b>
            {it.text && <span className="ak-li-sub">{it.text}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
