import Icon from '@/components/Icon/Icon';
import { cn } from '@/utils/cn';
import type { SearchHistoryProps } from './SearchBar.types';

const SIZE_STYLES = {
  sm: 'text-xs',
  md: 'caption',
  lg: 'text-lg',
} as const;

const ICON_SIZE = {
  sm: 18,
  md: 24,
  lg: 28,
} as const;

const LIST_STYLES = {
  sm: 'pt-5 pb-2 gap-4',
  md: 'pt-[19px] pb-3.5 gap-6',
  lg: 'pt-10 pb-5 gap-6',
} as const;

const ITEM_PL_STYLES = {
  sm: 'pl-7',
  md: 'pl-10',
  lg: 'pl-12',
} as const;

export default function SearchHistory({
  history,
  onDelete,
  onSelect,
  activeIndex = -1,
  size = 'md',
  className,
}: SearchHistoryProps) {
  return (
    <ul className={cn('flex flex-col', LIST_STYLES[size], className)}>
      {history.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            'flex items-center justify-between pr-3.75 rounded-lg transition-colors',
            ITEM_PL_STYLES[size],
            SIZE_STYLES[size],
            index === activeIndex ? 'bg-gray text-primary' : 'text-subtitle hover:bg-gray hover:text-primary'
          )}
        >
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="cursor-pointer text-left flex-1 py-1"
          >
            {item.keyword}
          </button>
          <button type="button" onClick={() => onDelete(item.id)} className="cursor-pointer px-2 py-1">
            <Icon name="Close" size={ICON_SIZE[size]} className="text-black" />
          </button>
        </li>
      ))}
    </ul>
  );
}
