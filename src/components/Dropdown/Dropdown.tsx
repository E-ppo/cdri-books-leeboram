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

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1 cursor-pointer body2-bold text-primary"
      >
        {value}
        <Icon name="ChevronDown" size={16} />
      </button>
      {isOpen && (
        <ul className="absolute top-full left-0 mt-1 w-20 rounded-md bg-white shadow-md border border-gray z-20">
          {options
            .filter(option => option !== value)
            .map(option => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left body2 text-secondary hover:bg-light-gray cursor-pointer"
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
