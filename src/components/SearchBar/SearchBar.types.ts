export const SEARCH_CATEGORIES = ['제목', '저자명', '출판사'] as const;

export type SearchCategory = (typeof SEARCH_CATEGORIES)[number];

export type SearchBarSize = 'sm' | 'md' | 'lg';

export type SearchBarVariant = 'filled' | 'outlined';

export interface SearchBarClassNames {
  root?: string;
  input?: string;
  history?: string;
}

export interface SearchParams {
  keyword: string;
  category: SearchCategory;
}

export interface SearchHistoryItem {
  id: string;
  keyword: string;
  category: SearchCategory;
  timestamp: number;
}

export interface SearchBarProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  onSearch: (params: SearchParams) => void;
  searchHistory: SearchHistoryItem[];
  onDeleteHistory: (id: string) => void;
  size?: SearchBarSize;
  variant?: SearchBarVariant;
  classNames?: SearchBarClassNames;
}

export interface SearchInputProps {
  keyword: string;
  onChange: (keyword: string) => void;
  onSubmit: () => void;
  size?: SearchBarSize;
  className?: string;
}

export interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onDelete: (id: string) => void;
  onSelect: (item: SearchHistoryItem) => void;
  size?: SearchBarSize;
  className?: string;
}
