import { testIdParte } from './testid';

describe('testIdParte', () => {
  it('tira o sufixo de tipo e acrescenta a parte', () => {
    expect(testIdParte('iris-login-email-input', 'error')).toBe('iris-login-email-error');
    expect(testIdParte('iris-appointments-cancel-dialog', 'close-button')).toBe('iris-appointments-cancel-close-button');
    expect(testIdParte('iris-appointments-upcoming-list', 'item')).toBe('iris-appointments-upcoming-item');
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
