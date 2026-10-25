import { renderIcon } from '../../icons/icons';
import { cx, testIdParte, type TestIdProps } from '../../utils';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

export interface PlanCardProps extends TestIdProps {
  name: string;
  /** Para quem é. */
  description?: string;
  /** Sempre com "R$": "R$ 59,90". */
  price?: string;
  /** "/mês". */
  period?: string;
  /** Começam pelo que diferencia o plano. */
  features?: string[];
  /** Com href é link; sem href, botão com onClick (acréscimo). */
  cta?: { label: string; href?: string; onClick?: () => void };
  /** Um plano em destaque no máximo. */
  highlight?: boolean;
  /** Selo curto ("Para equipes"). Nunca "Mais escolhido" sem dado real. */
  badge?: string;
  /** Plano que ainda não existe: sem preço e sem botão. */
  soon?: boolean;
}

/** Plano com nome, preço, o que inclui e o botão. O data-testid vai no card; botão `{base}-cta-button` (ou `-cta-link`), preço `{base}-price`, itens `{base}-feature-item`. */
export function PlanCard({ name, description, price, period, features, cta, highlight, badge, soon, 'data-testid': testId }: PlanCardProps) {
  return (
    <div className={cx('ak-plan', highlight && 'ak-plan-hi', soon && 'ak-plan-soon')} data-testid={testId}>
      <div className="ak-plan-head">
        <b className="ak-plan-name">{name}</b>
        {badge && <Badge tone="brand">{badge}</Badge>}
      </div>
      {description && <span className="ak-li-sub">{description}</span>}
      {soon ? (
        <span className="ak-plan-soonlbl">Em breve</span>
      ) : (
        price && (
          <span className="ak-plan-price" data-testid={testIdParte(testId, 'price')}>
            <b>{price}</b>
            {period && <span>{period}</span>}
          </span>
        )
      )}
      {features && features.length > 0 && (
        <ul className="ak-plan-feat">
          {features.map((f, i) => (
            <li key={`${f}-${i}`} data-testid={testIdParte(testId, 'feature-item')}>
              <span>{renderIcon('check', 14)}</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      {cta && !soon && (
        <div className="ak-plan-cta">
          <Button
            variant={highlight ? 'primary' : 'secondary'}
            size="lg"
            block
            href={cta.href}
            onClick={cta.onClick}
            data-testid={testIdParte(testId, cta.href ? 'cta-link' : 'cta-button')}
          >
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}
