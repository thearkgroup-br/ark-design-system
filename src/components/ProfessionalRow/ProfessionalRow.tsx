import { testIdParte, type TestIdProps } from '../../utils';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';

export interface ProfessionalRowProps extends TestIdProps {
  /** Só o nome, sem foto. Quebra linha quando é grande. */
  name: string;
  subtitle?: string;
  selected?: boolean;
  onSelect?: () => void;
  favorite?: boolean;
  /** Acréscimo ao index.d.ts: recebe o novo estado do favorito. */
  onFavorite?: (favorite: boolean) => void;
  /** "Qualquer profissional": vem primeiro e não tem favoritar. */
  anyone?: boolean;
}

/**
 * Linha de escolha do profissional (escolha única, role radio). Coloque as linhas dentro de um
 * `<div role="radiogroup" aria-label="Profissional">`. O data-testid vai no radio; o favoritar ganha `{base}-favorite-button`.
 */
export function ProfessionalRow({ name, subtitle, selected, onSelect, favorite, onFavorite, anyone, 'data-testid': testId }: ProfessionalRowProps) {
  return (
    <div className="ak-choice-wrap">
      <button type="button" className="ak-choice ak-choice-center" role="radio" aria-checked={Boolean(selected)} onClick={onSelect} data-testid={testId}>
        <span className="ak-check-box ak-radio" aria-hidden="true">
          {selected && <span className="ak-radio-dot" />}
        </span>
        <span className="ak-choice-text">
          <span className="ak-choice-title">{name}</span>
          {subtitle && <span className="ak-choice-desc">{subtitle}</span>}
        </span>
      </button>
      {!anyone && (
        <FavoriteButton
          label={name}
          // Sem quem avise, o coração funciona sozinho e recomeça quando `favorite` muda (favoritos que chegam depois).
          key={onFavorite ? 'controlado' : `fav-${String(favorite)}`}
          {...(onFavorite ? { active: favorite, onToggle: onFavorite } : { defaultActive: favorite })}
          data-testid={testIdParte(testId, 'favorite-button')}
        />
      )}
    </div>
  );
}
