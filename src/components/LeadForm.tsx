import React, { useState } from 'react';
import { User, Mail, Target, Calendar, Sparkles } from 'lucide-react';

interface LeadFormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  fullName: string;
  email: string;
  fitnessGoal: string;
  daysPerWeek: string;
}

export default function LeadForm({ onSubmit }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    fitnessGoal: '',
    daysPerWeek: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
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
    <section id="form" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative">
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
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            GET YOUR AI WORKOUT PLAN
          </h2>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Fill out the form below and receive your personalized plan instantly - completely free!
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="fitnessGoal" className="block text-sm font-semibold text-gray-700 mb-2">
                <Target className="inline w-4 h-4 mr-2" />
                Fitness Goal
              </label>
              <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                  errors.fitnessGoal ? 'border-red-500' : 'border-gray-300'
                }`}
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
              <label htmlFor="daysPerWeek" className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Days Per Week
              </label>
              <select
                id="daysPerWeek"
                name="daysPerWeek"
                value={formData.daysPerWeek}
                onChange={handleChange}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                  errors.daysPerWeek ? 'border-red-500' : 'border-gray-300'
                }`}
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
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              🚀 GENERATE MY FREE PLAN NOW
            </button>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              ✅ 100% Free • ✅ No Credit Card Required • ✅ Instant Delivery
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}