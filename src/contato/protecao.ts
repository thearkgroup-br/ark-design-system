// Proteções da Function de contato (IRIS-285): campo armadilha, hostname do Turnstile e limite por IP.
// Roda em Worker: sem React e sem import de fora do pacote.

/** De onde o formulário pode ser enviado. O Turnstile devolve o hostname da página que o resolveu. */
export interface ProtecaoContato {
  /** Hostnames do próprio site (com e sem www, se os dois existirem). */
  dominios: string[];
  /** Nomes dos projetos no Cloudflare Pages: valem `<projeto>.pages.dev` e `<qualquer>.<projeto>.pages.dev`. */
  projetosPages: string[];
  /** Envios por IP em cada janela. Padrão: 5 a cada 10 minutos. */
  limite?: { maximo: number; janelaMs: number };
}

/**
 * Banco D1 do Cloudflare, só o que o limite usa. Opcional: sem o binding `CONTATO_LIMITE` o limite fica na memória do
 * isolate. Declarado aqui para o pacote não depender de `@cloudflare/workers-types`.
 */
export interface BancoD1 {
  prepare(sql: string): {
    bind(...valores: unknown[]): {
      first<T = unknown>(): Promise<T | null>;
      run(): Promise<unknown>;
    };
    run(): Promise<unknown>;
  };
}

/** Nome do campo que a pessoa nunca vê. Quem preenche é robô. */
export const CAMPO_ARMADILHA = 'confirmar_site';
/** Nome antigo do campo, que as LPs recusavam antes de o pacote tratar a armadilha. Segue valendo. */
const CAMPO_ARMADILHA_ANTIGO = 'website';

export const LIMITE_PADRAO = { maximo: 5, janelaMs: 10 * 60 * 1000 } as const;
const MAXIMO_DE_IPS_NA_MEMORIA = 5000;
/** Uma em cada tantas gravações no D1 aproveita para apagar as janelas velhas. */
const LIMPEZA_UMA_EM = 50;

/** O corpo preencheu o campo armadilha com algo que não seja espaço. */
export function preencheuAArmadilha(corpo: Record<string, unknown>): boolean {
  return [CAMPO_ARMADILHA, CAMPO_ARMADILHA_ANTIGO].some((campo) => {
    const valor = corpo[campo];
    return typeof valor === 'string' && valor.trim() !== '';
  });
}

/** O hostname só vale se for o do site ou o do Pages do próprio projeto; um Turnstile de outro site não passa. */
export function hostnameValido(hostname: unknown, protecao: ProtecaoContato): boolean {
  if (typeof hostname !== 'string') return false;
  const host = hostname.trim().toLowerCase();
  if (protecao.dominios.includes(host)) return true;
  return protecao.projetosPages.some((projeto) => host === `${projeto}.pages.dev` || host.endsWith(`.${projeto}.pages.dev`));
}

/** Segundos até liberar, ou `null` se o envio pode seguir. */
export type Espera = number | null;

export interface Limitador {
  /** Conta mais uma tentativa do IP. */
  registrar(ip: string, banco: BancoD1 | undefined, aoFalhar?: () => void, agora?: number): Promise<Espera>;
  /** Esvazia a memória (testes). */
  zerar(): void;
}

async function resumirIp(ip: string, sal: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${sal}:${ip}`);
  const resumo = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  return Array.from(resumo.slice(0, 16), (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Limite por IP. Com o D1 (`CONTATO_LIMITE`), o contador é de todos os isolates e de todos os pontos de presença: uma
 * janela fixa por IP, gravada com um único upsert. Sem o D1, ou se ele falhar, vale a memória do isolate (janela
 * deslizante): segura rajada, mas cada isolate conta sozinho. O D1 guarda só um resumo do IP (SHA-256 com sal), nunca o
 * endereço.
 */
export function criarLimitador(limite: { maximo: number; janelaMs: number }, sal: () => string): Limitador {
  const tentativas = new Map<string, number[]>();
  let tabelaCriada: Promise<unknown> | undefined;

  function naMemoria(ip: string, agora: number): Espera {
    const recentes = (tentativas.get(ip) ?? []).filter((momento) => agora - momento < limite.janelaMs);
    if (recentes.length >= limite.maximo) {
      tentativas.set(ip, recentes);
      return Math.max(1, Math.ceil((recentes[0] + limite.janelaMs - agora) / 1000));
    }
    recentes.push(agora);
    tentativas.set(ip, recentes);
    if (tentativas.size > MAXIMO_DE_IPS_NA_MEMORIA) {
      for (const [chave, momentos] of tentativas) if (momentos.every((momento) => agora - momento >= limite.janelaMs)) tentativas.delete(chave);
    }
    return null;
  }

  async function noBanco(banco: BancoD1, ip: string, agora: number): Promise<Espera> {
    // A tabela é criada sozinha na primeira gravação do isolate: quem liga o binding não roda SQL à mão.
    tabelaCriada ??= banco
      .prepare('CREATE TABLE IF NOT EXISTS contato_limite (chave TEXT NOT NULL, janela INTEGER NOT NULL, total INTEGER NOT NULL, PRIMARY KEY (chave, janela)) WITHOUT ROWID')
      .run();
    try {
      await tabelaCriada;
    } catch (erro) {
      tabelaCriada = undefined;
      throw erro;
    }
    const janela = Math.floor(agora / limite.janelaMs);
    const chave = await resumirIp(ip, sal());
    const linha = await banco
      .prepare('INSERT INTO contato_limite (chave, janela, total) VALUES (?1, ?2, 1) ON CONFLICT (chave, janela) DO UPDATE SET total = total + 1 RETURNING total')
      .bind(chave, janela)
      .first<{ total: number }>();
    if (!linha || typeof linha.total !== 'number') throw new Error('contador sem resposta');
    if (linha.total === 1 && Math.floor(Math.random() * LIMPEZA_UMA_EM) === 0) {
      // A limpeza é só higiene: se falhar, a contagem de agora continua valendo.
      await banco.prepare('DELETE FROM contato_limite WHERE janela < ?1').bind(janela).run().catch(() => undefined);
    }
    if (linha.total <= limite.maximo) return null;
    return Math.max(1, Math.ceil(((janela + 1) * limite.janelaMs - agora) / 1000));
  }

  return {
    async registrar(ip, banco, aoFalhar, agora = Date.now()) {
      if (banco) {
        try {
          return await noBanco(banco, ip, agora);
        } catch {
          // Sem o banco o limite não pode sumir: cai para a memória do isolate e avisa quem chamou (para o log).
          aoFalhar?.();
          return naMemoria(ip, agora);
        }
      }
      return naMemoria(ip, agora);
    },
    zerar() {
      tentativas.clear();
      tabelaCriada = undefined;
    },
  };
}
