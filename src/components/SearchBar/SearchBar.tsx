import { cn } from '@/utils/cn';
import SearchInput from './SearchInput';
import DetailSearchPopup from '@/components/DetailSearchPopup/DetailSearchPopup';
import SearchHistory from './SearchHistory';
import type { SearchBarProps, SearchParams } from './SearchBar.types';

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
  const handleSubmit = () => {
    if (keyword.trim() === '') return;
    onSearch({ keyword: keyword.trim(), category: '제목' });
  };

  const handleDetailSearch = (params: SearchParams) => {
    onKeywordChange(params.keyword);
    onSearch(params);
  };

  return (
    <section>
      <h2 className="title2 text-black mb-4">도서 검색</h2>
      <div className="relative flex items-start gap-3">
        <div
          className={cn(
            'flex-1',
            'p-2.5',
            searchHistory.length > 0 ? 'rounded-3xl' : 'rounded-full',
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
          {searchHistory.length > 0 && (
            <SearchHistory
              history={searchHistory}
              onDelete={onDeleteHistory}
              size={size}
              className={classNames?.history}
            />
          )}
        </div>
        <DetailSearchPopup onSearch={handleDetailSearch} />
      </div>
    </section>
  );
}
