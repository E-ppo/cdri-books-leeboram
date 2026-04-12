import { useEffect, useId, useRef, useState } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const handleClose = () => {
    setIsOpen(false);
    setKeyword('');
    setCategory('제목');
  };

  const handleToggle = () => {
    setIsOpen(prev => {
      if (!prev) {
        previousFocusRef.current = document.activeElement as HTMLElement | null;
      }
      return !prev;
    });
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

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
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

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
      return;
    }
    if (e.key !== 'Tab' || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div ref={containerRef} className="relative mt-1.5 sm:mt-[7.82px]">
      <button
        type="button"
        onClick={handleToggle}
        aria-label="상세 검색 열기"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="sm:hidden cursor-pointer text-subtitle"
      >
        <Icon name="Filter" size={22} aria-hidden="true" />
      </button>
      <Button
        onClick={handleToggle}
        size="sm"
        variant="outline"
        className="hidden sm:flex"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        상세 검색
      </Button>
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onKeyDown={handleDialogKeyDown}
          className={`absolute z-10 min-w-70 sm:min-w-90 rounded-lg bg-white px-4 sm:px-6 py-6 sm:py-9 shadow-[0px_4px_14px_6px_#97979726] ${PLACEMENT_CLASSES[placement]}`}
        >
          <h2 id={titleId} className="sr-only">상세 검색</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="상세 검색 닫기"
            className="absolute top-[12.17px] right-[12.17px] cursor-pointer text-subtitle hover:text-primary"
          >
            <Icon name="Close" size={18} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-1 mb-4  ">
            <Dropdown value={category} options={categories} onChange={v => setCategory(v)} />

            <input
              ref={inputRef}
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="검색어 입력"
              aria-label="상세 검색어"
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
