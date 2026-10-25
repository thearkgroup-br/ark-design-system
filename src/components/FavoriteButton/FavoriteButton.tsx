import { renderIcon } from '../../icons/icons';
import { useControllable, type TestIdProps } from '../../utils';

export interface FavoriteButtonProps extends TestIdProps {
  active?: boolean;
  defaultActive?: boolean;
  /** Nome do item, para o nome falado: "Favoritar Barbearia do Bairro". Padrão "este item". */
  label?: string;
  onToggle?: (active: boolean) => void;
}

/** Coração para favoritar. `aria-pressed` diz o estado; o nome muda entre "Favoritar …" e "Remover …". */
export function FavoriteButton({ active, defaultActive = false, label = 'este item', onToggle, 'data-testid': testId }: FavoriteButtonProps) {
  const [ativo, definir] = useControllable<boolean>(active, defaultActive, onToggle);
  return (
    <button
      type="button"
      className="ak-iconbtn ak-iconbtn-outline ak-fav"
      aria-pressed={ativo}
      aria-label={`${ativo ? 'Remover' : 'Favoritar'} ${label}`}
      onClick={() => definir(!ativo)}
      data-testid={testId}
    >
      {renderIcon('heart', 20, ativo)}
    </button>
  );
}
