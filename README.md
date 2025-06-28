# AI Fitness Website with EmailJS Integration

A professional AI fitness website featuring real email delivery, live GPT-4 powered chatbot, and comprehensive fitness tools.

## 🚀 Features

- **Real Email Delivery**: EmailJS integration for sending personalized workout plans
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

# EmailJS Configuration (Required for real email sending)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 3. EmailJS Setup

1. **Create EmailJS Account**
   - Go to [EmailJS.com](https://www.emailjs.com/)
   - Create a free account

2. **Add Email Service**
   - Connect your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions for your provider

3. **Create Email Template**
   Create a template with these variables:
   ```
   {{to_name}} - Recipient's name
   {{to_email}} - Recipient's email
   {{fitness_goal}} - User's fitness goal
   {{days_per_week}} - Training days per week
   {{workout_plan}} - Generated workout plan
   {{from_name}} - Sender name (AI Fit Coach)
   ```

   Example template:
   ```
   Hi {{to_name}},

   Thank you for using AI Fit Coach! Here's your personalized workout plan:

   {{workout_plan}}

   Best regards,
   {{from_name}}
   ```

4. **Get Credentials**
   - Copy your Service ID, Template ID, and Public Key
   - Add them to your `.env` file

### 4. Start Development Server
```bash
npm run dev
```

## 📧 Email Template Variables

The system sends the following data to your EmailJS template:

- `to_name`: User's full name
- `to_email`: User's email address
- `fitness_goal`: Selected fitness goal
- `days_per_week`: Number of training days
- `workout_plan`: AI-generated personalized workout plan
- `from_name`: "AI Fit Coach"
- `reply_to`: "noreply@aifitcoach.com"

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

- **Mock Email Mode**: When EmailJS isn't configured, emails are simulated
- **Error Handling**: Graceful fallbacks for API failures
- **Loading States**: Professional loading animations and feedback
- **Toast Notifications**: Success/error messages for user feedback

## 🚀 Deployment

For production deployment:

1. **Environment Variables**: Set up all environment variables on your hosting platform
2. **EmailJS Limits**: Free tier has monthly email limits - monitor usage
3. **Domain Verification**: Add your domain to EmailJS for security
4. **Analytics**: Consider adding email delivery tracking

## 💡 Customization

### Email Templates
Modify `src/services/emailService.ts` to customize:
- Workout plan generation logic
- Email content and formatting
- Template parameters

### Styling
- All components support dark mode
- Tailwind CSS for easy customization
- Responsive design patterns

## 🔐 Security

- **Client-side Email**: EmailJS handles email sending securely
- **No Server Required**: Fully client-side implementation
- **Rate Limiting**: EmailJS provides built-in rate limiting
- **Domain Restrictions**: Configure allowed domains in EmailJS

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
- **EmailJS**: Real email delivery
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Complete theme system
- **Error Handling**: Graceful error management

## 📄 License

This project is for educational and commercial use. Please ensure you comply with:
- OpenAI's usage policies when using their API
- EmailJS terms of service for email delivery
- Respect user privacy and data protection laws

## 🆘 Troubleshooting

### Email Not Sending
1. Check EmailJS credentials in `.env`
2. Verify template variables match
3. Check EmailJS dashboard for errors
4. Ensure domain is whitelisted

### API Errors
1. Check browser console for detailed errors
2. Verify EmailJS service is active
3. Check monthly usage limits
4. Test with EmailJS dashboard

### Development Mode
- Without EmailJS config, emails are simulated
- Check console for mock email content
- All functionality works except actual email delivery