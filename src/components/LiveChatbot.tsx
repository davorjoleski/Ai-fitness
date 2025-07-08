import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Bot, User, Send, RefreshCw, AlertCircle, X, Sparkles, Heart, Calculator, Dumbbell, Target, Zap } from 'lucide-react';
import { useChat } from '../hooks/useChat';

interface LiveChatbotProps {
  isDarkMode?: boolean;
}

export default function LiveChatbot({ isDarkMode = false }: LiveChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [showQuickTips, setShowQuickTips] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { messages, isLoading, error, sendMessage, clearError, resetChat } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage;
    setInputMessage('');
    setShowQuickTips(false);
    await sendMessage(message);
  };

  const handleQuickMessage = async (message: string) => {
    setShowQuickTips(false);
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickTips = [
    {
      icon: Target,
      text: "Help me set fitness goals",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Dumbbell,
      text: "Create a workout plan",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Calculator,
      text: "Explain my calculator results",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Heart,
      text: "Nutrition advice",
      color: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <>
      {/* Enhanced Chat Toggle Button - Positioned above "Get Plan" */}
      <div className="fixed bottom-20 right-6 z-50">
        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 relative overflow-hidden ${
            isOpen 
              ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
          }`}
          aria-label={isOpen ? 'Close Virtual Fitness Agent' : 'Open Virtual Fitness Agent'}
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
          
          {isOpen ? (
            <X className="w-8 h-8 text-white mx-auto relative z-10" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <Bot className="w-8 h-8 text-white animate-bounce" />
            </div>
          )}
        </button>
      </div>

      {/* Enhanced Chat Window - Positioned to the right and increased height */}
      {isOpen && (
    <div className={`fixed bottom-40 right-6 z-40 
  w-[95vw] max-w-md 
  h-[85vh] sm:h-[650px] md:h-[700px] lg:h-[750px] 
  rounded-2xl shadow-2xl border flex flex-col overflow-hidden ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200'
  }`}>

          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-4 relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3 animate-bounce-subtle">
                  <Bot className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Virtual Fitness Agent</h3>
                  <div className="flex items-center text-sm opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span>AI-Powered • Always Available</span>
                  </div>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors group"
                title="Reset conversation"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className={`border-l-4 border-red-500 p-3 flex items-center justify-between ${
              isDarkMode ? 'bg-red-900/50' : 'bg-red-50'
            }`}>
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                <p className={`text-sm ${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>{error}</p>
              </div>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Messages - Increased height */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100% - 200px)' }}>
            {/* Quick Tips (shown initially) */}
            {showQuickTips && messages.length <= 1 && (
              <div className="space-y-3 animate-fade-in-up">
                <div className={`text-center text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Quick Actions:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickTips.map((tip, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickMessage(tip.text)}
                      className={`p-3 rounded-xl bg-gradient-to-r ${tip.color} text-white text-xs font-medium hover:scale-105 transition-all duration-200 flex items-center space-x-2 animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <tip.icon className="w-4 h-4" />
                      <span className="truncate">{tip.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 animate-fade-in-up ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'ai' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`px-4 py-3 rounded-2xl relative ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : isDarkMode 
                          ? 'bg-gray-700 text-gray-100'
                          : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="absolute -left-2 top-3 w-0 h-0 border-r-8 border-t-4 border-b-4 border-transparent border-r-gray-100"></div>
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <span className={`text-xs mt-1 px-2 ${
                    message.type === 'user' ? 'text-right' : 'text-left'
                  } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                {message.type === 'user' && (
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}>
                    <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                )}
              </div>
            ))}
            
            {/* Enhanced Typing Indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3 animate-fade-in-up">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div className={`px-4 py-3 rounded-2xl relative ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="absolute -left-2 top-3 w-0 h-0 border-r-8 border-t-4 border-b-4 border-transparent border-r-gray-100"></div>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkMode ? 'bg-gray-400' : 'bg-gray-400'
                    }`}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkMode ? 'bg-gray-400' : 'bg-gray-400'
                    }`} style={{ animationDelay: '0.1s' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkMode ? 'bg-gray-400' : 'bg-gray-400'
                    }`} style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input */}
          <form onSubmit={handleSubmit} className={`p-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about workouts, nutrition, or fitness goals..."
                  className={`w-full px-4 py-3 pr-12 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  disabled={isLoading}
                />
                {inputMessage && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Zap className="w-4 h-4 text-blue-500 animate-pulse" />
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center justify-center mt-2 text-xs">
              <div className={`flex items-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="w-1 h-1 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span>Powered by AI • Instant responses</span>
              </div>
            </div>
          </form>
        </div>
      )}

/* Responsive chat window adjustments */
@media (max-width: 768px) {
  .fixed.bottom-40.right-6.z-40 {
    bottom: 20px;
    right: 4px;
    left: 4px;
    width: auto;
    max-width: none;
    height: 70vh;
    max-height: 500px;
  }
}

@media (max-width: 640px) {
  .fixed.bottom-40.right-6.z-40 {
    height: 60vh;
    max-height: 400px;
  }
}
    </>
  );
}