import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SearchHistoryItem } from '@/components/SearchBar/SearchBar.types';

const MAX_HISTORY_COUNT = 10;

interface SearchHistoryStore {
  history: SearchHistoryItem[];
  addHistory: (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => void;
  deleteHistory: (id: string) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryStore>()(
  persist(
    set => ({
      history: [],

      addHistory: item =>
        set(state => {
          const isDuplicate = state.history.some(
            h => h.keyword === item.keyword && h.category === item.category
          );
          if (isDuplicate) return state;

          const newItem: SearchHistoryItem = {
            ...item,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          };

          const updated = [newItem, ...state.history].slice(0, MAX_HISTORY_COUNT);
          return { history: updated };
        }),

      deleteHistory: id =>
        set(state => ({
          history: state.history.filter(h => h.id !== id),
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'search-history',
    }
  )
);
