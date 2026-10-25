import { testIdParte, type TestIdProps } from '../../utils';

export interface PriceListProps extends TestIdProps {
  /** `price` já escrito: "a partir de R$ 2.000,00", "sob orçamento". */
  items: { name: string; desc?: string; price: string }[];
}

/** Lista de serviços com descrição e preço (Arca Dev). Cada linha ganha `{base}-item`; no estreito, empilha. */
export function PriceList({ items, 'data-testid': testId }: PriceListProps) {
  return (
    <ul className="ak-pricelist" data-testid={testId}>
      {items.map((it, i) => (
        <li key={`${it.name}-${i}`} className="ak-price-row" data-testid={testIdParte(testId, 'item')}>
          <b className="ak-price-name">{it.name}</b>
          <span className="ak-li-sub">{it.desc}</span>
          <span className="ak-price-val">{it.price}</span>
        </li>
      ))}
    </ul>
  );
}
