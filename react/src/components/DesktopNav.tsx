import type { FC } from 'react';
import { Link } from './ui/Link';

export type NavItem = {
  label: string;
  href: string;
};

interface DesktopNavProps {
  label: string;
  items: NavItem[];
}

export const DesktopNav: FC<DesktopNavProps> = ({
  label,
  items,
}) => {
  if (!items.length) return null;

  return (
    <nav aria-label={label} className="hidden items-center gap-l md:flex">
      {items.map((item) => (
        <Link key={item.href ?? item.label} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
