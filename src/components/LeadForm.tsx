import React, { useState } from 'react';
import { User, Mail, Target, Calendar, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
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
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
        setErrors({});
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
    <section id="form" className={`py-12 sm:py-16 lg:py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center animate-bounce-subtle">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            GET YOUR AI WORKOUT PLAN
          </h2>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto px-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Fill out the form below and receive your personalized plan via email - completely free!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className={`lg:col-span-2 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border animate-fade-in-up hover-lift ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-white border-gray-100'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
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
                    className={`w-full px-4 py-4 sm:py-5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base sm:text-lg ${
                      errors.fullName ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
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
                    className={`w-full px-4 py-4 sm:py-5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base sm:text-lg ${
                      errors.email ? 'border-red-500' : isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
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
                  className={`w-full px-4 py-4 sm:py-5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base sm:text-lg ${
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
                {errors.fitnessGoal && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.fitnessGoal}
                  </p>
                )}
              </div>

              <div className="space-y-2">
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
                  className={`w-full px-4 py-4 sm:py-5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base sm:text-lg ${
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
                {errors.daysPerWeek && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.daysPerWeek}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-5 sm:py-6 px-8 rounded-xl text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed transform-none' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Generating Your Plan...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      GENERATE MY FREE PLAN NOW
                    </div>
                  )}
                </button>
              </div>
              
              <p className={`text-center text-sm mt-4 px-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                ✅ 100% Free • ✅ No Credit Card Required • ✅ Instant Email Delivery
              </p>
            </form>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Email Infrastructure Info */}
            <div className={`rounded-2xl sm:rounded-3xl p-6 border animate-fade-in-up hover-lift ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-100'
            }`} style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3 animate-bounce" />
                <h3 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Production Email System
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Enterprise-grade email delivery
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    99.9% delivery success rate
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Automatic retry on failure
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Spam folder protection
                  </span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className={`rounded-2xl sm:rounded-3xl p-6 border animate-fade-in-up hover-lift ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-100'
            }`} style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center mb-4">
                <Sparkles className="w-8 h-8 text-blue-500 mr-3 animate-spin" />
                <h3 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  What You'll Get
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Personalized workout plan based on your goals
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Weekly schedule tailored to your availability
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Exercise instructions and tips
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Progress tracking guidelines
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Nutrition and recovery tips
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className={`rounded-2xl sm:rounded-3xl p-6 border animate-fade-in-up hover-lift ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-100'
            }`} style={{ animationDelay: '0.6s' }}>
              <h3 className={`text-lg font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                🔒 Your Privacy Matters
              </h3>
              <div className="space-y-2 text-sm">
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  • We never share your email address
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  • No spam or promotional emails
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  • Unsubscribe anytime with one click
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  • GDPR compliant data handling
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}