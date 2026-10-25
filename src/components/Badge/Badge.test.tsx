import { render, screen } from '@testing-library/react';
import { Badge, StatusBadge, type BadgeStatus } from './Badge';

describe('Badge', () => {
  it('repassa o data-testid para o selo', () => {
    render(<Badge status="ativo" data-testid="iris-appointments-item-status" />);
    expect(screen.getByTestId('iris-appointments-item-status')).toHaveTextContent('Ativo');
  });

  it.each<[BadgeStatus, string, string]>([
    ['ativo', 'Ativo', 'info'],
    ['concluido', 'Concluído', 'success'],
    ['cancelado', 'Cancelado', 'neutral'],
    ['falta', 'Não compareceu', 'danger'],
    ['pendente', 'Aguardando status', 'warning'],
    ['aberto', 'Aberto agora', 'success'],
    ['fechado', 'Fechado', 'neutral'],
    ['bloqueado', 'Bloqueado', 'danger'],
    ['embreve', 'Em breve', 'neutral'],
    ['novo', 'Novo', 'brand'],
  ])('status %s mostra "%s" com o tom %s', (status, texto, tom) => {
    render(<Badge status={status} />);
    const selo = screen.getByText(texto);
    expect(selo).toHaveClass(`ak-badge-${tom}`);
  });

  it('tone com texto livre; neutro por padrão', () => {
    const { rerender } = render(<Badge tone="brand">Para equipes</Badge>);
    expect(screen.getByText('Para equipes')).toHaveClass('ak-badge-brand');
    rerender(<Badge>Rascunho</Badge>);
    expect(screen.getByText('Rascunho')).toHaveClass('ak-badge-neutral');
  });

  it('status com children troca só o texto', () => {
    render(<Badge status="pendente">Aguardando</Badge>);
    expect(screen.getByText('Aguardando')).toHaveClass('ak-badge-warning');
  });

  it('StatusBadge é o mesmo componente', () => {
    expect(StatusBadge).toBe(Badge);
  });
});
