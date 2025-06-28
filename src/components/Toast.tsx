import React, { useEffect } from 'react';
import { CheckCircle, X, Mail, AlertCircle } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  type: 'success' | 'info' | 'error';
  message: string;
  isDarkMode?: boolean;
}

export default function Toast({ isVisible, onClose, type, message, isDarkMode = false }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: isDarkMode ? 'bg-green-800' : 'bg-green-50',
          borderColor: 'border-green-500',
          textColor: isDarkMode ? 'text-green-100' : 'text-green-800',
          icon: <CheckCircle className="w-6 h-6 text-green-500" />
        };
      case 'error':
        return {
          bgColor: isDarkMode ? 'bg-red-800' : 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: isDarkMode ? 'text-red-100' : 'text-red-800',
          icon: <AlertCircle className="w-6 h-6 text-red-500" />
        };
      default: // info
        return {
          bgColor: isDarkMode ? 'bg-blue-800' : 'bg-blue-50',
          borderColor: 'border-blue-500',
          textColor: isDarkMode ? 'text-blue-100' : 'text-blue-800',
          icon: <Mail className="w-6 h-6 text-blue-500" />
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed top-20 right-4 z-50 animate-fadeIn">
      <div className={`${styles.bgColor} border-l-4 ${styles.borderColor} p-4 rounded-lg shadow-lg max-w-sm`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {styles.icon}
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${styles.textColor}`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`ml-4 ${styles.textColor} hover:opacity-75`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}