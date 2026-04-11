import { useState } from 'react';
import SearchHeader from './components/SearchHeader/SearchHeader';
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

  console.log(data);

  return (
    <main>
      <SearchHeader onSearch={handleSearch} />
    </main>
  );
}
