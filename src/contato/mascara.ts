export const WHATSAPP_MAXIMO = 11;

export function somenteDigitos(valor: string): string {
  return valor.replace(/\D/g, '');
}

/** Dígitos do WhatsApp sem o código do país: "+55 11 91234-5678" colado vira "11912345678". */
export function digitosDoWhatsapp(valor: string): string {
  const d = somenteDigitos(valor);
  return (d.length === 12 || d.length === 13) && d.startsWith('55') ? d.slice(2) : d;
}

/** Máscara progressiva "(11) 91234-5678" (ou "(11) 1234-5678" com 10 dígitos). Corta em 11 dígitos. */
export function formatarWhatsapp(valor: string): string {
  const d = digitosDoWhatsapp(valor).slice(0, WHATSAPP_MAXIMO);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  const corte = d.length === WHATSAPP_MAXIMO ? 5 : 4;
  if (resto.length <= corte) return `(${ddd}) ${resto}`;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}
