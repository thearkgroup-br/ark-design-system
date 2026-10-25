import type { ReactNode } from 'react';

export function Secao({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <section className="vt-secao" id={id} aria-labelledby={`${id}-titulo`} data-testid={`ark-showcase-${id}-section`}>
      <h2 id={`${id}-titulo`} className="vt-secao-titulo">{titulo}</h2>
      {children}
    </section>
  );
}

export function Exemplo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="vt-exemplo">
      <h3 className="vt-exemplo-titulo">{titulo}</h3>
      <div className="vt-exemplo-corpo">{children}</div>
    </div>
  );
}
