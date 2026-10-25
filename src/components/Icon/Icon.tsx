import { renderIcon, type IconName } from '../../icons/icons';
import type { TestIdProps } from '../../utils';

export interface IconProps extends TestIdProps {
  name: IconName;
  /** 16 em selos e listas, 20 em botões e campos, 24 na tab bar, 26–28 em cards e estados vazios. */
  size?: number;
  /** Preenche coração e estrela. */
  filled?: boolean;
  /** Cor do ícone. Use sempre um token: `var(--brand)`. Sem ela, pega a cor do texto. */
  color?: string;
  /** Só quando o ícone sozinho carrega significado; sem label ele é escondido do leitor de tela. */
  label?: string;
}

/** Ícone de traço 2 px em currentColor. Sempre acompanhado de texto ou com `label`. */
export function Icon({ name, size = 20, filled, color, label, 'data-testid': testId }: IconProps) {
  return (
    <span
      className="ak-icon"
      style={color ? { color } : undefined}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-testid={testId}
    >
      {renderIcon(name, size, filled)}
    </span>
  );
}
