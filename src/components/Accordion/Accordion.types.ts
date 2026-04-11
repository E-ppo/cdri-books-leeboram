export interface AccordionContextValue {
  openValues: Set<string>;
  toggle: (value: string) => void;
}

export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

export interface AccordionProps {
  children: React.ReactNode;
  multiple?: boolean;
  defaultValue?: string[];
  className?: string;
}

export interface AccordionItemProps {
  value: string;
  children: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  className?: string;
}

export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'div';
}

export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}
