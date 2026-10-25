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

/**
 * Termo que deve ser buscado: o valor digitado, normalizado, 300 ms depois da última tecla.
 * Com menos de 2 caracteres devolve '' (não buscar).
 */
export function useTermoDeBusca(valor: string, { minimo = BUSCA_MINIMO, atrasoMs = BUSCA_ATRASO_MS } = {}): string {
  const [termo, setTermo] = useState('');
  useEffect(() => {
    const normalizado = normalizarBusca(valor);
    const proximo = normalizado.length >= minimo ? normalizado : '';
    const t = setTimeout(() => setTermo(proximo), atrasoMs);
    return () => clearTimeout(t);
  }, [valor, minimo, atrasoMs]);
  return termo;
}
