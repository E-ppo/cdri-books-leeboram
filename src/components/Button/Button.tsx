import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:opacity-90',
  secondary: 'bg-gray-200 text-secondary hover:bg-gray-300',
  outline: 'border border-subtitle text-subtitle hover:bg-light-gray',
};

const sizeStyles: Record<ButtonSize, { base: string; withSection: string }> = {
  sm: {
    base: 'px-2.5 py-[10.63px] body2 rounded-lg',
    withSection: 'px-2.5 py-[10.63px] body2 rounded-lg',
  },
  md: {
    base: 'px-7 py-4 caption rounded-lg',
    withSection: 'px-5 py-4 caption rounded-lg',
  },
  lg: {
    base: 'w-full py-3 caption rounded-lg',
    withSection: 'w-full py-3 caption rounded-lg',
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  leftSection,
  rightSection,
  disabled,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const hasSection = !!leftSection || !!rightSection;
  const sizeStyle = hasSection ? sizeStyles[size].withSection : sizeStyles[size].base;

  return (
    <button
      className={cn(
        'flex items-center justify-center gap-1.25 whitespace-nowrap cursor-pointer transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyle,
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {leftSection}
      {children}
      {rightSection}
    </button>
  );
}
