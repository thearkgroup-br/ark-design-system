import { useState } from 'react';
import { Footer, ICON_NAMES, Icon, IconButton, Logo, SideNav, SiteHeader, TabBar, TopBar, type NavItem } from '../../src';
import { Exemplo, Secao } from '../Secao';

export function Logos() {
  return (
    <Secao id="logo" titulo="Logo">
      <Exemplo titulo="As três marcas (acompanham o tema)">
        <Logo brand="ark" data-testid="ark-showcase-logo-ark-logo" />
        <Logo brand="iris" />
        <Logo brand="pulse" />
        <Logo brand="ark" name="ARCA DEV" />
      </Exemplo>
      <Exemplo titulo="Só símbolo e tamanho de tela de entrada">
        <Logo brand="ark" markOnly size={40} />
        <Logo brand="iris" markOnly size={40} />
        <Logo brand="iris" size={40} />
      </Exemplo>
    </Secao>
  );
}

export function Icones() {
  return (
    <Secao id="icon" titulo="Icon e IconButton">
      <Exemplo titulo="Icon com cor de token">
        <Icon name="star" filled color="var(--star)" label="Favorito" />
        <Icon name="heart" filled color="var(--danger)" />
        <Icon name="check" color="var(--success-ink)" />
        <Icon name="calendar" size={28} />
        <span className="ak-hint">{ICON_NAMES.length} ícones na seção Ícones.</span>
      </Exemplo>
      <Exemplo titulo="IconButton">
        <IconButton icon="edit" label="Editar serviço" data-testid="ark-showcase-icon-edit-button" />
        <IconButton icon="close" label="Fechar" variant="plain" />
        <IconButton icon="plus" label="Adicionar" variant="solid" />
        <IconButton icon="trash" label="Excluir" size="sm" />
        <IconButton icon="settings" label="Configurações" disabled />
      </Exemplo>
    </Secao>
  );
}

const ABAS: NavItem[] = [
  { id: 'home', label: 'Início', icon: 'store' },
  { id: 'appointments', label: 'Agendamentos', icon: 'calendar' },
  { id: 'favorites', label: 'Favoritos', icon: 'heart' },
  { id: 'profile', label: 'Perfil', icon: 'user' },
];
const PAINEL: NavItem[] = [
  { id: 'schedule', label: 'Agenda', icon: 'calendar', count: 8 },
  { id: 'clients', label: 'Clientes', icon: 'users' },
  { id: 'services', label: 'Serviços', icon: 'store' },
  { id: 'reviews', label: 'Avaliações', icon: 'star' },
  { id: 'settings', label: 'Configurações', icon: 'settings' },
];

export function NavegacaoDoApp() {
  const [aba, setAba] = useState('home');
  const [voltou, setVoltou] = useState(0);
  return (
    <Secao id="topbar" titulo="TopBar, TabBar e SideNav">
      <Exemplo titulo="TopBar">
        <div className="vt-moldura">
          <TopBar
            title="Quando fica bom?"
            onBack={() => setVoltou((n) => n + 1)}
            action={<IconButton icon="filter" label="Filtrar horários" variant="plain" />}
            data-testid="ark-showcase-topbar-header"
          />
          <span className="ak-hint" style={{ padding: 12 }}>Voltar clicado {voltou} vezes.</span>
        </div>
      </Exemplo>
      <Exemplo titulo="TabBar (celular)">
        <div className="vt-moldura vt-celular">
          <div style={{ padding: 16, flex: 1 }} className="ak-hint">Aba atual: {aba}</div>
          <TabBar items={ABAS} active={aba} onNavigate={setAba} data-testid="ark-showcase-tabbar-nav" />
        </div>
      </Exemplo>
      <Exemplo titulo="SideNav (painel no computador)">
        <div className="vt-moldura" style={{ height: 420, flexDirection: 'row' }}>
          <SideNav items={PAINEL} brand="iris" footer={<span className="ak-hint">Barbearia do Bairro</span>} data-testid="ark-showcase-sidenav-nav" />
        </div>
      </Exemplo>
    </Secao>
  );
}

const LINKS = [
  { label: 'Para quem é', href: '#siteheader', id: 'audience' },
  { label: 'Como funciona', href: '#siteheader', id: 'how' },
  { label: 'Planos', href: '#siteheader', id: 'plans' },
  { label: 'Dúvidas', href: '#siteheader', id: 'faq' },
];

export function Site() {
  return (
    <Secao id="siteheader" titulo="SiteHeader e Footer">
      <Exemplo titulo="SiteHeader largo (links + tema + botão)">
        <div className="vt-moldura">
          <SiteHeader brand="ark" links={LINKS} cta={{ label: 'Fale com a gente', href: '#siteheader' }} pill sticky={false} data-testid="ark-showcase-siteheader-header" />
        </div>
      </Exemplo>
      <Exemplo titulo="SiteHeader estreito (menu), 380 px">
        <div className="vt-moldura" style={{ width: 380, maxWidth: '100%' }}>
          <SiteHeader brand="iris" links={LINKS} cta={{ label: 'Começar', href: '#siteheader' }} pill sticky={false} data-testid="ark-showcase-siteheader-narrow-header" />
        </div>
      </Exemplo>
      <Exemplo titulo="Footer">
        <div className="vt-moldura">
          <Footer
            brand="ark"
            tagline="Tecnologia que cresce junto com o seu negócio."
            columns={[
              { title: 'Empresas', items: [{ label: 'Íris', href: '#siteheader' }, { label: 'Arca Dev', href: '#siteheader' }] },
              { title: 'Contato', items: ['Seg a sex, 9h às 18h', '(11) 91234-5678', 'contato@[a definir]'] },
              { title: 'Siga', items: [{ label: 'Instagram', href: '#siteheader' }] },
            ]}
            legal="© 2026 The Ark Group"
            bottomLinks={[{ label: 'Política de privacidade', href: '#siteheader' }, { label: 'Termos de uso', href: '#siteheader' }]}
            data-testid="ark-showcase-footer-footer"
          />
        </div>
      </Exemplo>
    </Secao>
  );
}
