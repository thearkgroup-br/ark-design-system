import { useEffect, useRef, useState } from 'react';
import { renderIcon } from '../../icons/icons';
import { testIdParte, type TestIdProps } from '../../utils';
import { Button } from '../Button/Button';

export interface ActionBarAction {
  label: string;
  href: string;
}

export interface ActionBarWhatsapp {
  /** Endereço da conversa (`https://wa.me/55...`). Abre em nova aba. */
  href: string;
  /** Texto que aparece no computador. Padrão "WhatsApp". No celular fica só o ícone. */
  label?: string;
}

export interface ActionBarProps extends TestIdProps {
  /** Frase curta à esquerda ("Pronto para agendar sem telefone?"). */
  message: string;
  /** Botão principal à direita. */
  primaryAction: ActionBarAction;
  /** Link secundário opcional. Só aparece a partir de 560 px de tela. */
  secondaryAction?: ActionBarAction;
  /** Ação de WhatsApp opcional, entre a frase e o botão principal. No celular, só o ícone (nome acessível "Falar no WhatsApp"). */
  whatsapp?: ActionBarWhatsapp;
}

/**
 * Barra fixa de ação no rodapé da tela, sempre visível: frase curta, WhatsApp opcional e botão principal.
 * Reserva embaixo da página um espaço do tamanho da barra (medido ao vivo, já com `safe-area-inset-bottom`)
 * para não cobrir conteúdo, nem o rodapé: ponha o componente por último na página.
 * Ids: `{base}`, `-message`, `-primary-link`, `-secondary-link`, `-whatsapp-link`.
 */
export function ActionBar({ message, primaryAction, secondaryAction, whatsapp, 'data-testid': testId }: ActionBarProps) {
  const [altura, setAltura] = useState<number>();
  const barra = useRef<HTMLDivElement>(null);

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
      <div ref={barra} className="ak-actionbar" role="region" aria-label="Ação principal" data-testid={testId}>
        <div className="ak-actionbar-in">
          <p className="ak-actionbar-msg" data-testid={testIdParte(testId, 'message')}>
            {message}
          </p>
          <div className="ak-actionbar-actions">
            {secondaryAction && (
              <a className="ak-actionbar-second" href={secondaryAction.href} data-testid={testIdParte(testId, 'secondary-link')}>
                {secondaryAction.label}
              </a>
            )}
            {whatsapp && (
              <a
                className="ak-actionbar-whats"
                href={whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar no WhatsApp"
                data-testid={testIdParte(testId, 'whatsapp-link')}
              >
                {renderIcon('whatsapp', 20)}
                <span className="ak-actionbar-whats-txt">{whatsapp.label ?? 'WhatsApp'}</span>
              </a>
            )}
            <Button pill href={primaryAction.href} data-testid={testIdParte(testId, 'primary-link')}>
              {primaryAction.label}
            </Button>
          </div>
        </div>
      </div>
      {/* Espaço do tamanho da barra no fim da página. */}
      <div className="ak-actionbar-reserva" aria-hidden="true" style={altura ? { height: altura } : undefined} />
    </>
  );
}
