import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Comparison } from '../Comparison/Comparison';
import { PlanCard } from '../PlanCard/PlanCard';
import { Accordion } from './Accordion';

const PERGUNTAS = [
  { q: 'Preciso instalar algum aplicativo?', a: 'Não. Seus clientes agendam pelo navegador.' },
  { q: 'Tem fidelidade?', a: 'Não. Você cancela quando quiser.' },
];

describe('Accordion', () => {
  it('repassa o data-testid; cada pergunta ganha {base}-item e o abrir {base}-item-button', () => {
    render(<Accordion items={PERGUNTAS} data-testid="ark-landing-faq-list" />);
    expect(screen.getAllByTestId('ark-landing-faq-item')).toHaveLength(2);
    expect(screen.getAllByTestId('ark-landing-faq-item-button')[0]).toHaveTextContent('Preciso instalar algum aplicativo?');
  });

  it('começa fechado; defaultOpen abre só a escolhida', () => {
    const { rerender } = render(<Accordion items={PERGUNTAS} data-testid="f" />);
    screen.getAllByTestId('f-item').forEach((d) => expect(d).not.toHaveAttribute('open'));
    rerender(<Accordion items={PERGUNTAS} defaultOpen={1} data-testid="f" />);
    const [a, b] = screen.getAllByTestId('f-item');
    expect(a).not.toHaveAttribute('open');
    expect(b).toHaveAttribute('open');
  });

  it('abre ao clicar na pergunta; o "+" é decorativo', async () => {
    render(<Accordion items={PERGUNTAS} data-testid="f" />);
    await userEvent.click(screen.getByText('Tem fidelidade?'));
    expect(screen.getAllByTestId('f-item')[1]).toHaveAttribute('open');
    expect(screen.getAllByText('+')[0]).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Comparison', () => {
  it('lados e itens derivados do data-testid; ícones decorativos; VS escondido', () => {
    render(
      <Comparison
        before={{ title: 'Antes', items: ['Agenda no caderno'] }}
        after={{ title: 'Com a Íris', items: ['Cliente marca sozinho'] }}
        data-testid="iris-landing-compare"
      />,
    );
    expect(screen.getByTestId('iris-landing-compare-before')).toHaveTextContent('AntesAgenda no caderno');
    expect(screen.getByTestId('iris-landing-compare-after')).toHaveTextContent('Com a ÍrisCliente marca sozinho');
    expect(screen.getByTestId('iris-landing-compare-after-item').querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('VS')).toHaveAttribute('aria-hidden', 'true');
  });

  it('sem título usa "Antes" e "Depois"', () => {
    render(<Comparison before={{ title: '', items: [] }} after={{ title: '', items: [] }} />);
    expect(screen.getByText('Antes')).toBeInTheDocument();
    expect(screen.getByText('Depois')).toBeInTheDocument();
  });
});

describe('PlanCard', () => {
  const ID = 'iris-landing-plans-card';

  it('repassa o data-testid; preço, itens e botão derivados', () => {
    render(<PlanCard name="Para equipes" price="R$ 99,90" period="/mês" features={['Até 10 profissionais', 'Relatórios']} cta={{ label: 'Começar agora', href: '/cadastro' }} data-testid={ID} />);
    expect(screen.getByTestId('iris-landing-plans-price')).toHaveTextContent('R$ 99,90/mês');
    expect(screen.getAllByTestId('iris-landing-plans-feature-item')).toHaveLength(2);
    expect(screen.getByTestId('iris-landing-plans-cta-link')).toHaveAttribute('href', '/cadastro');
  });

  it('destaque com selo e botão principal; sem destaque, botão secundário', () => {
    const { rerender } = render(<PlanCard name="Para equipes" highlight badge="Para equipes" cta={{ label: 'Começar', href: '/c' }} data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveClass('ak-plan-hi');
    expect(screen.getByRole('link', { name: 'Começar' })).toHaveClass('ak-btn-primary');
    rerender(<PlanCard name="Solo" cta={{ label: 'Começar', href: '/c' }} data-testid={ID} />);
    expect(screen.getByRole('link', { name: 'Começar' })).toHaveClass('ak-btn-secondary');
  });

  it('"em breve" não tem preço nem botão', () => {
    render(<PlanCard name="Rede" soon price="R$ 199,90" cta={{ label: 'Começar', href: '/c' }} data-testid={ID} />);
    expect(screen.getByText('Em breve')).toBeInTheDocument();
    expect(screen.queryByTestId('iris-landing-plans-price')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('sem href o botão é um botão de verdade (não um link "#")', async () => {
    const onClick = vi.fn();
    render(<PlanCard name="Solo" cta={{ label: 'Quero esse', onClick }} data-testid={ID} />);
    await userEvent.click(screen.getByTestId('iris-landing-plans-cta-button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
