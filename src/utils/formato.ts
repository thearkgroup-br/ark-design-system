const DINHEIRO = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const NOTA = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Dinheiro no formato do design system: "R$ 35,00", "R$ 1.234,50". */
export function formatarDinheiro(valor: number): string {
  return `R$ ${DINHEIRO.format(valor)}`;
}

/** Nota com vírgula e uma casa: "4,8". */
export function formatarNota(valor: number): string {
  return NOTA.format(valor);
}

/** Primeira e última inicial, em maiúsculas ("Maria da Silva" → "MS"). */
export function iniciais(nome: string | undefined): string {
  const partes = String(nome ?? '').trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '?';
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + ultima).toUpperCase();
}
