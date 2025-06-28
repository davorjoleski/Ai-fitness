import React, { useEffect } from 'react';
import { CheckCircle, X, Mail } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  type: 'success' | 'info';
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

  const bgColor = type === 'success' 
    ? (isDarkMode ? 'bg-green-800' : 'bg-green-50')
    : (isDarkMode ? 'bg-blue-800' : 'bg-blue-50');
  
  const borderColor = type === 'success' ? 'border-green-500' : 'border-blue-500';
  const textColor = type === 'success' 
    ? (isDarkMode ? 'text-green-100' : 'text-green-800')
    : (isDarkMode ? 'text-blue-100' : 'text-blue-800');

  return (
    <div className="fixed top-20 right-4 z-50 animate-fadeIn">
      <div className={`${bgColor} border-l-4 ${borderColor} p-4 rounded-lg shadow-lg max-w-sm`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Mail className="w-6 h-6 text-blue-500" />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${textColor}`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`ml-4 ${textColor} hover:opacity-75`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}