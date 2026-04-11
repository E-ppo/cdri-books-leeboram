import { useState } from 'react';
import SearchHeader from './components/SearchHeader/SearchHeader';
import BookList from './components/BookList/BookList';
import ResultCount from '@/components/ResultCount/ResultCount';
import { useBookSearch } from '@/hooks/useBookSearch/useBookSearch';
import type { BookSearchTarget } from '@/types/books';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<BookSearchTarget>('title');

  const { data } = useBookSearch({
    query: searchQuery,
    target: searchTarget,
  });

  const handleSearch = (query: string, target: BookSearchTarget) => {
    setSearchQuery(query);
    setSearchTarget(target);
  };

  const books = data?.pages.flatMap(page => page.documents) ?? [];
  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  return (
    <main>
      <SearchHeader onSearch={handleSearch} />
      {searchQuery && (
        <section className="mt-6 flex flex-col gap-5 xl:gap-9">
          <ResultCount title="도서 검색 결과" count={totalCount} />
          <BookList books={books} />
        </section>
      )}
    </main>
  );
}
