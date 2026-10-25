import { render, screen } from '@testing-library/react';
import { Button } from '../Button/Button';
import { Alert } from './Alert';

const ID = 'iris-booking-confirm-error-alert';

describe('Alert', () => {
  it('repassa o data-testid para o aviso e deriva o título', () => {
    render(<Alert tone="danger" title="Não deu para agendar" data-testid={ID}>Esse horário acabou de ser ocupado.</Alert>);
    expect(screen.getByTestId(ID)).toHaveTextContent('Esse horário acabou de ser ocupado.');
    expect(screen.getByTestId('iris-booking-confirm-error-title')).toHaveTextContent('Não deu para agendar');
  });

  it('danger é anunciado na hora com role="alert"', () => {
    render(<Alert tone="danger">Sem conexão.</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('ak-alert-danger');
  });

  it.each(['info', 'success', 'warning'] as const)('%s usa role="status"', (tone) => {
    render(<Alert tone={tone}>Texto</Alert>);
    expect(screen.getByRole('status')).toHaveClass(`ak-alert-${tone}`);
  });

  it('é info por padrão', () => {
    render(<Alert>Você pode cancelar até o horário de início.</Alert>);
    expect(screen.getByRole('status')).toHaveClass('ak-alert-info');
  });

  it('tem ícone escondido (o significado vem do texto, não só da cor)', () => {
    render(<Alert tone="warning" title="Prazo">Falta 1 dia.</Alert>);
    expect(screen.getByRole('status').querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('mostra a ação de saída', () => {
    render(<Alert tone="danger" action={<Button size="sm" variant="secondary">Tentar de novo</Button>}>Não carregou.</Alert>);
    expect(screen.getByRole('button', { name: 'Tentar de novo' })).toBeInTheDocument();
  });
});
