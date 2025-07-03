import React from 'react';
import { MessageSquare, Brain, Mail, Sparkles, Zap, Target } from 'lucide-react';

interface HowItWorksProps {
  isDarkMode?: boolean;
}

export default function HowItWorks({ isDarkMode = false }: HowItWorksProps) {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Answer Short Questions',
      description: 'Tell us about your fitness goals, available time, and current level in just 3 quick questions.',
      color: 'from-pink-500 to-rose-500',
      animation: 'animate-wiggle'
    },
    {
      icon: Brain,
      title: 'AI Analyzes Your Goals',
      description: 'Our advanced AI processes your information and creates a personalized workout plan just for you.',
      color: 'from-purple-500 to-indigo-500',
      animation: 'animate-pulse'
    },
    {
      icon: Mail,
      title: 'Get Your Plan via Email',
      description: 'Receive your custom workout plan instantly in your inbox, ready to start your transformation.',
      color: 'from-green-500 to-emerald-500',
      animation: 'animate-float'
    }
  ];

  return (
    <section className={`py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-500/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-1/4 left-1/2 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center animate-rotate-in">
              <Sparkles className="w-10 h-10 text-white animate-wiggle" />
            </div>
          </div>
          
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
            <div key={index} className="text-center group relative animate-fade-in-scale hover:scale-105 transition-all duration-500" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative mb-8">
                <div className={`w-28 h-28 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl hover-lift`}>
                  <step.icon className={`w-14 h-14 text-white ${step.animation}`} />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-glow">
                  {index + 1}
                </div>
                
                {/* Enhanced connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-full w-12 h-1 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse">
                    <div className="absolute top-1/2 right-0 w-2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2 animate-bounce"></div>
                  </div>
                )}
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 animate-slide-up ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{ animationDelay: `${index * 0.1}s` }}>
                {step.title}
              </h3>
              
              <p className={`leading-relaxed text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {step.description}
              </p>

              {/* Additional decorative elements */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className={`w-8 h-1 bg-gradient-to-r ${step.color} rounded-full animate-pulse`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 max-w-2xl mx-auto border border-blue-200 dark:border-gray-600">
            <Zap className={`w-12 h-12 mx-auto mb-4 text-blue-600 animate-heartbeat`} />
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Ready to Transform Your Fitness?
            </h3>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands who have already started their journey with AI-powered fitness plans
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}