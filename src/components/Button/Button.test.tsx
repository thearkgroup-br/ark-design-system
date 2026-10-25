import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Button } from './Button';

const ID = 'iris-booking-confirm-submit-button';

describe('Button', () => {
  it('repassa o data-testid para o <button>', () => {
    render(<Button data-testid={ID}>Confirmar agendamento</Button>);
    expect(screen.getByTestId(ID).tagName).toBe('BUTTON');
  });

  it('é primary, médio e type="button" por padrão', () => {
    render(<Button data-testid={ID}>Agendar horário</Button>);
    const botao = screen.getByTestId(ID);
    expect(botao).toHaveClass('ak-btn', 'ak-btn-primary');
    expect(botao.className).not.toMatch(/ak-btn-(sm|md|lg)/);
    expect(botao).toHaveAttribute('type', 'button');
  });

  it.each(['secondary', 'ghost', 'soft', 'danger', 'danger-outline'] as const)('aplica a variante %s', (variant) => {
    render(<Button data-testid={ID} variant={variant}>Salvar alterações</Button>);
    expect(screen.getByTestId(ID)).toHaveClass(`ak-btn-${variant}`);
  });

  it('aplica tamanho, block, pill e className', () => {
    render(<Button data-testid={ID} size="lg" block pill className="extra">Agendar horário</Button>);
    expect(screen.getByTestId(ID)).toHaveClass('ak-btn-lg', 'ak-btn-block', 'ak-btn-pill', 'extra');
  });

  it('chama onClick ao clicar', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Agendar horário</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Agendar horário' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('com loading fica desativado, avisa aria-busy e mostra o texto de carregamento', async () => {
    const onClick = vi.fn();
    render(<Button data-testid={ID} loading loadingText="Confirmando…" onClick={onClick}>Confirmar agendamento</Button>);
    const botao = screen.getByTestId(ID);
    expect(botao).toBeDisabled();
    expect(botao).toHaveAttribute('aria-busy', 'true');
    expect(botao).toHaveTextContent('Confirmando…');
    expect(botao).not.toHaveTextContent('Confirmar agendamento');
    await userEvent.click(botao);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('mostra "Carregando…" quando loading não tem loadingText', () => {
    render(<Button loading>Salvar</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Carregando…');
  });

  it('desativado não dispara o clique', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Agendar horário</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('com href vira link com o mesmo visual e recebe o data-testid', () => {
    render(<Button data-testid="ark-landing-hero-contact-link" href="/contato" pill>Fale com a gente</Button>);
    const link = screen.getByRole('link', { name: 'Fale com a gente' });
    expect(link).toHaveAttribute('href', '/contato');
    expect(link).toHaveClass('ak-btn', 'ak-btn-primary', 'ak-btn-pill');
    expect(screen.getByTestId('ark-landing-hero-contact-link')).toBe(link);
  });

  it('link desativado perde o href e avisa aria-disabled', async () => {
    const onClick = vi.fn();
    render(<Button href="/contato" disabled onClick={onClick}>Fale com a gente</Button>);
    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('desenha os ícones escondidos do leitor de tela', () => {
    render(<Button iconLeft="calendar" iconRight="arrowRight">Agendar horário</Button>);
    const icones = screen.getByRole('button').querySelectorAll('svg');
    expect(icones).toHaveLength(2);
    icones.forEach((svg) => expect(svg).toHaveAttribute('aria-hidden', 'true'));
    expect(screen.getByRole('button', { name: 'Agendar horário' })).toBeInTheDocument();
  });

  it('recebe foco pelo teclado e repassa a ref', async () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(<Button ref={ref}>Agendar horário</Button>);
    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    expect(ref.current).toBe(screen.getByRole('button'));
  });
});
