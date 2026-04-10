export interface NavItem {
  to: string;
  label: string;
}

export interface HeaderProps {
  title: string;
  navItems: NavItem[];
}
