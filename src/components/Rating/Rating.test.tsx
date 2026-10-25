import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rating } from './Rating';

describe('Rating (exibição)', () => {
  it('repassa o data-testid e fala a nota com vírgula e a contagem', () => {
    render(<Rating value={4.8} count={12} data-testid="iris-business-rating" />);
    const nota = screen.getByTestId('iris-business-rating');
    expect(nota).toHaveAttribute('role', 'img');
    expect(nota).toHaveAccessibleName('Nota 4,8 de 5, 12 avaliações');
    expect(nota).toHaveTextContent('4,8');
    expect(nota).toHaveTextContent('(12)');
  });

  it('sem nota mostra "Sem avaliações", nunca 0,0', () => {
    const { rerender } = render(<Rating data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveTextContent('Sem avaliações');
    rerender(<Rating value={0} data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveTextContent('Sem avaliações');
    expect(screen.getByTestId('r')).not.toHaveTextContent('0,0');
  });

  it('NaN é "Sem avaliações"; 1 avaliação no singular; 0 avaliações some', () => {
    const { rerender } = render(<Rating value={NaN} data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveTextContent('Sem avaliações');
    rerender(<Rating value={5} count={1} data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveAccessibleName('Nota 5,0 de 5, 1 avaliação');
    rerender(<Rating value={4.8} count={0} data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveAccessibleName('Nota 4,8 de 5');
    expect(screen.getByTestId('r')).not.toHaveTextContent('(0)');
  });

  it('5 estrelas, preenchidas pela nota arredondada; compact mostra uma', () => {
    const { container, rerender } = render(<Rating value={3.6} />);
    expect(container.querySelectorAll('svg')).toHaveLength(5);
    expect(container.querySelectorAll('svg[fill="currentColor"]')).toHaveLength(4);
    rerender(<Rating value={3.6} compact />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });
});

describe('Rating (entrada)', () => {
  const ID = 'iris-review-score-group';

  it('é um grupo de radios com nome e o data-testid; cada estrela ganha {base}-star', () => {
    render(<Rating editable data-testid={ID} />);
    expect(screen.getByRole('radiogroup', { name: 'Sua nota' })).toBe(screen.getByTestId(ID));
    expect(screen.getAllByTestId('iris-review-score-group-star')).toHaveLength(5);
  });

  it('cada estrela tem 44 px e nome falado ("4 estrelas, Bom")', () => {
    render(<Rating editable />);
    expect(screen.getByRole('radio', { name: '1 estrela, Muito ruim' })).toHaveClass('ak-star');
    expect(screen.getByRole('radio', { name: '4 estrelas, Bom' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '5 estrelas, Excelente' })).toBeInTheDocument();
  });

  it('clicar escolhe a nota e avisa onChange', async () => {
    const onChange = vi.fn();
    render(<Rating editable onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: '4 estrelas, Bom' }));
    expect(onChange).toHaveBeenCalledWith(4);
    expect(screen.getByRole('radio', { name: '4 estrelas, Bom' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: '3 estrelas, Regular' })).toHaveAttribute('aria-checked', 'false');
  });

  it('pelo teclado: Tab entra numa estrela só, setas mudam a nota, Home e End vão aos extremos', async () => {
    const onChange = vi.fn();
    render(<Rating editable onChange={onChange} />);
    await userEvent.tab();
    expect(screen.getByRole('radio', { name: '1 estrela, Muito ruim' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    expect(onChange).toHaveBeenLastCalledWith(2);
    expect(screen.getByRole('radio', { name: '2 estrelas, Ruim' })).toHaveFocus();
    await userEvent.keyboard('{End}');
    expect(onChange).toHaveBeenLastCalledWith(5);
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenLastCalledWith(5);
    await userEvent.keyboard('{Home}');
    expect(onChange).toHaveBeenLastCalledWith(1);
    await userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  it('controlada mantém a nota de fora', async () => {
    const onChange = vi.fn();
    render(<Rating editable value={2} onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: '5 estrelas, Excelente' }));
    expect(onChange).toHaveBeenCalledWith(5);
    expect(screen.getByRole('radio', { name: '2 estrelas, Ruim' })).toHaveAttribute('aria-checked', 'true');
  });

  it('nota fracionada ou fora da faixa não tira o grupo do Tab', async () => {
    const { rerender } = render(<Rating editable value={4.3} />);
    expect(screen.getByRole('radio', { name: '4 estrelas, Bom' })).toHaveAttribute('tabindex', '0');
    rerender(<Rating editable value={7} />);
    expect(screen.getByRole('radio', { name: '5 estrelas, Excelente' })).toHaveAttribute('tabindex', '0');
    rerender(<Rating editable value={NaN} />);
    await userEvent.tab();
    expect(screen.getByRole('radio', { name: '1 estrela, Muito ruim' })).toHaveFocus();
  });

  it('seta além do limite não avisa mudança', async () => {
    const onChange = vi.fn();
    render(<Rating editable defaultValue={5} onChange={onChange} />);
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}{End}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('aceita outro nome de grupo', () => {
    render(<Rating editable label="Nota do atendimento" />);
    expect(screen.getByRole('radiogroup', { name: 'Nota do atendimento' })).toBeInTheDocument();
  });
});
