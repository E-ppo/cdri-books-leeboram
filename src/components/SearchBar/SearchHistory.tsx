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

const PADDING_STYLES = {
  sm: 'pt-5 pb-2 gap-4 pl-7',
  md: 'pt-[19px] pb-3.5 gap-6 pl-10',
  lg: 'pt-10 pb-5 gap-6 pl-12',
} as const;

export default function SearchHistory({
  history,
  onDelete,
  onSelect,
  size = 'md',
  className,
}: SearchHistoryProps) {
  return (
    <ul className={cn('flex flex-col', PADDING_STYLES[size], className)}>
      {history.map(item => (
        <li
          key={item.id}
          className={cn(
            'flex items-center justify-between pr-3.75 text-subtitle',
            SIZE_STYLES[size]
          )}
        >
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="cursor-pointer text-left flex-1"
          >
            {item.keyword}
          </button>
          <button type="button" onClick={() => onDelete(item.id)} className="cursor-pointer">
            <Icon name="Close" size={ICON_SIZE[size]} className="text-black" />
          </button>
        </li>
      ))}
    </ul>
  );
}
