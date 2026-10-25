import { render, screen } from '@testing-library/react';
import { Button } from '../Button/Button';
import { Eyebrow } from '../Eyebrow/Eyebrow';
import { SectionHeader } from './SectionHeader';

const ID = 'ark-landing-audience-header';

describe('Eyebrow', () => {
  it('repassa o data-testid e põe parênteses por padrão', () => {
    const { rerender } = render(<Eyebrow data-testid="e">Para quem é</Eyebrow>);
    expect(screen.getByTestId('e')).toHaveTextContent('( Para quem é )');
    rerender(<Eyebrow parens={false} data-testid="e">Para quem é</Eyebrow>);
    expect(screen.getByTestId('e')).toHaveTextContent(/^Para quem é$/);
  });

  it('muted troca a cor', () => {
    render(<Eyebrow tone="muted" data-testid="e">Dúvidas</Eyebrow>);
    expect(screen.getByTestId('e')).toHaveClass('ak-eyebrow-muted');
  });
});

describe('SectionHeader', () => {
  it('repassa o data-testid e deriva título e texto', () => {
    render(<SectionHeader eyebrow="Para quem é" title="Feito para cada fase do seu negócio." text="Do salão de bairro à rede." data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveTextContent('( Para quem é )');
    expect(screen.getByTestId('ark-landing-audience-header-title')).toHaveTextContent('Feito para cada fase do seu negócio.');
    expect(screen.getByTestId('ark-landing-audience-header-text')).toHaveTextContent('Do salão de bairro à rede.');
  });

  it('título é h2 por padrão; hero usa level 1 e o tamanho de topo', () => {
    const { rerender } = render(<SectionHeader title="Seção." />);
    expect(screen.getByRole('heading', { level: 2, name: 'Seção.' })).toBeInTheDocument();
    rerender(<SectionHeader title="Topo." size="hero" level={1} text="Apoio" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('ak-hero-title');
    expect(screen.getByText('Apoio')).toHaveClass('ak-lead');
  });

  it('centraliza e mostra ações', () => {
    render(<SectionHeader title="Dúvidas." align="center" actions={<Button>Fale com a gente</Button>} data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveClass('ak-center');
    expect(screen.getByRole('button', { name: 'Fale com a gente' })).toBeInTheDocument();
  });
});
