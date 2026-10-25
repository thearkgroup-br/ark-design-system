import { testIdParte, type TestIdProps } from '../../utils';

export interface StatBarProps extends TestIdProps {
  /** 3 destaques verdadeiros e verificáveis: até 4 palavras + uma linha de explicação. */
  items: { value: string; label: string }[];
}

/** Faixa de destaques logo abaixo do topo do site. Cada destaque ganha `{base}-item`. */
export function StatBar({ items, 'data-testid': testId }: StatBarProps) {
  return (
    <ul className="ak-statbar" data-testid={testId}>
      {items.map((s, i) => (
        <li key={`${s.value}-${i}`} className="ak-stat" data-testid={testIdParte(testId, 'item')}>
          <b className="ak-stat-value">{s.value}</b>
          <span className="ak-stat-label">{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
