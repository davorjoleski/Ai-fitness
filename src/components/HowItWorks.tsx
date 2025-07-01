import React from 'react';
import { MessageSquare, Brain, Mail } from 'lucide-react';

interface HowItWorksProps {
  isDarkMode?: boolean;
}

export default function HowItWorks({ isDarkMode = false }: HowItWorksProps) {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Answer Short Questions',
      description: 'Tell us about your fitness goals, available time, and current level in just 3 quick questions.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Brain,
      title: 'AI Analyzes Your Goals',
      description: 'Our advanced AI processes your information and creates a personalized workout plan just for you.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Mail,
      title: 'Get Your Plan via Email',
      description: 'Receive your custom workout plan instantly in your inbox, ready to start your transformation.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className={`py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-500/20 rounded-full blur-xl animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 tracking-tight animate-text-shimmer ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            HOW IT WORKS
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get your personalized fitness plan in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group relative animate-fade-in-up hover:scale-105 transition-all duration-500" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative mb-8">
                <div className={`w-28 h-28 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl animate-bounce-subtle hover-lift`}>
                  <step.icon className="w-14 h-14 text-white animate-pulse" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-spin-slow">
                  {index + 1}
                </div>
                
                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-full w-12 h-1 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse"></div>
                )}
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 animate-bounce-subtle ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{ animationDelay: `${index * 0.1}s` }}>
                {step.title}
              </h3>
              
              <p className={`leading-relaxed text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}