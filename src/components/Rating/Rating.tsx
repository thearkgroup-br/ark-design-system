import { useRef, type KeyboardEvent } from 'react';
import { renderIcon } from '../../icons/icons';
import { cx, formatarNota, testIdParte, useControllable, type TestIdProps } from '../../utils';

export interface RatingProps extends TestIdProps {
  /** Nota de 0 a 5. Sem nota (ou 0 sem avaliações) mostra "Sem avaliações". */
  value?: number;
  count?: number;
  /** Uma estrela só, para listas. */
  compact?: boolean;
  /** Entrada de nota: 5 estrelas que são botões de 44 px. */
  editable?: boolean;
  defaultValue?: number;
  /** Nome do grupo na entrada. Padrão "Sua nota". */
  label?: string;
  onChange?: (n: number) => void;
}

const ROTULOS = ['Muito ruim', 'Ruim', 'Regular', 'Bom', 'Excelente'];
const NOTAS = [1, 2, 3, 4, 5];

function Entrada({ value, defaultValue = 0, label, onChange, 'data-testid': testId }: RatingProps) {
  const [nota, definir] = useControllable<number>(value, defaultValue, onChange);
  const estrelas = useRef<(HTMLButtonElement | null)[]>([]);
  const escolher = (n: number) => {
    definir(n);
    estrelas.current[n - 1]?.focus();
  };
  // Grupo de radios: setas mudam a nota, Home/End vão para 1 e 5.
  const aoTeclar = (e: KeyboardEvent) => {
    const atual = nota || 0;
    const proxima = { ArrowRight: atual + 1, ArrowUp: atual + 1, ArrowLeft: atual - 1, ArrowDown: atual - 1, Home: 1, End: 5 }[e.key];
    if (proxima === undefined) return;
    e.preventDefault();
    escolher(Math.min(5, Math.max(1, proxima)));
  };
  return (
    <div className="ak-stars-input" role="radiogroup" aria-label={label || 'Sua nota'} onKeyDown={aoTeclar} data-testid={testId}>
      {NOTAS.map((n) => (
        <button
          key={n}
          ref={(el) => {
            estrelas.current[n - 1] = el;
          }}
          type="button"
          role="radio"
          className={cx('ak-star', n <= nota && 'on')}
          aria-checked={n === nota}
          aria-label={`${n} ${n === 1 ? 'estrela' : 'estrelas'}, ${ROTULOS[n - 1]}`}
          // Só uma estrela entra na ordem do Tab: a escolhida (ou a primeira, sem nota).
          tabIndex={n === (nota || 1) ? 0 : -1}
          onClick={() => escolher(n)}
          data-testid={testIdParte(testId, 'star')}
        >
          {renderIcon('star', 32, n <= nota)}
        </button>
      ))}
    </div>
  );
}

/** Nota de 1 a 5: exibição (com ou sem contagem) e entrada (`editable`). A nota usa vírgula: 4,8. */
export function Rating(props: RatingProps) {
  const { value, count, compact, editable, 'data-testid': testId } = props;
  if (editable) return <Entrada {...props} />;
  const nota = Math.min(5, Math.max(0, value ?? 0));
  if (value == null || (nota === 0 && !count)) {
    return (
      <span className="ak-rating ak-rating-vazio" data-testid={testId}>
        Sem avaliações
      </span>
    );
  }
  const texto = formatarNota(nota);
  return (
    <span className="ak-rating" role="img" aria-label={`Nota ${texto} de 5${count != null ? `, ${count} avaliações` : ''}`} data-testid={testId}>
      <span className="ak-stars" aria-hidden="true">
        {compact ? renderIcon('star', 16, true) : NOTAS.map((n) => <span key={n}>{renderIcon('star', 16, n <= Math.round(nota))}</span>)}
      </span>
      <span aria-hidden="true">{texto}</span>
      {count != null && (
        <span className="ak-rcount" aria-hidden="true">
          ({count})
        </span>
      )}
    </span>
  );
}
