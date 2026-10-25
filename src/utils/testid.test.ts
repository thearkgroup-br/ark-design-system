import { testIdParte } from './testid';

describe('testIdParte', () => {
  it('tira o sufixo de tipo e acrescenta a parte', () => {
    expect(testIdParte('iris-login-email-input', 'error')).toBe('iris-login-email-error');
    expect(testIdParte('iris-appointments-cancel-dialog', 'close-button')).toBe('iris-appointments-cancel-close-button');
    expect(testIdParte('iris-appointments-upcoming-list', 'item')).toBe('iris-appointments-upcoming-item');
  });

  // Tabela "Partes internas" da skill padrao-data-testid 0.3.1, inteira.
  it.each([
    ['iris-login-email-input', 'error', 'iris-login-email-error'],
    ['iris-appointments-cancel-dialog', 'close-button', 'iris-appointments-cancel-close-button'],
    ['iris-app-main-tabbar', 'home-tab', 'iris-app-main-home-tab'],
    ['iris-booking-time-slot-list', 'item', 'iris-booking-time-slot-item'],
    ['ark-landing-header', 'theme-button', 'ark-landing-theme-button'],
    ['iris-schedule-view-group', 'day-button', 'iris-schedule-view-day-button'],
  ])('segue a tabela "Partes internas" da skill: %s + %s', (id, parte, esperado) => {
    expect(testIdParte(id, parte)).toBe(esperado);
  });

  // Tabela "Elemento" da skill: todo sufixo de tipo listado sai do id.
  it.each([
    'button', 'input', 'link', 'select', 'checkbox', 'radio', 'switch', 'tab', 'item', 'list', 'card',
    'dialog', 'sheet', 'error', 'toast', 'alert', 'tabbar', 'header', 'footer', 'nav', 'group', 'table',
  ])('tira o sufixo -%s', (sufixo) => {
    expect(testIdParte(`iris-home-main-${sufixo}`, 'part')).toBe('iris-home-main-part');
  });

  it.each(['row', 'title', 'count', 'tabs', 'navbar'])('não trata -%s como sufixo, porque a skill não lista', (fim) => {
    expect(testIdParte(`iris-home-main-${fim}`, 'part')).toBe(`iris-home-main-${fim}-part`);
  });

  it('usa o id inteiro quando ele não termina em sufixo de tipo', () => {
    expect(testIdParte('iris-app-menu', 'home-tab')).toBe('iris-app-menu-home-tab');
  });

  it('só tira o sufixo do fim', () => {
    expect(testIdParte('iris-input-name-input', 'error')).toBe('iris-input-name-error');
  });

  it('não gera id quando o componente não recebeu data-testid', () => {
    expect(testIdParte(undefined, 'error')).toBeUndefined();
  });
});
