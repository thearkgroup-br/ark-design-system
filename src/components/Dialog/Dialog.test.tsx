import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Dialog } from './Dialog';

const ID = 'iris-appointments-cancel-dialog';

function Exemplo({ onClose = () => {} }: { onClose?: () => void }) {
  const [aberto, setAberto] = useState(false);
  const fechar = () => {
    setAberto(false);
    onClose();
  };
  return (
    <>
      <Button onClick={() => setAberto(true)}>Cancelar agendamento</Button>
      <Dialog
        id="cancelar"
        open={aberto}
        title="Cancelar o agendamento de Maria?"
        text="Ela recebe um aviso pelo WhatsApp."
        tone="danger"
        icon="alert"
        onClose={fechar}
        actions={
          <>
            <Button variant="secondary" onClick={fechar}>Voltar</Button>
            <Button variant="danger">Sim, cancelar</Button>
          </>
        }
        data-testid={ID}
      />
    </>
  );
}

describe('Dialog', () => {
  it('repassa o data-testid para o painel e deriva o fechar como {id}-close-button', async () => {
    render(<Exemplo />);
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar agendamento' }));
    expect(screen.getByTestId(ID)).toHaveAttribute('role', 'dialog');
    expect(screen.getByTestId('iris-appointments-cancel-close-button')).toHaveAccessibleName('Fechar');
    expect(screen.getByTestId('iris-appointments-cancel-title')).toHaveTextContent('Cancelar o agendamento de Maria?');
  });

  it('é modal, com título como nome e texto como descrição', async () => {
    render(<Exemplo />);
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar agendamento' }));
    const dialogo = screen.getByRole('dialog', { name: 'Cancelar o agendamento de Maria?' });
    expect(dialogo).toHaveAttribute('aria-modal', 'true');
    expect(dialogo).toHaveAccessibleDescription('Ela recebe um aviso pelo WhatsApp.');
  });

  it('fechado não desenha nada', () => {
    render(<Exemplo />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('ao abrir, o foco vai para dentro; Tab e Shift+Tab ficam presos no diálogo', async () => {
    render(<Exemplo />);
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar agendamento' }));
    const fechar = screen.getByRole('button', { name: 'Fechar' });
    expect(fechar).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Voltar' })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Sim, cancelar' })).toHaveFocus();
    await userEvent.tab();
    expect(fechar).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Sim, cancelar' })).toHaveFocus();
  });

  it('Esc fecha e o foco volta ao botão que abriu', async () => {
    const onClose = vi.fn();
    render(<Exemplo onClose={onClose} />);
    const abrir = screen.getByRole('button', { name: 'Cancelar agendamento' });
    await userEvent.click(abrir);
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(abrir).toHaveFocus();
  });

  it('o X e a ação secundária fecham', async () => {
    render(<Exemplo />);
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar agendamento' }));
    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar agendamento' }));
    await userEvent.click(screen.getByRole('button', { name: 'Voltar' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('tocar fora não fecha (para não perder a confirmação)', async () => {
    const onClose = vi.fn();
    render(<Exemplo onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar agendamento' }));
    await userEvent.click(screen.getByTestId('iris-appointments-cancel-overlay'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('a página não rola enquanto está aberto', async () => {
    render(<Exemplo />);
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar agendamento' }));
    expect(document.body.style.overflow).toBe('hidden');
    await userEvent.keyboard('{Escape}');
    expect(document.body.style.overflow).toBe('');
  });

  it('abre num portal no body (sobre a tela)', async () => {
    const { container } = render(<Exemplo />);
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar agendamento' }));
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(document.body.querySelector('.ak-camada [role="dialog"]')).not.toBeNull();
  });

  it('alert vira alertdialog', () => {
    render(<Dialog id="b" title="Conta bloqueada" alert hostHeight={300} />);
    expect(screen.getByRole('alertdialog', { name: 'Conta bloqueada' })).toBeInTheDocument();
  });

  it('com hostHeight é prévia: desenha no lugar, sem portal, sem travar a página', () => {
    const { container } = render(<Dialog id="p" title="Prévia" hostHeight={320} onClose={() => {}} />);
    expect(container.querySelector('.ak-host')).toHaveStyle({ height: '320px' });
    expect(container.querySelector('[role="dialog"]')).not.toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  it('sem onClose não mostra o X', () => {
    render(<Dialog id="s" title="Aviso" hostHeight={300} />);
    expect(screen.queryByRole('button', { name: 'Fechar' })).not.toBeInTheDocument();
  });
});
