import Accordion from '@/components/Accordion/Accordion';
import BookListRow from './BookListRow';
import BookDetailCard from './BookDetailCard';
import type { BookListProps } from './BookList.types';

export default function BookList({ books }: BookListProps) {
  return (
    <Accordion className="divide-y divide-gray">
      {books.map(book => (
        <Accordion.Item key={book.isbn} value={book.isbn}>
          {isOpen => (isOpen ? <BookDetailCard book={book} /> : <BookListRow book={book} />)}
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
