import React from 'react';
import { ArrowDown, Zap, Target, Clock } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
  isDarkMode: boolean;
}

export default function Hero({ onStartClick, isDarkMode }: HeroProps) {
  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-white'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-green-500/20 rounded-full blur-xl animate-float-slow"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-fade-in-up overflow-x-hidden">
        {/* Trust Indicators */}
        <div className="flex justify-center items-center space-x-6 mb-8 text-sm flex-wrap" style={{ animationDelay: '0.2s' }}>
          <div className={`flex items-center flex-shrink-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Zap className="w-4 h-4 text-blue-400 mr-2 animate-heartbeat" />
            <span>AI-Powered</span>
          </div>
          <div className={`flex items-center flex-shrink-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Target className="w-4 h-4 text-green-400 mr-2 animate-wiggle" />
            <span>Personalized</span>
          </div>
          <div className={`flex items-center flex-shrink-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Clock className="w-4 h-4 text-purple-400 mr-2 animate-spin-slow" />
            <span>Instant Results</span>
          </div>
        </div>

        <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight animate-fade-in-up text-responsive ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`} style={{ animationDelay: '0.4s' }}>
          GET YOUR PERSONALIZED
          <span className="gradient-text block">
            AI WORKOUT PLAN
          </span>
        </h1>
        
        <p className={`text-xl sm:text-2xl lg:text-3xl mb-4 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in-up text-responsive ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`} style={{ animationDelay: '0.6s' }}>
          Train Smarter, Not Harder – Custom Plans for Every Body and Every Goal.
        </p>
        
        <p className={`text-lg mb-12 max-w-2xl mx-auto animate-fade-in-up text-responsive ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`} style={{ animationDelay: '0.8s' }}>
          Answer 3 quick questions and get your custom fitness plan instantly
        </p>
        
        <button
          onClick={onStartClick}
          className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-5 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg border-2 border-blue-400/20 animate-fade-in-up animate-glow flex-shrink-0"
          style={{ animationDelay: '1s' }}
        >
          START NOW - IT'S FREE
          <ArrowDown className="inline-block ml-3 w-6 h-6 group-hover:translate-y-1 transition-transform duration-300 animate-bounce" />
        </button>
        
        <div className="mt-16 text-center animate-fade-in-up overflow-x-hidden" style={{ animationDelay: '1.2s' }}>
          <p className={`text-sm mb-6 font-medium ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Join fitness enthusiasts who transformed their health
          </p>
          <div className="flex justify-center items-center space-x-8 sm:space-x-12 opacity-70 flex-wrap">
            <div className="text-center flex-shrink-0">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent animate-pulse">150+</div>
              <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Plans Created</div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent animate-pulse">4.7★</div>
              <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>User Rating</div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-pulse">24/7</div>
              <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}