import { useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import { cn } from '@/utils/cn';
import type { SearchInputProps } from './SearchBar.types';

const SIZE_STYLES = {
  sm: 'text-xs placeholder:text-xs',
  md: 'caption placeholder:text-base',
  lg: 'text-lg placeholder:text-lg',
} as const;

const ICON_SIZE = {
  sm: 22,
  md: 30,
  lg: 36,
} as const;

export default function SearchInput({
  keyword,
  onChange,
  onSubmit,
  size = 'md',
  className,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      onSubmit();
      inputRef.current?.blur();
    }
  };

  return (
    <div className="flex items-center gap-2.75">
      <Icon name="Search" size={ICON_SIZE[size]} className="text-black shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={keyword}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder="검색어를 입력하세요"
        className={cn(
          'flex-1 bg-transparent text-primary outline-none',
          SIZE_STYLES[size],
          'placeholder:text-subtitle',
          'placeholder:leading-4 placeholder:font-medium',
          className
        )}
      />
    </div>
  );
}
