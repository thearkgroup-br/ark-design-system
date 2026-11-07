// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CAMPO_ARMADILHA, LIMITE_PADRAO, criarLimitador, hostnameValido, preencheuAArmadilha, type BancoD1 } from './protecao';

const JANELA = 10 * 60 * 1000;
const PROTECAO = { dominios: ['site.com.br', 'www.site.com.br'], projetosPages: ['meu-projeto'] };

afterEach(() => vi.restoreAllMocks());

describe('hostnameValido', () => {
  it.each(['site.com.br', 'www.site.com.br', 'SITE.com.br', 'meu-projeto.pages.dev', 'a1b2c3.meu-projeto.pages.dev'])('aceita %s', (host) => {
    expect(hostnameValido(host, PROTECAO)).toBe(true);
  });

  it.each(['outro.com.br', 'site.com.br.atacante.com', 'atacante.pages.dev', 'x.outro-projeto.pages.dev', 'xmeu-projeto.pages.dev', '', undefined, 42])(
    'recusa %s',
    (host) => {
      expect(hostnameValido(host, PROTECAO)).toBe(false);
    },
  );
});

describe('preencheuAArmadilha', () => {
  it('vale o nome atual e o antigo, com texto de verdade', () => {
    expect(preencheuAArmadilha({ [CAMPO_ARMADILHA]: 'http://spam' })).toBe(true);
    expect(preencheuAArmadilha({ website: 'http://spam' })).toBe(true);
  });

  it.each([{}, { [CAMPO_ARMADILHA]: '' }, { [CAMPO_ARMADILHA]: '   ' }, { [CAMPO_ARMADILHA]: 5 }, { website: null }])('%j não conta', (corpo) => {
    expect(preencheuAArmadilha(corpo)).toBe(false);
  });
});

describe('limitador na memória', () => {
  it('deixa passar até o máximo e diz em quantos segundos libera', async () => {
    const limitador = criarLimitador(LIMITE_PADRAO, () => 'sal');
    for (let i = 0; i < LIMITE_PADRAO.maximo; i += 1) expect(await limitador.registrar('1.1.1.1', undefined, undefined, 0)).toBeNull();
    expect(await limitador.registrar('1.1.1.1', undefined, undefined, 1000)).toBe(599);
    expect(await limitador.registrar('2.2.2.2', undefined, undefined, 1000)).toBeNull();
  });

  it('libera de novo depois da janela e esquece os IPs antigos quando a memória enche', async () => {
    const limitador = criarLimitador(LIMITE_PADRAO, () => 'sal');
    for (let i = 0; i < 5001; i += 1) await limitador.registrar(`10.${i >> 8}.${i & 255}.1`, undefined, undefined, 0);
    // Passada a janela, o próximo registro varre os 5001 vencidos e o primeiro IP volta a ter o orçamento inteiro.
    await limitador.registrar('11.0.0.1', undefined, undefined, JANELA + 1);
    for (let i = 0; i < LIMITE_PADRAO.maximo; i += 1) expect(await limitador.registrar('10.0.0.1', undefined, undefined, JANELA + 2)).toBeNull();
    expect(await limitador.registrar('10.0.0.1', undefined, undefined, JANELA + 3)).not.toBeNull();
  });

  it('zerar esquece tudo', async () => {
    const limitador = criarLimitador({ maximo: 1, janelaMs: JANELA }, () => 'sal');
    await limitador.registrar('1.1.1.1', undefined, undefined, 0);
    expect(await limitador.registrar('1.1.1.1', undefined, undefined, 1)).not.toBeNull();
    limitador.zerar();
    expect(await limitador.registrar('1.1.1.1', undefined, undefined, 2)).toBeNull();
  });
});

/** D1 de mentira: conta por (chave, janela) e guarda o que foi executado. */
function banco({ limpezaFalha = false }: { limpezaFalha?: boolean } = {}) {
  const contadores = new Map<string, number>();
  const sqls: string[] = [];
  const chaves: string[] = [];
  const falso = {
    sqls,
    chaves,
    prepare(sql: string) {
      sqls.push(sql);
      const executar = () => (limpezaFalha && sql.startsWith('DELETE') ? Promise.reject(new Error('sem permissão')) : Promise.resolve(undefined));
      return {
        run: executar,
        bind: (...valores: unknown[]) => ({
          run: () => {
            chaves.push(String(valores[0]));
            return executar();
          },
          first: async <T>() => {
            chaves.push(String(valores[0]));
            const chave = `${valores[0]}:${valores[1]}`;
            contadores.set(chave, (contadores.get(chave) ?? 0) + 1);
            return { total: contadores.get(chave) } as T;
          },
        }),
      };
    },
  };
  return falso as typeof falso & BancoD1;
}

describe('limitador no D1', () => {
  it('uma vez em cinquenta, o primeiro envio da janela apaga as janelas velhas', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const d1 = banco();
    const limitador = criarLimitador(LIMITE_PADRAO, () => 'sal');

    expect(await limitador.registrar('1.1.1.1', d1, undefined, 0)).toBeNull();

    expect(d1.sqls.some((sql) => sql.startsWith('DELETE FROM contato_limite'))).toBe(true);
  });

  it('nas outras vezes não apaga nada', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const d1 = banco();
    await criarLimitador(LIMITE_PADRAO, () => 'sal').registrar('1.1.1.1', d1, undefined, 0);

    expect(d1.sqls.some((sql) => sql.startsWith('DELETE'))).toBe(false);
  });

  it('se a limpeza falhar, a contagem de agora continua valendo (sem cair para a memória)', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const aoFalhar = vi.fn();
    const limitador = criarLimitador(LIMITE_PADRAO, () => 'sal');

    expect(await limitador.registrar('1.1.1.1', banco({ limpezaFalha: true }), aoFalhar, 0)).toBeNull();

    expect(aoFalhar).not.toHaveBeenCalled();
  });

  it('guarda só o resumo do IP, e ele muda com o sal: o mesmo IP em outro projeto é outra chave', async () => {
    const um = banco();
    const outro = banco();
    await criarLimitador(LIMITE_PADRAO, () => 'sal-a').registrar('1.1.1.1', um, undefined, 0);
    await criarLimitador(LIMITE_PADRAO, () => 'sal-b').registrar('1.1.1.1', outro, undefined, 0);

    expect(um.chaves[0]).toMatch(/^[0-9a-f]{32}$/);
    expect(outro.chaves[0]).toMatch(/^[0-9a-f]{32}$/);
    expect(um.chaves[0]).not.toBe(outro.chaves[0]);
    expect(um.chaves[0]).not.toContain('1.1.1.1');
  });
});
