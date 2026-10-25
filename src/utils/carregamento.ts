import { useEffect, useState } from 'react';

/** Regras de carregamento do design system: skeleton só depois de 300 ms; depois de 10 s, mensagem com "Tentar de novo". */
export const CARREGAMENTO_ATRASO_MS = 300;
export const CARREGAMENTO_LIMITE_MS = 10000;

export type EstadoDeCarregamento = 'oculto' | 'skeleton' | 'demorou';

/**
 * O que mostrar enquanto `carregando` é true: nada nos primeiros 300 ms ('oculto'), Skeleton até 10 s ('skeleton')
 * e, depois disso, a mensagem com "Tentar de novo" ('demorou'). Com `carregando` false, volta para 'oculto'.
 */
export function useEstadoDeCarregamento(
  carregando: boolean,
  { atrasoMs = CARREGAMENTO_ATRASO_MS, limiteMs = CARREGAMENTO_LIMITE_MS } = {},
): EstadoDeCarregamento {
  const [estado, setEstado] = useState<EstadoDeCarregamento>('oculto');
  useEffect(() => {
    if (!carregando) return;
    const mostrar = setTimeout(() => setEstado('skeleton'), atrasoMs);
    const desistir = setTimeout(() => setEstado('demorou'), limiteMs);
    return () => {
      clearTimeout(mostrar);
      clearTimeout(desistir);
      // Próximo carregamento começa do zero (não reaproveita o 'demorou' do anterior).
      setEstado('oculto');
    };
  }, [carregando, atrasoMs, limiteMs]);
  return carregando ? estado : 'oculto';
}
