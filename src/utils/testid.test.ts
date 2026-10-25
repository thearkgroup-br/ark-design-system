import { testIdParte } from './testid';

describe('testIdParte', () => {
  it('controle perde o sufixo de tipo e ganha a parte', () => {
    expect(testIdParte('iris-login-email-input', 'error')).toBe('iris-login-email-error');
    expect(testIdParte('iris-appointments-cancel-dialog', 'close-button')).toBe('iris-appointments-cancel-close-button');
    expect(testIdParte('iris-appointments-upcoming-list', 'item')).toBe('iris-appointments-upcoming-item');
  });

  it('região mantém o id inteiro e ganha a parte', () => {
    expect(testIdParte('iris-app-main-tabbar', 'home-tab')).toBe('iris-app-main-tabbar-home-tab');
    expect(testIdParte('iris-schedule-day-table', 'row')).toBe('iris-schedule-day-table-row');
  });

  // Tabela "Partes internas" da skill padrao-data-testid 0.3.2, inteira.
  it.each([
    ['iris-login-email-input', 'error', 'iris-login-email-error'],
    ['iris-appointments-cancel-dialog', 'close-button', 'iris-appointments-cancel-close-button'],
    ['iris-booking-time-slot-list', 'item', 'iris-booking-time-slot-item'],
    ['iris-app-main-tabbar', 'home-tab', 'iris-app-main-tabbar-home-tab'],
    ['ark-landing-header', 'theme-button', 'ark-landing-header-theme-button'],
    ['ark-landing-header', 'how-link', 'ark-landing-header-how-link'],
    ['ark-landing-footer', 'how-link', 'ark-landing-footer-how-link'],
    ['iris-schedule-view-group', 'day-button', 'iris-schedule-view-group-day-button'],
  ])('segue a tabela "Partes internas" da skill: %s + %s', (id, parte, esperado) => {
    expect(testIdParte(id, parte)).toBe(esperado);
  });

  it('o mesmo link no cabeçalho e no rodapé não gera o mesmo id', () => {
    expect(testIdParte('ark-landing-header', 'how-link')).not.toBe(testIdParte('ark-landing-footer', 'how-link'));
  });

  // Skill: "Controle ou peça única" tira o sufixo. A tabela "Elemento" também tem -tab, -item e -error,
  // que não são região: seguem como controle.
  it.each([
    'button', 'input', 'link', 'select', 'checkbox', 'radio', 'switch', 'dialog', 'sheet', 'card', 'list',
    'toast', 'alert', 'tab', 'item', 'error',
  ])('tira o sufixo de controle -%s', (sufixo) => {
    expect(testIdParte(`iris-home-main-${sufixo}`, 'part')).toBe('iris-home-main-part');
  });

  // Skill: "Região que agrupa outras coisas" mantém o id inteiro.
  it.each(['header', 'footer', 'nav', 'tabbar', 'table', 'group'])('mantém o sufixo de região -%s', (sufixo) => {
    expect(testIdParte(`iris-home-main-${sufixo}`, 'part')).toBe(`iris-home-main-${sufixo}-part`);
  });

  it.each(['row', 'title', 'count', 'tabs', 'navbar'])('não trata -%s como sufixo, porque a skill não lista', (fim) => {
    expect(testIdParte(`iris-home-main-${fim}`, 'part')).toBe(`iris-home-main-${fim}-part`);
  });

  it('usa o id inteiro quando ele não termina em sufixo de tipo', () => {
    expect(testIdParte('iris-app-menu', 'home-tab')).toBe('iris-app-menu-home-tab');
  });

  it('só tira o sufixo do fim', () => {
    expect(testIdParte('iris-input-name-input', 'error')).toBe('iris-input-name-error');
    expect(testIdParte('iris-header-name-input', 'error')).toBe('iris-header-name-error');
  });

  it('não gera id quando o componente não recebeu data-testid', () => {
    expect(testIdParte(undefined, 'error')).toBeUndefined();
  });
});
