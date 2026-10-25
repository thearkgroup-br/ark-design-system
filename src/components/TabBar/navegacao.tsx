import type { ReactNode } from 'react';
import type { IconName } from '../../icons/icons';

/** Destino da TabBar e da SideNav. `id` é fixo e em inglês: vira parte do data-testid. */
export interface NavItem {
  id: string;
  label: string;
  icon: IconName;
  href?: string;
  count?: number;
}

/** Item atual que existe na lista; se o escolhido sumiu (lista mudou), volta para o primeiro. */
export function itemAtual(itens: NavItem[], escolhido: string): string | undefined {
  return itens.some((i) => i.id === escolhido) ? escolhido : itens[0]?.id;
}

interface DestinoProps {
  item: NavItem;
  atual: boolean;
  className: string;
  testId?: string;
  aoEscolher: (id: string) => void;
  children: ReactNode;
}

/** Item de navegação: link quando tem href; sem href, botão que só avisa a escolha (app de página única). */
export function Destino({ item, atual, className, testId, aoEscolher, children }: DestinoProps) {
  const comum = { className, 'aria-current': atual ? ('page' as const) : undefined, 'data-testid': testId };
  if (item.href) {
    return (
      <a
        {...comum}
        href={item.href}
        onClick={(e) => {
          // Ctrl/Cmd/Shift ou botão do meio abre em outra aba: a aba atual desta página não muda.
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
          aoEscolher(item.id);
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <button {...comum} type="button" onClick={() => aoEscolher(item.id)}>
      {children}
    </button>
  );
}
