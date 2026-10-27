import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../Switch/Switch';
import { ListItem } from './ListItem';

const ID = 'iris-appointments-upcoming-item';

describe('ListItem', () => {
  it('repassa o data-testid; linhas repetidas usam o mesmo id', () => {
    render(
      <>
        <ListItem title="Corte" data-testid={ID} />
        <ListItem title="Barba" data-testid={ID} />
      </>,
    );
    expect(screen.getAllByTestId(ID)).toHaveLength(2);
  });

  it('com href vira link com seta; com onClick vira botão com seta', async () => {
    const onClick = vi.fn();
    const { rerender, container } = render(<ListItem title="Meus dados" href="/perfil" />);
    expect(screen.getByRole('link', { name: 'Meus dados' })).toHaveAttribute('href', '/perfil');
    expect(container.querySelector('.ak-chev')).not.toBeNull();
    rerender(<ListItem title="Sair" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'Sair' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('sem ação não tem seta; chevron={false} tira a seta', () => {
    const { container, rerender } = render(<ListItem title="Corte" />);
    expect(container.querySelector('.ak-chev')).toBeNull();
    rerender(<ListItem title="Corte" href="/x" chevron={false} />);
    expect(container.querySelector('.ak-chev')).toBeNull();
  });

  it('avatar mostra iniciais; ícone fica escondido', () => {
    const { container, rerender } = render(<ListItem title="Maria Souza" avatar="Maria Souza" />);
    expect(container.querySelector('.ak-avatar')).toHaveTextContent('MS');
    // O nome não é lido duas vezes (título + avatar).
    expect(container.querySelector('.ak-li-avatar')).toHaveAttribute('aria-hidden', 'true');
    rerender(<ListItem title="Agenda" icon="calendar" />);
    expect(container.querySelector('.ak-li-icon svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('mostra subtítulo e ação na linha (trailing)', () => {
    render(<ListItem title="Lembretes" subtitle="1 dia antes" trailing={<Switch id="l" label="Lembretes" />} />);
    expect(screen.getByText('1 dia antes')).toHaveClass('ak-li-sub');
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  describe('IRIS-128 selo em tela estreita', () => {
    const css = readFileSync(resolve(__dirname, 'ListItem.css'), 'utf8');

    it('o texto e o trailing ficam juntos num grupo, com o texto antes', () => {
      const { container } = render(<ListItem title="Qua, 21 out · 10:00" subtitle="Corte" avatar="Maria" trailing={<span>Não compareceu</span>} onClick={() => {}} />);
      const grupo = container.querySelector('.ak-li-main')!;
      expect([...grupo.children].map((filho) => filho.className)).toEqual(['ak-li-text', 'ak-li-trailing']);
      // A seta fica fora do grupo: continua na primeira linha, à direita.
      expect(container.querySelector('.ak-li > .ak-chev')).not.toBeNull();
    });

    it('sem trailing, o grupo só tem o texto', () => {
      const { container } = render(<ListItem title="Corte" />);
      expect(container.querySelector('.ak-li-trailing')).toBeNull();
    });

    it('quando falta espaço para o texto, o trailing desce para baixo dele (flex-wrap no grupo)', () => {
      expect(css).toMatch(/\.ak-li-main \{[^}]*flex-wrap: wrap/);
      // Abaixo dessa largura, o texto não divide a linha com o selo.
      expect(css).toMatch(/\.ak-li-main > \.ak-li-text \{[^}]*flex: 1 1 9rem/);
      expect(css).toMatch(/\.ak-li-trailing \{[^}]*flex: none/);
    });
  });
});
