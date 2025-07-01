import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

interface ChatSimulationProps {
  isDarkMode?: boolean;
}

export default function ChatSimulation({ isDarkMode = false }: ChatSimulationProps) {
  return (
    <section className={`py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center animate-bounce-subtle">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            CHAT WITH OUR AI FITNESS COACH
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get instant, personalized fitness advice from our AI coach powered by advanced technology
          </p>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl animate-fade-in-up hover-lift" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4 animate-pulse-subtle">
                {/* AI Symbol */}
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  <path d="M19 12L20.09 18.26L27 19L20.09 19.74L19 26L17.91 19.74L11 19L17.91 18.26L19 12Z" opacity="0.6"/>
                  <path d="M5 12L6.09 18.26L13 19L6.09 19.74L5 26L3.91 19.74L-3 19L3.91 18.26L5 12Z" opacity="0.6"/>
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold">Try Our Live AI Coach</h3>
                <p className="text-blue-100">Click the chat button to start your conversation</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
              <div className="flex items-center mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="font-semibold">Powered by GPT-3.5 Turbo</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-left text-blue-100">
                <ul className="space-y-2">
                  <li>• Get personalized workout recommendations</li>
                  <li>• Ask questions about nutrition and fitness</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Receive motivation and coaching tips</li>
                  <li>• Plan your weekly training schedule</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}