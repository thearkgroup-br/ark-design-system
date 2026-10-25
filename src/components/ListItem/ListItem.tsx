import type { ReactNode } from 'react';
import { renderIcon, type IconName } from '../../icons/icons';
import { cx, type TestIdProps } from '../../utils';
import { Avatar } from '../Avatar/Avatar';

export interface ListItemProps extends TestIdProps {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: IconName;
  /** Nome da pessoa: mostra as iniciais. */
  avatar?: string;
  leading?: ReactNode;
  /** Ação ou valor na própria linha (switch, valor). */
  trailing?: ReactNode;
  href?: string;
  onClick?: () => void;
  /** Seta de "abre outra tela". Padrão: aparece quando a linha é link ou botão. */
  chevron?: boolean;
}

/**
 * Linha de lista, 64 px de altura mínima. O data-testid vai na linha. Numa lista que se repete,
 * passe o mesmo id a todas as linhas (ex.: `iris-appointments-upcoming-item`).
 */
export function ListItem({ title, subtitle, icon, avatar, leading, trailing, href, onClick, chevron, 'data-testid': testId }: ListItemProps) {
  const clicavel = Boolean(href || onClick);
  // O avatar repete o nome do título: fica escondido para o leitor de tela não ler duas vezes.
  const inicio = avatar ? (
    <span className="ak-li-avatar" aria-hidden="true">
      <Avatar name={avatar} size={40} />
    </span>
  ) : icon ? <span className="ak-li-icon">{renderIcon(icon, 20)}</span> : leading;
  const conteudo = (
    <>
      {inicio}
      <span className="ak-li-text">
        <span className="ak-li-title">{title}</span>
        {subtitle && <span className="ak-li-sub">{subtitle}</span>}
      </span>
      {trailing}
      {clicavel && chevron !== false && <span className="ak-chev">{renderIcon('chevronRight', 18)}</span>}
    </>
  );
  const classes = cx('ak-li', clicavel && 'ak-li-link');
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} data-testid={testId}>
        {conteudo}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick} data-testid={testId}>
        {conteudo}
      </button>
    );
  }
  return (
    <div className={classes} data-testid={testId}>
      {conteudo}
    </div>
  );
}
