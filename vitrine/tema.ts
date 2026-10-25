export const MARCAS = [
  { id: 'ark', nome: 'The Ark Group' },
  { id: 'iris', nome: 'Íris' },
  { id: 'pulse', nome: 'Pulse' },
] as const;

export type Marca = (typeof MARCAS)[number]['id'];

const CHAVE = 'ark-vitrine-tema';

export function lerTema(): { marca: Marca; escuro: boolean } {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? 'null');
    if (salvo && MARCAS.some((m) => m.id === salvo.marca)) return { marca: salvo.marca, escuro: Boolean(salvo.escuro) };
  } catch {
    // sem localStorage ou valor inválido: abre no claro
  }
  return { marca: 'ark', escuro: false };
}

export function aplicarTema(marca: Marca, escuro: boolean) {
  document.documentElement.dataset.theme = escuro ? `${marca}-escuro` : marca;
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ marca, escuro }));
  } catch {
    // sem localStorage: só não guarda a escolha
  }
}
