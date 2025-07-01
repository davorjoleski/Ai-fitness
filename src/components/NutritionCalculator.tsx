import React, { useState } from 'react';
import { Calculator, Activity, Target, TrendingUp, Heart, Zap, Apple, Droplets, Scale, Clock } from 'lucide-react';

interface CalculatorResults {
  bmi: number;
  bmr: number;
  tdee: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

interface NutritionCalculatorProps {
  isDarkMode?: boolean;
}

export default function NutritionCalculator({ isDarkMode = false }: NutritionCalculatorProps) {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: ''
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);

  const calculateNutrition = (e: React.FormEvent) => {
    e.preventDefault();
    
    const age = parseInt(formData.age);
    const height = parseInt(formData.height);
    const weight = parseInt(formData.weight);
    
    // BMI Calculation
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // BMR Calculation (Mifflin-St Jeor Equation)
    let bmr;
    if (formData.gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // TDEE Calculation
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    const tdee = bmr * activityMultipliers[formData.activityLevel as keyof typeof activityMultipliers];
    
    // Macro Calculations (based on goal)
    let calories = tdee;
    if (formData.goal === 'lose') calories *= 0.8;
    if (formData.goal === 'gain') calories *= 1.1;
    
    const macros = {
      protein: Math.round((calories * 0.3) / 4), // 30% protein
      carbs: Math.round((calories * 0.4) / 4),   // 40% carbs
      fats: Math.round((calories * 0.3) / 9)     // 30% fats
    };
    
    setResults({ bmi, bmr, tdee: calories, macros });
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100', borderColor: 'border-blue-200' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600', bgColor: 'bg-gradient-to-br from-green-50 to-green-100', borderColor: 'border-green-200' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600', bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100', borderColor: 'border-yellow-200' };
    return { category: 'Obese', color: 'text-red-600', bgColor: 'bg-gradient-to-br from-red-50 to-red-100', borderColor: 'border-red-200' };
  };

  const nutritionTips = [
    {
      icon: Apple,
      title: "Eat Whole Foods",
      description: "Focus on unprocessed foods like fruits, vegetables, lean proteins, and whole grains for optimal nutrition.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Droplets,
      title: "Stay Hydrated",
      description: "Drink at least 8-10 glasses of water daily. Proper hydration supports metabolism and recovery.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Meal Timing",
      description: "Eat protein within 30 minutes post-workout and spread meals throughout the day for steady energy.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Scale,
      title: "Portion Control",
      description: "Use your hand as a guide: palm-sized protein, fist-sized vegetables, cupped-hand carbs.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className={`py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center animate-bounce-subtle hover:scale-110 transition-transform duration-300">
              <Calculator className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
          
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 tracking-tight animate-text-shimmer ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            NUTRITION CALCULATOR
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Calculate your BMI, daily calorie needs, and macro targets with precision
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Calculator Form */}
          <div className={`lg:col-span-2 rounded-3xl p-8 shadow-xl border animate-fade-in-up hover-lift transform hover:scale-105 transition-all duration-500 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center mb-6">
              <TrendingUp className="w-10 h-10 text-green-600 mr-3 animate-bounce" />
              <h3 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Your Information
              </h3>
            </div>

            <form onSubmit={calculateNutrition} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="animate-slide-in-left">
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all transform hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                <div className="animate-slide-in-right">
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all transform hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'border-gray-300'
                    }`}
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all transform hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all transform hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Activity Level
                </label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, activityLevel: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all transform hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very_active">Very Active (2x/day)</option>
                </select>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all transform hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select your goal</option>
                  <option value="lose">Lose Weight</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Gain Weight</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse-subtle"
              >
                Calculate My Nutrition Plan
              </button>
            </form>
          </div>

          {/* Nutrition Tips Sidebar */}
          <div className="space-y-6">
            <div className={`rounded-3xl p-6 border animate-fade-in-up hover-lift transform hover:scale-105 transition-all duration-500 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`} style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-red-500 mr-2 animate-bounce" />
                <h3 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Nutrition Tips
                </h3>
              </div>
              <div className="space-y-4">
                {nutritionTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={`w-10 h-10 bg-gradient-to-br ${tip.color} rounded-lg flex items-center justify-center flex-shrink-0 animate-bounce-subtle hover:scale-110 transition-transform duration-300`}>
                      <tip.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-semibold text-sm ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {tip.title}
                      </h4>
                      <p className={`text-xs leading-relaxed ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {tip.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className={`rounded-3xl p-6 border animate-fade-in-up hover-lift transform hover:scale-105 transition-all duration-500 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`} style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-yellow-500 mr-2 animate-spin" />
                <h3 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Quick Facts
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between animate-slide-in-left">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Protein per kg body weight:
                  </span>
                  <span className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    0.8-1.2g
                  </span>
                </div>
                <div className="flex justify-between animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Water intake daily:
                  </span>
                  <span className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    35ml/kg
                  </span>
                </div>
                <div className="flex justify-between animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Healthy weight loss:
                  </span>
                  <span className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    0.5-1kg/week
                  </span>
                </div>
                <div className="flex justify-between animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Muscle gain rate:
                  </span>
                  <span className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    0.25-0.5kg/month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="grid lg:grid-cols-4 gap-6 animate-fade-in-up">
            {/* BMI */}
            <div className={`${getBMICategory(results.bmi).bgColor} rounded-3xl p-6 shadow-lg border ${getBMICategory(results.bmi).borderColor} hover-lift transform hover:scale-105 transition-all duration-500 animate-bounce-subtle`}>
              <div className="flex items-center mb-4">
                <Scale className="w-10 h-10 text-gray-700 mr-3 animate-bounce" />
                <h4 className="text-lg font-bold text-gray-900">BMI</h4>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-2 animate-pulse">{results.bmi.toFixed(1)}</div>
                <span className={`font-bold text-sm px-3 py-1 rounded-full ${getBMICategory(results.bmi).color} bg-white animate-bounce-subtle`}>
                  {getBMICategory(results.bmi).category}
                </span>
              </div>
            </div>

            {/* BMR */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 shadow-lg border border-blue-200 hover-lift transform hover:scale-105 transition-all duration-500 animate-bounce-subtle" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <Activity className="w-10 h-10 text-blue-600 mr-3 animate-spin" />
                <h4 className="text-lg font-bold text-gray-900">BMR</h4>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-2 animate-pulse">{Math.round(results.bmr)}</div>
                <p className="text-sm text-gray-600">calories at rest</p>
              </div>
            </div>

            {/* Daily Calories */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 shadow-lg border border-purple-200 hover-lift transform hover:scale-105 transition-all duration-500 animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <Target className="w-10 h-10 text-purple-600 mr-3 animate-bounce" />
                <h4 className="text-lg font-bold text-gray-900">Daily Calories</h4>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-2 animate-pulse">{Math.round(results.tdee)}</div>
                <p className="text-sm text-gray-600">total daily energy</p>
              </div>
            </div>

            {/* Macros Summary */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 shadow-lg border border-green-200 hover-lift transform hover:scale-105 transition-all duration-500 animate-bounce-subtle" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-4">
                <Apple className="w-10 h-10 text-green-600 mr-3 animate-spin" />
                <h4 className="text-lg font-bold text-gray-900">Daily Macros</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center animate-slide-in-left">
                  <span className="text-sm text-gray-700">Protein</span>
                  <span className="font-bold text-green-600">{results.macros.protein}g</span>
                </div>
                <div className="flex justify-between items-center animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                  <span className="text-sm text-gray-700">Carbs</span>
                  <span className="font-bold text-green-600">{results.macros.carbs}g</span>
                </div>
                <div className="flex justify-between items-center animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                  <span className="text-sm text-gray-700">Fats</span>
                  <span className="font-bold text-green-600">{results.macros.fats}g</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}