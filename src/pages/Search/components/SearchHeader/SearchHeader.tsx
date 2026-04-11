import DetailSearchPopup from '@/components/DetailSearchPopup/DetailSearchPopup';
import SearchBar from '@/components/SearchBar/SearchBar';
import { SEARCH_CATEGORIES, type SearchParams } from '@/components/SearchBar/SearchBar.types';
import { useSearchHistoryStore } from '@/stores/searchHistoryStore';
import { useMediaQuery } from '@/hooks/useMediaQuery/useMediaQuery';
import { useState } from 'react';

const SearchHeader = () => {
  const [keyword, setKeyword] = useState('');
  const isSmUp = useMediaQuery('(min-width: 640px)');
  const { history, addHistory, deleteHistory } = useSearchHistoryStore();

  const handleSearch = (params: SearchParams) => {
    setKeyword(params.keyword);
    addHistory({ keyword: params.keyword, category: params.category });
    // TODO: API 호출
  };

  const handleDetailSearch = (params: SearchParams) => {
    setKeyword(params.keyword);
    handleSearch(params);
  };

  return (
    <section className="flex flex-col max-w-142 gap-2 sm:gap-4 mt-10 sm:mt-20 px-4 sm:px-0">
      <h2 className="body1-bold sm:title2 text-black h-7 sm:h-9 leading-none">도서 검색</h2>
      <div className="relative flex items-start gap-2 sm:gap-3">
        <SearchBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          onSearch={handleSearch}
          searchHistory={history}
          onDeleteHistory={deleteHistory}
        />
        <DetailSearchPopup
          categories={SEARCH_CATEGORIES}
          onSearch={handleDetailSearch}
          placement={isSmUp ? 'bottom' : 'bottom-right'}
        />
      </div>
    </section>
  );
};

export default SearchHeader;
