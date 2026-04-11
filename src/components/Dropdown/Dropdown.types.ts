export interface DropdownProps<T extends string> {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  className?: string;
}
