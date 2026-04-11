import { useEffect, useRef, useState } from 'react';
import SearchHeader, { DEFAULT_TARGET } from './components/SearchHeader/SearchHeader';
import BookList from './components/BookList/BookList';
import ResultCount from '@/components/ResultCount/ResultCount';
import StatusMessage from '@/components/StatusMessage/StatusMessage';
import iconBook from '@/assets/imgs/icon_book.png';
import { useBookSearch } from '@/hooks/useBookSearch/useBookSearch';
import type { BookSearchTarget } from '@/types/books';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<BookSearchTarget>(DEFAULT_TARGET);
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useBookSearch({
    query: searchQuery,
    target: searchTarget,
  });

  const handleSearch = (query: string, target: BookSearchTarget) => {
    setSearchQuery(query);
    setSearchTarget(target);
  };

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const books = data?.pages.flatMap(page => page.documents) ?? [];
  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  return (
    <>
      <SearchHeader onSearch={handleSearch} />
      {!searchQuery.trim() && (
        <StatusMessage
          icon={<img src={iconBook} alt="book" className="w-20 h-20" />}
          message="관심 있는 도서를 검색해보세요"
          className="py-40"
        />
      )}
      {searchQuery.trim() && (
        <section className="mt-6 flex flex-col gap-5 xl:gap-9">
          <ResultCount title="도서 검색 결과" count={totalCount} />
          {books.length > 0 ? (
            <>
              <BookList books={books} />
              <div ref={observerRef} />
            </>
          ) : (
            <StatusMessage
              icon={<img src={iconBook} alt="book" className="w-20 h-20" />}
              message="검색결과가 없습니다."
              className="py-40"
            />
          )}
        </section>
      )}
    </>
  );
}
