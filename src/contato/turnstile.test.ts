import { SCRIPT_DO_TURNSTILE, carregarTurnstile, type Turnstile } from './turnstile';

const FALSO: Turnstile = { render: vi.fn(), reset: vi.fn(), remove: vi.fn() };
const scripts = () => document.head.querySelectorAll(`script[src="${SCRIPT_DO_TURNSTILE}"]`);

afterEach(() => {
  delete window.turnstile;
  scripts().forEach((s) => s.remove());
});

describe('script do Turnstile', () => {
  it('já carregado, não põe outro script', async () => {
    window.turnstile = FALSO;
    await expect(carregarTurnstile()).resolves.toBe(FALSO);
    expect(scripts()).toHaveLength(0);
  });

  it('põe o script uma vez só, assíncrono, mesmo com duas chamadas', async () => {
    const primeira = carregarTurnstile();
    const segunda = carregarTurnstile();
    expect(scripts()).toHaveLength(1);
    expect((scripts()[0] as HTMLScriptElement).async).toBe(true);
    window.turnstile = FALSO;
    scripts()[0].dispatchEvent(new Event('load'));
    await expect(primeira).resolves.toBe(FALSO);
    await expect(segunda).resolves.toBe(FALSO);
  });

  it('se o script falha, tira ele e deixa tentar de novo', async () => {
    const primeira = carregarTurnstile();
    scripts()[0].dispatchEvent(new Event('error'));
    await expect(primeira).rejects.toThrow('Turnstile não carregou.');
    expect(scripts()).toHaveLength(0);
    const segunda = carregarTurnstile();
    expect(scripts()).toHaveLength(1);
    window.turnstile = FALSO;
    scripts()[0].dispatchEvent(new Event('load'));
    await expect(segunda).resolves.toBe(FALSO);
  });

  it('script carregado sem a API conta como falha', async () => {
    const carregando = carregarTurnstile();
    scripts()[0].dispatchEvent(new Event('load'));
    await expect(carregando).rejects.toThrow('Turnstile sem a API.');
    expect(scripts()).toHaveLength(0);
  });
});
