import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...props }, ref) => {
    const base =
      // base link styles
      'relative inline-block px-s py-xs text-text no-underline ' +
      'transition-colors duration-200 ' +
      'hover:text-accent focus-visible:text-accent ' +
      'hover:no-underline focus-visible:no-underline ' +
      'focus-visible:outline-none ' +
      // underline fx
      'after:pointer-events-none after:absolute after:left-0 after:bottom-0 ' +
      'after:block after:h-[2px] after:w-full after:origin-left ' +
      'after:scale-x-0 after:bg-accent ' +
      'after:transition-transform after:duration-200 ' +
      'hover:after:scale-x-100 focus-visible:after:scale-x-100';

    return (
      <a
        ref={ref}
        {...props}
        className={[base, className].filter(Boolean).join(' ')}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';
