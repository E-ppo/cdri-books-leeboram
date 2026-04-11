import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import { SEARCH_CATEGORIES } from '@/components/SearchBar/SearchBar.types';
import type { SearchCategory } from '@/components/SearchBar/SearchBar.types';
import type { DetailSearchPopupProps } from './DetailSearchPopup.types';

export default function DetailSearchPopup({ onSearch }: DetailSearchPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<SearchCategory>('제목');
  const [keyword, setKeyword] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    setKeyword('');
    setCategory('제목');
    setIsCategoryOpen(false);
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
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="shrink-0 rounded-lg border border-gray px-3 py-2 body2 text-secondary cursor-pointer hover:bg-light-gray transition-colors"
      >
        상세검색
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-10 w-80 rounded-lg bg-white p-5 shadow-lg">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 cursor-pointer text-subtitle hover:text-primary"
          >
            <Icon name="Close" size={18} />
          </button>

          <div className="flex items-center gap-2 border-b border-gray pb-3 mb-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryOpen(prev => !prev)}
                className="flex items-center gap-1 cursor-pointer body2-bold text-primary"
              >
                {category}
                <Icon name="ChevronDown" size={16} />
              </button>
              {isCategoryOpen && (
                <ul className="absolute top-full left-0 mt-1 w-20 rounded-md bg-white shadow-md border border-gray z-20">
                  {SEARCH_CATEGORIES.filter(c => c !== category).map(c => (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => {
                          setCategory(c);
                          setIsCategoryOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left body2 text-secondary hover:bg-light-gray cursor-pointer"
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="검색어 입력"
              className="flex-1 bg-transparent body2 text-primary outline-none placeholder:text-subtitle"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-md bg-brand py-3 body2-bold text-white cursor-pointer hover:opacity-90 transition-opacity"
          >
            검색하기
          </button>
        </div>
      )}
    </div>
  );
}
