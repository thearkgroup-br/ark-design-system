import type { ReactNode } from 'react';
import { renderIcon, type IconName } from '../../icons/icons';
import { testIdParte, type TestIdProps } from '../../utils';

export interface EmptyStateProps extends TestIdProps {
  /** Diz o estado: "Nenhum favorito ainda", "Nenhum resultado para "corte"." */
  title: string;
  /** Diz o que fazer. */
  text?: string;
  icon?: IconName;
  /** Sempre uma ação que resolve ("Explorar estabelecimentos"). */
  action?: ReactNode;
}

/** Tela ou lista vazia. O data-testid vai no bloco; título e texto ganham `{base}-title` e `{base}-text`. */
export function EmptyState({ title, text, icon, action, 'data-testid': testId }: EmptyStateProps) {
  return (
    <div className="ak-empty" data-testid={testId}>
      {icon && <span className="ak-empty-ico">{renderIcon(icon, 28)}</span>}
      <p className="ak-empty-title" data-testid={testIdParte(testId, 'title')}>
        {title}
      </p>
      {text && (
        <p className="ak-empty-text" data-testid={testIdParte(testId, 'text')}>
          {text}
        </p>
      )}
      {action}
    </div>
  );
}
