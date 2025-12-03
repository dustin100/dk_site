import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  ReactNode,
} from 'react';

type ButtonVariant = 'default' | 'primary';

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button: FC<ButtonProps> = (props) => {
  const { children, variant = 'default', className, href, ...rest } = props;

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
  const classes = [base, variantClasses, className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }


  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
