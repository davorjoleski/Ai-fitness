import React from 'react';
import { MessageCircle, Sparkles, Dumbbell } from 'lucide-react';

export default function ChatSimulation() {
  return (
    <section className="py-20 bg-gray-50 relative">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            CHAT WITH OUR AI FITNESS COACH
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant, personalized fitness advice from our AI coach powered by advanced technology
          </p>
          
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Dumbbell className="w-8 h-8" />
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