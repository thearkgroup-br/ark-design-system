import type { ReactNode } from 'react';
import type { TestIdProps } from '../../utils';

export type Tom = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeStatus = 'ativo' | 'concluido' | 'cancelado' | 'falta' | 'pendente' | 'aberto' | 'fechado' | 'bloqueado' | 'embreve' | 'novo';

export interface BadgeProps extends TestIdProps {
  tone?: Tom;
  /** Usa a cor e o texto padrão do status. */
  status?: BadgeStatus;
  /** Até 3 palavras. Com `status`, troca só o texto. */
  children?: ReactNode;
}

const STATUS: Record<BadgeStatus, [Tom, string]> = {
  ativo: ['info', 'Ativo'],
  concluido: ['success', 'Concluído'],
  cancelado: ['neutral', 'Cancelado'],
  falta: ['danger', 'Não compareceu'],
  pendente: ['warning', 'Aguardando status'],
  aberto: ['success', 'Aberto agora'],
  fechado: ['neutral', 'Fechado'],
  bloqueado: ['danger', 'Bloqueado'],
  embreve: ['neutral', 'Em breve'],
  novo: ['brand', 'Novo'],
};

/** Selo curto de status ou destaque, sempre com texto. O data-testid vai no selo. */
export function Badge({ tone, status, children, 'data-testid': testId }: BadgeProps) {
  const [cor, texto] = status ? STATUS[status] : [tone ?? 'neutral', ''];
  return (
    <span className={`ak-badge ak-badge-${cor}`} data-testid={testId}>
      {children ?? texto}
    </span>
  );
}

/** Nome antigo da Íris, mesmo comportamento do Badge. */
export const StatusBadge = Badge;
