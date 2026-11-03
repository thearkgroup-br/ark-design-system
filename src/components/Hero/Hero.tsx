import type { ReactNode } from 'react';
import { testIdParte, type TestIdProps } from '../../utils';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Section } from '../Section/Section';
import { SectionHeader } from '../SectionHeader/SectionHeader';

export interface HeroAction {
  label: string;
  href: string;
}

export interface HeroProps extends TestIdProps {
  /** Rótulo curto acima do título; aparece entre parênteses. */
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  /** Selo "Em breve" acima do título. */
  badge?: string;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  /** Frase pequena abaixo dos botões. */
  note?: string;
  /** Ilustração em HTML e CSS. Fica escondida dos leitores de tela: o que importa está no texto. */
  visual?: ReactNode;
  /** Legenda visível da ilustração ("Ilustração com valores de exemplo"). */
  visualCaption?: string;
}

/**
 * Topo do site: texto à esquerda, ilustração à direita (embaixo no celular). É a faixa `#topo`.
 * Ids: `{base}-header` (e `-title`, `-text`), `-badge`, `-primary-link`, `-secondary-link`, `-note`, `-visual`, `-visual-caption`.
 */
export function Hero({ eyebrow, title, text, badge, primaryAction, secondaryAction, note, visual, visualCaption, 'data-testid': testId }: HeroProps) {
  return (
    <Section id="topo" tone="surface" layout="split">
      <div className="ak-hero-text">
        {badge && (
          <div>
            <Badge status="embreve" data-testid={testIdParte(testId, 'badge')}>
              {badge}
            </Badge>
          </div>
        )}
        <SectionHeader
          size="hero"
          level={1}
          eyebrow={eyebrow}
          title={title}
          text={text}
          actions={
            <>
              <Button size="lg" pill href={primaryAction.href} data-testid={testIdParte(testId, 'primary-link')}>
                {primaryAction.label}
              </Button>
              {secondaryAction && (
                <Button size="lg" pill variant="secondary" href={secondaryAction.href} data-testid={testIdParte(testId, 'secondary-link')}>
                  {secondaryAction.label}
                </Button>
              )}
            </>
          }
          data-testid={testIdParte(testId, 'header')}
        />
        {note && (
          <p className="ak-hero-note" data-testid={testIdParte(testId, 'note')}>
            {note}
          </p>
        )}
      </div>
      {visual && (
        <div className="ak-hero-visual-col">
          <div className="ak-hero-visual" aria-hidden="true" data-testid={testIdParte(testId, 'visual')}>
            {visual}
          </div>
          {visualCaption && (
            <p className="ak-hero-caption" data-testid={testIdParte(testId, 'visual-caption')}>
              {visualCaption}
            </p>
          )}
        </div>
      )}
    </Section>
  );
}
