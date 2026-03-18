// Hamburger.tsx
import type { FC, RefObject } from 'react';

interface HamburgerProps {
  isOpen: boolean;
  labelOpen: string;
  labelClose: string;
  onClick: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
}

export const Hamburger: FC<HamburgerProps> = ({
  isOpen,
  labelOpen,
  labelClose,
  onClick,
  buttonRef,
}) => {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={isOpen ? labelClose : labelOpen}
      aria-controls="primary-nav"
      aria-expanded={isOpen ? 'true' : 'false'}
      className="inline-flex items-center gap-xs rounded-xl border-0 bg-transparent px-s py-xs text-accent md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      onClick={onClick}
    >
      <span
        aria-hidden="true"
        className="relative inline-block h-[2px] w-[24px]"
      >
        {/* middle bar */}
        <span
          className={[
            'absolute left-0 top-0 block h-[2px] w-full rounded-full bg-current transition-all duration-200',
            isOpen ? 'opacity-0' : 'opacity-100',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {/* top bar */}
        <span
          className={[
            'absolute left-0 block h-[2px] w-full rounded-full bg-current transition-all duration-200',
            isOpen ? 'top-0 rotate-45' : '-top-[7px]',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {/* bottom bar */}
        <span
          className={[
            'absolute left-0 block h-[2px] w-full rounded-full bg-current transition-all duration-200',
            isOpen ? 'top-0 -rotate-45' : 'top-[7px]',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </span>
    </button>
  );
};
