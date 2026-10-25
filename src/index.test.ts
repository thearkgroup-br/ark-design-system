import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import * as pacote from './index';

describe('exports do pacote', () => {
  it('exporta todo componente que tem pasta em src/components (menos peças internas)', () => {
    const internas = ['Field'];
    const pasta = join(__dirname, 'components');
    const componentes = readdirSync(pasta).filter((n) => statSync(join(pasta, n)).isDirectory() && !internas.includes(n));
    const faltando = componentes.filter((c) => !(c in pacote));
    expect(faltando).toEqual([]);
  });
});
