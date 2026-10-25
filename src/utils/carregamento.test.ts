import { act, renderHook } from '@testing-library/react';
import { useEstadoDeCarregamento } from './carregamento';

describe('useEstadoDeCarregamento', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('nada nos primeiros 300 ms, skeleton até 10 s, depois "demorou"', () => {
    const { result } = renderHook(() => useEstadoDeCarregamento(true));
    expect(result.current).toBe('oculto');
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe('oculto');
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('skeleton');
    act(() => vi.advanceTimersByTime(9699));
    expect(result.current).toBe('skeleton');
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('demorou');
  });

  it('carregou antes de 300 ms: o skeleton nem aparece', () => {
    const { result, rerender } = renderHook(({ c }) => useEstadoDeCarregamento(c), { initialProps: { c: true } });
    act(() => vi.advanceTimersByTime(200));
    rerender({ c: false });
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current).toBe('oculto');
  });

  it('um novo carregamento começa do zero', () => {
    const { result, rerender } = renderHook(({ c }) => useEstadoDeCarregamento(c), { initialProps: { c: true } });
    act(() => vi.advanceTimersByTime(10000));
    expect(result.current).toBe('demorou');
    rerender({ c: false });
    rerender({ c: true });
    expect(result.current).toBe('oculto');
  });
});
