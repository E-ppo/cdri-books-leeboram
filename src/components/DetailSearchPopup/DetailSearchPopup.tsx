import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import Dropdown from '@/components/Dropdown/Dropdown';
import type { SearchCategory } from '@/components/SearchBar/SearchBar.types';
import type { DetailSearchPopupPlacement, DetailSearchPopupProps } from './DetailSearchPopup.types';
import Button from '../Button/Button';

const PLACEMENT_CLASSES: Record<DetailSearchPopupPlacement, string> = {
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-4',
  'bottom-left': 'top-full left-0 mt-4',
  'bottom-right': 'top-full right-0 mt-4',
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-4',
  'top-left': 'bottom-full left-0 mb-4',
  'top-right': 'bottom-full right-0 mb-4',
  left: 'right-full top-0 mr-4',
  right: 'left-full top-0 ml-4',
};

export default function DetailSearchPopup({
  categories,
  onSearch,
  placement = 'bottom-left',
}: DetailSearchPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<SearchCategory>('제목');
  const [keyword, setKeyword] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    setKeyword('');
    setCategory('제목');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = () => {
    if (keyword.trim() === '') return;
    onSearch({ keyword: keyword.trim(), category });
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div ref={containerRef} className="relative mt-[7.82px]">
      <Button onClick={() => setIsOpen(prev => !prev)} size="sm" variant="outline">
        상세 검색
      </Button>
      {isOpen && (
        <div
          className={`absolute z-10 min-w-90 rounded-lg bg-white px-6 py-9 shadow-[0px_4px_14px_6px_#97979726] ${PLACEMENT_CLASSES[placement]}`}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-[12.17px] right-[12.17px] cursor-pointer text-subtitle hover:text-primary"
          >
            <Icon name="Close" size={18} />
          </button>

          <div className="flex items-center gap-1 mb-4  ">
            <Dropdown value={category} options={categories} onChange={v => setCategory(v)} />

            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="검색어 입력"
              className="flex-1 min-w-0 bg-transparent body2 text-primary border-b border-brand px-[9.45px] py-1.5 placeholder:text-subtitle"
            />
          </div>

          <Button size="lg" onClick={handleSubmit}>
            검색하기
          </Button>
        </div>
      )}
    </div>
  );
}
