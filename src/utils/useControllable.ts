import { useCallback, useState } from 'react';

/**
 * Estado que pode ser controlado (prop `value`) ou não (`defaultValue`).
 * Sempre chama `onChange`; só guarda o estado interno quando não é controlado.
 */
export function useControllable<T, A extends unknown[] = []>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T, ...args: A) => void,
): [T, (next: T, ...args: A) => void] {
  const [interno, setInterno] = useState<T>(defaultValue);
  const controlado = value !== undefined;
  const atual = controlado ? value : interno;
  const definir = useCallback(
    (next: T, ...args: A) => {
      if (!controlado) setInterno(next);
      onChange?.(next, ...args);
    },
    [controlado, onChange],
  );
  return [atual, definir];
}
