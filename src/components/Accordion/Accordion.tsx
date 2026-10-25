import { testIdParte, type TestIdProps } from '../../utils';

export interface AccordionProps extends TestIdProps {
  /** 4 a 8 perguntas, em primeira pessoa; a resposta começa respondendo ("Não.", "Sim."). */
  items: { q: string; a: string }[];
  /** Índice da pergunta que já vem aberta. */
  defaultOpen?: number;
}

/**
 * Perguntas que abrem e fecham (FAQ), com `<details>`/`<summary>` nativos: teclado e leitor de tela de graça.
 * Cada pergunta ganha `{base}-item` e o botão que abre, `{base}-item-button`.
 */
export function Accordion({ items, defaultOpen, 'data-testid': testId }: AccordionProps) {
  return (
    <div className="ak-acc" data-testid={testId}>
      {items.map((it, i) => (
        <details key={`${it.q}-${i}`} className="ak-acc-item" open={defaultOpen === i || undefined} data-testid={testIdParte(testId, 'item')}>
          <summary className="ak-acc-q" data-testid={testIdParte(testId, 'item-button')}>
            <span>{it.q}</span>
            <span className="ak-acc-plus" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="ak-acc-a">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
