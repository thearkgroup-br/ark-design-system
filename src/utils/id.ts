import { useId } from 'react';

/**
 * Id único e seguro para usar no DOM e em `url(#…)` de SVG. O formato do `useId` muda entre versões do React
 * (`:r0:` no 18, `«r0»` no 19.1), então só ficam letras, números, `_` e `-`.
 */
export function useIdDoDom(prefixo: string): string {
  return `${prefixo}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
}
