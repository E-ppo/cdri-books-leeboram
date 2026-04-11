import type { ResultCountProps } from './ResultCount.types';

export default function ResultCount({ title, count }: ResultCountProps) {
  return (
    <p className="flex items-center gap-4 caption text-black">
      <span>{title}</span>
      <span>
        총 <span className="text-(--color-brand)">{count}</span>건
      </span>
    </p>
  );
}
