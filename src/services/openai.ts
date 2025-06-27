interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const SYSTEM_PROMPT = `You are an expert AI fitness coach. Your role is to help users create personalized workout plans based on their goals, fitness level, and available time. 

Guidelines:
- Be encouraging and motivational
- Ask relevant follow-up questions to understand their needs
- Provide specific, actionable fitness advice
- Keep responses concise but helpful (2-3 sentences max)
- Focus on their fitness goals: weight loss, muscle building, general health
- Consider their available training days and current fitness level
- Suggest realistic and achievable workout routines

Always maintain a friendly, professional tone and show genuine interest in helping them achieve their fitness goals.`;

export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!this.apiKey) {
      throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
    }
  }

  async sendMessage(messages: OpenAIMessage[]): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }
}