import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { testIdParte, useOverlay } from '../../utils';
import { IconButton } from '../IconButton/IconButton';
import { OverlayBody, type OverlayProps } from './OverlayBody';

export type DialogProps = OverlayProps;

/**
 * Janela no centro da tela, no computador, para confirmar algo importante (no celular, BottomSheet).
 * Fecha no X, no Esc e na ação secundária (que é de quem usa); tocar fora não fecha.
 * O data-testid vai no painel (role dialog); o X ganha `{base}-close-button`.
 */
export function Dialog(props: DialogProps) {
  const { id, text, alert, hostHeight, open = true, onClose, 'data-testid': testId } = props;
  const painel = useRef<HTMLDivElement>(null);
  const previa = hostHeight !== undefined;
  useOverlay({ ativo: open && !previa, painel, onClose, fecharComEsc: true });
  if (!open) return null;

  const caixa = (
    <div
      ref={painel}
      id={id}
      className="ak-dialog"
      role={alert ? 'alertdialog' : 'dialog'}
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      aria-describedby={text ? `${id}-text` : undefined}
      tabIndex={-1}
      data-testid={testId}
    >
      {onClose && (
        <IconButton icon="close" label="Fechar" variant="plain" className="ak-dialog-close" onClick={onClose} data-testid={testIdParte(testId, 'close-button')} />
      )}
      {OverlayBody(props, 'ak-dialog-actions')}
    </div>
  );

  if (previa) {
    return (
      <div className="ak-host ak-host-center" style={{ height: hostHeight }}>
        <div className="ak-overlay" aria-hidden="true" />
        {caixa}
      </div>
    );
  }
  return createPortal(
    <div className="ak-camada ak-camada-centro">
      <div className="ak-overlay" aria-hidden="true" data-testid={testIdParte(testId, 'overlay')} />
      {caixa}
    </div>,
    document.body,
  );
}
