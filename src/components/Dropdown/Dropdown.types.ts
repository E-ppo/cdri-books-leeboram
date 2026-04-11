import type { Dispatch, SetStateAction } from 'react';

export interface DropdownProps<T extends string> {
  value: T;
  options: readonly T[];
  onChange: Dispatch<SetStateAction<T>> | ((value: T) => void);
  className?: string;
}
