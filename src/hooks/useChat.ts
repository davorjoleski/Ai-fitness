import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types/chat';
import { OpenAIService } from '../services/openai';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        type: 'ai',
        text: 'Hi! I\'m your AI fitness coach. Tell me about your fitness goals and I\'ll help you create a personalized workout plan!',
        timestamp: new Date()
      }
    ],
    isLoading: false,
    error: null
  });

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: userMessage.trim(),
      timestamp: new Date()
    };

    // Add user message immediately
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newUserMessage],
      isLoading: true,
      error: null
    }));

    try {
      const openAIService = new OpenAIService();
      
      // Convert messages to OpenAI format
      const conversationHistory = chatState.messages
        .filter(msg => msg.type !== 'ai' || msg.id !== '1') // Exclude initial greeting
        .map(msg => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.text
        }));

      // Add the new user message
      conversationHistory.push({
        role: 'user',
        content: userMessage.trim()
      });

      const aiResponse = await openAIService.sendMessage(conversationHistory);

      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, newAIMessage],
        isLoading: false
      }));

    } catch (error) {
      console.error('Chat error:', error);
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      }));
    }
  }, [chatState.messages]);

  const clearError = useCallback(() => {
    setChatState(prev => ({ ...prev, error: null }));
  }, []);

  const resetChat = useCallback(() => {
    setChatState({
      messages: [
        {
          id: '1',
          type: 'ai',
          text: 'Hi! I\'m your AI fitness coach. Tell me about your fitness goals and I\'ll help you create a personalized workout plan!',
          timestamp: new Date()
        }
      ],
      isLoading: false,
      error: null
    });
  }, []);

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    error: chatState.error,
    sendMessage,
    clearError,
    resetChat
  };
}