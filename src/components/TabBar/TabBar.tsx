import { renderIcon } from '../../icons/icons';
import { testIdParte, useControllable, type TestIdProps } from '../../utils';
import { Destino, itemAtual, type NavItem } from './navegacao';

export interface TabBarProps extends TestIdProps {
  /** 3 a 5 abas, rótulos de 1 palavra. Padrão: Início, Agendamentos e Perfil. */
  items?: NavItem[];
  active?: string;
  onNavigate?: (id: string) => void;
  /** Nome da navegação para o leitor de tela. Padrão "Navegação principal". */
  label?: string;
}

const PADRAO: NavItem[] = [
  { id: 'inicio', label: 'Início', icon: 'store' },
  { id: 'agendamentos', label: 'Agendamentos', icon: 'calendar' },
  { id: 'perfil', label: 'Perfil', icon: 'user' },
];

/** Barra fixa de abas no rodapé do app. O data-testid vai no nav; cada aba ganha `{base}-{id}-tab`. */
export function TabBar({ items = PADRAO, active, onNavigate, label, 'data-testid': testId }: TabBarProps) {
  const [escolhido, definir] = useControllable<string>(active, items[0]?.id ?? '', onNavigate);
  const atual = itemAtual(items, escolhido);
  return (
    <nav className="ak-tabbar" aria-label={label || 'Navegação principal'} data-testid={testId}>
      {items.map((t) => (
        <Destino key={t.id} item={t} atual={t.id === atual} className="ak-tab" testId={testIdParte(testId, `${t.id}-tab`)} aoEscolher={definir}>
          {renderIcon(t.icon, 24)}
          <span>{t.label}</span>
        </Destino>
      ))}
    </nav>
  );
}
