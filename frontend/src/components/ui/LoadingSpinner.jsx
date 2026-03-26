const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary',
  fullScreen = false,
  label = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-600',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <svg 
        className={`${sizeClasses[size]} ${colorClasses[variant]} animate-spin`}
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4" 
          opacity="0.2"
        />
        <path 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {label && <p className={colorClasses[variant]}>{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
