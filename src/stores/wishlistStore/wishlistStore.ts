import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookDocument } from '@/types/books';

interface WishlistStore {
  books: BookDocument[];
  toggleWishlist: (book: BookDocument) => void;
  isWishlisted: (isbn: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      books: [],

      toggleWishlist: book =>
        set(state => {
          const exists = state.books.some(b => b.isbn === book.isbn);
          return {
            books: exists
              ? state.books.filter(b => b.isbn !== book.isbn)
              : [...state.books, book],
          };
        }),

      isWishlisted: isbn => get().books.some(b => b.isbn === isbn),
    }),
    {
      name: 'wishlist',
    }
  )
);
