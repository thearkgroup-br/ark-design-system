const DINHEIRO = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const NOTA = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** O que mostrar quando o valor não é um número (dado faltando da API). */
export const SEM_VALOR = '—';

/** Dinheiro no formato do design system: "R$ 35,00", "R$ 1.234,50", "-R$ 10,00". Sem número válido, "—". */
export function formatarDinheiro(valor: number): string {
  if (!Number.isFinite(valor)) return SEM_VALOR;
  const centavos = Math.round(valor * 100);
  const texto = `R$ ${DINHEIRO.format(Math.abs(centavos) / 100)}`;
  return centavos < 0 ? `-${texto}` : texto;
}

/** Nota com vírgula e uma casa: "4,8". Sem número válido, "—". */
export function formatarNota(valor: number): string {
  return Number.isFinite(valor) ? NOTA.format(valor) : SEM_VALOR;
}

/** Primeira e última inicial, em maiúsculas ("Maria da Silva" → "MS"). */
export function iniciais(nome: string | undefined): string {
  const partes = String(nome ?? '').trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '?';
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + ultima).toUpperCase();
}
