import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { BottomSheet } from './BottomSheet';

const ID = 'iris-booking-limit-sheet';

function abrir(props: Partial<Parameters<typeof BottomSheet>[0]> = {}) {
  const onClose = vi.fn();
  render(
    <BottomSheet
      id="limite"
      title="Você já tem 2 horários guardados"
      text="Confirme ou cancele um deles para agendar outro."
      icon="alert"
      tone="warning"
      onClose={onClose}
      actions={
        <>
          <Button size="lg" block>Ver meus horários</Button>
          <Button size="lg" block variant="ghost" onClick={onClose}>Agora não</Button>
        </>
      }
      data-testid={ID}
      {...props}
    />,
  );
  return onClose;
}

describe('BottomSheet', () => {
  it('repassa o data-testid para o painel e deriva o fechar como {id}-close-button', () => {
    abrir();
    expect(screen.getByTestId(ID)).toHaveAttribute('role', 'dialog');
    expect(screen.getByTestId('iris-booking-limit-close-button')).toHaveAccessibleName('Fechar');
    expect(screen.getByTestId('iris-booking-limit-title')).toHaveTextContent('Você já tem 2 horários guardados');
  });

  it('é modal com nome e descrição; o foco vai para dentro', () => {
    abrir();
    const sheet = screen.getByRole('dialog', { name: 'Você já tem 2 horários guardados' });
    expect(sheet).toHaveAttribute('aria-modal', 'true');
    expect(sheet).toHaveAccessibleDescription('Confirme ou cancele um deles para agendar outro.');
    expect(sheet.contains(document.activeElement)).toBe(true);
  });

  it('tocar fora fecha', async () => {
    const onClose = abrir();
    await userEvent.click(screen.getByTestId('iris-booking-limit-overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('tocar dentro não fecha', async () => {
    const onClose = abrir();
    await userEvent.click(screen.getByTestId('iris-booking-limit-title'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('o X, o Esc e a ação secundária fecham', async () => {
    const onClose = abrir();
    await userEvent.click(screen.getByTestId('iris-booking-limit-close-button'));
    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'Agora não' }));
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('arrastar mais de 80 px para baixo fecha; menos que isso volta', () => {
    const onClose = abrir();
    const alca = screen.getByTestId('iris-booking-limit-grabber');
    fireEvent.pointerDown(alca, { clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(alca, { clientY: 150, pointerId: 1 });
    expect(screen.getByTestId(ID)).toHaveStyle({ transform: 'translateY(50px)' });
    fireEvent.pointerUp(alca, { clientY: 150, pointerId: 1 });
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByTestId(ID).style.transform).toBe('');
    fireEvent.pointerDown(alca, { clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(alca, { clientY: 200, pointerId: 1 });
    fireEvent.pointerUp(alca, { clientY: 200, pointerId: 1 });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('alert (bloqueio) só fecha pelas ações: sem X, sem tocar fora, sem Esc, sem arrastar', async () => {
    const onClose = abrir({ alert: true, title: 'Horário bloqueado' });
    expect(screen.getByRole('alertdialog', { name: 'Horário bloqueado' })).toBeInTheDocument();
    expect(screen.queryByTestId('iris-booking-limit-close-button')).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('iris-booking-limit-overlay'));
    await userEvent.keyboard('{Escape}');
    const alca = screen.getByTestId('iris-booking-limit-grabber');
    fireEvent.pointerDown(alca, { clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(alca, { clientY: 300, pointerId: 1 });
    fireEvent.pointerUp(alca, { clientY: 300, pointerId: 1 });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('open={false} não desenha; hostHeight é prévia no lugar', () => {
    const { container, rerender } = render(<BottomSheet id="x" title="Oi" open={false} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<BottomSheet id="x" title="Oi" hostHeight={400} />);
    expect(container.querySelector('.ak-host')).toHaveStyle({ height: '400px' });
  });
});
