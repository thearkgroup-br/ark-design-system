import { render, screen } from '@testing-library/react';
import { Faq } from './Faq';

const perguntas = [
  { q: 'Preciso entender de finanças?', a: 'Não.' },
  { q: 'Quanto custa?', a: '' },
  { q: 'Funciona sem a Íris?', a: 'Sim.' },
];

describe('Faq', () => {
  it('é a faixa #duvidas com cabeçalho e as perguntas respondidas', () => {
    render(<Faq eyebrow="Dúvidas" title="Perguntas que a gente sempre ouve." items={perguntas} data-testid="somma-landing-faq" />);
    expect(document.getElementById('duvidas')).toBeInTheDocument();
    expect(screen.getByTestId('somma-landing-faq-header')).toHaveTextContent('( Dúvidas )');
    expect(screen.getByTestId('somma-landing-faq-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('somma-landing-faq-item')).toHaveLength(2);
    expect(screen.queryByText('Quanto custa?')).not.toBeInTheDocument();
  });

  it('o primeiro item já vem aberto por padrão', () => {
    render(<Faq title="Dúvidas." items={perguntas} data-testid="f" />);
    expect(screen.getAllByTestId('f-item')[0]).toHaveAttribute('open');
    expect(screen.getAllByTestId('f-item')[1]).not.toHaveAttribute('open');
  });

  it('defaultOpen null deixa todos fechados', () => {
    render(<Faq title="Dúvidas." items={perguntas} defaultOpen={null} data-testid="f" />);
    expect(screen.getAllByTestId('f-item')[0]).not.toHaveAttribute('open');
  });
});
