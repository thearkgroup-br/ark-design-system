import { useRef, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { testIdParte, useOverlay } from '../../utils';
import { OverlayBody, type OverlayProps } from '../Dialog/OverlayBody';
import { IconButton } from '../IconButton/IconButton';

export type BottomSheetProps = OverlayProps;

/** Arrastar mais que isso para baixo fecha. */
export const ARRASTE_PARA_FECHAR = 80;

/**
 * Painel que sobe de baixo, no celular, para decisões rápidas (no computador, Dialog).
 * Fecha tocando fora, arrastando para baixo, no X ou na ação secundária (de quem usa).
 * Com `alert` (bloqueio) só fecha pelas ações. O data-testid vai no painel; o X ganha `{base}-close-button`.
 */
export function BottomSheet(props: BottomSheetProps) {
  const { id, text, alert, hostHeight, open = true, onClose, 'data-testid': testId } = props;
  const painel = useRef<HTMLDivElement>(null);
  const inicio = useRef<number | null>(null);
  const [arraste, setArraste] = useState(0);
  const previa = hostHeight !== undefined;
  const fechavel = Boolean(onClose) && !alert;
  useOverlay({ ativo: open && !previa, painel, onClose, fecharComEsc: fechavel });
  if (!open) return null;

  const aoApertar = (e: PointerEvent<HTMLDivElement>) => {
    if (!fechavel) return;
    inicio.current = e.clientY;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const aoMover = (e: PointerEvent<HTMLDivElement>) => {
    if (inicio.current !== null) setArraste(Math.max(0, e.clientY - inicio.current));
  };
  const aoSoltar = () => {
    if (inicio.current === null) return;
    inicio.current = null;
    if (arraste > ARRASTE_PARA_FECHAR) onClose?.();
    setArraste(0);
  };

  const sheet = (
    <div
      ref={painel}
      id={id}
      className="ak-sheet"
      role={alert ? 'alertdialog' : 'dialog'}
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      aria-describedby={text ? `${id}-text` : undefined}
      tabIndex={-1}
      style={arraste ? { transform: `translateY(${arraste}px)` } : undefined}
      data-testid={testId}
    >
      <div
        className="ak-grabber-area"
        aria-hidden="true"
        onPointerDown={aoApertar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        data-testid={testIdParte(testId, 'grabber')}
      >
        <div className="ak-grabber" />
      </div>
      {fechavel && (
        <IconButton icon="close" label="Fechar" variant="plain" size="sm" className="ak-sheet-close" onClick={onClose} data-testid={testIdParte(testId, 'close-button')} />
      )}
      {OverlayBody(props, 'ak-sheet-actions')}
    </div>
  );

  const fundo = (
    <div className="ak-overlay" aria-hidden="true" onClick={fechavel ? onClose : undefined} data-testid={testIdParte(testId, 'overlay')} />
  );

  if (previa) {
    return (
      <div className="ak-host" style={{ height: hostHeight }}>
        {fundo}
        {sheet}
      </div>
    );
  }
  return createPortal(
    <div className="ak-camada ak-camada-baixo">
      {fundo}
      {sheet}
    </div>,
    document.body,
  );
}
