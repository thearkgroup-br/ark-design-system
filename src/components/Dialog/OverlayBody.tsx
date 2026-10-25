import type { ReactNode } from 'react';
import { renderIcon, type IconName } from '../../icons/icons';
import { testIdParte, type TestIdProps } from '../../utils';

/** Props comuns de Dialog e BottomSheet (OverlayProps do index.d.ts + acréscimos). */
export interface OverlayProps extends TestIdProps {
  /** Base dos ids do DOM (`{id}-title`, `{id}-text`). */
  id: string;
  /** Pergunta quando pede decisão: "Cancelar o agendamento de Maria?" */
  title: string;
  text?: string;
  tone?: 'brand' | 'warning' | 'danger' | 'info';
  icon?: IconName;
  /** Bloqueio ou decisão que não pode ser ignorada: role="alertdialog". */
  alert?: boolean;
  actions?: ReactNode;
  children?: ReactNode;
  /**
   * Modo prévia (vitrine, documentação): desenha dentro de uma caixa com essa altura, sem cobrir a tela.
   * Sem ele, abre sobre a tela (portal no body, foco preso, Esc, página sem rolar).
   */
  hostHeight?: number;
  /** Aberto. Padrão true; com false não desenha nada. */
  open?: boolean;
  /** Fecha (X, Esc e, no BottomSheet, tocar fora ou arrastar para baixo). */
  onClose?: () => void;
}

export function OverlayBody({ id, title, text, tone = 'brand', icon, actions, children, 'data-testid': testId }: OverlayProps, classeAcoes: string) {
  return (
    <>
      {icon && <div className={`ak-sheet-icon ak-sheet-icon-${tone}`}>{renderIcon(icon, 26)}</div>}
      <h2 id={`${id}-title`} className="ak-sheet-title" data-testid={testIdParte(testId, 'title')}>
        {title}
      </h2>
      {text && (
        <p id={`${id}-text`} className="ak-sheet-text">
          {text}
        </p>
      )}
      {children && <div className="ak-sheet-content">{children}</div>}
      {actions && (
        <div className={classeAcoes} data-testid={testIdParte(testId, 'actions')}>
          {actions}
        </div>
      )}
    </>
  );
}
