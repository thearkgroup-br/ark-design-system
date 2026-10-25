import { formatarDinheiro, formatarNota, iniciais } from './formato';

describe('formatarDinheiro', () => {
  it('usa R$, vírgula e ponto de milhar', () => {
    expect(formatarDinheiro(35)).toBe('R$ 35,00');
    expect(formatarDinheiro(1234.5)).toBe('R$ 1.234,50');
    expect(formatarDinheiro(9999.99)).toBe('R$ 9.999,99');
    expect(formatarDinheiro(0)).toBe('R$ 0,00');
  });
});

describe('formatarNota', () => {
  it('usa vírgula e uma casa', () => {
    expect(formatarNota(4.8)).toBe('4,8');
    expect(formatarNota(5)).toBe('5,0');
    expect(formatarNota(4.75)).toBe('4,8');
  });
});

describe('iniciais', () => {
  it('pega a primeira e a última inicial', () => {
    expect(iniciais('Maria da Silva')).toBe('MS');
    expect(iniciais('  rafa  ')).toBe('R');
    expect(iniciais('Élida Ávila')).toBe('ÉÁ');
    expect(iniciais('')).toBe('?');
    expect(iniciais(undefined)).toBe('?');
  });
});
