import { act, render } from '@testing-library/react';
import { SCRIPT_DO_TURNSTILE, type OpcoesDoTurnstile, type Turnstile } from './turnstile';
import { useTurnstile } from './useTurnstile';

type Verificacao = ReturnType<typeof useTurnstile>;

/** Turnstile falso: guarda as opções do render para o teste mandar o token na hora que quiser. */
function turnstileFalso() {
  let opcoes: OpcoesDoTurnstile | undefined;
  const falso = {
    render: vi.fn((_: HTMLElement, o: OpcoesDoTurnstile) => {
      opcoes = o;
      return 'widget-1';
    }),
    reset: vi.fn(),
    remove: vi.fn(),
  } satisfies Turnstile;
  window.turnstile = falso;
  return { falso, opcoes: () => opcoes! };
}

function montar(siteKey?: string) {
  let atual: Verificacao | undefined;
  function Caixa() {
    atual = useTurnstile(siteKey);
    return <div ref={atual.caixa} data-testid="caixa" />;
  }
  const tela = render(<Caixa />);
  return { ...tela, verificacao: () => atual! };
}

// Espera o carregamento (promessa) e o render do widget.
const assentar = () => act(async () => {});
const script = () => document.head.querySelector(`script[src="${SCRIPT_DO_TURNSTILE}"]`);

afterEach(() => {
  delete window.turnstile;
  vi.unstubAllGlobals();
});

describe('verificação Turnstile', () => {
  it('sem site key, não carrega nada e o token é vazio', async () => {
    const { falso } = turnstileFalso();
    const { verificacao } = montar(undefined);
    await assentar();
    expect(falso.render).not.toHaveBeenCalled();
    expect(verificacao().conferir()).toBe('');
  });

  it('renderiza na caixa, só quando precisa de interação, em português', async () => {
    const { falso, opcoes } = turnstileFalso();
    const { getByTestId } = montar('site-key');
    await assentar();
    expect(falso.render).toHaveBeenCalledWith(getByTestId('caixa'), expect.anything());
    expect(opcoes()).toMatchObject({
      sitekey: 'site-key',
      appearance: 'interaction-only',
      size: 'flexible',
      language: 'pt-br',
      'refresh-expired': 'auto',
    });
  });

  it('com o token pronto, entrega na hora e marca como verificado', async () => {
    const { opcoes } = turnstileFalso();
    const { verificacao } = montar('site-key');
    await assentar();
    expect(verificacao().verificado).toBe(false);
    act(() => opcoes().callback('token-1'));
    expect(verificacao().verificado).toBe(true);
    expect(verificacao().conferir()).toBe('token-1');
  });

  it('o token que chega depois de um erro tira a falha', async () => {
    const { opcoes } = turnstileFalso();
    const { verificacao } = montar('site-key');
    await assentar();
    act(() => void opcoes()['error-callback']());
    act(() => opcoes().callback('token-2'));
    expect(verificacao().falhou).toBe(false);
    expect(verificacao().conferir()).toBe('token-2');
  });

  it('ao sair da tela, tira o widget', async () => {
    const { falso } = turnstileFalso();
    const { unmount } = montar('site-key');
    await assentar();
    unmount();
    expect(falso.remove).toHaveBeenCalledWith('widget-1');
  });

  it('se sair da tela antes de carregar, não renderiza', async () => {
    const { falso } = turnstileFalso();
    const { unmount } = montar('site-key');
    unmount();
    await assentar();
    expect(falso.render).not.toHaveBeenCalled();
  });

  it('com IntersectionObserver, só carrega quando o formulário chega perto da tela', async () => {
    const { falso } = turnstileFalso();
    let avisar: IntersectionObserverCallback = () => {};
    const desligar = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function (this: unknown, cb: IntersectionObserverCallback) {
        avisar = cb;
        return { observe: vi.fn(), disconnect: desligar };
      }),
    );
    montar('site-key');
    await assentar();
    expect(falso.render).not.toHaveBeenCalled();
    act(() => avisar([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
    await assentar();
    expect(falso.render).not.toHaveBeenCalled();
    act(() => avisar([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    await assentar();
    expect(falso.render).toHaveBeenCalledTimes(1);
    expect(desligar).toHaveBeenCalled();
  });

  it('dentro de um formulário, observa o formulário (a caixa vazia fica sem tamanho)', () => {
    turnstileFalso();
    const observe = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function () {
        return { observe, disconnect: vi.fn() };
      }),
    );
    function ComForm() {
      const { caixa } = useTurnstile('site-key');
      return (
        <form data-testid="form">
          <div ref={caixa} />
        </form>
      );
    }
    const { getByTestId } = render(<ComForm />);
    expect(observe).toHaveBeenCalledWith(getByTestId('form'));
  });
});

describe('envio sem esperar o Turnstile', () => {
  it('sem o token, conferir responde na hora que falta a verificação', async () => {
    turnstileFalso();
    const { verificacao } = montar('site-key');
    await assentar();
    expect(verificacao().conferir()).toBeUndefined();
    expect(verificacao().verificado).toBe(false);
  });

  it('enviar antes de chegar perto da tela carrega a verificação', async () => {
    const { falso } = turnstileFalso();
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function () {
        return { observe: vi.fn(), disconnect: vi.fn() };
      }),
    );
    const { verificacao } = montar('site-key');
    expect(verificacao().conferir()).toBeUndefined();
    await assentar();
    expect(falso.render).toHaveBeenCalledTimes(1);
  });

  it('token vencido é limpo e o Turnstile pede outro sozinho', async () => {
    const { opcoes } = turnstileFalso();
    const { verificacao } = montar('site-key');
    await assentar();
    act(() => opcoes().callback('velho'));
    act(() => opcoes()['expired-callback']());
    expect(verificacao().verificado).toBe(false);
    expect(verificacao().conferir()).toBeUndefined();
  });

  it('erro do Turnstile limpa o token e o próximo envio reinicia o widget uma vez', async () => {
    const { falso, opcoes } = turnstileFalso();
    const { verificacao } = montar('site-key');
    await assentar();
    act(() => opcoes().callback('token-1'));
    let tratado: boolean | void = false;
    act(() => {
      tratado = opcoes()['error-callback']();
    });
    expect(tratado).toBe(true);
    expect(verificacao().verificado).toBe(false);
    expect(verificacao().falhou).toBe(true);
    expect(verificacao().conferir()).toBeUndefined();
    expect(falso.reset).toHaveBeenCalledTimes(1);
    expect(falso.reset).toHaveBeenCalledWith('widget-1');
    expect(verificacao().conferir()).toBeUndefined();
    expect(falso.reset).toHaveBeenCalledTimes(1);
  });

  it('script que não carrega marca a falha; o próximo envio chama de novo', async () => {
    const { verificacao } = montar('site-key');
    script()!.dispatchEvent(new Event('error'));
    await assentar();
    expect(verificacao().falhou).toBe(true);
    const { falso } = turnstileFalso();
    expect(verificacao().conferir()).toBeUndefined();
    await assentar();
    expect(falso.render).toHaveBeenCalledTimes(1);
    expect(verificacao().falhou).toBe(false);
  });

  it('script que falha depois de o formulário sair da tela não mexe na tela', async () => {
    const { verificacao, unmount } = montar('site-key');
    unmount();
    script()!.dispatchEvent(new Event('error'));
    await assentar();
    expect(verificacao().falhou).toBe(false);
  });

  it('renovar limpa o token e pede outro ao Turnstile (vale para um envio só)', async () => {
    const { falso, opcoes } = turnstileFalso();
    const { verificacao } = montar('site-key');
    await assentar();
    act(() => opcoes().callback('usado'));
    act(() => verificacao().renovar());
    expect(falso.reset).toHaveBeenCalledWith('widget-1');
    expect(verificacao().verificado).toBe(false);
    expect(verificacao().conferir()).toBeUndefined();
  });

  it('renovar antes do widget existir não quebra', () => {
    const { verificacao } = montar(undefined);
    expect(() => act(() => verificacao().renovar())).not.toThrow();
  });
});
