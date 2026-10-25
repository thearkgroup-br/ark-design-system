import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

const ID = 'ark-landing-companies-card';

describe('Card', () => {
  it('repassa o data-testid e deriva o título', () => {
    render(<Card title="Íris" text="Agenda online para pequenos negócios." data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('DIV');
    expect(screen.getByTestId('ark-landing-companies-title')).toHaveTextContent('Íris');
  });

  it('com href vira link; com onClick vira botão', async () => {
    const onClick = vi.fn();
    const { rerender } = render(<Card title="Íris" href="/iris" data-testid={ID} />);
    expect(screen.getByRole('link', { name: 'Íris' })).toHaveAttribute('href', '/iris');
    rerender(<Card title="Íris" onClick={onClick} data-testid={ID} />);
    const botao = screen.getByRole('button', { name: 'Íris' });
    expect(botao).toHaveAttribute('type', 'button');
    await userEvent.click(botao);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('ícone por nome vira desenho; elemento pronto passa direto; ambos escondidos', () => {
    const { container, rerender } = render(<Card title="Agenda" icon="calendar" />);
    expect(container.querySelector('.ak-card-icon svg')).toHaveAttribute('data-icon', 'calendar');
    expect(container.querySelector('.ak-card-icon')).toHaveAttribute('aria-hidden', 'true');
    rerender(<Card title="Agenda" icon={<span data-testid="meu-icone">*</span>} />);
    expect(screen.getByTestId('meu-icone')).toBeInTheDocument();
  });

  it('ícone desconhecido não deixa caixa vazia', () => {
    const { container } = render(<Card title="X" icon={'foguete' as never} />);
    expect(container.querySelector('.ak-card-icon')).toBeNull();
  });

  it('mostra número, selo e rodapé', () => {
    render(<Card number="01" title="Comece" badge="Grátis" footer="30 dias" />);
    expect(screen.getByText('01')).toHaveClass('ak-num');
    expect(screen.getByText('Grátis')).toHaveClass('ak-badge');
    expect(screen.getByText('30 dias')).toHaveClass('ak-card-footer');
  });

  it.each(['surface', 'sunken', 'outline', 'brand'] as const)('tom %s', (tone) => {
    render(<Card title="X" tone={tone} data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveClass(`ak-card-${tone}`);
  });
});
