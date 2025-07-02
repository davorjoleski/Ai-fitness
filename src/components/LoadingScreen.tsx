import React from 'react';
import { Brain, Zap, CheckCircle, Sparkles, Target, Dumbbell } from 'lucide-react';

export default function LoadingScreen() {
  const loadingSteps = [
    { icon: Brain, text: "Analyzing your fitness goals...", delay: 0 },
    { icon: Target, text: "Customizing exercise selection...", delay: 1000 },
    { icon: Dumbbell, text: "Calculating optimal workout intensity...", delay: 2000 },
    { icon: Sparkles, text: "Preparing your personalized plan...", delay: 3000 }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center text-white max-w-md mx-auto px-4 relative z-10">
        {/* Main AI Brain Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse shadow-2xl">
            <Brain className="w-16 h-16 text-white animate-bounce" />
          </div>
          
          {/* Floating icons around main brain */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-1/2 -left-8 w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s' }}>
            <Target className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-black mb-2 animate-pulse">
          AI Fitness Coach
        </h2>
        <p className="text-xl sm:text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Generating Your Workout Plan...
        </p>
        
        {/* Enhanced Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white/20 rounded-full h-4 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-full rounded-full animate-pulse loading-bar shadow-lg"></div>
          </div>
          <div className="flex justify-between text-xs mt-2 text-blue-200">
            <span>0%</span>
            <span className="animate-pulse">Processing...</span>
            <span>100%</span>
          </div>
        </div>
        
        {/* Dynamic Loading Steps */}
        <div className="space-y-4 text-gray-200">
          {loadingSteps.map((step, index) => (
            <div 
              key={index}
              className="flex items-center justify-center animate-fadeIn opacity-0"
              style={{ 
                animationDelay: `${step.delay}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3 animate-spin-slow">
                <step.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-lg font-medium">{step.text}</p>
              <CheckCircle className="w-6 h-6 text-green-400 ml-3 animate-bounce" />
            </div>
          ))}
        </div>

        {/* AI Processing Indicator */}
        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <p className="text-sm text-blue-200 mt-4 animate-pulse">
          Powered by Advanced AI • Personalized for You
        </p>
      </div>
      
      <style jsx>{`
        .loading-bar {
          animation: loading 3.5s ease-in-out infinite;
        }
        
        @keyframes loading {
          0% { width: 0%; }
          25% { width: 30%; }
          50% { width: 65%; }
          75% { width: 85%; }
          100% { width: 100%; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}