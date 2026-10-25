import tokens from '../../src/publico/tokens.json';
import { ICON_NAMES, renderIcon } from '../../src/icons/icons';
import { Exemplo, Secao } from '../Secao';

const LOGOS = import.meta.glob('../../src/publico/logos/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

export function Cores() {
  return (
    <Secao id="cores" titulo="Cores do tema">
      <div className="vt-cores">
        {tokens.color.tokens.map((t) => (
          <div key={t.name} className="vt-cor">
            <span className="vt-cor-amostra" style={{ background: `var(--${t.name})` }} />
            <code>--{t.name}</code>
            <span className="vt-cor-uso">{t.usage}</span>
          </div>
        ))}
      </div>
    </Secao>
  );
}

export function Tipografia() {
  return (
    <Secao id="tipografia" titulo="Tipografia">
      {tokens.type.groups.map((g) => (
        <Exemplo key={g.name} titulo={g.name}>
          <div className="vt-tipos">
            {g.styles.map((s) => (
              <p key={s.name} style={{ margin: 0, font: `var(--text-${s.name})`, letterSpacing: `var(--tracking-${s.name}, normal)` }}>
                <code className="vt-tipo-nome">{s.name}</code> {s.sample}
              </p>
            ))}
          </div>
        </Exemplo>
      ))}
    </Secao>
  );
}

export function Icones() {
  return (
    <Secao id="icones" titulo="Ícones">
      <div className="vt-icones">
        {ICON_NAMES.map((n) => (
          <span key={n} className="vt-icone">
            {renderIcon(n, 24)}
            <code>{n}</code>
          </span>
        ))}
      </div>
    </Secao>
  );
}

export function Logos() {
  return (
    <Secao id="logos" titulo="Logos (arquivos)">
      <div className="vt-logos">
        {Object.entries(LOGOS).map(([caminho, url]) => {
          const nome = caminho.split('/').pop() ?? caminho;
          const fundoEscuro = nome.includes('branco') || nome.includes('escuro');
          return (
            <figure key={nome} className={fundoEscuro ? 'vt-logo vt-logo-escuro' : 'vt-logo'}>
              <img src={url} alt="" height={48} />
              <figcaption>
                <code>{nome}</code>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Secao>
  );
}
