import { useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import DetailSearchPopup from '@/components/DetailSearchPopup/DetailSearchPopup';
import { useSearchHistoryStore } from '@/stores/searchHistoryStore';
import type { SearchParams } from '@/components/SearchBar/SearchBar.types';

export default function SearchPage() {
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
    <section>
      <h2 className="title2 text-black mb-4">도서 검색</h2>
      <div className="relative flex items-start gap-3">
        <SearchBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          onSearch={handleSearch}
          searchHistory={history}
          onDeleteHistory={deleteHistory}
        />
        <DetailSearchPopup onSearch={handleDetailSearch} />
      </div>
    </section>
  );
}
