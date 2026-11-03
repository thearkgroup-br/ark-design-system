// @vitest-environment node
import { afterEach, beforeEach, vi } from 'vitest';
import { ENVIAR_EMAIL, TAMANHO_MAXIMO, VERIFICAR_TURNSTILE, criarFuncaoDeContato, type Env } from './funcao';
import type { ConfigContato } from './validacao';

const CONFIG: ConfigContato = {
  produto: 'Somma',
  assunto: 'Somma — lista de espera',
  escolha: {
    rotulo: 'Usa a Íris?',
    obrigatoria: true,
    opcoes: [
      { valor: 'nao', rotulo: 'Ainda não' },
      { valor: 'sim', rotulo: 'Sim' },
    ],
  },
};
const { onRequestPost, lerValores, montarEmail } = criarFuncaoDeContato(CONFIG);

/** Resposta falsa do serviço de fora; `HttpResponse.error()` é a queda de rede (o fetch rejeita). */
class HttpResponse extends Response {
  static json(corpo: unknown, init?: ResponseInit) {
    return new HttpResponse(JSON.stringify(corpo), { ...init, headers: { 'Content-Type': 'application/json' } });
  }
  static error() {
    return new TypeError('Failed to fetch');
  }
}

const ENV: Env = {
  RESEND_API_KEY: 're_teste',
  TURNSTILE_SECRET_KEY: 'segredo-teste',
  CONTATO_PARA: 'contato@thearkgroup.com.br',
  CONTATO_DE: 'Somma <site@thearkgroup.com.br>',
};

const VALIDO = {
  nome: '  Maria   Souza ',
  email: 'Maria@Negocio.com.br',
  empresa: 'Studio Exemplo',
  escolha: 'sim',
  aceite: true,
  token: 'token-do-turnstile',
};

/** Dados da pessoa que nunca podem aparecer no log. */
const PESSOAIS = ['Maria', 'Souza', 'maria@', 'Studio', 'token-do-turnstile', '203.0.113.7'];

interface Chamadas {
  turnstile: FormData[];
  resend: { corpo: Record<string, unknown>; autorizacao: string | null }[];
}

type Falso = Response | TypeError;

function servicos({ turnstile = HttpResponse.json({ success: true }), resend = HttpResponse.json({ id: 'email-1' }) }: { turnstile?: Falso; resend?: Falso } = {}) {
  const chamadas: Chamadas = { turnstile: [], resend: [] };
  const entregar = (resposta: Falso) => (resposta instanceof Error ? Promise.reject(resposta) : Promise.resolve(resposta));
  // Pedido para endereço desconhecido falha o teste: nunca sai para a rede de verdade.
  vi.stubGlobal('fetch', (entrada: string, init: RequestInit) => {
    if (entrada === VERIFICAR_TURNSTILE) {
      chamadas.turnstile.push(init.body as FormData);
      return entregar(turnstile);
    }
    if (entrada === ENVIAR_EMAIL) {
      chamadas.resend.push({ corpo: JSON.parse(init.body as string) as Record<string, unknown>, autorizacao: new Headers(init.headers).get('Authorization') });
      return entregar(resend);
    }
    return Promise.reject(new Error(`Pedido sem handler: ${String(entrada)}`));
  });
  return chamadas;
}

function pedido(corpo: unknown, cabecalhos: Record<string, string> = {}) {
  const bruto = typeof corpo === 'string' ? corpo : JSON.stringify(corpo);
  return new Request('https://somma.exemplo/api/contato', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '203.0.113.7', ...cabecalhos },
    body: bruto,
  });
}

const chamar = (corpo: unknown, env: Env = ENV, cabecalhos?: Record<string, string>) =>
  onRequestPost({ request: pedido(corpo, cabecalhos), env });

let log: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  log = vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllGlobals();
  const escrito = log.mock.calls.flat().map(String).join('\n');
  for (const dado of PESSOAIS) expect(escrito).not.toContain(dado);
  log.mockRestore();
});

describe('POST /api/contato da Somma', () => {
  it('envia pelo Resend para o contato, só em texto e com reply-to no e-mail da pessoa', async () => {
    const chamadas = servicos();
    const resposta = await chamar(VALIDO);
    expect(resposta.status).toBe(200);
    expect(await resposta.json()).toEqual({ ok: true });
    expect(resposta.headers.get('Cache-Control')).toBe('no-store');
    expect(chamadas.resend).toHaveLength(1);
    const { corpo, autorizacao } = chamadas.resend[0];
    expect(autorizacao).toBe('Bearer re_teste');
    expect(corpo).toMatchObject({
      from: 'Somma <site@thearkgroup.com.br>',
      to: ['contato@thearkgroup.com.br'],
      subject: 'Somma — lista de espera',
      reply_to: 'maria@negocio.com.br',
    });
    expect(corpo.text).toContain('Nome: Maria Souza');
    expect(corpo.text).toContain('E-mail: maria@negocio.com.br');
    expect(corpo.text).toContain('Empresa: Studio Exemplo');
    expect(corpo.text).toContain('Usa a Íris: Sim');
    expect(corpo.text).toContain('Concordou em ser contatado: sim');
    expect(corpo).not.toHaveProperty('html');
    expect(log).not.toHaveBeenCalled();
  });

  it('o assunto é fixo e não leva dado da pessoa', async () => {
    const chamadas = servicos();
    await chamar({ ...VALIDO, nome: 'Outra Pessoa' });
    expect(chamadas.resend[0].corpo.subject).toBe('Somma — lista de espera');
  });

  it('confere o Turnstile com o segredo, o token e o IP de quem enviou', async () => {
    const chamadas = servicos();
    await chamar(VALIDO);
    const form = chamadas.turnstile[0];
    expect(form.get('secret')).toBe('segredo-teste');
    expect(form.get('response')).toBe('token-do-turnstile');
    expect(form.get('remoteip')).toBe('203.0.113.7');
  });

  it('sem IP no pedido, confere o Turnstile sem ele', async () => {
    const chamadas = servicos();
    const request = new Request('https://somma.exemplo/api/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(VALIDO),
    });
    expect((await onRequestPost({ request, env: ENV })).status).toBe(200);
    expect(chamadas.turnstile[0].has('remoteip')).toBe(false);
  });

  it('sem empresa, avisa no texto; quem ainda não usa a Íris aparece como "Ainda não"', async () => {
    const chamadas = servicos();
    const resposta = await chamar({ ...VALIDO, empresa: '  ', escolha: 'nao' });
    expect(resposta.status).toBe(200);
    const { corpo } = chamadas.resend[0];
    expect(corpo.text).toContain('Empresa: (não informado)');
    expect(corpo.text).toContain('Usa a Íris: Ainda não');
  });

  it('com vários destinatários separados por vírgula, manda para todos', async () => {
    const chamadas = servicos();
    await chamar(VALIDO, { ...ENV, CONTATO_PARA: 'a@x.com, b@x.com,' });
    expect(chamadas.resend[0].corpo.to).toEqual(['a@x.com', 'b@x.com']);
  });

  it('campos errados voltam 422 com as mensagens exatas da tela, sem chamar o Turnstile nem o Resend', async () => {
    const chamadas = servicos();
    const resposta = await chamar({
      nome: 'M',
      email: 'Maria <maria@negocio.com>',
      empresa: 'x'.repeat(81),
      escolha: 'talvez',
      aceite: 'sim',
      token: 't',
    });
    expect(resposta.status).toBe(422);
    expect(await resposta.json()).toEqual({
      erros: {
        nome: 'Digite seu nome.',
        email: 'Confira o e-mail. Exemplo: nome@email.com',
        empresa: 'Use até 80 caracteres.',
        escolha: 'Escolha uma opção.',
        aceite: 'Para continuar, aceite o uso dos dados.',
      },
    });
    expect(chamadas.turnstile).toHaveLength(0);
    expect(chamadas.resend).toHaveLength(0);
  });

  it('e-mail com quebra de linha volta 422 e não chega ao Resend', async () => {
    const chamadas = servicos();
    const resposta = await chamar({ ...VALIDO, email: 'maria@negocio.com\r\nBcc: x@y.com' });
    expect(resposta.status).toBe(422);
    expect(chamadas.resend).toHaveLength(0);
  });

  it('CONTATO_PARA sem nenhum endereço (só vírgula) é configuração incompleta: 503', async () => {
    const chamadas = servicos();
    const resposta = await chamar(VALIDO, { ...ENV, CONTATO_PARA: ' , ' });
    expect(resposta.status).toBe(503);
    expect(chamadas.turnstile).toHaveLength(0);
  });

  it('campo que não é texto conta como vazio', () => {
    expect(lerValores({ nome: 42, email: ['a@b.com'], whatsapp: 1, empresa: null, mensagem: {}, escolha: 7, aceite: 'true' })).toEqual({
      nome: '',
      email: '',
      whatsapp: '',
      empresa: '',
      mensagem: '',
      escolha: '',
      aceite: false,
    });
  });

  it.each([
    ['sem token', { ...VALIDO, token: undefined }],
    ['token vazio', { ...VALIDO, token: '' }],
    ['token grande demais', { ...VALIDO, token: 'x'.repeat(2049) }],
  ])('%s volta 403 sem chamar o Turnstile', async (_, corpo) => {
    const chamadas = servicos();
    const resposta = await chamar(corpo);
    expect(resposta.status).toBe(403);
    expect(chamadas.turnstile).toHaveLength(0);
    expect(chamadas.resend).toHaveLength(0);
  });

  it('Turnstile recusou: 403, não envia e registra só o código', async () => {
    const chamadas = servicos({ turnstile: HttpResponse.json({ success: false, 'error-codes': ['timeout-or-duplicate'] }) });
    const resposta = await chamar(VALIDO);
    expect(resposta.status).toBe(403);
    expect(await resposta.json()).toEqual({ erro: 'verificacao' });
    expect(chamadas.resend).toHaveLength(0);
    expect(JSON.parse(log.mock.calls[0][0] as string)).toEqual({ rota: 'api/contato', motivo: 'turnstile-recusou', codigos: 'timeout-or-duplicate' });
  });

  it('Turnstile recusou sem código: registra a lista vazia', async () => {
    servicos({ turnstile: HttpResponse.json({ success: false }) });
    expect((await chamar(VALIDO)).status).toBe(403);
    expect(JSON.parse(log.mock.calls[0][0] as string)).toMatchObject({ codigos: '' });
  });

  it('Turnstile fora do ar: 502 e não envia', async () => {
    const chamadas = servicos({ turnstile: new HttpResponse('falhou', { status: 500 }) });
    const resposta = await chamar(VALIDO);
    expect(resposta.status).toBe(502);
    expect(chamadas.resend).toHaveLength(0);
    expect(JSON.parse(log.mock.calls[0][0] as string)).toEqual({ rota: 'api/contato', motivo: 'turnstile-indisponivel', status: 500 });
  });

  it('Turnstile sem resposta (rede): 502', async () => {
    servicos({ turnstile: HttpResponse.error() });
    expect((await chamar(VALIDO)).status).toBe(502);
    expect(JSON.parse(log.mock.calls[0][0] as string)).toMatchObject({ motivo: 'turnstile-sem-resposta' });
  });

  it('Resend recusou: 502 e o log tem só o status, sem a resposta dele', async () => {
    servicos({ resend: HttpResponse.json({ message: 'Invalid `to` field: Maria Souza' }, { status: 422 }) });
    const resposta = await chamar(VALIDO);
    expect(resposta.status).toBe(502);
    expect(await resposta.json()).toEqual({ erro: 'envio' });
    expect(JSON.parse(log.mock.calls[0][0] as string)).toEqual({ rota: 'api/contato', motivo: 'resend-recusou', status: 422 });
  });

  it('Resend sem resposta (rede): 502', async () => {
    servicos({ resend: HttpResponse.error() });
    expect((await chamar(VALIDO)).status).toBe(502);
    expect(JSON.parse(log.mock.calls[0][0] as string)).toMatchObject({ motivo: 'resend-sem-resposta' });
  });

  it.each(['RESEND_API_KEY', 'TURNSTILE_SECRET_KEY', 'CONTATO_PARA', 'CONTATO_DE'] as const)('sem %s: 503 sem chamar ninguém', async (variavel) => {
    const chamadas = servicos();
    const resposta = await chamar(VALIDO, { ...ENV, [variavel]: '' });
    expect(resposta.status).toBe(503);
    expect(chamadas.turnstile).toHaveLength(0);
    expect(JSON.parse(log.mock.calls[0][0] as string)).toEqual({ rota: 'api/contato', motivo: 'configuracao-incompleta' });
  });

  it('pedido que não é JSON volta 415', async () => {
    const resposta = await chamar('nome=Maria', ENV, { 'Content-Type': 'application/x-www-form-urlencoded' });
    expect(resposta.status).toBe(415);
  });

  it.each([
    ['JSON quebrado', '{"nome": "Maria'],
    ['lista em vez de objeto', '[1, 2]'],
    ['nulo', 'null'],
  ])('%s volta 400 e não vai para o log', async (_, corpo) => {
    const resposta = await chamar(corpo);
    expect(resposta.status).toBe(400);
    expect(log).not.toHaveBeenCalled();
  });

  it('corpo acima do limite volta 413, pelo cabeçalho ou pelo tamanho real', async () => {
    const grande = { ...VALIDO, empresa: 'x'.repeat(TAMANHO_MAXIMO) };
    expect((await chamar(grande)).status).toBe(413);
    expect((await chamar(VALIDO, ENV, { 'Content-Length': String(TAMANHO_MAXIMO + 1) })).status).toBe(413);
  });

  it('o e-mail sai só em texto, com o aceite registrado', () => {
    const email = montarEmail({ nome: 'Ana', email: 'ana@x.com', escolha: 'nao', aceite: true }, 'de@x.com', 'para@x.com');
    expect(email.text).toContain('Concordou em ser contatado: sim');
    expect(email.reply_to).toBe('ana@x.com');
  });
});

describe('campos novos do formulário único', () => {
  it('leva o WhatsApp e a mensagem recuada, para uma linha da pessoa não se passar por linha do formulário', () => {
    const email = montarEmail(
      { nome: 'Ana', email: 'ana@x.com', whatsapp: '11912345678', mensagem: 'oi' + String.fromCharCode(10) + 'E-mail: falso@x.com', aceite: true },
      'de@x.com',
      'para@x.com',
    );
    expect(email.text).toContain('WhatsApp: 11912345678');
    expect(email.text).toContain(['Mensagem:', '  oi', '  E-mail: falso@x.com'].join(String.fromCharCode(10)));
    expect(email.text).toContain('Usa a Íris: (não informado)');
  });

  it('sem escolha configurada, o e-mail não pergunta nada a mais', () => {
    const { montarEmail: semEscolha } = criarFuncaoDeContato({ produto: 'Zenno', assunto: 'Zenno: contato' });
    const email = semEscolha({ nome: 'Ana', email: 'ana@x.com', aceite: true }, 'de@x.com', 'para@x.com');
    expect(email.text).not.toContain('Usa a Íris');
    expect(email.text).toContain('Nova mensagem pelo site Zenno.');
    expect(email.subject).toBe('Zenno: contato');
  });
});
