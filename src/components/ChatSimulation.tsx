import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function ChatSimulation() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Chat with Our AI Fitness Coach
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get instant, personalized fitness advice from our AI coach
          </p>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold">Try Our Live AI Coach</h3>
                <p className="text-blue-100">Click the chat button to start your conversation</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="font-semibold">Powered by GPT-4</span>
              </div>
              <ul className="text-left space-y-2 text-blue-100">
                <li>• Get personalized workout recommendations</li>
                <li>• Ask questions about nutrition and fitness</li>
                <li>• Receive motivation and coaching tips</li>
                <li>• Plan your weekly training schedule</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}