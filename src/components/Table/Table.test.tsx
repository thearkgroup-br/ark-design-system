import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen, within } from '@testing-library/react';
import { Table, type TableColumn } from './Table';

const ID = 'iris-schedule-day-table';
const COLUNAS: TableColumn[] = [
  { key: 'hora', label: 'Hora' },
  { key: 'cliente', label: 'Cliente' },
  { key: 'valor', label: 'Valor', align: 'right' },
];
const LINHAS = [
  { id: 1, hora: '09:00', cliente: 'Maria Souza', valor: 'R$ 35,00' },
  { id: 2, hora: '10:00', cliente: 'João Lima', valor: 'R$ 50,00' },
];

describe('Table', () => {
  it('repassa o data-testid para a tabela e cada linha ganha {base}-row', () => {
    render(<Table columns={COLUNAS} rows={LINHAS} data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('TABLE');
    expect(screen.getAllByTestId('iris-schedule-day-table-row')).toHaveLength(2);
  });

  it('tem nome, cabeçalhos de coluna e a primeira coluna identifica a linha', () => {
    render(<Table columns={COLUNAS} rows={LINHAS} caption="Agenda de hoje" />);
    expect(screen.getByRole('table', { name: 'Agenda de hoje' })).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader').map((c) => c.textContent)).toEqual(['Hora', 'Cliente', 'Valor']);
    expect(screen.getByRole('rowheader', { name: '09:00' })).toHaveAttribute('scope', 'row');
  });

  it('cada célula leva o rótulo da coluna (para virar cartão no estreito) e o valor alinha à direita', () => {
    render(<Table columns={COLUNAS} rows={LINHAS} />);
    const linha = screen.getAllByRole('row')[1];
    const celula = within(linha).getByText('R$ 35,00');
    expect(celula).toHaveAttribute('data-label', 'Valor');
    expect(celula).toHaveClass('ak-al-right');
  });

  it('sem linhas mostra a frase de vazio', () => {
    render(<Table columns={COLUNAS} rows={[]} empty="Nenhum agendamento hoje." data-testid={ID} />);
    expect(screen.getByTestId('iris-schedule-day-table-empty')).toHaveTextContent('Nenhum agendamento hoje.');
  });

  it('com linhas não mostra a frase de vazio', () => {
    render(<Table columns={COLUNAS} rows={LINHAS} empty="Nenhum agendamento hoje." />);
    expect(screen.queryByText('Nenhum agendamento hoje.')).not.toBeInTheDocument();
  });

  it('o CSS vira lista de cartões quando a tabela tem até 560 px', () => {
    const css = readFileSync(resolve(__dirname, 'Table.css'), 'utf8');
    expect(css).toContain('container-type: inline-size');
    expect(css).toMatch(/@container \(max-width: 560px\)[\s\S]*content: attr\(data-label\)/);
  });
});
