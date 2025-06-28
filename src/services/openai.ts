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

// Mock responses for development
const MOCK_RESPONSES = [
  "That's a great fitness goal! Based on what you've told me, I'd recommend starting with 3-4 workouts per week focusing on compound movements like squats, deadlifts, and push-ups. How many days per week can you realistically commit to working out?",
  
  "Perfect! For weight loss, combining strength training with cardio is most effective. I suggest alternating between strength days (Monday, Wednesday, Friday) and cardio days (Tuesday, Thursday). What's your current activity level - are you completely new to exercise or do you have some experience?",
  
  "Excellent! For muscle building, progressive overload is key. Start with bodyweight exercises and gradually add resistance. Focus on proper form first, then increase intensity. Do you have access to a gym or will you be working out at home?",
  
  "That sounds like a solid plan! For general fitness, variety is important to keep things interesting. Mix strength training, cardio, and flexibility work throughout the week. What type of exercises do you enjoy most - or would like to try?",
  
  "Great question! For beginners, I always recommend starting with 2-3 full-body workouts per week. This gives your muscles time to recover while building a consistent habit. Would you prefer shorter daily workouts or longer sessions 3 times per week?",
  
  "Absolutely! Home workouts can be just as effective as gym workouts. Bodyweight exercises like push-ups, squats, lunges, and planks are fantastic for building strength. Do you have any equipment at home, or should we focus on bodyweight-only exercises?",
  
  "That's a common concern, but you can definitely build muscle at home! Focus on progressive overload by increasing reps, adding pauses, or trying more challenging variations. For example, regular push-ups can progress to diamond push-ups or one-arm push-ups. What's your current strength level?",
  
  "Nutrition plays a huge role in reaching your goals! For weight loss, aim for a moderate calorie deficit while eating plenty of protein to preserve muscle. For muscle gain, ensure you're eating enough protein (0.8-1g per lb bodyweight) and staying in a slight calorie surplus. Are you tracking your nutrition currently?"
];

export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';
  private isDevelopment: boolean;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.isDevelopment = !this.apiKey || import.meta.env.DEV;
    
    if (!this.isDevelopment && !this.apiKey) {
      throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
    }
  }

  async sendMessage(messages: OpenAIMessage[]): Promise<string> {
    // Use mock responses in development or when API key is missing
    if (this.isDevelopment) {
      return this.getMockResponse();
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
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
        
        // Fall back to mock response if API fails
        if (response.status === 429 || response.status === 401) {
          console.warn('OpenAI API error, falling back to mock response:', errorData.error?.message);
          return this.getMockResponse();
        }
        
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
    } catch (error) {
      console.error('OpenAI API error, falling back to mock response:', error);
      return this.getMockResponse();
    }
  }

  private getMockResponse(): string {
    // Add a small delay to simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
        resolve(MOCK_RESPONSES[randomIndex]);
      }, 1000 + Math.random() * 1000); // 1-2 second delay
    }) as any;
  }
}