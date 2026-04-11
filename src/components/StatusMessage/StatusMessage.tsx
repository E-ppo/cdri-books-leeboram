import { cn } from '@/utils/cn';
import type { StatusMessageProps } from './StatusMessage.types';

export default function StatusMessage({ message, icon, title, className }: StatusMessageProps) {
  return (
    <div className={cn('flex flex-1 flex-col items-center justify-center gap-6', className)}>
      {icon && <div className="text-subtitle">{icon}</div>}
      {title && <p className="title3 text-primary">{title}</p>}
      <p className="body2 text-subtitle">{message}</p>
    </div>
  );
}
