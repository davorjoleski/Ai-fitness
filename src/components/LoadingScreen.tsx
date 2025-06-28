import React from 'react';
import { Brain, Zap, CheckCircle } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center text-white max-w-md mx-auto px-4">
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Zap className="w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Generating Your AI Workout Plan...
        </h2>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full animate-pulse loading-bar"></div>
          </div>
        </div>
        
        <div className="space-y-3 text-gray-300">
          <div className="flex items-center justify-center animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
            <p>Analyzing your fitness goals...</p>
          </div>
          <div className="flex items-center justify-center animate-fadeIn" style={{ animationDelay: '1s' }}>
            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
            <p>Customizing exercise selection...</p>
          </div>
          <div className="flex items-center justify-center animate-fadeIn" style={{ animationDelay: '2s' }}>
            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
            <p>Preparing your personalized plan...</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .loading-bar {
          animation: loading 3s ease-in-out infinite;
        }
        
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 75%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}