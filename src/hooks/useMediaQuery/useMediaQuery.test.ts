import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
  let listeners: Array<(e: MediaQueryListEvent) => void>;
  let mockMatches: boolean;

  beforeEach(() => {
    listeners = [];
    mockMatches = false;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: mockMatches,
      media: query,
      addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
        listeners.push(cb);
      },
      removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
        listeners = listeners.filter(l => l !== cb);
      },
    }));
  });

  it('초기 상태가 matchMedia 결과와 일치해야 한다', () => {
    mockMatches = true;
    const { result } = renderHook(() => useMediaQuery('(min-width: 640px)'));

    expect(result.current).toBe(true);
  });

  it('초기 상태가 false일 때 false를 반환해야 한다', () => {
    mockMatches = false;
    const { result } = renderHook(() => useMediaQuery('(min-width: 640px)'));

    expect(result.current).toBe(false);
  });

  it('미디어 쿼리 변경 시 상태가 업데이트되어야 한다', () => {
    mockMatches = false;
    const { result } = renderHook(() => useMediaQuery('(min-width: 640px)'));

    expect(result.current).toBe(false);

    act(() => {
      listeners.forEach(cb => cb({ matches: true } as MediaQueryListEvent));
    });

    expect(result.current).toBe(true);
  });

  it('언마운트 시 이벤트 리스너가 제거되어야 한다', () => {
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 640px)'));

    expect(listeners).toHaveLength(1);

    unmount();

    expect(listeners).toHaveLength(0);
  });

  it('쿼리가 변경되면 새로운 matchMedia를 호출해야 한다', () => {
    const { rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      { initialProps: { query: '(min-width: 640px)' } },
    );

    rerender({ query: '(min-width: 1024px)' });

    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 1024px)');
  });
});
