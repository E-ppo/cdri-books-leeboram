import DetailSearchPopup from '@/components/DetailSearchPopup/DetailSearchPopup';
import SearchBar from '@/components/SearchBar/SearchBar';
import { SEARCH_CATEGORIES, type SearchParams } from '@/components/SearchBar/SearchBar.types';
import { useSearchHistoryStore } from '@/stores/searchHistoryStore';
import { useState } from 'react';

const SearchHeader = () => {
  const [keyword, setKeyword] = useState('');
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
    <section className="flex flex-col max-w-142 gap-4 mt-20">
      <h2 className="title2 text-black h-9 leading-none">도서 검색</h2>
      <div className="relative flex items-start gap-3">
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
          placement="bottom"
        />
      </div>
    </section>
  );
};

export default SearchHeader;
