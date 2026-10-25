import type { ReactNode } from 'react';
import { renderIcon } from '../../icons/icons';
import { testIdParte } from '../../utils';

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
export function fieldAria({ id, hint, error }: Pick<FieldBaseProps, 'id' | 'hint' | 'error'>, extra?: string) {
  const mensagem = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const describedBy = [extra, mensagem].filter(Boolean).join(' ') || undefined;
  return { 'aria-invalid': error ? ('true' as const) : undefined, 'aria-describedby': describedBy };
}

/** Dica ou erro abaixo do campo. O erro tem ícone + texto, nunca só cor. */
export function FieldMessage({ id, hint, error, 'data-testid': testId }: Pick<FieldBaseProps, 'id' | 'hint' | 'error' | 'data-testid'>) {
  if (error) {
    return (
      <span id={`${id}-error`} className="ak-error" data-testid={testIdParte(testId, 'error')}>
        {renderIcon('alert', 16)}
        <span>{error}</span>
      </span>
    );
  }
  if (hint) {
    return (
      <span id={`${id}-hint`} className="ak-hint" data-testid={testIdParte(testId, 'hint')}>
        {hint}
      </span>
    );
  }
  return null;
}

interface FieldShellProps extends FieldBaseProps {
  count?: ReactNode;
  children: ReactNode;
}

/** Moldura comum dos campos: rótulo ligado ao controle, contador, dica ou erro. */
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
      <FieldMessage id={id} hint={hint} error={error} data-testid={testId} />
    </div>
  );
}
