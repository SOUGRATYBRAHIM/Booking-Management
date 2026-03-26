import { clsx } from 'clsx';

const Card = ({ children, className = '', variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-white border border-gray-200 shadow-md',
    elevated: 'bg-white shadow-lg',
    flat: 'bg-gray-50 border border-gray-100',
    bordered: 'bg-white border-2 border-gray-300',
  };

  return (
    <div
      className={clsx('rounded-lg p-6 transition-all duration-200', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
