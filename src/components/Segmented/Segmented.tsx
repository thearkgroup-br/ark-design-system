import { testIdParte, useControllable, type TestIdProps } from '../../utils';

export interface SegmentedOption {
  /** Chave fixa da opção (vira parte do data-testid: `{base}-{id}-button`). */
  id: string;
  /** 1 ou 2 palavras. */
  label: string;
}

export interface SegmentedProps extends TestIdProps {
  /** Entre 2 e 4 opções curtas. Mais que isso: Select. */
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** Nome do grupo para o leitor de tela. Padrão "Opções". */
  label?: string;
}

/** Escolha única entre 2 e 4 opções lado a lado. O data-testid vai no grupo; cada opção ganha um id derivado. */
export function Segmented({ options, value, defaultValue, onChange, label, 'data-testid': testId }: SegmentedProps) {
  const [atual, definir] = useControllable<string>(value, defaultValue ?? options[0]?.id ?? '', onChange);
  return (
    <div className="ak-seg" role="group" aria-label={label || 'Opções'} data-testid={testId}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className="ak-seg-btn"
          aria-pressed={o.id === atual ? 'true' : 'false'}
          onClick={() => definir(o.id)}
          data-testid={testIdParte(testId, `${o.id}-button`)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
