import { useId, useRef, useState } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  const getOptionId = (index: number) => `${baseId}-option-${index}`;

  const showHistory = isFocused && searchHistory.length > 0;
  const activeOptionId = activeIndex >= 0 ? getOptionId(activeIndex) : undefined;

  const handleSubmit = () => {
    if (activeIndex >= 0 && activeIndex < searchHistory.length) {
      const item = searchHistory[activeIndex];
      onKeywordChange(item.keyword);
      onSearch({ keyword: item.keyword, category: item.category });
    } else {
      if (keyword.trim() === '') return;
      onSearch({ keyword: keyword.trim(), category: '제목' });
    }
    setIsFocused(false);
    setActiveIndex(-1);
  };

  const handleArrowKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showHistory) return;

    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => (prev < searchHistory.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(prev => (prev > 0 ? prev - 1 : searchHistory.length - 1));
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget)) {
      setIsFocused(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div
      ref={containerRef}
      role="search"
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
        onChange={(value) => {
          onKeywordChange(value);
          setActiveIndex(-1);
        }}
        onSubmit={handleSubmit}
        onKeyDown={handleArrowKey}
        size={size}
        className={classNames?.input}
        listboxId={listboxId}
        isExpanded={showHistory}
        activeOptionId={activeOptionId}
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
            onSelect={item => {
              onKeywordChange(item.keyword);
              onSearch({ keyword: item.keyword, category: item.category });
              setIsFocused(false);
              setActiveIndex(-1);
            }}
            activeIndex={activeIndex}
            size={size}
            className={classNames?.history}
            listboxId={listboxId}
            getOptionId={getOptionId}
          />
        </div>
      )}
    </div>
  );
}
