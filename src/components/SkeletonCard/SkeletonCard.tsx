import type { TestIdProps } from '../../utils';
import { Skeleton } from '../Skeleton/Skeleton';

export interface SkeletonCardProps extends TestIdProps {
  /** Formato do item real: `list`, `establishment`, `service`, `booking` (agendamento) ou `card`. */
  variant?: 'list' | 'establishment' | 'service' | 'booking' | 'card';
}

/** Skeleton pronto de um item. Mostre 3 a 5 enquanto a lista carrega; escondido do leitor de tela. */
export function SkeletonCard({ variant = 'list', 'data-testid': testId }: SkeletonCardProps) {
  if (variant === 'booking') {
    return (
      <div className="ak-sk-card ak-sk-col" aria-hidden="true" data-testid={testId}>
        <div className="ak-sk-linha">
          <Skeleton width={44} height={44} circle />
          <div className="ak-sk-linhas">
            <Skeleton width="45%" height={12} />
            <Skeleton width="75%" height={18} />
            <Skeleton width="55%" height={12} />
          </div>
          <Skeleton width={64} height={24} radius={999} />
        </div>
        <div className="ak-sk-rodape">
          <Skeleton width={64} height={16} />
          <div className="ak-sk-botoes">
            <Skeleton width={84} height={44} radius={12} />
            <Skeleton width={92} height={44} radius={12} />
          </div>
        </div>
      </div>
    );
  }
  if (variant === 'card') {
    return (
      <div className="ak-sk-card ak-sk-col" aria-hidden="true" data-testid={testId}>
        <Skeleton width={52} height={52} radius={16} />
        <Skeleton width="60%" height={22} />
        <Skeleton width="95%" height={12} />
        <Skeleton width="80%" height={12} />
      </div>
    );
  }
  const inicio =
    variant === 'establishment' ? <Skeleton width={64} height={64} radius={14} /> : variant === 'service' ? <Skeleton width={24} height={24} radius={8} /> : <Skeleton width={44} height={44} circle />;
  return (
    <div className="ak-sk-card" aria-hidden="true" data-testid={testId}>
      {inicio}
      <div className="ak-sk-linhas">
        <Skeleton width="70%" height={16} />
        <Skeleton width="45%" height={12} />
        <Skeleton width="30%" height={12} />
      </div>
      {variant === 'service' && <Skeleton width={56} height={16} />}
    </div>
  );
}
