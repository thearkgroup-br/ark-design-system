import { digitosDoWhatsapp, formatarWhatsapp, somenteDigitos } from './mascara';

describe('ARK-3 máscara do WhatsApp', () => {
  it('somenteDigitos tira tudo que não é número', () => {
    expect(somenteDigitos('(11) 9a1234-5678')).toBe('11912345678');
  });

  it.each([
    ['+55 (11) 91234-5678', '11912345678'],
    ['551112345678', '1112345678'],
    ['11912345678', '11912345678'],
    ['5511', '5511'],
  ])('digitosDoWhatsapp("%s") é "%s"', (entrada, saida) => {
    expect(digitosDoWhatsapp(entrada)).toBe(saida);
  });

  it.each([
    ['+55 11 91234-5678', '(11) 91234-5678'],
    ['', ''],
    ['1', '(1'],
    ['11', '(11'],
    ['119', '(11) 9'],
    ['1191234', '(11) 9123-4'],
    ['1112345678', '(11) 1234-5678'],
    ['11912345678', '(11) 91234-5678'],
    ['119123456789', '(11) 91234-5678'],
    ['(11) 91234-5678', '(11) 91234-5678'],
  ])('"%s" vira "%s"', (entrada, saida) => {
    expect(formatarWhatsapp(entrada)).toBe(saida);
  });
});
