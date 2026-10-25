import { forwardRef, type ChangeEvent, type FocusEvent } from 'react';
import { renderIcon } from '../../icons/icons';
import { useControllable } from '../../utils';
import { FieldShell, fieldAria, type FieldBaseProps } from '../Field/FieldShell';

export type SelectOption = string | { value: string; label: string };

export interface SelectProps extends FieldBaseProps {
  options: SelectOption[];
  /** Diz a ação: "Escolha uma opção", "Escolha o motivo". */
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
  name?: string;
}

const valorDaOpcao = (o: SelectOption | undefined) => (o === undefined ? '' : typeof o === 'string' ? o : o.value);

/** Lista de opções nativa (no celular abre a roda do sistema). O data-testid vai no select. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(props, ref) {
  const { id, hint, error, options, placeholder, disabled, required, value, defaultValue, onChange, onBlur, name } = props;
  const [atual, definir] = useControllable<string, [ChangeEvent<HTMLSelectElement>]>(
    value,
    defaultValue ?? (placeholder ? '' : valorDaOpcao(options[0])),
    onChange && ((_v, e) => onChange(e)),
  );
  return (
    <FieldShell {...props}>
      <div className="ak-select">
        <select
          ref={ref}
          id={id}
          name={name}
          className="ak-input"
          value={atual}
          onChange={(e) => definir(e.target.value, e)}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          data-testid={props['data-testid']}
          {...fieldAria({ id, hint, error })}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => {
            const v = valorDaOpcao(o);
            return (
              <option key={v} value={v}>
                {typeof o === 'string' ? o : o.label}
              </option>
            );
          })}
        </select>
        <span className="ak-select-ico">{renderIcon('chevronDown', 18)}</span>
      </div>
    </FieldShell>
  );
});
