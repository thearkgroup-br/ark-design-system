import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from '../IconButton/IconButton';
import { TopBar } from './TopBar';

const ID = 'iris-booking-header';

describe('TopBar', () => {
  it('repassa o data-testid para o header e deriva voltar e título', () => {
    render(<TopBar title="Quando fica bom?" data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('HEADER');
    expect(screen.getByTestId('iris-booking-back-button')).toHaveAccessibleName('Voltar');
    expect(screen.getByTestId('iris-booking-title')).toHaveTextContent('Quando fica bom?');
  });

  it('o voltar é um botão de 44 px que chama onBack', async () => {
    const onBack = vi.fn();
    render(<TopBar title="Serviços" onBack={onBack} />);
    const voltar = screen.getByRole('button', { name: 'Voltar' });
    expect(voltar).toHaveClass('ak-iconbtn');
    await userEvent.click(voltar);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('com backHref o voltar vira link com id derivado', () => {
    render(<TopBar title="Serviços" backHref="/inicio" data-testid={ID} />);
    const link = screen.getByRole('link', { name: 'Voltar' });
    expect(link).toHaveAttribute('href', '/inicio');
    expect(screen.getByTestId('iris-booking-back-link')).toBe(link);
  });

  it('back={false} esconde o voltar', () => {
    render(<TopBar title="Início" back={false} />);
    expect(screen.queryByRole('button', { name: 'Voltar' })).not.toBeInTheDocument();
  });

  it('mostra a ação à direita', () => {
    render(<TopBar title="Serviços" action={<IconButton icon="plus" label="Adicionar serviço" />} />);
    expect(screen.getByRole('button', { name: 'Adicionar serviço' })).toBeInTheDocument();
  });

  it('o voltar recebe foco pelo teclado', async () => {
    render(<TopBar title="Serviços" />);
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Voltar' })).toHaveFocus();
  });
});
