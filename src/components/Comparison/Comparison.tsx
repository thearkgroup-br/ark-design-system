import { renderIcon } from '../../icons/icons';
import { testIdParte, type TestIdProps } from '../../utils';

interface Lado {
  title: string;
  items: string[];
}

export interface ComparisonProps extends TestIdProps {
  /** O mesmo número de itens nos dois lados, um respondendo o outro. */
  before: Lado;
  after: Lado;
}

/** "Antes e depois" lado a lado, com VS no meio; empilha no estreito. O "depois" usa a cor da marca. */
export function Comparison({ before, after, 'data-testid': testId }: ComparisonProps) {
  const lado = (l: Lado, nome: 'before' | 'after', padrao: string) => (
    <div className={`ak-cmp-side ak-cmp-${nome}`} data-testid={testIdParte(testId, nome)}>
      <b>{l.title || padrao}</b>
      <ul>
        {l.items.map((t, i) => (
          <li key={`${t}-${i}`} data-testid={testIdParte(testId, `${nome}-item`)}>
            <span>{renderIcon(nome === 'before' ? 'close' : 'check', 16)}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="ak-cmp-wrap" data-testid={testId}>
      <div className="ak-cmp">
        {lado(before, 'before', 'Antes')}
        <span className="ak-cmp-vs" aria-hidden="true">
          VS
        </span>
        {lado(after, 'after', 'Depois')}
      </div>
    </div>
  );
}
