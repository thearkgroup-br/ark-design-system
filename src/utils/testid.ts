/** Sufixos de tipo do padrão de data-testid (skill padrao-data-testid). */
const SUFIXOS_DE_TIPO = [
  'input', 'select', 'checkbox', 'radio', 'switch', 'button', 'link', 'tab', 'item', 'list',
  'card', 'dialog', 'sheet', 'alert', 'toast', 'group', 'nav', 'header', 'footer', 'table',
];
const SUFIXO = new RegExp(`-(${SUFIXOS_DE_TIPO.join('|')})$`);

export interface TestIdProps {
  /** data-testid repassado ao elemento principal do componente. */
  'data-testid'?: string;
}

/**
 * Deriva o data-testid de uma parte interna a partir do id recebido pelo componente:
 * tira o sufixo de tipo e acrescenta a parte.
 * Ex.: testIdParte('iris-login-email-input', 'error') === 'iris-login-email-error'.
 * Sem id recebido, a parte também fica sem id.
 */
export function testIdParte(testId: string | undefined, parte: string): string | undefined {
  if (!testId) return undefined;
  return `${testId.replace(SUFIXO, '')}-${parte}`;
}
