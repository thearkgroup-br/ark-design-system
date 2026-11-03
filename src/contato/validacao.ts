import { WHATSAPP_MAXIMO, digitosDoWhatsapp } from './mascara';

// Regras de campos do design system, seção Contato (sites do grupo). O mesmo arquivo valida na tela e de novo
// no servidor (a Function de contato). O formulário é um só para os quatro sites: o que muda é a ConfigContato.
export const NOME_MINIMO = 2;
export const NOME_MAXIMO = 80;
export const EMAIL_MINIMO = 6;
export const EMAIL_MAXIMO = 254;
export const EMPRESA_MAXIMO = 80;
export const WHATSAPP_MINIMO = 10;
export const MENSAGEM_MAXIMO = 500;

export const MENSAGENS = {
  nome: 'Digite seu nome.',
  email: 'Confira o e-mail. Exemplo: nome@email.com',
  whatsapp: 'Digite o WhatsApp com DDD.',
  empresa: `Use até ${EMPRESA_MAXIMO} caracteres.`,
  escolha: 'Escolha uma opção.',
  mensagem: `Use até ${MENSAGEM_MAXIMO} caracteres.`,
  aceite: 'Para continuar, aceite o uso dos dados.',
} as const;

export type Campo = keyof typeof MENSAGENS;
/** Ordem dos campos na tela: o foco vai para o primeiro com erro. */
export const CAMPOS: Campo[] = ['nome', 'email', 'whatsapp', 'empresa', 'escolha', 'mensagem', 'aceite'];

export interface OpcaoDeEscolha {
  /** Valor fixo em inglês ou código curto: vai para o servidor, que recusa o que não está na lista. */
  valor: string;
  /** Texto da tela e do e-mail. */
  rotulo: string;
}

/** Pergunta de múltipla escolha do formulário ("O que você precisa", "Usa a Íris?"). */
export interface Escolha {
  rotulo: string;
  opcoes: OpcaoDeEscolha[];
  obrigatoria?: boolean;
}

/** O que muda de um site para o outro. A mesma configuração vale na tela e na Function. */
export interface ConfigContato {
  /** Nome do produto, para o e-mail ("Somma"). */
  produto: string;
  /** Assunto fixo do e-mail: nada da pessoa vai nele. */
  assunto: string;
  escolha?: Escolha;
}

export interface Valores {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  mensagem: string;
  escolha: string;
  aceite: boolean;
}

export type Erros = Partial<Record<Campo, string>>;

// Letras com acento e ç (À-ÿ sem × e ÷), espaço, apóstrofo e hífen. Emoji e número não passam.
const LETRAS_DE_NOME = /^[A-Za-zÀ-ÖØ-öø-ÿ' ’-]+$/;

// Lista branca em ASCII: nome@email.com, com domínio de rótulos não vazios separados por um ponto só.
// Fora ficam espaço, controle, < > , ; " ( ) [ ] \ (que no reply-to virariam "Nome <endereço>" ou mais de um endereço)
// e o que o Resend recusaria (a..b, rótulo vazio, acento no domínio): esses voltam como erro no campo, e não no envio.
const FORMATO_DE_EMAIL = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/;

/** Tira espaços do começo e do fim e troca espaços repetidos por um só. Acento decomposto (colado de PDF ou do Mac) vira o caractere único. */
export function normalizarEspacos(valor: string): string {
  return valor.normalize('NFC').trim().replace(/\s+/g, ' ');
}

/** Texto livre de várias linhas: mantém as quebras de linha, tira os espaços das pontas e as linhas vazias repetidas. */
export function normalizarMensagem(valor: string): string {
  return valor
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((linha) => linha.replace(/[^\S\n]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function validarNome(valor: string): string | undefined {
  const nome = normalizarEspacos(valor);
  const ok = nome.length >= NOME_MINIMO && nome.length <= NOME_MAXIMO && LETRAS_DE_NOME.test(nome);
  return ok ? undefined : MENSAGENS.nome;
}

function validarEmail(valor: string): string | undefined {
  const email = valor.trim();
  const ok = email.length >= EMAIL_MINIMO && email.length <= EMAIL_MAXIMO && FORMATO_DE_EMAIL.test(email);
  return ok ? undefined : MENSAGENS.email;
}

/** Opcional: vazio passa. */
function validarWhatsapp(valor: string): string | undefined {
  if (!valor.trim()) return undefined;
  // Só números: a máscara aceita digitar com parênteses e hífen, mas letra é erro.
  if (/[^\d\s()+-]/.test(valor)) return MENSAGENS.whatsapp;
  const digitos = digitosDoWhatsapp(valor).length;
  return digitos >= WHATSAPP_MINIMO && digitos <= WHATSAPP_MAXIMO ? undefined : MENSAGENS.whatsapp;
}

function validarEscolha(valor: string, escolha?: Escolha): string | undefined {
  if (!escolha) return undefined;
  if (!valor) return escolha.obrigatoria ? MENSAGENS.escolha : undefined;
  return escolha.opcoes.some((opcao) => opcao.valor === valor) ? undefined : MENSAGENS.escolha;
}

export function validarCampo(campo: Campo, valores: Valores, config: ConfigContato): string | undefined {
  switch (campo) {
    case 'nome':
      return validarNome(valores.nome);
    case 'email':
      return validarEmail(valores.email);
    case 'whatsapp':
      return validarWhatsapp(valores.whatsapp);
    case 'empresa':
      return normalizarEspacos(valores.empresa).length <= EMPRESA_MAXIMO ? undefined : MENSAGENS.empresa;
    case 'escolha':
      return validarEscolha(valores.escolha, config.escolha);
    case 'mensagem':
      return normalizarMensagem(valores.mensagem).length <= MENSAGEM_MAXIMO ? undefined : MENSAGENS.mensagem;
    case 'aceite':
      return valores.aceite ? undefined : MENSAGENS.aceite;
  }
}

export function validarFormulario(valores: Valores, config: ConfigContato): Erros {
  const erros: Erros = {};
  for (const campo of CAMPOS) {
    const erro = validarCampo(campo, valores, config);
    if (erro) erros[campo] = erro;
  }
  return erros;
}

export interface DadosDoContato {
  nome: string;
  /** Em minúsculas. */
  email: string;
  /** Só os dígitos, com DDD. */
  whatsapp?: string;
  empresa?: string;
  mensagem?: string;
  escolha?: string;
  aceite: true;
}

/**
 * O que vai para o envio: espaços normalizados, e-mail em minúsculas, WhatsApp só com dígitos e opcional vazio fora.
 * Só chamar depois de `validarFormulario` sem erro; opção fora da lista é erro de programação.
 */
export function prepararDados(valores: Valores, config: ConfigContato): DadosDoContato {
  if (validarEscolha(valores.escolha, config.escolha)) throw new Error('Opção inválida: prepararDados chamado sem validar.');
  const whatsapp = digitosDoWhatsapp(valores.whatsapp);
  const empresa = normalizarEspacos(valores.empresa);
  const mensagem = normalizarMensagem(valores.mensagem);
  return {
    nome: normalizarEspacos(valores.nome),
    email: valores.email.trim().toLowerCase(),
    ...(whatsapp ? { whatsapp } : {}),
    ...(empresa ? { empresa } : {}),
    ...(mensagem ? { mensagem } : {}),
    ...(config.escolha && valores.escolha ? { escolha: valores.escolha } : {}),
    aceite: true,
  };
}
