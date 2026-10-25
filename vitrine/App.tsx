import { useEffect, useState } from 'react';
import { ThemeToggle } from '../src';
import { SECOES } from './secoes';
import { MARCAS, aplicarTema, lerTema, type Marca } from './tema';

export function App() {
  const [{ marca, escuro }, setTema] = useState(lerTema);

  useEffect(() => aplicarTema(marca, escuro), [marca, escuro]);

  return (
    <div className="ak-root vt-pagina">
      <header className="vt-topo">
        <strong className="vt-marca">ark-design-system</strong>
        <label className="vt-tema">
          <span>Marca</span>
          <select
            value={marca}
            onChange={(e) => setTema({ marca: e.target.value as Marca, escuro })}
            data-testid="ark-showcase-header-brand-select"
          >
            {MARCAS.map((m) => (
              <option key={m.id} value={m.id}>{m.nome}</option>
            ))}
          </select>
        </label>
        <ThemeToggle dark={escuro} onChange={(d) => setTema({ marca, escuro: d })} data-testid="ark-showcase-header-theme-button" />
      </header>
      <div className="vt-corpo">
        <nav className="vt-indice" aria-label="Componentes">
          {SECOES.map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.titulo}</a>
          ))}
        </nav>
        <main className="vt-conteudo">
          {SECOES.map(({ id, Componente }) => (
            <Componente key={id} />
          ))}
        </main>
      </div>
    </div>
  );
}
