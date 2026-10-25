import { forwardRef, type ChangeEvent, type FocusEvent, type ReactNode } from 'react';
import { renderIcon } from '../../icons/icons';
import { cx, testIdParte, useControllable, type TestIdProps } from '../../utils';
import { FieldMessage, fieldAria } from '../Field/FieldShell';

export interface CheckboxProps extends TestIdProps {
  id: string;
  /** Diz o que acontece quando marcado, em afirmativa: "Permitir encaixe". */
  label: ReactNode;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  /** Ex.: aceite de dados (LGPD) não marcado: "Para continuar, aceite o uso dos dados." */
  error?: string;
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

/** Caixa de seleção. A linha inteira é clicável (44 px). O data-testid vai no input. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, description, checked, defaultChecked = false, disabled, required, name, error, onChange, onBlur, 'data-testid': testId },
  ref,
) {
  const [marcado, definir] = useControllable<boolean, [ChangeEvent<HTMLInputElement>]>(checked, defaultChecked, onChange);
  const descricaoId = description ? `${id}-description` : undefined;
  return (
    <div className="ak-check">
      <label className={cx('ak-check-row', disabled && 'is-disabled')} htmlFor={id}>
        <input
          ref={ref}
          id={id}
          name={name}
          type="checkbox"
          className="ak-check-input"
          checked={marcado}
          disabled={disabled}
          required={required}
          onChange={(e) => definir(e.target.checked, e)}
          onBlur={onBlur}
          aria-labelledby={`${id}-label`}
          data-testid={testId}
          {...fieldAria({ id, error }, descricaoId)}
        />
        <span className="ak-check-box" aria-hidden="true">
          {marcado ? renderIcon('check', 14) : null}
        </span>
        <span className="ak-check-text">
          <span id={`${id}-label`} className="ak-check-label">
            {label}
          </span>
          {description && (
            <span id={descricaoId} className="ak-hint" data-testid={testIdParte(testId, 'description')}>
              {description}
            </span>
          )}
        </span>
      </label>
      <FieldMessage id={id} error={error} data-testid={testId} />
    </div>
  );
});
