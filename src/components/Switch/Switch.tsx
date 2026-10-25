import { forwardRef } from 'react';
import { testIdParte, useControllable, type TestIdProps } from '../../utils';

export interface SwitchProps extends TestIdProps {
  id: string;
  /** Nomeia a configuração: "Lembrete 1 dia antes". */
  label: string;
  /** Explica o efeito. */
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

/** Liga/desliga algo que vale na hora. Botão com role="switch"; o data-testid vai nele. */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { id, label, description, checked, defaultChecked = false, disabled, onChange, 'data-testid': testId },
  ref,
) {
  const [ligado, definir] = useControllable<boolean>(checked, defaultChecked, onChange);
  const descricaoId = description ? `${id}-description` : undefined;
  return (
    <div className="ak-switch-row">
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
      <button
        ref={ref}
        type="button"
        id={id}
        role="switch"
        className="ak-switch"
        aria-checked={ligado ? 'true' : 'false'}
        aria-labelledby={`${id}-label`}
        aria-describedby={descricaoId}
        disabled={disabled}
        onClick={() => definir(!ligado)}
        data-testid={testId}
      >
        <span className="ak-switch-knob" />
      </button>
    </div>
  );
});
