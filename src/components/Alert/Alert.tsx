import type { ReactNode } from 'react';
import { renderIcon, type IconName } from '../../icons/icons';
import { testIdParte, type TestIdProps } from '../../utils';

export interface AlertProps extends TestIdProps {
  /** `info` regras, `warning` prazos, `success` confirmação que precisa ficar visível, `danger` erro com saída. */
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children?: ReactNode;
  /** A saída: "Tentar de novo", "Conferir dados". */
  action?: ReactNode;
}

const ICONE: Record<NonNullable<AlertProps['tone']>, IconName> = { info: 'info', success: 'check', warning: 'alert', danger: 'alert' };

/** Aviso dentro da tela, que não bloqueia. `danger` é anunciado na hora (role="alert"); os outros, com calma (role="status"). */
export function Alert({ tone = 'info', title, children, action, 'data-testid': testId }: AlertProps) {
  return (
    <div className={`ak-alert ak-alert-${tone}`} role={tone === 'danger' ? 'alert' : 'status'} data-testid={testId}>
      {renderIcon(ICONE[tone], 22)}
      <span className="ak-alert-body">
        {title && (
          <span className="ak-alert-title" data-testid={testIdParte(testId, 'title')}>
            {title}
          </span>
        )}
        {children}
      </span>
      {action}
    </div>
  );
}
