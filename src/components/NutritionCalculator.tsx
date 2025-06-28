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

export default function NutritionCalculator() {
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
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    return { category: 'Obese', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
  };

  const nutritionTips = [
    {
      icon: Apple,
      title: "Eat Whole Foods",
      description: "Focus on unprocessed foods like fruits, vegetables, lean proteins, and whole grains for optimal nutrition."
    },
    {
      icon: Droplets,
      title: "Stay Hydrated",
      description: "Drink at least 8-10 glasses of water daily. Proper hydration supports metabolism and recovery."
    },
    {
      icon: Clock,
      title: "Meal Timing",
      description: "Eat protein within 30 minutes post-workout and spread meals throughout the day for steady energy."
    },
    {
      icon: Scale,
      title: "Portion Control",
      description: "Use your hand as a guide: palm-sized protein, fist-sized vegetables, cupped-hand carbs."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            NUTRITION CALCULATOR
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your BMI, daily calorie needs, and macro targets with precision
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Calculator Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Your Information</h3>
            </div>

            <form onSubmit={calculateNutrition} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Level</label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, activityLevel: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Goal</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Calculate My Nutrition Plan
              </button>
            </form>
          </div>

          {/* Nutrition Tips Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-6 border border-green-100">
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Nutrition Tips</h3>
              </div>
              <div className="space-y-4">
                {nutritionTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{tip.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-100">
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Quick Facts</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein per kg body weight:</span>
                  <span className="font-semibold text-gray-900">0.8-1.2g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Water intake daily:</span>
                  <span className="font-semibold text-gray-900">35ml/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Healthy weight loss:</span>
                  <span className="font-semibold text-gray-900">0.5-1kg/week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Muscle gain rate:</span>
                  <span className="font-semibold text-gray-900">0.25-0.5kg/month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* BMI */}
            <div className={`${getBMICategory(results.bmi).bgColor} rounded-3xl p-6 shadow-lg border ${getBMICategory(results.bmi).borderColor}`}>
              <div className="flex items-center mb-4">
                <Scale className="w-8 h-8 text-gray-700 mr-3" />
                <h4 className="text-lg font-bold text-gray-900">BMI</h4>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-2">{results.bmi.toFixed(1)}</div>
                <span className={`font-bold text-sm px-3 py-1 rounded-full ${getBMICategory(results.bmi).color} bg-white`}>
                  {getBMICategory(results.bmi).category}
                </span>
              </div>
            </div>

            {/* BMR */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 shadow-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <Activity className="w-8 h-8 text-blue-600 mr-3" />
                <h4 className="text-lg font-bold text-gray-900">BMR</h4>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-2">{Math.round(results.bmr)}</div>
                <p className="text-sm text-gray-600">calories at rest</p>
              </div>
            </div>

            {/* Daily Calories */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 shadow-lg border border-green-200">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-green-600 mr-3" />
                <h4 className="text-lg font-bold text-gray-900">Daily Calories</h4>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-2">{Math.round(results.tdee)}</div>
                <p className="text-sm text-gray-600">total daily energy</p>
              </div>
            </div>

            {/* Macros Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 shadow-lg border border-purple-200">
              <div className="flex items-center mb-4">
                <Apple className="w-8 h-8 text-purple-600 mr-3" />
                <h4 className="text-lg font-bold text-gray-900">Daily Macros</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Protein</span>
                  <span className="font-bold text-blue-600">{results.macros.protein}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Carbs</span>
                  <span className="font-bold text-green-600">{results.macros.carbs}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Fats</span>
                  <span className="font-bold text-yellow-600">{results.macros.fats}g</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Results</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These calculations provide a scientific foundation for your nutrition plan. Remember that individual needs may vary based on genetics, medical conditions, and specific goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">BMI Explained</h4>
              <p className="text-sm text-gray-600">Body Mass Index is a measure of body fat based on height and weight. It's a useful screening tool but doesn't account for muscle mass.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">BMR vs TDEE</h4>
              <p className="text-sm text-gray-600">BMR is calories burned at rest. TDEE includes daily activities and exercise. Use TDEE for meal planning and calorie goals.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Macro Balance</h4>
              <p className="text-sm text-gray-600">The 30/40/30 split (protein/carbs/fats) is a balanced approach. Adjust based on your specific goals and preferences.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}