import { renderIcon } from '../../icons/icons';
import { formatarDinheiro, testIdParte, useControllable, type TestIdProps } from '../../utils';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';

export interface ServiceItemProps extends TestIdProps {
  name: string;
  /** Até 2 linhas. */
  description?: string;
  /** Ex.: "40 min". */
  duration: string;
  /** Em reais: 35 vira "R$ 35,00". */
  price: number;
  /** Mostra "a partir de" quando o valor varia. */
  priceFrom?: boolean;
  selected?: boolean;
  defaultSelected?: boolean;
  onToggle?: (selected: boolean) => void;
  favorite?: boolean;
  /** `false` esconde o favoritar; uma função recebe o novo estado (acréscimo ao index.d.ts). */
  onFavorite?: false | ((favorite: boolean) => void);
}

/**
 * Serviço que o cliente marca (pode escolher vários). O data-testid vai no botão de marcar (role checkbox);
 * o favoritar, irmão dele, ganha `{base}-favorite-button`.
 */
export function ServiceItem({ name, description, duration, price, priceFrom, selected, defaultSelected = false, onToggle, favorite, onFavorite, 'data-testid': testId }: ServiceItemProps) {
  const [marcado, definir] = useControllable<boolean>(selected, defaultSelected, onToggle);
  return (
    <div className="ak-choice-wrap">
      <button type="button" className="ak-choice" role="checkbox" aria-checked={marcado} onClick={() => definir(!marcado)} data-testid={testId}>
        <span className="ak-check-box" aria-hidden="true">
          {marcado ? renderIcon('check', 14) : null}
        </span>
        <span className="ak-choice-text">
          <span className="ak-choice-title">{name}</span>
          {description && <span className="ak-choice-desc ak-clamp2">{description}</span>}
          <span className="ak-choice-desc ak-choice-duration">{duration}</span>
        </span>
        <span className="ak-price">
          {priceFrom && <small>a partir de</small>}
          {formatarDinheiro(price)}
        </span>
      </button>
      {onFavorite !== false && (
        <FavoriteButton
          label={name}
          {...(typeof onFavorite === 'function' ? { active: favorite, onToggle: onFavorite } : { defaultActive: favorite })}
          data-testid={testIdParte(testId, 'favorite-button')}
        />
      )}
    </div>
  );
}
