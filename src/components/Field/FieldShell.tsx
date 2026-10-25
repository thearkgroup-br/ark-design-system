import type { ReactNode } from 'react';
import { renderIcon } from '../../icons/icons';
import { testIdParte } from '../../utils';
import './Field.css';

export interface FieldBaseProps {
  id: string;
  label: string;
  hint?: string;
  /** Mensagem que diz como resolver. Mostrar ao sair do campo ou ao enviar, nunca enquanto a pessoa digita. */
  error?: string;
  /** Mostra "(opcional)" no rótulo. Campo obrigatório não leva asterisco. */
  optional?: boolean;
  'data-testid'?: string;
}

/** Ids e atributos de acessibilidade que o controle do campo precisa receber. */
export function fieldAria({ id, hint, error }: Pick<FieldBaseProps, 'id' | 'hint' | 'error'>) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return { 'aria-invalid': error ? ('true' as const) : undefined, 'aria-describedby': describedBy };
}

interface FieldShellProps extends FieldBaseProps {
  count?: ReactNode;
  children: ReactNode;
}

/** Moldura comum dos campos: rótulo ligado ao controle, contador, dica ou erro (com ícone). */
export function FieldShell({ id, label, hint, error, optional, count, children, 'data-testid': testId }: FieldShellProps) {
  return (
    <div className="ak-field">
      <div className="ak-field-top">
        <label htmlFor={id} className="ak-label">
          {label}
          {optional && <span className="ak-opt"> (opcional)</span>}
        </label>
        {count}
      </div>
      {children}
      {error ? (
        <span id={`${id}-error`} className="ak-error" data-testid={testIdParte(testId, 'error')}>
          {renderIcon('alert', 16)}
          <span>{error}</span>
        </span>
      ) : hint ? (
        <span id={`${id}-hint`} className="ak-hint" data-testid={testIdParte(testId, 'hint')}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}
