# AI Fitness Website with GPT-4 Chatbot

A professional AI fitness website featuring a live GPT-4 powered chatbot for personalized fitness coaching.

## 🚀 Features

- **Live AI Chatbot**: Real-time conversations with GPT-4 for personalized fitness advice
- **Progress Tracking**: Log workouts and track fitness journey
- **Nutrition Calculator**: BMI, BMR, TDEE, and macro calculations
- **Professional Design**: Modern, responsive design with smooth animations
- **Lead Generation**: Complete form system for capturing user information
- **Mobile Optimized**: Fully responsive across all devices

## 🛠️ Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure OpenAI API**
   - Copy `.env.example` to `.env`
   - Get your API key from: https://platform.openai.com/api-keys
   - Add your OpenAI API key to `.env`:
     ```
     VITE_OPENAI_API_KEY=your_actual_api_key_here
     ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔐 Security

- **Never commit `.env` files** - they contain sensitive API keys
- **Use `.env.example`** as a template with placeholder values
- **API keys are client-side** - consider server-side implementation for production
- **Monitor API usage** to control costs

## 📱 Components

### Core Features
- **Hero Section**: Eye-catching landing with call-to-action
- **AI Chatbot**: Live GPT-4 powered fitness coaching
- **Progress Tracker**: Workout logging and statistics
- **Nutrition Calculator**: Health metrics and macro planning
- **Lead Form**: User information capture
- **Testimonials**: Social proof and reviews

### Technical Features
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: Modern state management
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Graceful error management

## 🤖 AI Chatbot Features

- **Real-time responses** using GPT-4
- **Fitness-focused conversations** with specialized prompts
- **Conversation history** maintained during session
- **Error handling** with user-friendly messages
- **Mobile-responsive** chat interface
- **Typing indicators** for better UX

## 📊 Analytics & Tracking

The website includes built-in progress tracking:
- Workout logging with exercise details
- Duration and notes tracking
- Statistics dashboard
- Historical workout data

## 🧮 Nutrition Tools

Advanced nutrition calculator featuring:
- BMI calculation and categorization
- BMR (Basal Metabolic Rate) calculation
- TDEE (Total Daily Energy Expenditure)
- Macro nutrient recommendations
- Goal-based calorie adjustments

## 🚀 Deployment

For production deployment:

1. **Environment Variables**: Set up environment variables on your hosting platform
2. **API Security**: Consider implementing server-side API calls
3. **Rate Limiting**: Implement rate limiting to control API costs
4. **Analytics**: Add Google Analytics or similar tracking
5. **SEO**: Optimize meta tags and structured data

## 💡 Future Enhancements

Potential additions:
- Email integration for workout plan delivery
- PDF workout plan generation
- Exercise library with demonstrations
- User authentication and profiles
- Social sharing features
- Appointment booking system

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This project is for educational and commercial use. Please ensure you comply with OpenAI's usage policies when using their API.