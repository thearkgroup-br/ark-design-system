import { useEffect, useRef, type ReactNode } from 'react';
import { renderIcon } from '../../icons/icons';
import type { TestIdProps } from '../../utils';

/** Tempo padrão até o toast sumir. */
export const TOAST_DURACAO_MS = 4000;

export interface ToastProps extends TestIdProps {
  tone?: 'success' | 'danger' | 'info';
  /** Até 5 palavras, no particípio: "Salvo", "Lembrete ligado". */
  children: ReactNode;
  /** Chamado quando o tempo acaba: quem usa tira o toast da tela. */
  onClose?: () => void;
  /** Tempo até sumir, em ms. Padrão 4000; 0 não some sozinho. */
  duration?: number;
}

const ICONE = { success: 'check', danger: 'alert', info: 'info' } as const;

/** Mensagem curta que confirma uma ação. Lida pelo leitor de tela sem tirar o foco (role="status"). */
export function Toast({ tone = 'success', children, onClose, duration = TOAST_DURACAO_MS, 'data-testid': testId }: ToastProps) {
  const fechar = useRef(onClose);
  useEffect(() => {
    fechar.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!duration) return;
    const t = setTimeout(() => fechar.current?.(), duration);
    return () => clearTimeout(t);
  }, [duration, children]);

  return (
    <div className={`ak-toast ak-toast-${tone}`} role="status" data-testid={testId}>
      {renderIcon(ICONE[tone], 20)}
      <span>{children}</span>
    </div>
  );
}
