import { isValidElement, type ReactNode } from 'react';
import { ICON_NAMES, renderIcon, type IconName } from '../../icons/icons';
import { cx, testIdParte, type TestIdProps } from '../../utils';
import { Badge } from '../Badge/Badge';

export interface CardProps extends TestIdProps {
  /** Até 6 palavras. */
  title?: ReactNode;
  /** Até 2 linhas no computador. */
  text?: ReactNode;
  /** Nome de ícone ou um elemento pronto. */
  icon?: IconName | ReactNode;
  number?: string;
  badge?: string;
  footer?: ReactNode;
  /** `surface` sobre bg; `sunken` sobre surface; `outline` em fundo de mesma cor; `brand` só no destaque da seção. */
  tone?: 'surface' | 'sunken' | 'outline' | 'brand';
  size?: 'sm' | 'md';
  /** Card clicável leva para um lugar só: link com href, botão com onClick. */
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const ehNomeDeIcone = (v: unknown): v is IconName => typeof v === 'string' && (ICON_NAMES as readonly string[]).includes(v);

/** Bloco com título, texto e um detalhe. O data-testid vai no card (div, link ou botão); o título ganha `{base}-title`. */
export function Card({ title, text, icon, number, badge, footer, tone = 'surface', size, href, onClick, children, 'data-testid': testId }: CardProps) {
  const clicavel = Boolean(href || onClick);
  const classes = cx('ak-card', `ak-card-${tone}`, clicavel && 'ak-card-link', size === 'sm' && 'ak-card-sm');
  const conteudo = (
    <>
      {icon != null && icon !== false && (
        <span className="ak-card-icon" aria-hidden="true">
          {ehNomeDeIcone(icon) ? renderIcon(icon, 26) : isValidElement(icon) ? icon : null}
        </span>
      )}
      {number && <span className="ak-num">{number}</span>}
      {title && (
        <span className="ak-card-title" data-testid={testIdParte(testId, 'title')}>
          {title}
          {badge && <Badge tone="neutral">{badge}</Badge>}
        </span>
      )}
      {text && <span className="ak-card-text">{text}</span>}
      {children}
      {footer && <span className="ak-card-footer">{footer}</span>}
    </>
  );
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
