import { act, render, screen } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('repassa o data-testid e é lido sem tirar o foco (role="status")', () => {
    render(<Toast data-testid="iris-app-saved-toast">Salvo</Toast>);
    expect(screen.getByTestId('iris-app-saved-toast')).toHaveAttribute('role', 'status');
    expect(screen.getByRole('status')).toHaveTextContent('Salvo');
  });

  it('avisa onClose depois de 4 s, não antes', () => {
    const onClose = vi.fn();
    render(<Toast onClose={onClose}>Lembrete ligado</Toast>);
    act(() => vi.advanceTimersByTime(3999));
    expect(onClose).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('respeita duration; 0 não some sozinho', () => {
    const onClose = vi.fn();
    const { rerender } = render(<Toast onClose={onClose} duration={1000}>Salvo</Toast>);
    act(() => vi.advanceTimersByTime(1000));
    expect(onClose).toHaveBeenCalledTimes(1);
    rerender(<Toast onClose={onClose} duration={0}>Sem conexão. Tentando de novo…</Toast>);
    act(() => vi.advanceTimersByTime(60000));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ao sair da tela antes do tempo, não chama onClose', () => {
    const onClose = vi.fn();
    const { unmount } = render(<Toast onClose={onClose}>Salvo</Toast>);
    unmount();
    act(() => vi.advanceTimersByTime(5000));
    expect(onClose).not.toHaveBeenCalled();
  });

  it.each([
    ['success', 'check'],
    ['danger', 'alert'],
    ['info', 'info'],
  ] as const)('tom %s com ícone %s escondido', (tone, icone) => {
    render(<Toast tone={tone}>Texto</Toast>);
    const svg = screen.getByRole('status').querySelector('svg');
    expect(screen.getByRole('status')).toHaveClass(`ak-toast-${tone}`);
    expect(svg).toHaveAttribute('data-icon', icone);
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
