import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabBar } from './TabBar';

const ID = 'iris-app-tabbar-nav';

describe('TabBar', () => {
  it('repassa o data-testid para o nav e deriva {id}-{nome}-tab em cada aba', () => {
    render(<TabBar data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('NAV');
    expect(screen.getByTestId('iris-app-tabbar-nav-inicio-tab')).toHaveTextContent('Início');
    expect(screen.getByTestId('iris-app-tabbar-nav-agendamentos-tab')).toHaveTextContent('Agendamentos');
    expect(screen.getByTestId('iris-app-tabbar-nav-perfil-tab')).toHaveTextContent('Perfil');
  });

  it('tem nome; padrão "Navegação principal"', () => {
    const { rerender } = render(<TabBar />);
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument();
    rerender(<TabBar label="Menu do app" />);
    expect(screen.getByRole('navigation', { name: 'Menu do app' })).toBeInTheDocument();
  });

  it('começa na primeira aba, só ela com aria-current="page"', () => {
    render(<TabBar />);
    expect(screen.getByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Perfil' })).not.toHaveAttribute('aria-current');
  });

  it('clicar troca a aba atual e avisa onNavigate', async () => {
    const onNavigate = vi.fn();
    render(<TabBar onNavigate={onNavigate} />);
    await userEvent.click(screen.getByRole('button', { name: 'Perfil' }));
    expect(onNavigate).toHaveBeenCalledWith('perfil');
    expect(screen.getByRole('button', { name: 'Perfil' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Início' })).not.toHaveAttribute('aria-current');
  });

  it('controlada por active não muda sozinha', async () => {
    const onNavigate = vi.fn();
    render(<TabBar active="agendamentos" onNavigate={onNavigate} />);
    await userEvent.click(screen.getByRole('button', { name: 'Perfil' }));
    expect(onNavigate).toHaveBeenCalledWith('perfil');
    expect(screen.getByRole('button', { name: 'Agendamentos' })).toHaveAttribute('aria-current', 'page');
  });

  it('aba com href vira link', () => {
    render(<TabBar items={[{ id: 'home', label: 'Início', icon: 'home', href: '/inicio' }, { id: 'profile', label: 'Perfil', icon: 'user', href: '/perfil' }]} />);
    expect(screen.getByRole('link', { name: 'Perfil' })).toHaveAttribute('href', '/perfil');
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
  });

  it('Ctrl+clique num link (nova aba) não troca a aba atual', async () => {
    const onNavigate = vi.fn();
    render(<TabBar onNavigate={onNavigate} items={[{ id: 'home', label: 'Início', icon: 'home', href: '/inicio' }, { id: 'profile', label: 'Perfil', icon: 'user', href: '/perfil' }]} />);
    const perfil = screen.getByRole('link', { name: 'Perfil' });
    perfil.addEventListener('click', (e) => e.preventDefault());
    const user = userEvent.setup();
    await user.keyboard('{Control>}');
    await user.click(perfil);
    await user.keyboard('{/Control}');
    expect(onNavigate).not.toHaveBeenCalled();
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
  });

  it('clique comum num link troca a aba atual e avisa onNavigate', async () => {
    const onNavigate = vi.fn();
    render(<TabBar onNavigate={onNavigate} items={[{ id: 'home', label: 'Início', icon: 'home', href: '/inicio' }, { id: 'profile', label: 'Perfil', icon: 'user', href: '/perfil' }]} />);
    const perfil = screen.getByRole('link', { name: 'Perfil' });
    perfil.addEventListener('click', (e) => e.preventDefault());
    await userEvent.setup().click(perfil);
    expect(onNavigate).toHaveBeenCalledWith('profile');
    expect(perfil).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Início' })).not.toHaveAttribute('aria-current');
  });

  it.each([
    ['Shift', { shiftKey: true }],
    ['Alt', { altKey: true }],
    ['Cmd', { metaKey: true }],
    ['botão do meio', { button: 1 }],
  ])('%s + clique num link não troca a aba atual', (_, clique) => {
    const onNavigate = vi.fn();
    render(<TabBar onNavigate={onNavigate} items={[{ id: 'home', label: 'Início', icon: 'home', href: '/inicio' }, { id: 'profile', label: 'Perfil', icon: 'user', href: '/perfil' }]} />);
    const perfil = screen.getByRole('link', { name: 'Perfil' });
    perfil.addEventListener('click', (e) => e.preventDefault());
    fireEvent.click(perfil, clique);
    expect(onNavigate).not.toHaveBeenCalled();
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
  });

  it('se o item ativo sumir da lista, a primeira aba fica atual', () => {
    render(<TabBar active="removido" />);
    expect(screen.getByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
  });

  it('ícones ficam escondidos; o texto da aba é o nome', () => {
    render(<TabBar />);
    screen.getAllByRole('button').forEach((aba) => expect(aba.querySelector('svg')).toHaveAttribute('aria-hidden', 'true'));
  });

  it('com o id do exemplo da skill (iris-app-main-tabbar), a aba home é iris-app-main-tabbar-home-tab', () => {
    render(<TabBar data-testid="iris-app-main-tabbar" items={[{ id: 'home', label: 'Início', icon: 'home' }]} />);
    expect(screen.getByTestId('iris-app-main-tabbar-home-tab')).toHaveTextContent('Início');
  });

  it('sem data-testid as abas ficam sem id', () => {
    render(<TabBar />);
    expect(screen.getByRole('button', { name: 'Início' })).not.toHaveAttribute('data-testid');
  });

  it('não quebra sem abas e não marca nenhuma como atual', () => {
    render(<TabBar items={[]} />);
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeEmptyDOMElement();
  });
});
