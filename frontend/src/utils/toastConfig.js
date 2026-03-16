export const toastOptions = {
  duration: 4000,
  style: {
    padding: '10px',
    borderRadius: '10px',
    fontWeight: '500',
    boxShadow:
      '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
  },
  success: {
    style: {
      background: '#ecfdf5',
      color: '#065f46',
      border: '1px solid #10b981',
    },
    iconTheme: {
      primary: '#10b981',
      secondary: '#ecfdf5',
    },
  },
  error: {
    style: {
      background: '#fef2f2',
      color: '#991b1b',
      border: '1px solid #ef4444',
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fef2f2',
    },
  },
};