import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { NavItem } from '../TabBar/navegacao';
import { SideNav } from './SideNav';

const ID = 'iris-app-side-nav';
const ITENS: NavItem[] = [
  { id: 'schedule', label: 'Agenda', icon: 'calendar', count: 8 },
  { id: 'clients', label: 'Clientes', icon: 'users' },
  { id: 'help', label: 'Chamados', icon: 'chat', count: 0 },
];

describe('SideNav', () => {
  it('repassa o data-testid para o nav e deriva link e contador de cada item', () => {
    render(<SideNav items={ITENS} data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('NAV');
    expect(screen.getByTestId('iris-app-side-nav-schedule-link')).toHaveTextContent('Agenda');
    expect(screen.getByTestId('iris-app-side-nav-schedule-count')).toHaveTextContent('8');
  });

  it('é uma lista com nome; padrão "Menu do painel"', () => {
    render(<SideNav items={ITENS} />);
    const nav = screen.getByRole('navigation', { name: 'Menu do painel' });
    expect(within(nav).getAllByRole('listitem')).toHaveLength(3);
  });

  it('marca o item atual com aria-current e troca ao clicar', async () => {
    const onNavigate = vi.fn();
    render(<SideNav items={ITENS} onNavigate={onNavigate} />);
    expect(screen.getByRole('button', { name: /Agenda/ })).toHaveAttribute('aria-current', 'page');
    await userEvent.click(screen.getByRole('button', { name: 'Clientes' }));
    expect(onNavigate).toHaveBeenCalledWith('clients');
    expect(screen.getByRole('button', { name: 'Clientes' })).toHaveAttribute('aria-current', 'page');
  });

  it('controlada por active não muda sozinha', async () => {
    render(<SideNav items={ITENS} active="help" />);
    await userEvent.click(screen.getByRole('button', { name: 'Clientes' }));
    expect(screen.getByRole('button', { name: /Chamados/ })).toHaveAttribute('aria-current', 'page');
  });

  it('mostra contador só quando existe, inclusive 0', () => {
    render(<SideNav items={ITENS} data-testid={ID} />);
    expect(screen.getByTestId('iris-app-side-nav-help-count')).toHaveTextContent('0');
    expect(screen.queryByTestId('iris-app-side-nav-clients-count')).not.toBeInTheDocument();
  });

  it('mostra a marca e o rodapé quando recebe', () => {
    render(<SideNav items={ITENS} brand="iris" footer={<span>Barbearia do Bairro</span>} />);
    expect(screen.getByRole('img', { name: 'Íris' })).toBeInTheDocument();
    expect(screen.getByText('Barbearia do Bairro')).toBeInTheDocument();
  });

  it('item com href vira link', () => {
    render(<SideNav items={[{ id: 'plan', label: 'Plano', icon: 'chart', href: '/plano' }]} />);
    expect(screen.getByRole('link', { name: 'Plano' })).toHaveAttribute('href', '/plano');
  });

  it('clique comum num item com href troca o atual e avisa onNavigate', async () => {
    const onNavigate = vi.fn();
    render(<SideNav onNavigate={onNavigate} items={[{ id: 'schedule', label: 'Agenda', icon: 'calendar', href: '/agenda' }, { id: 'plan', label: 'Plano', icon: 'chart', href: '/plano' }]} />);
    const plano = screen.getByRole('link', { name: 'Plano' });
    plano.addEventListener('click', (e) => e.preventDefault());
    await userEvent.setup().click(plano);
    expect(onNavigate).toHaveBeenCalledWith('plan');
    expect(plano).toHaveAttribute('aria-current', 'page');
  });

  it('não quebra sem itens', () => {
    render(<SideNav items={[]} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
