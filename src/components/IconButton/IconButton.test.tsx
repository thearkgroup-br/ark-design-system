import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './IconButton';

const ID = 'iris-services-item-edit-button';

describe('IconButton', () => {
  it('repassa o data-testid para o botão', () => {
    render(<IconButton icon="edit" label="Editar serviço" data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('BUTTON');
  });

  it('o label vira o nome falado e a dica; o ícone fica escondido', () => {
    render(<IconButton icon="edit" label="Editar serviço" />);
    const botao = screen.getByRole('button', { name: 'Editar serviço' });
    expect(botao).toHaveAttribute('title', 'Editar serviço');
    expect(botao.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(botao).toHaveAttribute('type', 'button');
  });

  it('é outline e médio por padrão; aceita variante e tamanho', () => {
    const { rerender } = render(<IconButton icon="close" label="Fechar" data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveClass('ak-iconbtn', 'ak-iconbtn-outline');
    expect(screen.getByTestId(ID)).not.toHaveClass('ak-iconbtn-sm');
    rerender(<IconButton icon="plus" label="Adicionar" variant="solid" size="sm" data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveClass('ak-iconbtn-solid', 'ak-iconbtn-sm');
  });

  it('chama onClick e respeita disabled', async () => {
    const onClick = vi.fn();
    const { rerender } = render(<IconButton icon="close" label="Fechar" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<IconButton icon="close" label="Fechar" onClick={onClick} disabled />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('recebe foco pelo teclado', async () => {
    render(<IconButton icon="menu" label="Abrir menu" />);
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveFocus();
  });
});
