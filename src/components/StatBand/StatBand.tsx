import { testIdParte, type TestIdProps } from '../../utils';
import { Section } from '../Section/Section';

export interface StatBandProps extends TestIdProps {
  /** Destaques verdadeiros e verificáveis: até 4 palavras + uma linha de explicação. Nunca número inventado. */
  items: { value: string; label: string }[];
  /** Nome da lista para o leitor de tela ("Em resumo"). */
  label?: string;
}

/** Faixa de destaques logo abaixo do topo. Cada destaque ganha `{base}-item`. */
export function StatBand({ items, label, 'data-testid': testId }: StatBandProps) {
  return (
    <Section tone="surface" dense>
      <ul className="ak-statband" aria-label={label} data-testid={testId}>
        {items.map((item, i) => (
          <li key={`${item.value}-${i}`} className="ak-statband-item" data-testid={testIdParte(testId, 'item')}>
            <strong className="ak-statband-value">{item.value}</strong>
            <span className="ak-statband-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
