import React from 'react';
import { Brain, Zap } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Zap className="w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Generating Your AI Workout Plan...
        </h2>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full animate-pulse" 
                 style={{ width: '100%', animation: 'loading 3s ease-in-out infinite' }}>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 text-gray-300">
          <p className="animate-fadeIn">✓ Analyzing your fitness goals...</p>
          <p className="animate-fadeIn" style={{ animationDelay: '1s' }}>✓ Customizing exercise selection...</p>
          <p className="animate-fadeIn" style={{ animationDelay: '2s' }}>✓ Optimizing workout schedule...</p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 75%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}