import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
    } backdrop-blur-md border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Custom Logo - Made Bigger */}
          <div className="flex items-center group">
            <svg 
              className="h-16 w-16 mr-3 transform group-hover:scale-110 transition-all duration-300 animate-pulse-subtle" 
              viewBox="0 0 400 400" 
              fill="none"
            >
              {/* Head with AI circuits */}
              <circle cx="160" cy="120" r="80" fill="#2563eb" className="animate-pulse"/>
              
              {/* AI Circuit patterns in head */}
              <circle cx="140" cy="100" r="8" fill="#10b981"/>
              <circle cx="180" cy="110" r="6" fill="#10b981"/>
              <circle cx="160" cy="130" r="7" fill="#10b981"/>
              
              {/* Circuit connections */}
              <path d="M140 100 L160 130 L180 110" stroke="#10b981" strokeWidth="3" fill="none"/>
              <path d="M140 100 L180 110" stroke="#10b981" strokeWidth="2" fill="none"/>
              
              {/* Dumbbells */}
              <rect x="80" y="180" width="20" height="60" rx="10" fill="#10b981"/>
              <rect x="220" y="180" width="20" height="60" rx="10" fill="#10b981"/>
              <rect x="70" y="175" width="40" height="15" rx="7" fill="#10b981"/>
              <rect x="70" y="250" width="40" height="15" rx="7" fill="#10b981"/>
              <rect x="210" y="175" width="40" height="15" rx="7" fill="#10b981"/>
              <rect x="210" y="250" width="40" height="15" rx="7" fill="#10b981"/>
              
              {/* Connecting bar */}
              <rect x="100" y="205" width="120" height="10" rx="5" fill="#2563eb"/>
            </svg>
            <div>
              <span className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
                AI Fit Coach
              </span>
              <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} -mt-1`}>
                Powered by AI
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className={`text-sm font-medium hover:text-blue-600 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Features
              </a>
              <a href="#calculator" className={`text-sm font-medium hover:text-blue-600 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Calculator
              </a>
              <a href="#testimonials" className={`text-sm font-medium hover:text-blue-600 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Reviews
              </a>
            </nav>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 animate-bounce-subtle ${
                isDarkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm animate-pulse-subtle"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}