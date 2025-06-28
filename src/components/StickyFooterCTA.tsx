import React from 'react';
import { ArrowRight, X } from 'lucide-react';

interface StickyFooterCTAProps {
  isVisible: boolean;
  onClose: () => void;
  onGetStarted: () => void;
  isDarkMode: boolean;
}

export default function StickyFooterCTA({ isVisible, onClose, onGetStarted, isDarkMode }: StickyFooterCTAProps) {
  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transform transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className={`${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} shadow-2xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Still thinking? Generate your free AI plan now!
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Join 500+ people who transformed their fitness
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                Get Free Plan
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}