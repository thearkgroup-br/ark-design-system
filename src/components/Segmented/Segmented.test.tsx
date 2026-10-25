import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Segmented } from './Segmented';

const ID = 'iris-schedule-view-group';
const VISOES = [
  { id: 'day', label: 'Dia' },
  { id: 'team', label: 'Equipe' },
  { id: 'week', label: 'Semana' },
];

describe('Segmented', () => {
  it('repassa o data-testid para o grupo e deriva um id por opção', () => {
    render(<Segmented options={VISOES} label="Visão da agenda" data-testid={ID} />);
    expect(screen.getByTestId(ID)).toHaveAttribute('role', 'group');
    expect(screen.getByTestId('iris-schedule-view-day-button')).toHaveTextContent('Dia');
    expect(screen.getByTestId('iris-schedule-view-week-button')).toHaveTextContent('Semana');
  });

  it('o grupo tem nome e o padrão é "Opções"', () => {
    const { rerender } = render(<Segmented options={VISOES} label="Visão da agenda" />);
    expect(screen.getByRole('group', { name: 'Visão da agenda' })).toBeInTheDocument();
    rerender(<Segmented options={VISOES} />);
    expect(screen.getByRole('group', { name: 'Opções' })).toBeInTheDocument();
  });

  it('começa na primeira opção, com só ela pressionada', () => {
    render(<Segmented options={VISOES} />);
    expect(screen.getByRole('button', { name: 'Dia' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Equipe' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'Semana' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('clicar escolhe a opção e avisa onChange com o id', async () => {
    const onChange = vi.fn();
    render(<Segmented options={VISOES} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Semana' }));
    expect(onChange).toHaveBeenCalledWith('week');
    expect(screen.getByRole('button', { name: 'Semana' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Dia' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('controlado não muda sozinho; defaultValue escolhe a inicial', async () => {
    const onChange = vi.fn();
    const { rerender } = render(<Segmented options={VISOES} defaultValue="team" />);
    expect(screen.getByRole('button', { name: 'Equipe' })).toHaveAttribute('aria-pressed', 'true');
    rerender(<Segmented key="c" options={VISOES} value="day" onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Semana' }));
    expect(onChange).toHaveBeenCalledWith('week');
    expect(screen.getByRole('button', { name: 'Dia' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('funciona pelo teclado', async () => {
    const onChange = vi.fn();
    render(<Segmented options={VISOES} onChange={onChange} />);
    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Equipe' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('team');
  });

  it('sem data-testid, as opções ficam sem id', () => {
    render(<Segmented options={VISOES} />);
    expect(screen.getByRole('button', { name: 'Dia' })).not.toHaveAttribute('data-testid');
  });
});
