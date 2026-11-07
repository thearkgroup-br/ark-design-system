import type { ReactNode } from 'react';
import type { TestIdProps } from '../../utils';
import { Footer, type FooterColumn } from '../Footer/Footer';
import type { Marca } from '../Logo/Logo';
import type { SiteLink } from '../SiteHeader/SiteHeader';

export const NOTA_DO_GRUPO = 'Um produto do The Ark Group';

export interface SiteFooterProps extends TestIdProps {
  brand?: Marca;
  brandName?: string;
  /** Logo da marca desenhado fora do design system. */
  logo?: ReactNode;
  tagline?: string;
  columns?: FooterColumn[];
  legal?: string;
  bottomLinks?: SiteLink[];
  /** `product` diz "Um produto do The Ark Group"; `group` é o rodapé do próprio grupo. */
  variant?: 'product' | 'group';
}

/** Rodapé de todos os sites: marca, frase, colunas e linha legal. Produto leva "Um produto do The Ark Group" (`{base}-group`). */
export function SiteFooter({ variant = 'product', ...resto }: SiteFooterProps) {
  return <Footer {...resto} note={variant === 'product' ? NOTA_DO_GRUPO : undefined} />;
}
