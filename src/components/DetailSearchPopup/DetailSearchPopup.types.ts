import type { SearchParams } from '@/components/SearchBar/SearchBar.types';

export interface DetailSearchPopupProps {
  onSearch: (params: SearchParams) => void;
}
