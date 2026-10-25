import type { CSSProperties } from 'react';
import { renderIcon } from '../../icons/icons';
import { cx, iniciais, testIdParte, type TestIdProps } from '../../utils';
import { Badge } from '../Badge/Badge';
import { Rating } from '../Rating/Rating';

export interface EstablishmentCardProps extends TestIdProps {
  /** Até 2 linhas com "…"; o nome completo fica no title e na página do negócio. */
  name: string;
  category?: string;
  distance?: string;
  rating?: number;
  open?: boolean;
  image?: string;
  /** Cor de destaque do negócio (dado do cadastro, validada com 4.5:1 sobre branco). Sem ela, usa a cor da marca. */
  color?: string;
  href?: string;
}

// Regra de cadastro (Regras de campos › Cor de destaque): a cor do negócio tem contraste 4.5:1 com branco,
// então as iniciais sobre ela são sempre brancas. É a única cor fixa fora do Logo.
const TEXTO_SOBRE_COR_DO_NEGOCIO = '#FFFFFF';

/** Card do negócio na busca, na Início e nos favoritos da Íris. O data-testid vai no card (link ou div). */
export function EstablishmentCard({ name, category, distance, rating, open, image, color, href, 'data-testid': testId }: EstablishmentCardProps) {
  const fundo: CSSProperties | undefined = color ? { backgroundColor: color, color: TEXTO_SOBRE_COR_DO_NEGOCIO } : undefined;
  const conteudo = (
    <>
      <span className={cx('ak-thumb', !color && 'ak-thumb-marca')} style={fundo} data-testid={testIdParte(testId, 'thumb')}>
        {image ? <img src={image} alt="" /> : <span aria-hidden="true">{iniciais(name)}</span>}
      </span>
      <span className="ak-li-text">
        <span className="ak-li-title ak-clamp2" title={name}>
          {name}
        </span>
        {(category || distance) && <span className="ak-li-sub">{[category, distance].filter(Boolean).join(' · ')}</span>}
        <span className="ak-row ak-estab-meta">
          <Rating value={rating} compact />
          {open != null && <Badge status={open ? 'aberto' : 'fechado'} />}
        </span>
      </span>
      {href && <span className="ak-chev">{renderIcon('chevronRight', 18)}</span>}
    </>
  );
  if (href) {
    return (
      <a href={href} className="ak-li ak-li-card ak-li-link" data-testid={testId}>
        {conteudo}
      </a>
    );
  }
  return (
    <div className="ak-li ak-li-card" data-testid={testId}>
      {conteudo}
    </div>
  );
}
