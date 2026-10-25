import { renderIcon } from '../../icons/icons';
import { useControllable, type TestIdProps } from '../../utils';
import './ThemeToggle.css';

export interface ThemeToggleProps extends TestIdProps {
  /** Modo escuro ligado (controlado). */
  dark?: boolean;
  defaultDark?: boolean;
  /** Só avisa a escolha; quem usa troca o data-theme da página (ex.: iris ↔ iris-escuro). */
  onChange?: (dark: boolean) => void;
}

/** Alterna entre modo claro e escuro. Largura fixa para nada ao redor mudar de lugar. */
export function ThemeToggle({ dark, defaultDark = false, onChange, 'data-testid': testId }: ThemeToggleProps) {
  const [escuro, definir] = useControllable<boolean>(dark, defaultDark, onChange);
  return (
    <button
      type="button"
      className="ak-theme"
      aria-pressed={escuro ? 'true' : 'false'}
      onClick={() => definir(!escuro)}
      data-testid={testId}
    >
      {renderIcon(escuro ? 'sun' : 'moon', 18)}
      <span>{escuro ? 'Modo claro' : 'Modo escuro'}</span>
    </button>
  );
}
