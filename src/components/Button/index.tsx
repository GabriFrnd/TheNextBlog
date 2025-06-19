import clsx from 'clsx';

type ButtonVariants = 'default' | 'ghost' | 'danger';
type ButtonSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
} & React.ComponentProps<'button'>;

export function Button({ variant = 'default', size = 'md', ...props }: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx('bg-blue-600 text-blue-100', 'hover:bg-blue-700'),
    ghost: clsx('bg-slate-300 text-slate-900', 'hover:bg-slate-400'),
    danger: clsx('bg-red-600 text-red-100', 'hover:bg-red-700'),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx('gap-1 px-2 py-1', 'rounded-sm', 'text-xs/tight', '[&_svg]:h-3 [&_svg]:w-3'),
    md: clsx('gap-2 px-4 py-2', 'rounded-md', 'text-base/tight', '[&_svg]:h-4 [&_svg]:w-4'),
    lg: clsx('gap-3 px-6 py-4', 'rounded-lg', 'text-lg/tight', '[&_svg]:h-5 [&_svg]:w-5'),
  };

  const buttonClasses = clsx(
    'cursor-pointer',
    'disabled:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-500',
    'flex',
    'items-center justify-center',
    'transition',
    buttonVariants[variant], buttonSizes[size],
    props.className,
  );

  return <button {...props} className={buttonClasses} />;
}
