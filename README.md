# AI Fitness Website with GPT-4 Chatbot

A professional AI fitness website featuring a live GPT-4 powered chatbot for personalized fitness coaching.

## Features

- **Live AI Chatbot**: Real-time conversations with GPT-4 for personalized fitness advice
- **Professional Design**: Modern, responsive design with smooth animations
- **Lead Generation**: Complete form system for capturing user information
- **Mobile Optimized**: Fully responsive across all devices

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure OpenAI API**
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key:
     ```
     VITE_OPENAI_API_KEY=your_openai_api_key_here
     ```
   - Get your API key from: https://platform.openai.com/api-keys

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key for GPT-4 integration

## Chatbot Features

- **Real-time AI responses** using GPT-4
- **Fitness-focused conversations** with specialized prompts
- **Conversation history** maintained during session
- **Error handling** with user-friendly messages
- **Mobile-responsive** chat interface
- **Typing indicators** for better UX

## Usage

1. Click the chat button in the bottom-right corner
2. Start a conversation about your fitness goals
3. Get personalized advice and workout recommendations
4. Use the form to capture leads for email marketing

## API Usage

The chatbot uses OpenAI's GPT-4 model with fitness-specific system prompts to provide relevant, helpful responses about:
- Workout planning
- Nutrition advice
- Fitness goal setting
- Exercise recommendations
- Motivation and coaching

## Security Notes

- API key is stored in environment variables
- All API calls are made from the client side
- Consider implementing rate limiting for production use
- Monitor API usage to control costs