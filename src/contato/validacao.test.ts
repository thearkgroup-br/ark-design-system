import {
  CAMPOS,
  MENSAGENS,
  prepararDados,
  validarCampo,
  validarFormulario,
  type ConfigContato,
  type Valores,
} from './validacao';

const SEM_ESCOLHA: ConfigContato = { produto: 'Zenno', assunto: 'Zenno: contato pelo site' };
const COM_ESCOLHA: ConfigContato = {
  produto: 'Somma',
  assunto: 'Somma: lista de espera',
  escolha: {
    rotulo: 'Usa a Íris?',
    obrigatoria: true,
    opcoes: [
      { valor: 'nao', rotulo: 'Ainda não' },
      { valor: 'sim', rotulo: 'Sim' },
    ],
  },
};

const OK: Valores = {
  nome: 'Maria Souza',
  email: 'Maria@Negocio.com.br',
  whatsapp: '',
  empresa: '',
  mensagem: '',
  escolha: '',
  aceite: true,
};

describe('validação do formulário de contato', () => {
  it('aceita nome, e-mail e aceite; o resto é opcional', () => {
    expect(validarFormulario(OK, SEM_ESCOLHA)).toEqual({});
  });

  it('a ordem dos campos na tela é fixa', () => {
    expect(CAMPOS).toEqual(['nome', 'email', 'whatsapp', 'empresa', 'escolha', 'mensagem', 'aceite']);
  });

  it.each([
    ['nome', { nome: 'A' }],
    ['nome', { nome: 'Maria 3' }],
    ['nome', { nome: 'x'.repeat(81) }],
    ['email', { email: 'maria@' }],
    ['email', { email: 'maria <m@x.com>' }],
    ['email', { email: '' }],
    ['whatsapp', { whatsapp: '123' }],
    ['whatsapp', { whatsapp: '11 9123a-5678' }],
    ['empresa', { empresa: 'x'.repeat(81) }],
    ['mensagem', { mensagem: 'x'.repeat(501) }],
    ['aceite', { aceite: false }],
  ] as const)('recusa %s com a mensagem da tela (%j)', (campo, troca) => {
    expect(validarFormulario({ ...OK, ...troca }, SEM_ESCOLHA)[campo]).toBe(MENSAGENS[campo]);
  });

  it('aceita WhatsApp com máscara e com o código do país', () => {
    expect(validarCampo('whatsapp', { ...OK, whatsapp: '(11) 91234-5678' }, SEM_ESCOLHA)).toBeUndefined();
    expect(validarCampo('whatsapp', { ...OK, whatsapp: '+55 11 91234-5678' }, SEM_ESCOLHA)).toBeUndefined();
  });

  it('a escolha obrigatória só aceita uma opção da lista', () => {
    expect(validarCampo('escolha', { ...OK, escolha: '' }, COM_ESCOLHA)).toBe(MENSAGENS.escolha);
    expect(validarCampo('escolha', { ...OK, escolha: 'talvez' }, COM_ESCOLHA)).toBe(MENSAGENS.escolha);
    expect(validarCampo('escolha', { ...OK, escolha: 'sim' }, COM_ESCOLHA)).toBeUndefined();
  });

  it('a escolha opcional aceita vazio, mas não valor fora da lista', () => {
    const opcional = { ...COM_ESCOLHA, escolha: { ...COM_ESCOLHA.escolha!, obrigatoria: false } };
    expect(validarCampo('escolha', OK, opcional)).toBeUndefined();
    expect(validarCampo('escolha', { ...OK, escolha: 'talvez' }, opcional)).toBe(MENSAGENS.escolha);
  });

  it('sem escolha configurada, o campo não é validado', () => {
    expect(validarCampo('escolha', { ...OK, escolha: 'qualquer' }, SEM_ESCOLHA)).toBeUndefined();
  });
});

describe('prepararDados', () => {
  it('normaliza espaços, põe o e-mail em minúsculas e deixa o opcional vazio de fora', () => {
    expect(prepararDados({ ...OK, nome: '  Maria   Souza ' }, SEM_ESCOLHA)).toEqual({
      nome: 'Maria Souza',
      email: 'maria@negocio.com.br',
      aceite: true,
    });
  });

  it('leva WhatsApp só em dígitos, empresa, mensagem com as quebras de linha e a escolha', () => {
    const dados = prepararDados(
      { ...OK, whatsapp: '+55 (11) 91234-5678', empresa: ' Studio  Exemplo ', mensagem: ' linha 1\r\n\r\n\r\n\r\nlinha 2 ', escolha: 'sim' },
      COM_ESCOLHA,
    );
    expect(dados).toEqual({
      nome: 'Maria Souza',
      email: 'maria@negocio.com.br',
      whatsapp: '11912345678',
      empresa: 'Studio Exemplo',
      mensagem: 'linha 1\n\nlinha 2',
      escolha: 'sim',
      aceite: true,
    });
  });

  it('avisa quando é chamado sem validar', () => {
    expect(() => prepararDados({ ...OK, escolha: 'talvez' }, COM_ESCOLHA)).toThrow('Opção inválida');
  });
});
