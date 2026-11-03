import { afterEach, vi } from 'vitest';
import { ENDERECO_DO_ENVIO, ErroDeValidacao, LIMITE_DO_ENVIO_MS, enviarContato } from './enviar';

const DADOS = { nome: 'Maria Souza', email: 'maria@negocio.com.br', empresa: 'Studio Exemplo', aceite: true as const };

function responder(status: number, corpo?: unknown) {
  const fetchFalso = vi.fn().mockResolvedValue(
    new Response(corpo === undefined ? 'x' : JSON.stringify(corpo), { status, headers: { 'Content-Type': 'application/json' } }),
  );
  vi.stubGlobal('fetch', fetchFalso);
  return fetchFalso;
}

afterEach(() => vi.unstubAllGlobals());

describe('envio para a Pages Function', () => {
  it('manda os dados e o token em JSON, por POST', async () => {
    const fetchFalso = responder(200, { ok: true });
    await expect(enviarContato(DADOS, 'token-1')).resolves.toBeUndefined();
    const [endereco, opcoes] = fetchFalso.mock.calls[0] as [string, RequestInit];
    expect(endereco).toBe(ENDERECO_DO_ENVIO);
    expect(opcoes.method).toBe('POST');
    expect(opcoes.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(JSON.parse(opcoes.body as string)).toEqual({ ...DADOS, token: 'token-1' });
  });

  it('desiste depois do limite, para o botão não ficar carregando para sempre', async () => {
    responder(200, { ok: true });
    const timeout = vi.spyOn(AbortSignal, 'timeout');
    await enviarContato(DADOS, 't');
    expect(timeout).toHaveBeenCalledWith(LIMITE_DO_ENVIO_MS);
    timeout.mockRestore();
  });

  it('422 vira erro por campo, com a mensagem da tela e não a do servidor', async () => {
    responder(422, { erros: { email: 'texto do servidor', desconhecido: 'x' } });
    const erro = await enviarContato(DADOS, 't').catch((e: unknown) => e);
    expect(erro).toBeInstanceOf(ErroDeValidacao);
    expect((erro as ErroDeValidacao).erros).toEqual({ email: 'Confira o e-mail. Exemplo: nome@email.com' });
  });

  it('422 sem campo conhecido é erro comum', async () => {
    responder(422, { erros: { outro: 'x' } });
    const erro = await enviarContato(DADOS, 't').catch((e: unknown) => e);
    expect(erro).not.toBeInstanceOf(ErroDeValidacao);
    expect((erro as Error).message).toBe('Envio recusado (422).');
  });

  it('422 sem JSON é erro comum', async () => {
    responder(422);
    await expect(enviarContato(DADOS, 't')).rejects.not.toBeInstanceOf(ErroDeValidacao);
  });

  it('422 com erros que não são um objeto é erro comum', async () => {
    responder(422, { erros: 'x' });
    await expect(enviarContato(DADOS, 't')).rejects.not.toBeInstanceOf(ErroDeValidacao);
  });

  it.each([
    ['Turnstile recusado (403)', 403],
    ['erro do servidor (502)', 502],
  ])('%s rejeita sem levar dado da pessoa na mensagem', async (_, status) => {
    responder(status, { erro: 'x' });
    const erro = (await enviarContato(DADOS, 't').catch((e: unknown) => e)) as Error;
    expect(erro).toBeInstanceOf(Error);
    expect(erro.message).toBe(`Envio recusado (${status}).`);
    expect(erro.message).not.toMatch(/Maria|maria@|Studio/);
  });

  it('sem internet, o fetch rejeita', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(enviarContato(DADOS, 't')).rejects.toThrow('Failed to fetch');
  });
});
