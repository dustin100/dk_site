import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type ButtonVariant = 'default' | 'primary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const base =
    'inline-flex items-center gap-xs px-s py-xs rounded-[12px] ' +
    'border-line border bg-secondary text-text no-underline ' +
    'leading-0 ' +
    'transition duration-200 ease-out ' +
    'hover:-translate-y-[1px] ' +
    'hover:bg-accent hover:border-accent hover:text-primary ' +
    'hover:shadow-card ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-primary';

  const primary =
    'border shadow-card bg-accent text-primary hover:bg-accent';

  const variantClasses = variant === 'primary' ? primary : '';

  return (
    <button
      {...props}
      className={[base, variantClasses, className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
};
