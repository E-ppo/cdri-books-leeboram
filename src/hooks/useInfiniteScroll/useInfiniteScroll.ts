import { useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(callback: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const stableCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && enabled) {
          stableCallback();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, stableCallback]);

  return ref;
}
