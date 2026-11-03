import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, render, screen } from '@testing-library/react';
import { ActionBar } from './ActionBar';

const ID = 'ark-landing-action-bar';
const props = {
  message: 'Pronto para começar?',
  primaryAction: { label: 'Entrar na lista', href: '#contato' },
  secondaryAction: { label: 'Ver como funciona', href: '#como-funciona' },
  whatsapp: { href: 'https://wa.me/5511999999999' },
  'data-testid': ID,
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('ActionBar', () => {
  it('mostra a frase, o botão principal, o link secundário e o WhatsApp com data-testid derivado', () => {
    render(<ActionBar {...props} />);
    expect(screen.getByTestId(ID)).toHaveAttribute('aria-label', 'Ação principal');
    expect(screen.getByTestId(`${ID}-message`)).toHaveTextContent('Pronto para começar?');
    expect(screen.getByTestId(`${ID}-primary-link`)).toHaveAttribute('href', '#contato');
    expect(screen.getByTestId(`${ID}-secondary-link`)).toHaveAttribute('href', '#como-funciona');
    expect(screen.getByTestId(`${ID}-whatsapp-link`)).toHaveAttribute('href', 'https://wa.me/5511999999999');
  });

  it('está sempre visível: sem aria-hidden, sem foco removido e sem observador de rolagem', () => {
    const observador = vi.fn();
    vi.stubGlobal('IntersectionObserver', observador);
    render(<ActionBar {...props} />);
    expect(observador).not.toHaveBeenCalled();
    expect(screen.getByTestId(ID)).not.toHaveAttribute('aria-hidden');
    expect(screen.getByTestId(`${ID}-primary-link`)).not.toHaveAttribute('tabindex');
  });

  it('o WhatsApp abre em nova aba, se chama "Falar no WhatsApp" e mostra "WhatsApp" por padrão', () => {
    render(<ActionBar {...props} />);
    const link = screen.getByRole('link', { name: 'Falar no WhatsApp' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent('WhatsApp');
    expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('o rótulo do WhatsApp pode ser trocado', () => {
    render(<ActionBar {...props} whatsapp={{ href: 'https://wa.me/1', label: 'Chamar' }} />);
    expect(screen.getByTestId(`${ID}-whatsapp-link`)).toHaveTextContent('Chamar');
  });

  it('o WhatsApp fica entre a frase e o botão principal', () => {
    render(<ActionBar {...props} />);
    const whats = screen.getByTestId(`${ID}-whatsapp-link`);
    const principal = screen.getByTestId(`${ID}-primary-link`);
    const frase = screen.getByTestId(`${ID}-message`);
    expect(frase.compareDocumentPosition(whats) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(whats.compareDocumentPosition(principal) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('sem as props opcionais não desenha o link secundário nem o WhatsApp; sem data-testid as partes ficam sem id', () => {
    const { container } = render(<ActionBar message="Oi" primaryAction={{ label: 'Ir', href: '#a' }} />);
    expect(container.querySelector('.ak-actionbar-second')).toBeNull();
    expect(container.querySelector('.ak-actionbar-whats')).toBeNull();
    expect(screen.queryByTestId(`${ID}-message`)).toBeNull();
  });

  it('reserva o espaço da altura da barra', () => {
    let aoMedir: () => void = () => {};
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: () => void) {
          aoMedir = cb;
        }
        observe() {}
        disconnect() {}
      },
    );
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(80);
    const { container } = render(<ActionBar {...props} />);
    const reserva = container.querySelector<HTMLElement>('.ak-actionbar-reserva')!;
    expect(reserva.style.height).toBe('');
    act(() => aoMedir());
    expect(reserva.style.height).toBe('80px');
  });

  it('desconecta o medidor ao sair', () => {
    const desconectar = vi.fn();
    vi.stubGlobal('ResizeObserver', class { observe() {} disconnect = desconectar; });
    render(<ActionBar {...props} />).unmount();
    expect(desconectar).toHaveBeenCalled();
  });

  it('o CSS usa só tokens, safe-area, 8 px a mais de altura e só o ícone do WhatsApp no celular', () => {
    const css = readFileSync(resolve(__dirname, 'ActionBar.css'), 'utf8');
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(css).not.toMatch(/rgba?\(/);
    expect(css).toContain('safe-area-inset-bottom');
    expect(css).toMatch(/calc\(var\(--space-3\) \+ 4px\)/);
    expect(css).toMatch(/@media \(max-width: 559px\)[\s\S]*\.ak-actionbar-whats-txt \{ display: none/);
    expect(css).toMatch(/@media \(max-width: 559px\)[\s\S]*\.ak-actionbar-second \{ display: none/);
    expect(css).not.toContain('transition');
    // Até 439 px a frase sai da vista (o leitor de tela continua lendo) e o botão principal ocupa a linha.
    expect(css).toMatch(/@media \(max-width: 439px\)[\s\S]*\.ak-actionbar-msg \{ position: absolute/);
    expect(css).toMatch(/@media \(max-width: 439px\)[\s\S]*\.ak-actionbar-actions \.ak-btn \{ flex: 1 1 auto/);
  });
});
