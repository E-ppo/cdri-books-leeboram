import type { SearchCategory, SearchParams } from '@/components/SearchBar/SearchBar.types';

export type DetailSearchPopupPlacement =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right';

export interface DetailSearchPopupProps {
  categories: readonly SearchCategory[];
  onSearch: (params: SearchParams) => void;
  placement?: DetailSearchPopupPlacement;
}
