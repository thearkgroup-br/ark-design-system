import type { ReactNode } from 'react';
import { renderIcon, type IconName } from '../../icons/icons';
import type { TestIdProps } from '../../utils';

export interface ChipProps extends TestIdProps {
  /** 1 a 3 palavras. */
  children: ReactNode;
  icon?: IconName;
  /** Com `selected` vira filtro com aria-pressed; só com `onClick` é um botão comum; sem os dois é só etiqueta. */
  selected?: boolean;
  onClick?: () => void;
}

/** Etiqueta ou filtro clicável. O data-testid vai no chip (span ou botão). */
export function Chip({ children, icon, selected, onClick, 'data-testid': testId }: ChipProps) {
  const conteudo = (
    <>
      {icon && <span className="ak-chip-ico">{renderIcon(icon, 16)}</span>}
      <span>{children}</span>
    </>
  );
  if (!onClick && selected === undefined) {
    return (
      <span className="ak-chip" data-testid={testId}>
        {conteudo}
      </span>
    );
  }
  return (
    <button type="button" className="ak-chip ak-chip-btn" aria-pressed={selected === undefined ? undefined : selected} onClick={onClick} data-testid={testId}>
      {conteudo}
    </button>
  );
}
