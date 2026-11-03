// Função de contato dos sites (POST /api/contato), a mesma nos quatro. O que muda é só a ConfigContato.
// Valida com as mesmas regras e mensagens da tela, confere o Turnstile e manda o e-mail pelo Resend.
// Nenhum dado da pessoa vai para o log: só o motivo e o status do serviço de fora.
import { prepararDados, validarFormulario, type ConfigContato, type DadosDoContato, type Valores } from './validacao';

export interface Env {
  /** Segredo. Chave da API do Resend, só com permissão de envio. */
  RESEND_API_KEY?: string;
  /** Segredo. Chave secreta do widget do Turnstile. */
  TURNSTILE_SECRET_KEY?: string;
  /** Quem recebe; mais de um separado por vírgula. */
  CONTATO_PARA?: string;
  /** Remetente num domínio verificado no Resend: "Somma <site@thearkgroup.com.br>". */
  CONTATO_DE?: string;
}

export interface Contexto {
  request: Request;
  env: Env;
}

export const VERIFICAR_TURNSTILE = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
export const ENVIAR_EMAIL = 'https://api.resend.com/emails';
/** O formulário inteiro cabe com folga; acima disso nem é lido. */
export const TAMANHO_MAXIMO = 8 * 1024;
/** Tamanho máximo do token, pela documentação do Turnstile. */
const TOKEN_MAXIMO = 2048;
const LIMITE_DE_FORA_MS = 10_000;

function responder(status: number, corpo: object): Response {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/** Log sem dado pessoal: nunca o corpo do pedido, nem a resposta do serviço de fora. */
function registrar(motivo: string, detalhe?: Record<string, string | number>) {
  console.error(JSON.stringify({ rota: 'api/contato', motivo, ...detalhe }));
}

const texto = (valor: unknown) => (typeof valor === 'string' ? valor : '');

type Verificacao = 'ok' | 'recusado' | 'indisponivel';

async function lerCorpo(request: Request): Promise<Record<string, unknown> | Response> {
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
    return responder(415, { erro: 'formato' });
  }
  if (Number(request.headers.get('Content-Length')) > TAMANHO_MAXIMO) return responder(413, { erro: 'tamanho' });
  const bruto = await request.text();
  if (new TextEncoder().encode(bruto).length > TAMANHO_MAXIMO) return responder(413, { erro: 'tamanho' });
  try {
    const corpo: unknown = JSON.parse(bruto);
    if (corpo && typeof corpo === 'object' && !Array.isArray(corpo)) return corpo as Record<string, unknown>;
  } catch {
    // A mensagem do JSON.parse pode trazer um pedaço do corpo: não vai para o log.
  }
  return responder(400, { erro: 'corpo' });
}

async function conferirTurnstile(token: string, segredo: string, ip: string | null): Promise<Verificacao> {
  const form = new FormData();
  form.append('secret', segredo);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const resposta = await fetch(VERIFICAR_TURNSTILE, { method: 'POST', body: form, signal: AbortSignal.timeout(LIMITE_DE_FORA_MS) });
    if (!resposta.ok) {
      registrar('turnstile-indisponivel', { status: resposta.status });
      return 'indisponivel';
    }
    const resultado = (await resposta.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (resultado.success === true) return 'ok';
    // Os códigos são do Turnstile (ex.: "timeout-or-duplicate"), sem dado da pessoa.
    registrar('turnstile-recusou', { codigos: (resultado['error-codes'] ?? []).join(',') });
    return 'recusado';
  } catch {
    registrar('turnstile-sem-resposta');
    return 'indisponivel';
  }
}

interface Email {
  from: string;
  to: string[];
  subject: string;
  text: string;
  reply_to: string;
}

async function enviarEmail(email: Email, chave: string): Promise<boolean> {
  try {
    const resposta = await fetch(ENVIAR_EMAIL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${chave}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(LIMITE_DE_FORA_MS),
    });
    if (resposta.ok) return true;
    // Só o status: a resposta do Resend pode repetir o endereço.
    registrar('resend-recusou', { status: resposta.status });
    return false;
  } catch {
    registrar('resend-sem-resposta');
    return false;
  }
}

/** Cria a Function do site. No site: `export const onRequestPost = criarFuncaoDeContato(CONFIG).onRequestPost;`. */
export function criarFuncaoDeContato(config: ConfigContato) {
  /** Do corpo do pedido para os mesmos valores da tela. O que não é texto vira vazio e cai na validação. */
  function lerValores(corpo: Record<string, unknown>): Valores {
    return {
      nome: texto(corpo.nome),
      email: texto(corpo.email),
      whatsapp: texto(corpo.whatsapp),
      empresa: texto(corpo.empresa),
      mensagem: texto(corpo.mensagem),
      escolha: texto(corpo.escolha),
      aceite: corpo.aceite === true,
    };
  }

  /**
   * E-mail só em texto (sem HTML, nada para escapar). O assunto é fixo: nada da pessoa vai nele. O reply-to vai para
   * o e-mail da pessoa. A validação recusa < > , ; e aspas no e-mail, que forjariam o nome de exibição ou outro
   * endereço. A mensagem vai recuada, para uma linha escrita pela pessoa não se passar por uma linha do formulário.
   * O e-mail é a única coisa que sai daqui: nada é guardado.
   */
  function montarEmail(dados: DadosDoContato, de: string, para: string): Email {
    const naoInformado = '(não informado)';
    const linhas = [
      `Nova mensagem pelo site ${config.produto}.`,
      '',
      `Nome: ${dados.nome}`,
      `E-mail: ${dados.email}`,
      `WhatsApp: ${dados.whatsapp ?? naoInformado}`,
      `Empresa: ${dados.empresa ?? naoInformado}`,
    ];
    if (config.escolha) {
      const rotulo = config.escolha.opcoes.find((opcao) => opcao.valor === dados.escolha)?.rotulo ?? naoInformado;
      linhas.push(`${config.escolha.rotulo.replace(/\?$/, '')}: ${rotulo}`);
    }
    if (dados.mensagem) linhas.push('', 'Mensagem:', ...dados.mensagem.split('\n').map((linha) => `  ${linha}`));
    linhas.push('', 'Concordou em ser contatado: sim', '', `Enviado pelo formulário do site ${config.produto}.`);
    return {
      from: de,
      to: para.split(',').map((e) => e.trim()).filter(Boolean),
      subject: config.assunto,
      text: linhas.join('\n'),
      reply_to: dados.email,
    };
  }

  async function onRequestPost({ request, env }: Contexto): Promise<Response> {
    const { RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTATO_PARA, CONTATO_DE } = env;
    // CONTATO_PARA só com vírgula ou espaço não tem para quem mandar: é configuração incompleta, e não erro do Resend.
    if (!RESEND_API_KEY || !TURNSTILE_SECRET_KEY || !CONTATO_PARA?.replace(/[\s,]/g, '') || !CONTATO_DE) {
      registrar('configuracao-incompleta');
      return responder(503, { erro: 'configuracao' });
    }

    const corpo = await lerCorpo(request);
    if (corpo instanceof Response) return corpo;

    const valores = lerValores(corpo);
    const erros = validarFormulario(valores, config);
    if (Object.keys(erros).length > 0) return responder(422, { erros });

    const token = texto(corpo.token);
    if (!token || token.length > TOKEN_MAXIMO) return responder(403, { erro: 'verificacao' });
    const verificacao = await conferirTurnstile(token, TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
    if (verificacao === 'recusado') return responder(403, { erro: 'verificacao' });
    if (verificacao === 'indisponivel') return responder(502, { erro: 'verificacao-indisponivel' });

    const enviado = await enviarEmail(montarEmail(prepararDados(valores, config), CONTATO_DE, CONTATO_PARA), RESEND_API_KEY);
    return enviado ? responder(200, { ok: true }) : responder(502, { erro: 'envio' });
  }

  return { onRequestPost, lerValores, montarEmail };
}
