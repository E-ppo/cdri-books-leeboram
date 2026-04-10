import { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { HeaderProps } from "./Header.types";

function Header({ title, navItems }: HeaderProps) {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!navRef.current) return;

    const activeLink = navRef.current.querySelector(
      ".active",
    ) as HTMLElement | null;

    if (activeLink) {
      setBarStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    }
  }, [location.pathname]);

  return (
    <header className="flex flex-col items-start gap-2 bg-white py-4 lg:relative lg:h-20 lg:flex-row lg:items-center lg:gap-0 lg:py-0">
      <span className="title1 inline-flex h-8 items-start text-primary">
        {title}
      </span>
      <nav
        ref={navRef}
        className="relative flex gap-6 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:gap-10"
      >
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `body1 pb-2 text-primary ${isActive ? "active" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
        <span
          className="absolute bottom-0 h-px bg-brand transition-all duration-300 ease-in-out"
          style={{ left: barStyle.left, width: barStyle.width }}
        />
      </nav>
    </header>
  );
}

export default Header;
