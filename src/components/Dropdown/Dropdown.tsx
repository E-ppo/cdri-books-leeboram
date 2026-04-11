import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import { cn } from '@/utils/cn';
import type { DropdownProps } from './Dropdown.types';

export default function Dropdown<T extends string>({
  value,
  options,
  onChange,
  className,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }

    if (!isOpen) return;

    const currentIndex = options.indexOf(value);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % options.length;
      onChange(options[nextIndex]);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      onChange(options[prevIndex]);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative min-w-25 border-b border-[#D2D6DA] pl-2 pr-1 py-1.5', className)}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex w-full items-center justify-between cursor-pointer body2-bold text-primary"
      >
        {value}
        <Icon name="ChevronDown" size={20} className="text-[#B1B8C0]" />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          aria-activedescendant={`dropdown-option-${value}`}
          className="absolute top-full left-0 mt-1.5 w-25 bg-white shadow-[0px_0px_4px_rgba(0,0,0,0.25)] z-20"
        >
          {options.map(option => (
            <li
              key={option}
              id={`dropdown-option-${option}`}
              role="option"
              aria-selected={option === value}
            >
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center h-7.5 px-3 text-left text-sm font-medium cursor-pointer',
                  option === value ? 'text-primary font-bold' : 'text-[#8D94A0] hover:bg-light-gray'
                )}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
