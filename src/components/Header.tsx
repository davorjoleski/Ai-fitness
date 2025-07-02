import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';

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
          {/* Enhanced Logo */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              {/* AI Brain with Circuit Pattern */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 transform group-hover:scale-110 transition-all duration-300 animate-pulse-subtle shadow-lg">
                <div className="relative">
                  {/* Brain outline */}
                  <div className="w-8 h-8 border-2 border-white rounded-full relative">
                    {/* Circuit nodes */}
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-1 left-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    {/* Circuit connections */}
                    <div className="absolute top-2 left-2 w-4 h-0.5 bg-green-400 opacity-60"></div>
                    <div className="absolute top-3 left-1 w-0.5 h-3 bg-green-400 opacity-60"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating sparkle */}
              <div className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-bounce">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            
            <div>
              <span className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight group-hover:text-blue-500 transition-colors duration-300`}>
                AI Fit Coach
              </span>
              <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} -mt-1 flex items-center`}>
                <div className="w-1 h-1 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                Powered by AI
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
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

            {/* Enhanced Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 animate-bounce-subtle relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg' 
                  : 'bg-gradient-to-br from-gray-700 to-gray-900 text-yellow-400 shadow-lg'
              }`}
              aria-label="Toggle dark mode"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              
              <div className="relative z-10">
                {isDarkMode ? (
                  <Sun className="w-5 h-5 animate-spin-slow" />
                ) : (
                  <Moon className="w-5 h-5 animate-bounce" />
                )}
              </div>
            </button>

            {/* Enhanced CTA Button */}
            <button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm animate-pulse-subtle relative overflow-hidden"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              
              <span className="relative z-10 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Get Started
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}