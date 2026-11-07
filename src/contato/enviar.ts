import { CAMPOS, MENSAGENS, type DadosDoContato, type Erros } from './validacao';

/** Pages Function que valida de novo, confere o Turnstile e manda o e-mail (functions/api/contato.ts). */
export const ENDERECO_DO_ENVIO = '/api/contato';
/** Depois disso o envio desiste e a tela mostra o erro com a saída pelo e-mail do time. */
export const LIMITE_DO_ENVIO_MS = 15_000;

/** `token` é o do Turnstile; vazio quando a página não tem a chave (o servidor recusa). */
export type EnviarContato = (dados: DadosDoContato, token: string) => Promise<void>;

/** O servidor recusou algum campo (422). Leva as mensagens da tela, nunca o texto que veio do servidor. */
export class ErroDeValidacao extends Error {
  constructor(readonly erros: Erros) {
    super('Campos recusados pelo servidor.');
    this.name = 'ErroDeValidacao';
  }
}

async function errosDaResposta(resposta: Response): Promise<Erros> {
  const corpo: unknown = await resposta.json().catch(() => undefined);
  const recebidos = (corpo as { erros?: unknown } | undefined)?.erros;
  const erros: Erros = {};
  if (recebidos && typeof recebidos === 'object') {
    for (const campo of CAMPOS) if (campo in recebidos) erros[campo] = MENSAGENS[campo];
  }
  return erros;
}

/** Ponto único do envio do contato. Sucesso resolve; qualquer falha rejeita. */
export const enviarContato: EnviarContato = async (dados, token) => {
  const resposta = await fetch(ENDERECO_DO_ENVIO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...dados, token }),
    signal: AbortSignal.timeout(LIMITE_DO_ENVIO_MS),
  });
  if (resposta.ok) return;
  if (resposta.status === 422) {
    const erros = await errosDaResposta(resposta);
    if (Object.keys(erros).length > 0) throw new ErroDeValidacao(erros);
  }
  // Só o status: a mensagem não leva nada do que a pessoa digitou.
  throw new Error(`Envio recusado (${resposta.status}).`);
};
