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
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Professional Logo - Responsive sizing */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative mr-3 sm:mr-4 flex items-center justify-center">
              {/* Custom Logo Image - Responsive sizing */}
              <img 
                src="/b73ab801-e2d5-4796-9eb3-ebfddc37e118.png" 
                alt="AI Fit Coach Logo" 
                className="h-12 sm:h-16 lg:h-20 w-auto transform group-hover:scale-110 transition-all duration-300 animate-pulse-subtle"
              />
            </div>
            
            <div>
              <span className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight group-hover:text-blue-500 transition-colors duration-300`}>
                AI Fit Coach
              </span>
              <div className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} -mt-1 flex items-center`}>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Smart Fitness Solutions
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            <nav className="hidden md:flex space-x-4 lg:space-x-6">
              <a href="#features" className={`text-sm font-medium hover:text-blue-600 transition-colors duration-300 relative group ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Features
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a href="#calculator" className={`text-sm font-medium hover:text-blue-600 transition-colors duration-300 relative group ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Calculator
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a href="#testimonials" className={`text-sm font-medium hover:text-blue-600 transition-colors duration-300 relative group ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Reviews
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
              </a>
            </nav>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 sm:p-3 rounded-xl transition-all duration-300 transform hover:scale-110 animate-pulse-subtle relative overflow-hidden flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-blue-300 shadow-lg' 
                  : 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg'
              }`}
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
              
              <div className="relative z-10 flex items-center justify-center">
                {isDarkMode ? (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 animate-float" />
                ) : (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow" />
                )}
              </div>
            </button>

            {/* CTA Button */}
            <button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-xs sm:text-sm animate-glow relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              
              <span className="relative z-10 flex items-center">
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}