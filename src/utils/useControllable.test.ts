import { act, renderHook } from '@testing-library/react';
import { useControllable } from './useControllable';

describe('useControllable', () => {
  it('guarda o valor quando não é controlado', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllable<string>(undefined, 'a', onChange));
    act(() => result.current[1]('b'));
    expect(result.current[0]).toBe('b');
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('respeita o valor de fora quando é controlado', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllable<string>('a', 'x', onChange));
    act(() => result.current[1]('b'));
    expect(result.current[0]).toBe('a');
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
