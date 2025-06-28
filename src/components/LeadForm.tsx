import React, { useState } from 'react';
import { User, Mail, Target, Calendar, Sparkles } from 'lucide-react';
import { EmailService } from '../services/emailService';

interface LeadFormProps {
  onSubmit: (data: FormData, emailResult: { success: boolean; message: string }) => void;
  isDarkMode?: boolean;
}

interface FormData {
  fullName: string;
  email: string;
  fitnessGoal: string;
  daysPerWeek: string;
}

export default function LeadForm({ onSubmit, isDarkMode = false }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    fitnessGoal: '',
    daysPerWeek: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.fitnessGoal) {
      newErrors.fitnessGoal = 'Please select your fitness goal';
    }

    if (!formData.daysPerWeek) {
      newErrors.daysPerWeek = 'Please select training days';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const emailService = new EmailService();
      const emailResult = await emailService.sendWorkoutPlan(formData);
      
      // Call the parent's onSubmit with both form data and email result
      onSubmit(formData, emailResult);
      
      // Reset form on success
      if (emailResult.success) {
        setFormData({
          fullName: '',
          email: '',
          fitnessGoal: '',
          daysPerWeek: ''
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      onSubmit(formData, {
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="form" className={`py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"></div>
      
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            GET YOUR AI WORKOUT PLAN
          </h2>
          <p className={`text-xl max-w-lg mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Fill out the form below and receive your personalized plan via email - completely free!
          </p>
        </div>

        <div className={`rounded-3xl shadow-2xl p-8 border ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className={`block text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <User className="inline w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                  errors.fullName ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                  errors.email ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="fitnessGoal" className={`block text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Target className="inline w-4 h-4 mr-2" />
                Fitness Goal
              </label>
              <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                  errors.fitnessGoal ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">Select your fitness goal</option>
                <option value="lose-weight">Lose Weight</option>
                <option value="build-muscle">Build Muscle</option>
                <option value="get-healthier">Get Healthier</option>
                <option value="improve-endurance">Improve Endurance</option>
                <option value="general-fitness">General Fitness</option>
              </select>
              {errors.fitnessGoal && <p className="mt-1 text-sm text-red-600">{errors.fitnessGoal}</p>}
            </div>

            <div>
              <label htmlFor="daysPerWeek" className={`block text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Calendar className="inline w-4 h-4 mr-2" />
                Days Per Week
              </label>
              <select
                id="daysPerWeek"
                name="daysPerWeek"
                value={formData.daysPerWeek}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                  errors.daysPerWeek ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">How many days can you train?</option>
                {[1, 2, 3, 4, 5, 6, 7].map(day => (
                  <option key={day} value={day.toString()}>
                    {day} {day === 1 ? 'day' : 'days'} per week
                  </option>
                ))}
              </select>
              {errors.daysPerWeek && <p className="mt-1 text-sm text-red-600">{errors.daysPerWeek}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed transform-none' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Sending Your Plan...
                </div>
              ) : (
                '🚀 GENERATE MY FREE PLAN NOW'
              )}
            </button>
            
            <p className={`text-center text-sm mt-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              ✅ 100% Free • ✅ No Credit Card Required • ✅ Instant Email Delivery
            </p>
          </form>
        </div>

        {/* EmailJS Setup Instructions */}
        <div className={`mt-8 p-6 rounded-2xl border-2 border-dashed ${
          isDarkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
        }`}>
          <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            📧 Email Setup Instructions
          </h3>
          <div className={`text-sm space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>To enable real email sending, set up EmailJS:</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Create a free account at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">EmailJS.com</a></li>
              <li>Add an email service (Gmail, Outlook, etc.)</li>
              <li>Create an email template with these variables: to_name, to_email, fitness_goal, days_per_week, workout_plan</li>
              <li>Copy your Service ID, Template ID, and Public Key to your .env file</li>
            </ol>
            <p className="text-xs mt-3 opacity-75">
              Currently running in development mode - emails are simulated but not actually sent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}