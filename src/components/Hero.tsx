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
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-bg opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-500/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-float-delayed"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-float-slow"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-fade-in-up">
        {/* Trust Indicators */}
        <div className="flex justify-center items-center space-x-6 mb-8 text-sm text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center">
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 text-green-400 mr-2" />
            <span>Personalized</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-blue-400 mr-2" />
            <span>Instant Results</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          GET YOUR PERSONALIZED
          <span className="gradient-text block">
            AI WORKOUT PLAN
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl lg:text-3xl mb-4 text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Transform your body with an AI-powered fitness plan designed just for you—no experience needed!
        </p>
        
        <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          Answer 3 quick questions and get your custom fitness plan instantly
        </p>
        
        <button
          onClick={onStartClick}
          className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-16 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg border-2 border-green-400/20 animate-fade-in-up animate-bounce-subtle"
          style={{ animationDelay: '1s' }}
        >
          START NOW - IT'S FREE
          <ArrowDown className="inline-block ml-3 w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
        
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <p className="text-sm text-gray-400 mb-6">Join fitness enthusiasts who transformed their health</p>
          <div className="flex justify-center items-center space-x-12 opacity-70">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">200+</div>
              <div className="text-sm text-gray-400">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">4.8★</div>
              <div className="text-sm text-gray-400">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-gray-400">AI Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
}