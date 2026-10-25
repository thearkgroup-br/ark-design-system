import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchField } from './SearchField';

const ID = 'iris-home-search-input';

describe('SearchField', () => {
  it('repassa o data-testid para o input de busca', () => {
    render(<SearchField label="Buscar" data-testid={ID} />);
    const input = screen.getByTestId(ID);
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'search');
  });

  it('liga o rótulo; com hideLabel ele continua sendo lido', () => {
    render(<SearchField id="busca-home" label="Buscar estabelecimento" hideLabel />);
    const input = screen.getByLabelText('Buscar estabelecimento');
    expect(input).toHaveAttribute('id', 'busca-home');
    expect(screen.getByText('Buscar estabelecimento')).toHaveClass('ak-sr');
  });

  it('sem rótulo, usa o placeholder como nome', () => {
    render(<SearchField placeholder="Buscar serviço ou estabelecimento" />);
    expect(screen.getByRole('searchbox', { name: 'Buscar serviço ou estabelecimento' })).toBeInTheDocument();
  });

  it('gera ids diferentes quando há duas buscas sem id na tela', () => {
    render(
      <>
        <SearchField label="Buscar cliente" />
        <SearchField label="Buscar serviço" />
      </>,
    );
    const ids = screen.getAllByRole('searchbox').map((i) => i.id);
    expect(ids[0]).not.toBe(ids[1]);
    expect(screen.getByLabelText('Buscar cliente').id).toBe(ids[0]);
  });

  it('limita a 60 caracteres', () => {
    render(<SearchField label="Buscar" />);
    expect(screen.getByRole('searchbox')).toHaveAttribute('maxLength', '60');
  });

  it('chama onChange com o texto a cada tecla', async () => {
    const onChange = vi.fn();
    render(<SearchField label="Buscar" onChange={onChange} />);
    await userEvent.type(screen.getByRole('searchbox'), 'jo');
    expect(onChange).toHaveBeenNthCalledWith(1, 'j');
    expect(onChange).toHaveBeenNthCalledWith(2, 'jo');
  });

  it('o botão limpar só aparece com texto, tem id derivado, limpa e devolve o foco', async () => {
    const onChange = vi.fn();
    render(<SearchField label="Buscar" onChange={onChange} data-testid={ID} />);
    expect(screen.queryByTestId('iris-home-search-clear-button')).not.toBeInTheDocument();
    await userEvent.type(screen.getByTestId(ID), 'salao');
    const limpar = screen.getByTestId('iris-home-search-clear-button');
    expect(limpar).toHaveAccessibleName('Limpar busca');
    await userEvent.click(limpar);
    expect(screen.getByTestId(ID)).toHaveValue('');
    expect(screen.getByTestId(ID)).toHaveFocus();
    expect(onChange).toHaveBeenLastCalledWith('');
    expect(screen.queryByTestId('iris-home-search-clear-button')).not.toBeInTheDocument();
  });

  it('limpa pelo teclado', async () => {
    render(<SearchField label="Buscar" defaultValue="joao" />);
    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Limpar busca' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('controlado mantém o valor de fora', async () => {
    const onChange = vi.fn();
    render(<SearchField label="Buscar" value="ana" onChange={onChange} />);
    await userEvent.type(screen.getByRole('searchbox'), 'x');
    expect(onChange).toHaveBeenCalledWith('anax');
    expect(screen.getByRole('searchbox')).toHaveValue('ana');
  });

  it('o ícone de lupa é decorativo', () => {
    render(<SearchField label="Buscar" />);
    expect(document.querySelector('.ak-search-ico svg')).toHaveAttribute('aria-hidden', 'true');
  });
});
