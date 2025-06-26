import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
}

export default function Hero({ onStartClick }: HeroProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          Get Your Personalized
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {' '}AI Workout Plan
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Answer 3 quick questions and get your custom fitness plan instantly
        </p>
        
        <button
          onClick={onStartClick}
          className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
        >
          Start Now
          <ArrowDown className="inline-block ml-3 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 mb-4">Trusted by fitness enthusiasts worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-2xl font-bold">Plans</div>
            <div className="text-2xl font-bold">Created</div>
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