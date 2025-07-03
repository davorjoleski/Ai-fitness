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
          {/* Professional Logo - Made Bigger */}
          <div className="flex items-center justify-center mb-8 animate-fade-in-up">
            <img 
              src="/b73ab801-e2d5-4796-9eb3-ebfddc37e118.png" 
              alt="AI Fit Coach Logo" 
              className="h-20 w-auto mr-4 animate-float "
            />
            <div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight">AI Fit Coach</h3>
              <div className="text-sm text-gray-400 -mt-1">Smart Fitness Solutions</div>
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