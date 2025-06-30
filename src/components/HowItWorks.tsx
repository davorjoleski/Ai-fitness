import React from 'react';
import { MessageSquare, Brain, Mail, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  isDarkMode?: boolean;
}

export default function HowItWorks({ isDarkMode = false }: HowItWorksProps) {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Answer Short Questions',
      description: 'Tell us about your fitness goals, available time, and current level in just 3 quick questions.'
    },
    {
      icon: Brain,
      title: 'AI Analyzes Your Goals',
      description: 'Our advanced AI processes your information and creates a personalized workout plan just for you.'
    },
    {
      icon: Mail,
      title: 'Get Your Plan via Email',
      description: 'Receive your custom workout plan instantly in your inbox, ready to start your transformation.'
    }
  ];

  return (
    <section className={`py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 tracking-tight ${
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
            <div key={index} className="text-center group relative animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto transform group-hover:scale-110 transition-all duration-300 shadow-xl animate-bounce-subtle">
                  <step.icon className="w-12 h-12 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-12 left-full w-full items-center justify-center transform -translate-x-12">
                    <ArrowRight className="w-8 h-8 text-gray-300 animate-pulse" />
                  </div>
                )}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse-subtle">
                  {index + 1}
                </div>
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
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