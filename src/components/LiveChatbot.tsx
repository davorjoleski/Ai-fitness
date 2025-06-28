import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Bot, User, Send, RefreshCw, AlertCircle, X } from 'lucide-react';
import { useChat } from '../hooks/useChat';

interface LiveChatbotProps {
  isDarkMode?: boolean;
}

export default function LiveChatbot({ isDarkMode = false }: LiveChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
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

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white mx-auto" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white mx-auto" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[500px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Fitness Coach</h3>
                <div className="flex items-center text-sm opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
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

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
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
                    className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : isDarkMode 
                          ? 'bg-gray-700 text-gray-100'
                          : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <span className={`text-xs mt-1 px-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
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
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
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

          {/* Input */}
          <form onSubmit={handleSubmit} className={`p-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your fitness goals..."
                className={`flex-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}