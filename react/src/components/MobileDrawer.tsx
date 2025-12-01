import type { FC, RefObject } from 'react';
import { Link } from './ui/Link';
import type { NavItem } from './DesktopNav';

interface MobileDrawerProps {
  isOpen: boolean;
  mainNavLabel: string;
  menuToggleCloseLabel: string;
  items: NavItem[];
  onClose: () => void;
  firstLinkRef: RefObject<HTMLAnchorElement | null>;
}

export const MobileDrawer: FC<MobileDrawerProps> = ({
  isOpen,
  mainNavLabel,
  menuToggleCloseLabel,
  items,
  onClose,
  firstLinkRef,
}) => {
  return (
    <nav
      aria-label={mainNavLabel}
      className={[
        'fixed inset-y-0 right-0 z-40 flex h-svh w-[min(86vw,22rem)] flex-col gap-m',
        'border-l border-line bg-primary/95 px-l py-l shadow-card',
        'transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Close button */}
      <div className="absolute top-m right-m">
        <button
          type="button"
          aria-label={menuToggleCloseLabel}
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-transparent text-text shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <span
            aria-hidden="true"
            className="relative inline-block h-[2px] w-[22px]"
          >
            <span className="absolute inset-0 block h-[2px] w-full bg-current rotate-45" />
            <span className="absolute inset-0 block h-[2px] w-full bg-current -rotate-45" />
          </span>
        </button>
      </div>

      {/* Mobile nav links */}
      <div id="primary-nav" className="flex flex-col gap-xs">
        {items.map((item, index) => (
          <Link
            key={item.href ?? item.label}
            href={item.href}
            onClick={onClose}
            className={[
              'px-s py-xs rounded-md text-base text-text',
              'hover:bg-secondary hover:text-accent',
            ]
              .filter(Boolean)
              .join(' ')}
            ref={index === 0 ? firstLinkRef : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
