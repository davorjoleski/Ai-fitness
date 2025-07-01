import React from 'react';
import { Instagram, Heart } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
}

export default function Footer({ isDarkMode = false }: FooterProps) {
  return (
    <footer className={`py-12 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-900 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Custom Logo - Made Bigger */}
          <div className="flex items-center justify-center mb-6 animate-fade-in-up">
            <svg 
              className="h-16 w-16 mr-3 animate-float" 
              viewBox="0 0 400 400" 
              fill="none"
            >
              {/* Head with AI circuits */}
              <circle cx="160" cy="120" r="80" fill="#2563eb"/>
              
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
              <h3 className="text-2xl font-black tracking-tight">AI Fit Coach</h3>
              <div className="text-xs text-gray-400 -mt-1">Powered by AI</div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="#"
              className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-bounce-subtle"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-bounce-subtle"
              aria-label="TikTok"
              style={{ animationDelay: '0.2s' }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-400 flex items-center justify-center animate-pulse-subtle">
              Built with <Heart className="w-4 h-4 text-red-500 mx-1 animate-bounce" /> using AI
            </p>
            <p className="text-sm text-gray-500 mt-2">
              © 2025 AI Fit Coach. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}