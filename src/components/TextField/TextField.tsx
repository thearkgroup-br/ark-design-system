import { forwardRef, type ChangeEvent, type InputHTMLAttributes, type Ref } from 'react';
import { testIdParte, useControllable } from '../../utils';
import { FieldShell, fieldAria, type FieldBaseProps } from '../Field/FieldShell';

type CampoEvento = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type AtributosNativos = Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  'id' | 'value' | 'defaultValue' | 'onChange' | 'type' | 'inputMode' | 'children' | 'size'
>;

export interface TextFieldProps extends FieldBaseProps, AtributosNativos {
  value?: string;
  defaultValue?: string;
  onChange?: (e: CampoEvento) => void;
  /** Mostra o contador "42/300". Precisa de maxLength. */
  showCount?: boolean;
  /** Vira textarea. */
  multiline?: boolean;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'decimal';
}

/**
 * Campo de texto com rótulo sempre visível, dica ou erro abaixo e contador opcional.
 * O data-testid e os demais atributos nativos (onBlur, readOnly, autoFocus…) vão no input.
 */
export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(function TextField(
  { id, label, hint, error, optional, value, defaultValue, onChange, showCount, multiline, type, maxLength, 'data-testid': testId, ...nativos },
  ref,
) {
  const [atual, definir] = useControllable<string>(value, defaultValue ?? '');

  const comum = {
    ...nativos,
    id,
    className: 'ak-input',
    value: atual,
    onChange: (e: CampoEvento) => {
      definir(e.target.value);
      onChange?.(e);
    },
    maxLength,
    'data-testid': testId,
    ...fieldAria({ id, hint, error }),
  };

  const count =
    maxLength && showCount ? (
      <span className="ak-count" aria-live="polite" data-testid={testIdParte(testId, 'count')}>
        {atual.length}/{maxLength}
      </span>
    ) : null;

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} count={count} data-testid={testId}>
      {multiline ? (
        <textarea {...comum} ref={ref as Ref<HTMLTextAreaElement>} />
      ) : (
        <input {...comum} ref={ref as Ref<HTMLInputElement>} type={type ?? 'text'} />
      )}
    </FieldShell>
  );
});
