# AI Fitness Website with Real Email Integration

A professional AI fitness website featuring real email delivery, live GPT-4 powered chatbot, and comprehensive fitness tools.

## 🚀 Features

- **Real Email Delivery**: Resend API integration for sending personalized workout plans
- **Live AI Chatbot**: Real-time conversations with GPT-4 for personalized fitness advice
- **Progress Tracking**: Log workouts and track fitness journey
- **Nutrition Calculator**: BMI, BMR, TDEE, and macro calculations
- **Dark Mode**: Complete light/dark theme system
- **Mobile Optimized**: Fully responsive across all devices
- **Professional Design**: Modern, responsive design with smooth animations

## 🛠️ Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and configure:

```env
# OpenAI API Configuration (Optional)
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration (Required)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Edge Function Setup

#### 3.1 Deploy the Edge Function
The `send-email` edge function is already included in this project. It will be automatically deployed when you connect to Supabase.

#### 3.2 Configure Resend API Key (Required for Production)

**For Production Email Sending:**

1. **Create Resend Account**
   - Go to [Resend.com](https://resend.com/)
   - Create a free account (100 emails/day free tier)

2. **Get API Key**
   - In your Resend dashboard, go to API Keys
   - Create a new API key
   - Copy the API key (starts with `re_`)

3. **Add to Supabase Edge Function**
   - Go to your Supabase Dashboard
   - Navigate to Edge Functions
   - Find the `send-email` function
   - Add environment variable: `RESEND_API_KEY` with your Resend API key

4. **Verify Domain (Optional but Recommended)**
   - In Resend dashboard, add and verify your domain
   - Update the `from` field in the edge function to use your domain

### 4. Start Development Server
```bash
npm run dev
```

## 📧 Demo Mode vs Production Mode

### Demo Mode (Default)
- **When**: No `RESEND_API_KEY` configured in Supabase Edge Function
- **Behavior**: Generates workout plans and shows them in the UI
- **Message**: "Demo Mode: Your personalized AI workout plan has been generated!"
- **Perfect for**: Testing, development, and demonstrations

### Production Mode
- **When**: `RESEND_API_KEY` is properly configured
- **Behavior**: Actually sends emails via Resend API
- **Message**: "Success! Your personalized AI workout plan has been sent to [email]"
- **Perfect for**: Live websites with real users

## 🎯 Workout Plan Generation

The system generates personalized workout plans based on:

- **Fitness Goal**: Weight loss, muscle building, endurance, general fitness
- **Training Days**: 1-7 days per week
- **Structured Plans**: Different routines for different goals and schedules

### Plan Types:

1. **Weight Loss**: Combines strength training with cardio
2. **Muscle Building**: Focus on progressive overload and muscle groups
3. **Endurance**: Cardio-focused with strength support
4. **General Fitness**: Balanced approach with variety

## 🔧 Development Features

- **Automatic Demo Mode**: When Resend isn't configured, the app works in demo mode
- **Error Handling**: Graceful fallbacks for API failures
- **Loading States**: Professional loading animations and feedback
- **Toast Notifications**: Success/error messages for user feedback
- **Workout Plan Preview**: Users can see their plan even in demo mode

## 🚀 Deployment

For production deployment:

1. **Environment Variables**: Set up Supabase URL and keys
2. **Resend API Key**: Add `RESEND_API_KEY` to your Supabase Edge Function environment variables
3. **Domain Verification**: Add your domain to Resend for better deliverability
4. **Email Limits**: Free tier has monthly limits - monitor usage

## 💡 Customization

### Email Templates
Modify `supabase/functions/send-email/index.ts` to customize:
- Workout plan generation logic
- Email content and formatting
- HTML email styling

### Styling
- All components support dark mode
- Tailwind CSS for easy customization
- Responsive design patterns

## 🔐 Security

- **Server-side Email**: Supabase Edge Functions handle email sending securely
- **API Key Protection**: Resend API key is stored securely in Supabase
- **Rate Limiting**: Supabase provides built-in rate limiting
- **CORS Protection**: Proper CORS headers configured

## 📊 Features Overview

### Core Components
- **Header**: Sticky navigation with dark mode toggle
- **Hero**: Eye-catching landing with call-to-action
- **AI Chatbot**: Live GPT-4 powered fitness coaching
- **Progress Tracker**: Workout logging and statistics
- **Nutrition Calculator**: Health metrics and macro planning
- **Lead Form**: Email capture with real email delivery
- **Testimonials**: Social proof and reviews
- **FAQ**: Comprehensive question/answer section

### Technical Features
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: Modern state management
- **Supabase Edge Functions**: Serverless email delivery
- **Resend API**: Professional email service
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Complete theme system
- **Error Handling**: Graceful error management

## 🆘 Troubleshooting

### Email Not Sending (Production)
1. Check if `RESEND_API_KEY` is set in Supabase Edge Function environment variables
2. Verify your Resend API key is valid and active
3. Check Resend dashboard for delivery status and errors
4. Ensure you haven't exceeded your monthly email limit
5. Check Supabase Edge Function logs for detailed error messages

### Demo Mode Issues
1. Demo mode is normal when `RESEND_API_KEY` is not configured
2. Workout plans are still generated and displayed
3. Check browser console for any JavaScript errors
4. Ensure Supabase connection is working

### Development Mode
- The app works fully in demo mode without any email configuration
- All functionality works except actual email delivery
- Perfect for development and testing

## 📄 License

This project is for educational and commercial use. Please ensure you comply with:
- Resend's terms of service for email delivery
- Supabase's usage policies
- OpenAI's usage policies when using their API
- Respect user privacy and data protection laws

## 🔄 Migration from EmailJS

This project has been updated to use Supabase Edge Functions with Resend API instead of EmailJS for better reliability and security. The key improvements include:

- **Server-side Processing**: More secure than client-side email sending
- **Better Error Handling**: Detailed error messages and fallbacks
- **Demo Mode**: Works without configuration for development
- **Professional Email Service**: Resend provides better deliverability than EmailJS
- **No Client-side API Keys**: All sensitive keys are stored securely in Supabase

If you're migrating from the EmailJS version, simply follow the setup instructions above to configure Resend API.