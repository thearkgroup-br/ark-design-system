import type { ReactNode } from 'react';
import { testIdParte, type TestIdProps } from '../../utils';

export interface TableColumn {
  key: string;
  /** Curto; aparece em maiúsculas. */
  label: string;
  /** Valores em R$ à direita. */
  align?: 'left' | 'right' | 'center';
}

export interface TableProps extends TestIdProps {
  /** Até 6 colunas; a primeira identifica a linha (hora, nome). */
  columns: TableColumn[];
  /** Uma `id` (texto ou número) em cada linha mantém a linha certa quando a lista muda de ordem. */
  rows: Record<string, ReactNode>[];
  /** Nome da tabela para o leitor de tela. */
  caption?: string;
  /** Frase do que vai aparecer quando não houver linhas. */
  empty?: string;
}

const chave = (linha: Record<string, ReactNode>, i: number) => (typeof linha.id === 'string' || typeof linha.id === 'number' ? linha.id : i);

/**
 * Tabela de dados do painel. Em espaço estreito (até 560 px de largura da própria tabela) vira lista de cartões
 * com o rótulo de cada coluna. O data-testid vai na `<table>`; cada linha ganha `{base}-row` e a mensagem vazia `{base}-empty`.
 */
export function Table({ columns, rows, caption, empty, 'data-testid': testId }: TableProps) {
  return (
    <div className="ak-table-wrap">
      <table className="ak-table" data-testid={testId}>
        {caption && <caption className="ak-sr">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={`ak-al-${c.align ?? 'left'}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={chave(r, i)} data-testid={testIdParte(testId, 'row')}>
              {columns.map((c, j) =>
                j === 0 ? (
                  <th key={c.key} scope="row" data-label={c.label} className={`ak-al-${c.align ?? 'left'}`}>
                    {r[c.key]}
                  </th>
                ) : (
                  <td key={c.key} data-label={c.label} className={`ak-al-${c.align ?? 'left'}`}>
                    {r[c.key]}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && empty && (
        <p className="ak-table-empty" data-testid={testIdParte(testId, 'empty')}>
          {empty}
        </p>
      )}
    </div>
  );
}
