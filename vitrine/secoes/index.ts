import type { ComponentType } from 'react';
import { Cores, Icones, Logos, Tipografia } from './Fundamentos';
import { AlternarTema, Botoes, CamposDeTexto } from './Lote1';

export const SECOES: { id: string; titulo: string; Componente: ComponentType }[] = [
  { id: 'cores', titulo: 'Cores', Componente: Cores },
  { id: 'tipografia', titulo: 'Tipografia', Componente: Tipografia },
  { id: 'icones', titulo: 'Ícones', Componente: Icones },
  { id: 'logos', titulo: 'Logos', Componente: Logos },
  { id: 'button', titulo: 'Button', Componente: Botoes },
  { id: 'textfield', titulo: 'TextField', Componente: CamposDeTexto },
  { id: 'themetoggle', titulo: 'ThemeToggle', Componente: AlternarTema },
];
