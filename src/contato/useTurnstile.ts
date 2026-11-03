import { useCallback, useEffect, useRef, useState } from 'react';
import { carregarTurnstile } from './turnstile';

/** Motivo escrito quando falta a verificação, no lugar do botão carregando à espera do token. */
export const MENSAGEM_DA_VERIFICACAO = 'Confirme a verificação acima para enviar.';

/**
 * Verificação anti-robô do formulário. O script só carrega quando o formulário chega perto da tela,
 * para não pesar na abertura da página. Sem `siteKey`, nada carrega e o token é vazio.
 * O envio nunca espera o Turnstile: sem token, quem envia bloqueia e diz o motivo.
 */
export function useTurnstile(siteKey?: string) {
  const caixa = useRef<HTMLDivElement>(null);
  const token = useRef('');
  const widget = useRef<string | undefined>(undefined);
  const comErro = useRef(false);
  const iniciar = useRef<() => void>(() => {});
  // Espelho do token para a tela: o aviso de "confirme a verificação" some assim que o token chega.
  const [verificado, setVerificado] = useState(false);
  // O script não carregou (rede, bloqueador) ou o Turnstile deu erro: o envio mostra o erro com a saída por e-mail.
  const [falhou, setFalhou] = useState(false);

  const guardar = useCallback((novo: string) => {
    token.current = novo;
    setVerificado(Boolean(novo));
  }, []);

  useEffect(() => {
    const elemento = caixa.current;
    if (!siteKey || !elemento) return;
    let ativo = true;
    let comecou = false;
    const comecar = () => {
      if (comecou) return;
      comecou = true;
      carregarTurnstile()
        .then((turnstile) => {
          if (!ativo) return;
          setFalhou(false);
          widget.current = turnstile.render(elemento, {
            sitekey: siteKey,
            callback: (novo) => {
              comErro.current = false;
              setFalhou(false);
              guardar(novo);
            },
            // Vencido: limpa e o próprio Turnstile pede outro (refresh-expired auto).
            'expired-callback': () => guardar(''),
            // Erro: limpa; o Turnstile tenta de novo sozinho e o próximo envio reinicia o widget.
            'error-callback': () => {
              comErro.current = true;
              setFalhou(true);
              guardar('');
              return true;
            },
            'refresh-expired': 'auto',
            appearance: 'interaction-only',
            size: 'flexible',
            language: 'pt-br',
          });
        })
        .catch(() => {
          // O script não carregou: o próximo envio chama de novo.
          comecou = false;
          if (ativo) setFalhou(true);
        });
    };
    iniciar.current = comecar;
    let observador: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === 'function') {
      observador = new IntersectionObserver(
        (entradas) => {
          if (!entradas.some((e) => e.isIntersecting)) return;
          observador?.disconnect();
          comecar();
        },
        { rootMargin: '400px' },
      );
      // Observa o formulário, não a caixa: vazia, ela fica com display: none e nunca "entra" na tela.
      observador.observe(elemento.closest('form') ?? elemento);
    } else {
      comecar();
    }
    return () => {
      ativo = false;
      observador?.disconnect();
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = undefined;
      comErro.current = false;
      guardar('');
      setFalhou(false);
    };
  }, [siteKey, guardar]);

  /**
   * Token do envio, na hora: vazio sem `siteKey`; `undefined` quando falta a verificação.
   * Faltando, pede de novo: carrega o script se ainda não veio e reinicia o widget que deu erro.
   */
  const conferir = useCallback((): string | undefined => {
    if (!siteKey || token.current) return token.current;
    iniciar.current();
    if (comErro.current && widget.current) {
      comErro.current = false;
      window.turnstile?.reset(widget.current);
    }
    return undefined;
  }, [siteKey]);

  /** O token vale para um envio só: depois de cada tentativa, o Turnstile gera outro. */
  const renovar = useCallback(() => {
    guardar('');
    if (widget.current) window.turnstile?.reset(widget.current);
  }, [guardar]);

  return { caixa, verificado, falhou, conferir, renovar };
}
