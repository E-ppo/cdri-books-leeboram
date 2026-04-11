import type { ReactNode } from 'react';

export interface StatusMessageProps {
  message: string;
  icon?: ReactNode;
  title?: string;
  className?: string;
}
