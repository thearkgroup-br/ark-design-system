import { render } from '@testing-library/react';
import { ICON_NAMES, renderIcon } from './icons';

function desenhar(...args: Parameters<typeof renderIcon>) {
  const { container } = render(renderIcon(...args));
  return container.querySelector('svg') as SVGSVGElement;
}

describe('renderIcon', () => {
  it.each(ICON_NAMES)('desenha o ícone %s escondido do leitor de tela', (nome) => {
    const svg = desenhar(nome);
    expect(svg).toHaveAttribute('data-icon', nome);
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
    expect(svg.childElementCount).toBeGreaterThan(0);
  });

  it('tem 20 px por padrão e aceita outro tamanho', () => {
    expect(desenhar('home')).toHaveAttribute('width', '20');
    expect(desenhar('home', 32)).toHaveAttribute('height', '32');
  });

  it.each(['heart', 'star'] as const)('%s preenchido usa currentColor; vazio, só o traço', (nome) => {
    expect(desenhar(nome, 20, true)).toHaveAttribute('fill', 'currentColor');
    expect(desenhar(nome)).toHaveAttribute('fill', 'none');
  });

  it('só coração e estrela preenchem: os outros ignoram o filled', () => {
    expect(desenhar('home', 20, true)).toHaveAttribute('fill', 'none');
  });

  it('traço 3 no check, 1.6 na estrela e 2 nos demais', () => {
    expect(desenhar('check')).toHaveAttribute('stroke-width', '3');
    expect(desenhar('star')).toHaveAttribute('stroke-width', '1.6');
    expect(desenhar('home')).toHaveAttribute('stroke-width', '2');
  });
});
