import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type MouseEvent, type Ref } from 'react';
import { renderIcon, type IconName } from '../../icons/icons';
import { cx, type TestIdProps } from '../../utils';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel' | 'download' | 'hrefLang'>,
    TestIdProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'soft' | 'danger' | 'danger-outline';
  size?: 'sm' | 'md' | 'lg';
  /** Ocupa a largura toda (botão do rodapé do app no celular). */
  block?: boolean;
  /** Cantos redondos: usar em todos os botões do site. */
  pill?: boolean;
  /** Desativa o botão e mostra o spinner com `loadingText`. */
  loading?: boolean;
  /** Texto enquanto carrega, dizendo o que acontece: "Salvando…". Padrão "Carregando…". */
  loadingText?: string;
  /** Com href vira link com o mesmo visual (aceita target, rel e download). */
  href?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { variant = 'primary', size, block, pill, loading, loadingText, href, target, rel, download, hrefLang, iconLeft, iconRight, className, children, disabled, type, onClick, ...rest },
  ref,
) {
  const classes = cx(
    'ak-btn',
    `ak-btn-${variant}`,
    size && size !== 'md' && `ak-btn-${size}`,
    block && 'ak-btn-block',
    pill && 'ak-btn-pill',
    className,
  );
  const inativo = Boolean(disabled || loading);
  const conteudo = loading ? (
    <>
      <span className="ak-spin" aria-hidden="true" />
      <span>{loadingText || 'Carregando…'}</span>
    </>
  ) : (
    <>
      {iconLeft && <span className="ak-btn-ico">{renderIcon(iconLeft, 18)}</span>}
      <span>{children}</span>
      {iconRight && <span className="ak-btn-ico">{renderIcon(iconRight, 18)}</span>}
    </>
  );

  if (href) {
    // Link inativo perde o href (sai da ordem de foco e não navega) e avisa com aria-disabled.
    const aoClicar = (e: MouseEvent<HTMLAnchorElement>) => {
      if (inativo) {
        e.preventDefault();
        return;
      }
      onClick?.(e as unknown as MouseEvent<HTMLButtonElement>);
    };
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        ref={ref as Ref<HTMLAnchorElement>}
        href={inativo ? undefined : href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={download}
        hrefLang={hrefLang}
        role={inativo ? 'link' : undefined}
        aria-disabled={inativo ? 'true' : undefined}
        aria-busy={loading ? 'true' : undefined}
        className={classes}
        onClick={aoClicar}
      >
        {conteudo}
      </a>
    );
  }

  return (
    <button
      {...rest}
      ref={ref as Ref<HTMLButtonElement>}
      type={type ?? 'button'}
      className={classes}
      disabled={inativo}
      aria-busy={loading ? 'true' : undefined}
      onClick={onClick}
    >
      {conteudo}
    </button>
  );
});
