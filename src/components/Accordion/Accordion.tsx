import { createContext, useContext, useState } from 'react';
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
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

function Item({ value, children, className }: AccordionItemProps) {
  const { openValues } = useAccordionContext();
  const isOpen = openValues.has(value);
  const rendered = typeof children === 'function' ? children(isOpen) : children;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={className}>{rendered}</div>
    </AccordionItemContext.Provider>
  );
}

function Trigger({ children, className }: AccordionTriggerProps) {
  const { toggle } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();

  return (
    <button
      type="button"
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      className={cn('cursor-pointer', className)}
    >
      {children}
    </button>
  );
}

function Content({ children, className }: AccordionContentProps) {
  const { isOpen } = useAccordionItemContext();

  if (!isOpen) return null;

  return <div className={className}>{children}</div>;
}

Accordion.Item = Item;
Accordion.Trigger = Trigger;
Accordion.Content = Content;

export default Accordion;
