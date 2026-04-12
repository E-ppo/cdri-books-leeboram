import { useState } from 'react';
import SearchHeader, { DEFAULT_TARGET } from './components/SearchHeader/SearchHeader';
import BookList from '@/components/BookList/BookList';
import ResultCount from '@/components/ResultCount/ResultCount';
import StatusMessage from '@/components/StatusMessage/StatusMessage';
import iconBook from '@/assets/imgs/icon_book.png';
import { useBookSearch } from '@/hooks/useBookSearch/useBookSearch';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import type { BookSearchTarget } from '@/types/books';

const bookIcon = (
  <img src={iconBook} alt="book" className="w-20 h-20" fetchPriority="high" />
);

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<BookSearchTarget>(DEFAULT_TARGET);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useBookSearch({
    query: searchQuery,
    target: searchTarget,
  });

  const observerRef = useInfiniteScroll(fetchNextPage, hasNextPage && !isFetchingNextPage);

  const handleSearch = (query: string, target: BookSearchTarget) => {
    setSearchQuery(query);
    setSearchTarget(target);
  };

  const books = data?.pages.flatMap(page => page.documents) ?? [];
  const totalCount = data?.pages[0]?.meta.total_count ?? 0;
  const hasQuery = searchQuery.trim().length > 0;

  return (
    <>
      <SearchHeader onSearch={handleSearch} />
      {!hasQuery && (
        <StatusMessage
          icon={bookIcon}
          message="관심 있는 도서를 검색해보세요"
          className="py-40"
        />
      )}
      {hasQuery && (
        <section className="mt-6 flex flex-col gap-5 xl:gap-9">
          <ResultCount title="도서 검색 결과" count={totalCount} />
          {isLoading ? (
            <StatusMessage message="검색 중..." className="py-40" />
          ) : books.length > 0 ? (
            <>
              <BookList books={books} />
              <div ref={observerRef} />
            </>
          ) : (
            <StatusMessage
              icon={bookIcon}
              message="검색결과가 없습니다."
              className="py-40"
            />
          )}
        </section>
      )}
    </>
  );
}
