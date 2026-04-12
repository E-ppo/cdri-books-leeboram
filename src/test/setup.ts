import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());

type IOCallback = (entries: IntersectionObserverEntry[]) => void;
const observerRegistry = new Map<Element, IOCallback>();

class MockIntersectionObserver {
  private callback: IOCallback;
  constructor(callback: IOCallback) {
    this.callback = callback;
  }
  observe(el: Element) {
    observerRegistry.set(el, this.callback);
  }
  unobserve(el: Element) {
    observerRegistry.delete(el);
  }
  disconnect() {
    observerRegistry.clear();
  }
  takeRecords() {
    return [] as IntersectionObserverEntry[];
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

export function triggerIntersection(el: Element, isIntersecting = true) {
  const cb = observerRegistry.get(el);
  if (!cb) return;
  cb([{ target: el, isIntersecting } as unknown as IntersectionObserverEntry]);
}

export function triggerAllIntersections(isIntersecting = true) {
  observerRegistry.forEach((cb, el) => {
    cb([{ target: el, isIntersecting } as unknown as IntersectionObserverEntry]);
  });
}

export function getObserverCount() {
  return observerRegistry.size;
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
