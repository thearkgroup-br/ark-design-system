import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, render, screen } from '@testing-library/react';
import { ActionBar } from './ActionBar';

type Entrada = Partial<IntersectionObserverEntry>;
type Callback = (entradas: Entrada[]) => void;
const observadores: FakeIO[] = [];

class FakeIO {
  disconnect = vi.fn();
  cb: Callback;
  constructor(cb: Callback) {
    this.cb = cb;
    observadores.push(this);
  }
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
}

const ID = 'ark-landing-action-bar';
const props = {
  message: 'Pronto para começar?',
  primaryAction: { label: 'Entrar na lista', href: '#contato' },
  secondaryAction: { label: 'Ver como funciona', href: '#como-funciona' },
  triggerSelector: '#hero-cta',
  hideSelectors: ['#contato', 'footer'] as string | string[] | undefined,
  'data-testid': ID,
};

function pagina(extra: Partial<typeof props> = {}) {
  return render(
    <>
      <a id="hero-cta" href="#x">
        Topo
      </a>
      <section id="contato">Contato</section>
      <footer>Rodapé</footer>
      <ActionBar {...props} {...extra} />
    </>,
  );
}
const emitir = (i: number, entradas: Entrada[]) => act(() => observadores[i].cb(entradas));
const gatilho = (isIntersecting: boolean, top: number): Entrada[] => [{ isIntersecting, boundingClientRect: { top } as DOMRect }];

beforeEach(() => {
  observadores.length = 0;
  vi.stubGlobal('IntersectionObserver', FakeIO);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('ActionBar', () => {
  it('mostra a frase, o botão principal e o link secundário com data-testid derivado', () => {
    pagina();
    expect(screen.getByTestId(ID)).toHaveAttribute('aria-label', 'Ação principal');
    expect(screen.getByTestId(`${ID}-message`)).toHaveTextContent('Pronto para começar?');
    expect(screen.getByTestId(`${ID}-primary-link`)).toHaveAttribute('href', '#contato');
    expect(screen.getByTestId(`${ID}-secondary-link`)).toHaveAttribute('href', '#como-funciona');
  });

  it('sem link secundário não desenha o link; sem data-testid as partes ficam sem id', () => {
    const { container } = render(<ActionBar message="Oi" primaryAction={{ label: 'Ir', href: '#a' }} triggerSelector="#nada" />);
    expect(container.querySelector('.ak-actionbar-second')).toBeNull();
    expect(screen.queryByTestId(`${ID}-message`)).toBeNull();
  });

  it('começa escondida e fora do foco', () => {
    pagina();
    const barra = screen.getByTestId(ID);
    expect(barra).not.toHaveClass('ak-actionbar-on');
    expect(barra).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId(`${ID}-primary-link`)).toHaveAttribute('tabindex', '-1');
    expect(screen.getByTestId(`${ID}-secondary-link`)).toHaveAttribute('tabindex', '-1');
  });

  it('aparece quando o botão do topo sai da tela por cima', () => {
    pagina();
    emitir(0, gatilho(false, -50));
    const barra = screen.getByTestId(ID);
    expect(barra).toHaveClass('ak-actionbar-on');
    expect(barra).not.toHaveAttribute('aria-hidden');
    expect(screen.getByTestId(`${ID}-primary-link`)).not.toHaveAttribute('tabindex');
  });

  it('não aparece se o botão ainda está embaixo, e some quando ele volta', () => {
    pagina();
    emitir(0, gatilho(false, 900));
    expect(screen.getByTestId(ID)).not.toHaveClass('ak-actionbar-on');
    emitir(0, gatilho(false, -50));
    expect(screen.getByTestId(ID)).toHaveClass('ak-actionbar-on');
    emitir(0, gatilho(true, 10));
    expect(screen.getByTestId(ID)).not.toHaveClass('ak-actionbar-on');
  });

  it('some enquanto o contato ou o rodapé estão na tela e volta quando saem', () => {
    pagina();
    emitir(0, gatilho(false, -50));
    const contato = document.getElementById('contato')!;
    const rodape = document.querySelector('footer')!;
    emitir(1, [{ isIntersecting: true, target: contato }]);
    expect(screen.getByTestId(ID)).not.toHaveClass('ak-actionbar-on');
    emitir(1, [{ isIntersecting: true, target: rodape }]);
    emitir(1, [{ isIntersecting: false, target: contato }]);
    expect(screen.getByTestId(ID)).not.toHaveClass('ak-actionbar-on');
    emitir(1, [{ isIntersecting: false, target: rodape }]);
    expect(screen.getByTestId(ID)).toHaveClass('ak-actionbar-on');
  });

  it('aceita um seletor só e funciona sem seletor de esconder', () => {
    pagina({ hideSelectors: '#contato' });
    expect(observadores).toHaveLength(2);
    observadores.length = 0;
    pagina({ hideSelectors: undefined });
    expect(observadores).toHaveLength(1);
  });

  it('sem o elemento do topo na página, fica escondida', () => {
    render(<ActionBar {...props} triggerSelector="#nao-existe" />);
    expect(observadores).toHaveLength(0);
    expect(screen.getByTestId(ID)).not.toHaveClass('ak-actionbar-on');
  });

  it('sem IntersectionObserver, fica escondida em vez de quebrar', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    pagina();
    expect(screen.getByTestId(ID)).not.toHaveClass('ak-actionbar-on');
  });

  it('reserva o espaço da altura da barra só enquanto ela aparece', () => {
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
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(72);
    const { container } = pagina();
    const reserva = container.querySelector<HTMLElement>('.ak-actionbar-reserva')!;
    act(() => aoMedir());
    expect(reserva.style.height).toBe('0px');
    emitir(0, gatilho(false, -50));
    expect(reserva.style.height).toBe('72px');
  });

  it('desconecta os observadores ao sair', () => {
    const { unmount } = pagina();
    unmount();
    expect(observadores.length).toBeGreaterThan(0);
    expect(observadores.every((o) => o.disconnect.mock.calls.length > 0)).toBe(true);
  });

  it('o CSS usa só tokens, safe-area, animação curta e respeita prefers-reduced-motion', () => {
    const css = readFileSync(resolve(__dirname, 'ActionBar.css'), 'utf8');
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(css).not.toMatch(/rgba?\(/);
    expect(css).toContain('safe-area-inset-bottom');
    expect(css).toMatch(/prefers-reduced-motion: reduce\) \{ \.ak-actionbar \{ transition: none/);
    expect(css).toMatch(/@media \(max-width: 559px\)[^}]*\.ak-actionbar-second \{ display: none/s);
    expect(css).toMatch(/transition: transform 200ms/);
  });
});
