import React, { useState, useEffect } from 'react';
import { MessageCircle, Bot, User } from 'lucide-react';

export default function ChatSimulation() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  const messages = [
    { type: 'user', text: 'I want to lose fat and gain muscle', delay: 1000 },
    { type: 'ai', text: 'Great! How many days per week can you train?', delay: 2000 },
    { type: 'user', text: '4', delay: 3000 },
    { type: 'ai', text: 'Perfect. I\'m generating your plan...', delay: 4500, showTyping: true }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleMessages < messages.length) {
        if (messages[visibleMessages].showTyping) {
          setShowTyping(true);
          setTimeout(() => {
            setShowTyping(false);
            setVisibleMessages(prev => prev + 1);
          }, 2000);
        } else {
          setVisibleMessages(prev => prev + 1);
        }
      }
    }, messages[visibleMessages]?.delay || 1000);

    return () => clearTimeout(timer);
  }, [visibleMessages, messages]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            See How Our AI Works
          </h2>
          <p className="text-xl text-gray-600">
            Watch a real conversation with our AI fitness coach
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-2xl mx-auto">
          <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
            <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">AI Fit Coach</h3>
            <div className="ml-auto flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-2 text-sm text-gray-500">Online</span>
            </div>
          </div>

          <div className="space-y-4 h-80 overflow-y-auto">
            {messages.slice(0, visibleMessages).map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 animate-fadeIn ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'ai' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white ml-auto'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                
                {message.type === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            
            {showTyping && (
              <div className="flex items-start space-x-3 animate-fadeIn">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}