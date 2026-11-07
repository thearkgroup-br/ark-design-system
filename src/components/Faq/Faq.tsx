import { testIdParte, type TestIdProps } from '../../utils';
import { Accordion } from '../Accordion/Accordion';
import { Section } from '../Section/Section';
import { SectionHeader } from '../SectionHeader/SectionHeader';

export interface FaqProps extends TestIdProps {
  eyebrow?: string;
  title: string;
  /** Pergunta sem resposta definida não vai ao ar. */
  items: { q: string; a?: string }[];
  /** Índice da pergunta que já vem aberta (padrão: a primeira). `null` deixa todas fechadas. */
  defaultOpen?: number | null;
}

/** Faixa #duvidas: cabeçalho e perguntas que abrem e fecham. Ids: `{base}-header`, `{base}-list`, `{base}-item`, `{base}-item-button`. */
export function Faq({ eyebrow, title, items, defaultOpen = 0, 'data-testid': testId }: FaqProps) {
  const respondidas = items.flatMap(({ q, a }) => (a?.trim() ? [{ q, a }] : []));
  return (
    <Section id="duvidas" layout="split">
      <SectionHeader eyebrow={eyebrow} title={title} data-testid={testIdParte(testId, 'header')} />
      <Accordion items={respondidas} defaultOpen={defaultOpen ?? undefined} data-testid={testIdParte(testId, 'list')} />
    </Section>
  );
}
