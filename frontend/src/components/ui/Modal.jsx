import { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, closeOnBackdropClick = true, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all"
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-2xl shadow-2xl w-full animate-in fade-in zoom-in duration-200 overflow-hidden ${sizeClasses[size]}`}>
        {title && (
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <button onClick={onClose} className="hover:cursor-pointer text-gray-400 hover:text-gray-900 hover:bg-gray-100 p-1 rounded-lg transition-all">
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;