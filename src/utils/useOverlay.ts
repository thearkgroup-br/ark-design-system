import { useEffect, useRef, type RefObject } from 'react';

const FOCAVEIS = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let travas = 0;
let overflowAntes = '';

function travarRolagem() {
  if (travas === 0) {
    overflowAntes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  travas += 1;
}

function soltarRolagem() {
  travas = Math.max(0, travas - 1);
  if (travas === 0) document.body.style.overflow = overflowAntes;
}

function focaveis(painel: HTMLElement): HTMLElement[] {
  return [...painel.querySelectorAll<HTMLElement>(FOCAVEIS)];
}

export interface OverlayOptions {
  /** Liga o comportamento de sobreposição (no modo de prévia, com hostHeight, fica desligado). */
  ativo: boolean;
  painel: RefObject<HTMLElement | null>;
  onClose?: () => void;
  /** Esc chama onClose. */
  fecharComEsc: boolean;
}

/**
 * Comportamento comum de Dialog e BottomSheet abertos sobre a tela:
 * foco vai para dentro, Tab fica preso no painel, Esc fecha, a página não rola atrás
 * e, ao fechar, o foco volta para quem estava focado antes (o botão que abriu).
 */
export function useOverlay({ ativo, painel, onClose, fecharComEsc }: OverlayOptions) {
  const fechar = useRef(onClose);
  useEffect(() => {
    fechar.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!ativo || !painel.current) return;
    const elemento = painel.current;
    const anterior = document.activeElement as HTMLElement | null;
    (focaveis(elemento)[0] ?? elemento).focus();
    travarRolagem();

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fecharComEsc && fechar.current && !e.defaultPrevented) {
        e.preventDefault();
        fechar.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const lista = focaveis(elemento);
      if (lista.length === 0) {
        e.preventDefault();
        elemento.focus();
        return;
      }
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      const atual = document.activeElement;
      if (e.shiftKey && (atual === primeiro || !elemento.contains(atual))) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && (atual === ultimo || !elemento.contains(atual))) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      soltarRolagem();
      if (anterior && document.contains(anterior)) anterior.focus();
    };
  }, [ativo, painel, fecharComEsc]);
}
