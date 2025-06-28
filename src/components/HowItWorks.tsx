import React from 'react';
import { MessageSquare, Brain, Mail, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
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
    <section className="py-20 bg-white relative">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-50 blur-xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            HOW IT WORKS
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your personalized fitness plan in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group relative">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto transform group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <step.icon className="w-12 h-12 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-12 left-full w-full items-center justify-center transform -translate-x-12">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}