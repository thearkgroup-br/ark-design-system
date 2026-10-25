import type { ReactNode } from 'react';
import { renderIcon } from '../../icons/icons';
import { testIdParte, type TestIdProps } from '../../utils';
import { IconButton } from '../IconButton/IconButton';

export interface TopBarProps extends TestIdProps {
  /** Quebra linha quando precisa, nunca corta. */
  title: string;
  /** Mostra o voltar. Padrão true. */
  back?: boolean;
  /** Com backHref o voltar vira link. */
  backHref?: string;
  onBack?: () => void;
  /** Uma ação opcional à direita (ex.: IconButton). */
  action?: ReactNode;
}

/** Cabeçalho de tela interna do app. O data-testid vai no header; o voltar ganha `{base}-back-button` (ou `-back-link`). */
export function TopBar({ title, back = true, backHref, onBack, action, 'data-testid': testId }: TopBarProps) {
  return (
    <header className="ak-topbar" data-testid={testId}>
      {back &&
        (backHref ? (
          <a href={backHref} className="ak-iconbtn ak-iconbtn-plain" aria-label="Voltar" title="Voltar" onClick={onBack} data-testid={testIdParte(testId, 'back-link')}>
            {renderIcon('chevronLeft', 22)}
          </a>
        ) : (
          <IconButton icon="chevronLeft" label="Voltar" variant="plain" onClick={onBack} data-testid={testIdParte(testId, 'back-button')} />
        ))}
      <span className="ak-topbar-title" data-testid={testIdParte(testId, 'title')}>
        {title}
      </span>
      {action}
    </header>
  );
}
