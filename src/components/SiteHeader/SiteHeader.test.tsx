import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SiteHeader } from './SiteHeader';

const ID = 'ark-landing-header';
const LINKS = [
  { label: 'Para quem é', href: '#para-quem', id: 'audience' },
  { label: 'Planos', href: '#planos', id: 'plans' },
  { label: 'Dúvidas', href: '#duvidas' },
];
const CTA = { label: 'Fale com a gente', href: '#contato' };

describe('SiteHeader', () => {
  it('repassa o data-testid para o header e deriva as partes', () => {
    render(<SiteHeader links={LINKS} cta={CTA} data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('HEADER');
    expect(screen.getByTestId('ark-landing-header-logo-link')).toHaveAttribute('href', '#');
    expect(screen.getByTestId('ark-landing-header-audience-link')).toHaveTextContent('Para quem é');
    expect(screen.getByTestId('ark-landing-header-nav-link')).toHaveTextContent('Dúvidas');
    expect(screen.getByTestId('ark-landing-header-cta-link')).toHaveAttribute('href', '#contato');
    expect(screen.getByTestId('ark-landing-header-mobile-cta-link')).toHaveTextContent('Fale com a gente');
    expect(screen.getByTestId('ark-landing-header-theme-button')).toBeInTheDocument();
    expect(screen.getByTestId('ark-landing-header-menu-button')).toBeInTheDocument();
  });

  it('o link do logo diz a marca e leva ao início', () => {
    render(<SiteHeader brand="iris" homeHref="/" />);
    expect(screen.getByRole('link', { name: 'Íris: início' })).toHaveAttribute('href', '/');
  });

  it('abre e fecha o menu com aria-expanded e aria-controls', async () => {
    render(<SiteHeader links={LINKS} data-testid={ID} />);
    const botao = screen.getByRole('button', { name: 'Abrir menu' });
    expect(botao).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('ark-landing-header-menu')).not.toBeInTheDocument();
    await userEvent.click(botao);
    expect(botao).toHaveAttribute('aria-expanded', 'true');
    expect(botao).toHaveAccessibleName('Fechar menu');
    const menu = screen.getByTestId('ark-landing-header-menu');
    expect(botao.getAttribute('aria-controls')).toBe(menu.id);
    expect(screen.getByTestId('ark-landing-header-menu-plans-link')).toHaveTextContent('Planos');
    await userEvent.click(botao);
    expect(screen.queryByTestId('ark-landing-header-menu')).not.toBeInTheDocument();
  });

  it('Esc fecha o menu e devolve o foco ao botão', async () => {
    render(<SiteHeader links={LINKS} />);
    await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    await userEvent.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicar num link do menu fecha o menu e o foco volta ao botão', async () => {
    render(<SiteHeader links={LINKS} data-testid={ID} />);
    await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    await userEvent.click(screen.getByTestId('ark-landing-header-menu-plans-link'));
    expect(screen.queryByTestId('ark-landing-header-menu')).not.toBeInTheDocument();
    expect(screen.getByTestId('ark-landing-header-menu-button')).toHaveFocus();
  });

  it('Esc que outra camada já tratou não fecha o menu', async () => {
    render(<SiteHeader links={LINKS} data-testid={ID} />);
    await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    const evento = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    evento.preventDefault();
    document.dispatchEvent(evento);
    expect(screen.getByTestId('ark-landing-header-menu')).toBeInTheDocument();
  });

  it('aria-controls só aponta para o menu quando ele existe', async () => {
    render(<SiteHeader links={LINKS} />);
    const botao = screen.getByRole('button', { name: 'Abrir menu' });
    expect(botao).not.toHaveAttribute('aria-controls');
    await userEvent.click(botao);
    expect(document.getElementById(botao.getAttribute('aria-controls') ?? '')).toHaveAccessibleName('Menu do site');
  });

  it('o botão principal também fica no menu (aparece nele abaixo de 420 px)', async () => {
    render(<SiteHeader links={LINKS} cta={CTA} data-testid={ID} />);
    await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    expect(screen.getByTestId('ark-landing-header-menu-cta-link')).toHaveAttribute('href', '#contato');
  });

  it('aceita dois links com o mesmo texto', () => {
    const avisos = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<SiteHeader links={[{ label: 'Contato', href: '#a' }, { label: 'Contato', href: '#b' }]} />);
    expect(avisos).not.toHaveBeenCalled();
    avisos.mockRestore();
  });

  it('o tema do topo e o do menu ficam iguais e avisam onThemeChange', async () => {
    const onThemeChange = vi.fn();
    render(<SiteHeader links={LINKS} onThemeChange={onThemeChange} data-testid={ID} />);
    await userEvent.click(screen.getByTestId('ark-landing-header-theme-button'));
    expect(onThemeChange).toHaveBeenCalledWith(true);
    await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    expect(screen.getByTestId('ark-landing-header-menu-theme-button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('sem cta não mostra botão; themeToggle={false} tira o tema', () => {
    render(<SiteHeader links={LINKS} themeToggle={false} />);
    expect(screen.queryByRole('link', { name: 'Fale com a gente' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Modo/ })).not.toBeInTheDocument();
  });

  it('fica preso no topo por padrão', () => {
    const { rerender } = render(<SiteHeader data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveClass('ak-sticky');
    rerender(<SiteHeader sticky={false} data-testid={ID} />);
    expect(screen.getByTestId(ID)).not.toHaveClass('ak-sticky');
  });

  it('dois cabeçalhos usam ids de menu diferentes', async () => {
    render(
      <>
        <SiteHeader links={LINKS} />
        <SiteHeader links={LINKS} />
      </>,
    );
    const [a, b] = screen.getAllByRole('button', { name: 'Abrir menu' });
    await userEvent.click(a);
    await userEvent.click(b);
    expect(a.getAttribute('aria-controls')).toBeTruthy();
    expect(a.getAttribute('aria-controls')).not.toBe(b.getAttribute('aria-controls'));
  });

  it('o CSS troca para o menu em 860 px e esconde o botão principal em 420 px (largura do cabeçalho)', () => {
    const css = readFileSync(resolve(__dirname, 'SiteHeader.css'), 'utf8');
    expect(css).toContain('container-type: inline-size');
    expect(css).toMatch(/@container \(max-width: 860px\)/);
    expect(css).toMatch(/@container \(max-width: 420px\)/);
    // Logo de 860 px para cima os links quebram linha em vez de rolar para o lado.
    expect(css).toMatch(/\.ak-siteheader-nav \{[^}]*flex-wrap: wrap/);
  });
});
