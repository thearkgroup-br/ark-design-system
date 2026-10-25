import { testIdParte, type TestIdProps } from '../../utils';
import { Logo, type Marca } from '../Logo/Logo';
import type { SiteLink } from '../SiteHeader/SiteHeader';

export interface FooterColumn {
  title: string;
  /** Texto (contato selecionável, horário) ou link. */
  items: (string | SiteLink)[];
}

export interface FooterProps extends TestIdProps {
  brand?: Marca;
  brandName?: string;
  tagline?: string;
  /** Até 3 colunas além da marca. */
  columns?: FooterColumn[];
  legal?: string;
  /** Sempre "Política de privacidade" e, quando houver cadastro, "Termos de uso". */
  bottomLinks?: SiteLink[];
}

/** Rodapé do site. O data-testid vai no footer; links ganham `{base}-link` (ou `{base}-{id}-link`) e os de baixo `{base}-legal-link`. */
export function Footer({ brand = 'ark', brandName, tagline, columns = [], legal, bottomLinks = [], 'data-testid': testId }: FooterProps) {
  const idLink = (padrao: string, l: SiteLink) => testIdParte(testId, l.id ? `${l.id}-link` : padrao);
  return (
    <footer className="ak-footer" data-testid={testId}>
      <div className="ak-footer-grid">
        <div className="ak-footer-brand">
          <Logo brand={brand} size={28} name={brandName} />
          {tagline && <span>{tagline}</span>}
        </div>
        {columns.map((col) => (
          <div key={col.title} className="ak-footer-col">
            <b>{col.title}</b>
            {col.items.map((it, i) =>
              typeof it === 'string' ? (
                <span key={i}>{it}</span>
              ) : (
                <a key={i} href={it.href || '#'} data-testid={idLink('link', it)}>
                  {it.label}
                </a>
              ),
            )}
          </div>
        ))}
      </div>
      <div className="ak-footer-bottom">
        <span data-testid={testIdParte(testId, 'legal')}>{legal ?? ''}</span>
        <span className="ak-row ak-footer-links">
          {bottomLinks.map((l) => (
            <a key={l.label} href={l.href || '#'} data-testid={idLink('legal-link', l)}>
              {l.label}
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}
