import { useEffect, useRef, type RefObject } from 'react';

const FOCAVEIS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'summary',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

let travas = 0;
let overflowAntes = '';
/** Sobreposições abertas, da mais antiga para a mais nova: só a do topo responde ao teclado. */
const pilha: symbol[] = [];

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
  return [...painel.querySelectorAll<HTMLElement>(FOCAVEIS)].filter((el) => !el.closest('[hidden], [inert]'));
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
 * Com duas sobreposições abertas, só a de cima responde a Esc e Tab.
 */
export function useOverlay({ ativo, painel, onClose, fecharComEsc }: OverlayOptions) {
  const fechar = useRef(onClose);
  const comEsc = useRef(fecharComEsc);
  useEffect(() => {
    fechar.current = onClose;
    comEsc.current = fecharComEsc;
  }, [onClose, fecharComEsc]);

  useEffect(() => {
    if (!ativo || !painel.current) return;
    const elemento = painel.current;
    const eu = Symbol('overlay');
    pilha.push(eu);
    const anterior = document.activeElement as HTMLElement | null;
    (focaveis(elemento)[0] ?? elemento).focus();
    travarRolagem();

    const aoTeclar = (e: KeyboardEvent) => {
      if (pilha[pilha.length - 1] !== eu) return;
      if (e.key === 'Escape' && comEsc.current && fechar.current && !e.defaultPrevented) {
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
      pilha.splice(pilha.indexOf(eu), 1);
      soltarRolagem();
      if (anterior && document.contains(anterior)) anterior.focus();
    };
  }, [ativo, painel]);
}
