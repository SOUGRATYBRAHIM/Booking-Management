import { clsx } from 'clsx';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 focus:ring-red-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-blue-300 disabled:text-blue-300 focus:ring-blue-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
      {...props}
    >
      {loading && <span className="animate-spin">⏳</span>}
      {children}
    </button>
  );
};

export default Button;
