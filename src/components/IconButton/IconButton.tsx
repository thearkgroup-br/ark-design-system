import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { renderIcon, type IconName } from '../../icons/icons';
import { cx, type TestIdProps } from '../../utils';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>, TestIdProps {
  icon: IconName;
  /** Obrigatório: nome falado pelo leitor de tela e dica ao passar o mouse ("Fechar", "Editar serviço"). */
  label: string;
  /** `outline` em barras e cards, `plain` em cabeçalhos, `solid` na ação principal flutuante. */
  variant?: 'plain' | 'outline' | 'solid';
  /** `sm` (36 px) só no computador. */
  size?: 'sm' | 'md';
}

/** Botão só com ícone. O data-testid vai no botão. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant = 'outline', size, className, type, ...rest },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type={type ?? 'button'}
      className={cx('ak-iconbtn', `ak-iconbtn-${variant}`, size === 'sm' && 'ak-iconbtn-sm', className)}
      aria-label={label}
      title={label}
    >
      {renderIcon(icon, size === 'sm' ? 18 : 20)}
    </button>
  );
});
