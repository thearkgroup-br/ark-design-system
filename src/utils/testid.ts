/**
 * Sufixos de tipo do padrão de data-testid: a tabela "Elemento" da skill padrao-data-testid (0.3.2),
 * divididos pela regra das "Partes internas".
 */
/** Controle ou peça única: o sufixo sai do id antes de acrescentar a parte. */
const SUFIXOS_DE_CONTROLE = [
  'button', 'input', 'link', 'select', 'checkbox', 'radio', 'switch', 'tab', 'item', 'list', 'card',
  'dialog', 'sheet', 'error', 'toast', 'alert',
];
// Região que agrupa outras coisas (header, footer, nav, tabbar, table, group) fica fora da lista:
// o id fica inteiro e a parte é acrescentada no fim.
const SUFIXO_DE_CONTROLE = new RegExp(`-(${SUFIXOS_DE_CONTROLE.join('|')})$`);

export interface TestIdProps {
  /** data-testid repassado ao elemento principal do componente. */
  'data-testid'?: string;
}

/**
 * Deriva o data-testid de uma parte interna a partir do id recebido pelo componente.
 * Controle ou peça única perde o sufixo de tipo; região (header, footer, nav, tabbar, table, group)
 * mantém o id inteiro, para o mesmo link no cabeçalho e no rodapé não gerar o mesmo id.
 * Ex.: testIdParte('iris-login-email-input', 'error') === 'iris-login-email-error';
 *      testIdParte('ark-landing-header', 'how-link') === 'ark-landing-header-how-link'.
 * Sem id recebido, a parte também fica sem id.
 */
export function testIdParte(testId: string | undefined, parte: string): string | undefined {
  if (!testId) return undefined;
  return `${testId.replace(SUFIXO_DE_CONTROLE, '')}-${parte}`;
}
