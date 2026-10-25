import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const ID = 'iris-help-subject-select';
const ASSUNTOS = ['Agendamento', 'Pagamento', 'Conta', 'Problema no app', 'Outro'];

describe('Select', () => {
  it('repassa o data-testid para o <select>', () => {
    render(<Select id="assunto" label="Assunto" options={ASSUNTOS} data-testid={ID} />);
    expect(screen.getByTestId(ID).tagName).toBe('SELECT');
  });

  it('liga o rótulo ao select', () => {
    render(<Select id="assunto" label="Assunto" options={ASSUNTOS} />);
    expect(screen.getByLabelText('Assunto')).toHaveAttribute('id', 'assunto');
  });

  it('aceita opções em texto e em { value, label }', () => {
    render(<Select id="motivo" label="Motivo" options={['Outro', { value: 'fechado', label: 'Estabelecimento fechado' }]} />);
    expect(screen.getByRole('option', { name: 'Outro' })).toHaveValue('Outro');
    expect(screen.getByRole('option', { name: 'Estabelecimento fechado' })).toHaveValue('fechado');
  });

  it('mostra o placeholder como opção desativada e começa nele', () => {
    render(<Select id="assunto" label="Assunto" placeholder="Escolha um assunto" options={ASSUNTOS} />);
    const placeholder = screen.getByRole('option', { name: 'Escolha um assunto' });
    expect(placeholder).toBeDisabled();
    expect(screen.getByLabelText('Assunto')).toHaveValue('');
  });

  it('sem placeholder e sem valor, começa na primeira opção', () => {
    render(<Select id="assunto" label="Assunto" options={ASSUNTOS} />);
    expect(screen.getByLabelText('Assunto')).toHaveValue('Agendamento');
  });

  it('mostra o erro do Campos.md ligado ao select, com o id derivado', () => {
    render(<Select id="assunto" label="Assunto" options={ASSUNTOS} error="Escolha um assunto." data-testid={ID} />);
    const select = screen.getByTestId(ID);
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAccessibleDescription('Escolha um assunto.');
    expect(screen.getByTestId('iris-help-subject-error')).toHaveTextContent('Escolha um assunto.');
  });

  it('liga a dica e mostra "(opcional)"', () => {
    render(<Select id="cat" label="Categoria" optional hint="Ajuda a organizar" options={ASSUNTOS} data-testid={ID} />);
    expect(screen.getByLabelText('Categoria (opcional)')).toHaveAccessibleDescription('Ajuda a organizar');
    expect(screen.getByTestId('iris-help-subject-hint')).toBeInTheDocument();
  });

  it('funciona sem controle e chama onChange com o evento', async () => {
    const onChange = vi.fn();
    render(<Select id="assunto" label="Assunto" placeholder="Escolha um assunto" options={ASSUNTOS} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText('Assunto'), 'Conta');
    expect(screen.getByLabelText('Assunto')).toHaveValue('Conta');
    expect(onChange.mock.calls[0][0].target.value).toBe('Conta');
  });

  it('controlado mantém o valor de fora', async () => {
    const onChange = vi.fn();
    render(<Select id="assunto" label="Assunto" options={ASSUNTOS} value="Pagamento" onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText('Assunto'), 'Conta');
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByLabelText('Assunto')).toHaveValue('Pagamento');
  });

  it('repassa desativado, obrigatório e name', () => {
    render(<Select id="assunto" label="Assunto" options={ASSUNTOS} disabled required name="assunto" />);
    const select = screen.getByLabelText('Assunto');
    expect(select).toBeDisabled();
    expect(select).toBeRequired();
    expect(select).toHaveAttribute('name', 'assunto');
  });

  it('a seta é decorativa', () => {
    render(<Select id="assunto" label="Assunto" options={ASSUNTOS} />);
    expect(document.querySelector('.ak-select-ico svg')).toHaveAttribute('aria-hidden', 'true');
  });
});
