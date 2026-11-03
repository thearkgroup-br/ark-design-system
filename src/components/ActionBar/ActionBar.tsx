import { useEffect, useRef, useState } from 'react';
import { cx, testIdParte, type TestIdProps } from '../../utils';
import { Button } from '../Button/Button';

export interface ActionBarAction {
  label: string;
  href: string;
}

export interface ActionBarProps extends TestIdProps {
  /** Frase curta à esquerda ("Pronto para agendar sem telefone?"). */
  message: string;
  /** Botão principal à direita. */
  primaryAction: ActionBarAction;
  /** Link secundário opcional. Só aparece a partir de 560 px de tela; no celular fica a frase e o botão principal. */
  secondaryAction?: ActionBarAction;
  /** Seletor CSS do elemento que faz a barra aparecer: ela surge quando ele sai da tela por cima (ex.: o botão principal do Hero). */
  triggerSelector: string;
  /** Seletor(es) CSS do que esconde a barra: ela some enquanto qualquer um deles estiver na tela (ex.: `#contato`, `footer`). */
  hideSelectors?: string | string[];
}

type Observador = { disconnect: () => void };

function listar(seletores: string | string[] | undefined): string[] {
  if (!seletores) return [];
  return (Array.isArray(seletores) ? seletores : [seletores]).filter(Boolean);
}

/**
 * Barra fixa de ação no rodapé da tela: frase curta e botão principal. Aparece quando o botão do topo sai da tela
 * e some quando a seção de contato ou o rodapé entram. Reserva embaixo da página o espaço do tamanho da barra
 * (mais `safe-area-inset-bottom`) para não cobrir conteúdo: ponha o componente por último na página.
 * A animação é curta e some com `prefers-reduced-motion`.
 * Ids: `{base}`, `-message`, `-primary-link`, `-secondary-link`.
 */
export function ActionBar({ message, primaryAction, secondaryAction, triggerSelector, hideSelectors, 'data-testid': testId }: ActionBarProps) {
  const [visivel, setVisivel] = useState(false);
  const [altura, setAltura] = useState(0);
  const barra = useRef<HTMLDivElement>(null);
  const chaveDosAlvos = listar(hideSelectors).join('\n');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const gatilho = document.querySelector(triggerSelector);
    if (!gatilho) return;
    const alvos = chaveDosAlvos ? Array.from(document.querySelectorAll(chaveDosAlvos.split('\n').join(','))) : [];
    let passou = false;
    const alvosNaTela = new Set<Element>();
    const atualizar = () => setVisivel(passou && alvosNaTela.size === 0);

    const observadores: Observador[] = [];
    const doGatilho = new IntersectionObserver((entradas) => {
      const e = entradas[entradas.length - 1];
      // "Saiu da tela" é por cima: o botão que ainda não chegou (embaixo) não liga a barra.
      passou = !e.isIntersecting && e.boundingClientRect.top < 0;
      atualizar();
    });
    doGatilho.observe(gatilho);
    observadores.push(doGatilho);

    if (alvos.length > 0) {
      const dosAlvos = new IntersectionObserver((entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) alvosNaTela.add(e.target);
          else alvosNaTela.delete(e.target);
        }
        atualizar();
      });
      alvos.forEach((a) => dosAlvos.observe(a));
      observadores.push(dosAlvos);
    }
    return () => observadores.forEach((o) => o.disconnect());
  }, [triggerSelector, chaveDosAlvos]);

  // O espaço reservado acompanha o tamanho real da barra (fonte maior, frase em duas linhas).
  useEffect(() => {
    const el = barra.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const medir = new ResizeObserver(() => setAltura(el.offsetHeight));
    medir.observe(el);
    return () => medir.disconnect();
  }, []);

  return (
    <>
      <div
        ref={barra}
        className={cx('ak-actionbar', visivel && 'ak-actionbar-on')}
        role="region"
        aria-label="Ação principal"
        aria-hidden={visivel ? undefined : true}
        data-testid={testId}
      >
        <div className="ak-actionbar-in">
          <p className="ak-actionbar-msg" data-testid={testIdParte(testId, 'message')}>
            {message}
          </p>
          <div className="ak-actionbar-actions">
            {secondaryAction && (
              <a className="ak-actionbar-second" href={secondaryAction.href} tabIndex={visivel ? undefined : -1} data-testid={testIdParte(testId, 'secondary-link')}>
                {secondaryAction.label}
              </a>
            )}
            <Button pill href={primaryAction.href} tabIndex={visivel ? undefined : -1} data-testid={testIdParte(testId, 'primary-link')}>
              {primaryAction.label}
            </Button>
          </div>
        </div>
      </div>
      {/* Espaço do tamanho da barra no fim da página, só enquanto ela aparece. */}
      <div className="ak-actionbar-reserva" aria-hidden="true" style={{ height: visivel ? altura : 0 }} />
    </>
  );
}
