import type { ComponentType } from 'react';
import { Cores, Icones, Logos, Tipografia } from './Fundamentos';
import { AlternarTema, Botoes, CamposDeTexto } from './Lote1';
import { Busca, Escolhas, Interruptores, Segmentos, Selecao } from './Lote2';
import { Icones as IconesComponente, Logos as LogosComponente, NavegacaoDoApp, Site } from './Lote3';

export const SECOES: { id: string; titulo: string; Componente: ComponentType }[] = [
  { id: 'cores', titulo: 'Cores', Componente: Cores },
  { id: 'tipografia', titulo: 'Tipografia', Componente: Tipografia },
  { id: 'icones', titulo: 'Ícones', Componente: Icones },
  { id: 'logos', titulo: 'Logos', Componente: Logos },
  { id: 'button', titulo: 'Button', Componente: Botoes },
  { id: 'textfield', titulo: 'TextField', Componente: CamposDeTexto },
  { id: 'themetoggle', titulo: 'ThemeToggle', Componente: AlternarTema },
  { id: 'searchfield', titulo: 'SearchField', Componente: Busca },
  { id: 'select', titulo: 'Select', Componente: Selecao },
  { id: 'checkbox', titulo: 'Checkbox', Componente: Escolhas },
  { id: 'switch', titulo: 'Switch', Componente: Interruptores },
  { id: 'segmented', titulo: 'Segmented', Componente: Segmentos },
  { id: 'logo', titulo: 'Logo', Componente: LogosComponente },
  { id: 'icon', titulo: 'Icon e IconButton', Componente: IconesComponente },
  { id: 'topbar', titulo: 'TopBar, TabBar, SideNav', Componente: NavegacaoDoApp },
  { id: 'siteheader', titulo: 'SiteHeader e Footer', Componente: Site },
];
