export interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}