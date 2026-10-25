import type { ReactNode } from 'react';
import { renderIcon, type IconName } from '../../icons/icons';
import type { TestIdProps } from '../../utils';

export interface ChipProps extends TestIdProps {
  /** 1 a 3 palavras. */
  children: ReactNode;
  icon?: IconName;
  /** Com `onClick` ou `selected` vira filtro com aria-pressed; sem eles é só etiqueta. */
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
    <button type="button" className="ak-chip ak-chip-btn" aria-pressed={selected ? 'true' : 'false'} onClick={onClick} data-testid={testId}>
      {conteudo}
    </button>
  );
}
