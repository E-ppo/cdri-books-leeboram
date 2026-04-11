import { useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import SearchInput from './SearchInput';
import SearchHistory from './SearchHistory';
import type { SearchBarProps } from './SearchBar.types';

const VARIANT_STYLES = {
  filled: 'bg-light-gray',
  outlined: 'border border-gray bg-white',
} as const;

export default function SearchBar({
  keyword,
  onKeywordChange,
  onSearch,
  searchHistory,
  onDeleteHistory,
  size = 'md',
  variant = 'filled',
  classNames,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const showHistory = isFocused && searchHistory.length > 0;

  const handleSubmit = () => {
    if (keyword.trim() === '') return;
    onSearch({ keyword: keyword.trim(), category: '제목' });
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      className={cn(
        'flex-1',
        'p-2.5',
        showHistory ? 'rounded-3xl' : 'rounded-full',
        VARIANT_STYLES[variant],
        classNames?.root
      )}
    >
      <SearchInput
        keyword={keyword}
        onChange={onKeywordChange}
        onSubmit={handleSubmit}
        size={size}
        className={classNames?.input}
      />
      {showHistory && (
        <SearchHistory
          history={searchHistory}
          onDelete={onDeleteHistory}
          size={size}
          className={classNames?.history}
        />
      )}
    </div>
  );
}
