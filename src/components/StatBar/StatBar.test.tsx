import { render, screen } from '@testing-library/react';
import { NumberedList } from '../NumberedList/NumberedList';
import { PriceList } from '../PriceList/PriceList';
import { Steps } from '../Steps/Steps';
import { StatBar } from './StatBar';

describe('StatBar', () => {
  it('repassa o data-testid e cada destaque ganha {base}-item', () => {
    render(<StatBar items={[{ value: '30 dias grátis', label: 'Sem cartão.' }, { value: 'R$ 59,90', label: 'Por mês.' }]} data-testid="ark-landing-highlights-list" />);
    expect(screen.getByTestId('ark-landing-highlights-list').tagName).toBe('UL');
    const itens = screen.getAllByTestId('ark-landing-highlights-item');
    expect(itens).toHaveLength(2);
    expect(itens[0]).toHaveTextContent('30 dias grátis');
    expect(itens[0]).toHaveTextContent('Sem cartão.');
  });
});

describe('NumberedList', () => {
  const ITENS = [{ title: 'Página própria', text: 'Com seus serviços.' }, { title: 'Lembretes' }];

  it('é uma lista ordenada com 01, 02 e cada item ganha {base}-item', () => {
    render(<NumberedList items={ITENS} data-testid="ark-landing-includes-list" />);
    expect(screen.getByTestId('ark-landing-includes-list').tagName).toBe('OL');
    const itens = screen.getAllByTestId('ark-landing-includes-item');
    expect(itens[0]).toHaveTextContent('01Página própriaCom seus serviços.');
    expect(itens[1]).toHaveTextContent('02Lembretes');
  });

  it('start muda o primeiro número', () => {
    render(<NumberedList items={ITENS} start={4} />);
    expect(screen.getByText('04')).toBeInTheDocument();
    expect(screen.getByRole('list')).toHaveAttribute('start', '4');
  });
});

describe('Steps', () => {
  const PASSOS = [{ title: 'Cadastre seus serviços' }, { title: 'Divulgue o link', text: 'No Instagram.' }];

  it('é uma lista ordenada; o círculo numerado é decorativo; cada passo ganha {base}-item', () => {
    render(<Steps items={PASSOS} data-testid="ark-landing-how-list" />);
    expect(screen.getByTestId('ark-landing-how-list').tagName).toBe('OL');
    expect(screen.getAllByTestId('ark-landing-how-item')).toHaveLength(2);
    expect(screen.getByText('1')).toHaveAttribute('aria-hidden', 'true');
  });

  it('direction row muda o arranjo', () => {
    render(<Steps items={PASSOS} direction="row" data-testid="s" />);
    expect(screen.getByTestId('s')).toHaveClass('ak-steps-row');
  });
});

describe('PriceList', () => {
  it('cada linha ganha {base}-item com nome, descrição e preço', () => {
    render(<PriceList items={[{ name: 'Site', desc: 'Página institucional.', price: 'a partir de R$ 2.000,00' }, { name: 'App', price: 'sob orçamento' }]} data-testid="ark-landing-prices-list" />);
    const linhas = screen.getAllByTestId('ark-landing-prices-item');
    expect(linhas).toHaveLength(2);
    expect(linhas[0]).toHaveTextContent('SitePágina institucional.a partir de R$ 2.000,00');
    expect(linhas[1]).toHaveTextContent('sob orçamento');
  });
});
