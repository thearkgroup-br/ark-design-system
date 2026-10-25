import { forwardRef, type ChangeEvent, type FocusEvent, type Ref } from 'react';
import { testIdParte, useControllable } from '../../utils';
import { FieldShell, fieldAria, type FieldBaseProps } from '../Field/FieldShell';

type CampoEvento = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface TextFieldProps extends FieldBaseProps {
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: CampoEvento) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Só como exemplo ("Ex.: Maria Souza"); nunca no lugar do rótulo. */
  placeholder?: string;
  maxLength?: number;
  /** Mostra o contador "42/300". Precisa de maxLength. */
  showCount?: boolean;
  /** Vira textarea. */
  multiline?: boolean;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'decimal';
  autoComplete?: string;
  required?: boolean;
  name?: string;
}

/** Campo de texto com rótulo sempre visível, dica ou erro abaixo e contador opcional. O data-testid vai no input. */
export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(function TextField(props, ref) {
  const { id, hint, error, disabled, value, defaultValue, onChange, onBlur, placeholder, maxLength, showCount, multiline, type, inputMode, autoComplete, required, name } = props;
  const testId = props['data-testid'];
  const [atual, definir] = useControllable<string, [CampoEvento]>(value, defaultValue ?? '', onChange && ((_v, e) => onChange(e)));

  const comum = {
    id,
    name,
    className: 'ak-input',
    value: atual,
    onChange: (e: CampoEvento) => definir(e.target.value, e),
    onBlur,
    placeholder,
    maxLength,
    inputMode,
    autoComplete,
    required,
    disabled,
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
    <FieldShell {...props} count={count}>
      {multiline ? (
        <textarea {...comum} ref={ref as Ref<HTMLTextAreaElement>} />
      ) : (
        <input {...comum} ref={ref as Ref<HTMLInputElement>} type={type ?? 'text'} />
      )}
    </FieldShell>
  );
});
