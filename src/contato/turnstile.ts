// Cloudflare Turnstile, renderizado pelo código (render=explicit). Só a parte da API que a página usa.
export const SCRIPT_DO_TURNSTILE = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export interface OpcoesDoTurnstile {
  sitekey: string;
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => boolean | void;
  'refresh-expired': 'auto' | 'manual' | 'never';
  appearance: 'always' | 'execute' | 'interaction-only';
  size: 'normal' | 'flexible' | 'compact';
  language: string;
}

export interface Turnstile {
  render: (caixa: HTMLElement, opcoes: OpcoesDoTurnstile) => string | undefined;
  reset: (widget: string) => void;
  remove: (widget: string) => void;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let carregando: Promise<Turnstile> | undefined;

/** Põe o script do Turnstile na página uma vez só. Se falhar, a próxima chamada tenta de novo. */
export function carregarTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  carregando ??= new Promise<Turnstile>((resolver, rejeitar) => {
    const script = document.createElement('script');
    script.src = SCRIPT_DO_TURNSTILE;
    script.async = true;
    const falhar = (motivo: string) => {
      script.remove();
      carregando = undefined;
      rejeitar(new Error(motivo));
    };
    script.onload = () => {
      if (!window.turnstile) return falhar('Turnstile sem a API.');
      // Daqui em diante vale o window.turnstile, na primeira linha.
      carregando = undefined;
      resolver(window.turnstile);
    };
    script.onerror = () => falhar('Turnstile não carregou.');
    document.head.appendChild(script);
  });
  return carregando;
}
