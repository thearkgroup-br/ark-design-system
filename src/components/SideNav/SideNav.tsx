import type { ReactNode } from 'react';
import { renderIcon } from '../../icons/icons';
import { testIdParte, useControllable, type TestIdProps } from '../../utils';
import { Logo, type Marca } from '../Logo/Logo';
import { Destino, type NavItem } from '../TabBar/navegacao';

export interface SideNavProps extends TestIdProps {
  /** Mesmos destinos da TabBar, mais os que só fazem sentido no computador. */
  items: NavItem[];
  active?: string;
  onNavigate?: (id: string) => void;
  brand?: Marca;
  brandName?: string;
  footer?: ReactNode;
  /** Nome da navegação para o leitor de tela. Padrão "Menu do painel". */
  label?: string;
}

/** Menu lateral do painel no computador. O data-testid vai no nav; cada item ganha `{base}-{id}-link`. */
export function SideNav({ items, active, onNavigate, brand, brandName, footer, label, 'data-testid': testId }: SideNavProps) {
  const [atual, definir] = useControllable<string>(active, items[0]?.id ?? '', onNavigate);
  return (
    <nav className="ak-sidenav" aria-label={label || 'Menu do painel'} data-testid={testId}>
      {brand && (
        <div className="ak-sidenav-brand">
          <Logo brand={brand} size={26} name={brandName} />
        </div>
      )}
      <ul className="ak-sidenav-list">
        {items.map((t) => (
          <li key={t.id}>
            <Destino item={t} atual={t.id === atual} className="ak-sidenav-item" testId={testIdParte(testId, `${t.id}-link`)} aoEscolher={definir}>
              {renderIcon(t.icon, 20)}
              <span className="ak-sidenav-label">{t.label}</span>
              {t.count != null && (
                <span className="ak-sidenav-count" data-testid={testIdParte(testId, `${t.id}-count`)}>
                  {t.count}
                </span>
              )}
            </Destino>
          </li>
        ))}
      </ul>
      {footer && <div className="ak-sidenav-footer">{footer}</div>}
    </nav>
  );
}
