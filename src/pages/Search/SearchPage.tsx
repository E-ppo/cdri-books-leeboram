import { useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
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

  return (
    <div>
      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
        searchHistory={history}
        onDeleteHistory={deleteHistory}
      />
    </div>
  );
}
