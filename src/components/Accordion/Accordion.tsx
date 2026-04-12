import { createContext, useContext, useId, useState } from 'react';
import { cn } from '@/utils/cn';
import type {
  AccordionContextValue,
  AccordionItemContextValue,
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './Accordion.types';

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('Accordion 컴포넌트 내부에서 사용해야 합니다.');
  return context;
}

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) throw new Error('Accordion.Item 컴포넌트 내부에서 사용해야 합니다.');
  return context;
}

function Accordion({ children, multiple = false, defaultValue = [], className }: AccordionProps) {
  const [openValues, setOpenValues] = useState<Set<string>>(new Set(defaultValue));

  const toggle = (value: string) => {
    setOpenValues(prev => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggle }}>
      <div className={cn('w-full', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

function Item({ value, children, className }: AccordionItemProps) {
  const { openValues } = useAccordionContext();
  const isOpen = openValues.has(value);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;
  const rendered = typeof children === 'function' ? children(isOpen) : children;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, triggerId, contentId }}>
      <div className={className}>{rendered}</div>
    </AccordionItemContext.Provider>
  );
}

function Trigger({ children, className, as = 'button' }: AccordionTriggerProps) {
  const { toggle } = useAccordionContext();
  const { value, isOpen, triggerId, contentId } = useAccordionItemContext();
  const Component = as;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (as === 'div' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      toggle(value);
    }
  };

  return (
    <Component
      id={triggerId}
      type={as === 'button' ? 'button' : undefined}
      role={as === 'div' ? 'button' : undefined}
      tabIndex={as === 'div' ? 0 : undefined}
      onClick={() => toggle(value)}
      onKeyDown={as === 'div' ? handleKeyDown : undefined}
      aria-expanded={isOpen}
      aria-controls={contentId}
      className={cn('cursor-pointer', className)}
    >
      {children}
    </Component>
  );
}

function Content({ children, className }: AccordionContentProps) {
  const { isOpen, triggerId, contentId } = useAccordionItemContext();

  if (!isOpen) return null;

  return (
    <div id={contentId} role="region" aria-labelledby={triggerId} className={className}>
      {children}
    </div>
  );
}

Accordion.Item = Item;
Accordion.Trigger = Trigger;
Accordion.Content = Content;

export default Accordion;
