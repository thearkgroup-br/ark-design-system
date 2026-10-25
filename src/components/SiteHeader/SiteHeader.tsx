import { useEffect, useId, useRef, useState } from 'react';
import { cx, testIdParte, useControllable, type TestIdProps } from '../../utils';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Logo, type Marca } from '../Logo/Logo';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

/** Link do site. `id` (opcional, fixo e em inglês) vira parte do data-testid: `{base}-{id}-link`. */
export interface SiteLink {
  label: string;
  href?: string;
  id?: string;
}

export interface SiteHeaderProps extends TestIdProps {
  brand?: Marca;
  brandName?: string;
  homeHref?: string;
  /** Até 5 links de 1 a 3 palavras. */
  links?: SiteLink[];
  /** Um botão principal no máximo ("Fale com a gente"). */
  cta?: SiteLink;
  pill?: boolean;
  /** Mostra o ThemeToggle. Padrão true. */
  themeToggle?: boolean;
  dark?: boolean;
  defaultDark?: boolean;
  onThemeChange?: (dark: boolean) => void;
  /** Preso no topo ao rolar. Padrão true. */
  sticky?: boolean;
}

const NOME_DA_MARCA: Record<Marca, string> = { ark: 'The Ark Group', iris: 'Íris', pulse: 'Pulse' };

/**
 * Cabeçalho fixo do site. O data-testid vai no header. Abaixo de 860 px (largura do próprio cabeçalho)
 * os links vão para o menu; abaixo de 420 px o botão principal sai do topo.
 */
export function SiteHeader({
  brand = 'ark',
  brandName,
  homeHref = '#',
  links = [],
  cta,
  pill,
  themeToggle = true,
  dark,
  defaultDark = false,
  onThemeChange,
  sticky = true,
  'data-testid': testId,
}: SiteHeaderProps) {
  const [aberto, setAberto] = useState(false);
  // Um estado só para o tema do topo e o do menu não ficarem diferentes.
  const [escuro, definirEscuro] = useControllable<boolean>(dark, defaultDark, onThemeChange);
  const menuId = `ak-menu-${useId().replace(/:/g, '')}`;
  const botaoMenu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAberto(false);
        botaoMenu.current?.focus();
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [aberto]);

  const idLink = (prefixo: string, l: SiteLink) => testIdParte(testId, l.id ? `${prefixo}${l.id}-link` : `${prefixo}nav-link`);
  const tema = (parte: string) =>
    themeToggle ? <ThemeToggle dark={escuro} onChange={definirEscuro} data-testid={testIdParte(testId, parte)} /> : null;
  const botao = (parte: string) =>
    cta ? (
      <Button href={cta.href || '#'} pill={pill} data-testid={testIdParte(testId, parte)}>
        {cta.label}
      </Button>
    ) : null;

  return (
    <header className={cx('ak-siteheader', sticky && 'ak-sticky')} data-testid={testId}>
      <div className="ak-siteheader-in">
        <a href={homeHref} className="ak-siteheader-logo" aria-label={`${brandName ?? NOME_DA_MARCA[brand]}: início`} data-testid={testIdParte(testId, 'logo-link')}>
          <Logo brand={brand} size={brand === 'iris' ? 30 : 34} name={brandName} />
        </a>
        <nav className="ak-siteheader-nav" aria-label="Menu">
          {links.map((l) => (
            <a key={l.label} href={l.href || '#'} className="ak-navlink" data-testid={idLink('', l)}>
              {l.label}
            </a>
          ))}
          {tema('theme-button')}
          {botao('cta-link')}
        </nav>
        <div className="ak-siteheader-mobile">
          {botao('mobile-cta-link')}
          <IconButton
            ref={botaoMenu}
            icon={aberto ? 'close' : 'menu'}
            label={aberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={aberto}
            aria-controls={menuId}
            onClick={() => setAberto(!aberto)}
            data-testid={testIdParte(testId, 'menu-button')}
          />
        </div>
      </div>
      {aberto && (
        <nav id={menuId} className="ak-siteheader-drawer" aria-label="Menu" data-testid={testIdParte(testId, 'menu')}>
          {links.map((l) => (
            <a key={l.label} href={l.href || '#'} className="ak-drawer-link" onClick={() => setAberto(false)} data-testid={idLink('menu-', l)}>
              {l.label}
            </a>
          ))}
          {tema('menu-theme-button')}
        </nav>
      )}
    </header>
  );
}
