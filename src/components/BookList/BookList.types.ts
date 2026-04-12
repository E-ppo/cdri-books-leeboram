import type { BookDocument } from '@/types/books';

export interface BookListProps {
  books: BookDocument[];
}

export interface BookItemProps {
  book: BookDocument;
}
