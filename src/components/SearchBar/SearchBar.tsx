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
    setIsFocused(false);
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
        'relative flex-1',
        'p-1.5 sm:p-2.5',
        showHistory ? 'rounded-t-3xl' : 'rounded-full',
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
        <div className={cn(
          'absolute left-0 right-0 top-full -mt-px z-10',
          'rounded-b-3xl px-1.5 pb-1.5 sm:px-2.5 sm:pb-2.5',
          VARIANT_STYLES[variant],
        )}>
          <SearchHistory
            history={searchHistory}
            onDelete={onDeleteHistory}
            size={size}
            className={classNames?.history}
          />
        </div>
      )}
    </div>
  );
}
