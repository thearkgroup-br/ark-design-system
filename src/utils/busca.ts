import { useEffect, useState } from 'react';

/** Regras da busca do design system: mínimo de caracteres e espera depois que a pessoa para de digitar. */
export const BUSCA_MINIMO = 2;
export const BUSCA_ATRASO_MS = 300;
export const BUSCA_MAXIMO = 60;

/** Deixa o texto pronto para comparar: sem acento, minúsculo, sem espaços extras ("  João  Silva" → "joao silva"). */
export function normalizarBusca(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Diz se `texto` contém o termo, ignorando maiúsculas, acentos e espaços extras ("salao" encontra "Salão"). */
export function buscaEncontra(texto: string, termo: string): boolean {
  return normalizarBusca(texto).includes(normalizarBusca(termo));
}

function termoValido(valor: string, minimo: number): string {
  const normalizado = normalizarBusca(valor);
  return normalizado.length >= minimo ? normalizado : '';
}

/**
 * Termo que deve ser buscado: o valor digitado, normalizado, 300 ms depois da última tecla.
 * Com menos de 2 caracteres devolve '' (não buscar) na hora, sem esperar.
 */
export function useTermoDeBusca(valor: string, { minimo = BUSCA_MINIMO, atrasoMs = BUSCA_ATRASO_MS } = {}): string {
  // Valor inicial já válido (busca restaurada) busca na hora; apagar também limpa na hora.
  const [termo, setTermo] = useState(() => termoValido(valor, minimo));
  const atual = termoValido(valor, minimo);
  useEffect(() => {
    const t = setTimeout(() => setTermo(atual), atual ? atrasoMs : 0);
    return () => clearTimeout(t);
  }, [atual, atrasoMs]);
  return atual ? termo : '';
}
