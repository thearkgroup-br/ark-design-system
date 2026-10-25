import { act, renderHook } from '@testing-library/react';
import { buscaEncontra, normalizarBusca, useTermoDeBusca } from './busca';

describe('normalizarBusca', () => {
  it('ignora acentos, maiúsculas e espaços extras', () => {
    expect(normalizarBusca('  João   Silva ')).toBe('joao silva');
    expect(normalizarBusca('SALÃO da Conceição')).toBe('salao da conceicao');
  });
});

describe('buscaEncontra', () => {
  it('"joao" encontra "João" e "salao" encontra "Salão"', () => {
    expect(buscaEncontra('João Pedro', 'joao')).toBe(true);
    expect(buscaEncontra('Salão Bela', 'salao')).toBe(true);
    expect(buscaEncontra('Barbearia', 'salao')).toBe(false);
  });
});

describe('useTermoDeBusca', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('só devolve o termo 300 ms depois da última tecla', () => {
    const { result, rerender } = renderHook(({ v }) => useTermoDeBusca(v), { initialProps: { v: 'Sa' } });
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe('');
    rerender({ v: 'Salão' });
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe('');
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('salao');
  });

  it('com 1 caractere não busca; com 2 busca', () => {
    const { result, rerender } = renderHook(({ v }) => useTermoDeBusca(v), { initialProps: { v: 'j' } });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('');
    rerender({ v: 'jo' });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('jo');
  });

  it('espaços não contam como caractere', () => {
    const { result } = renderHook(() => useTermoDeBusca(' a  '));
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('');
  });
});
