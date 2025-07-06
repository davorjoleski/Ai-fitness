import React from 'react';
import { Star, Quote, Heart, ThumbsUp, Smile, Clock } from 'lucide-react';

interface TestimonialsProps {
  isDarkMode?: boolean;
}

export default function Testimonials({ isDarkMode = false }: TestimonialsProps) {
  return (
    <section className={`py-16 sm:py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center animate-wiggle">
              <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            REAL USER FEEDBACK
          </h2>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-3 sm:mb-4 px-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            See what our community is saying about their fitness transformation
          </p>
          
          {/* Coming Soon Notice */}
          <div className={`max-w-lg mx-auto rounded-2xl p-6 sm:p-8 border-2 border-dashed animate-fade-in-up ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-600 text-gray-300' 
              : 'bg-blue-50/50 border-blue-300 text-gray-700'
          }`} style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-center mb-4">
              <Clock className={`w-8 h-8 mr-3 animate-spin-slow ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <h3 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Real User Testimonials Coming Soon!
              </h3>
            </div>
            <p className="text-base leading-relaxed mb-4">
              We're collecting authentic feedback from our growing community of fitness enthusiasts who are transforming their lives with AI-powered workout plans.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <Heart className="w-4 h-4 text-red-500 mr-2 animate-heartbeat" />
                <span>150+ Active Users</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="w-4 h-4 text-green-500 mr-2 animate-bounce" />
                <span>Growing Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 opacity-60">
          {[
            {
              name: 'Sarah M.',
              avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
              quote: 'The AI workout plan was exactly what I needed. Simple, effective, and fits my busy schedule perfectly!',
              rating: 5,
              result: 'Improved fitness',
              icon: Heart,
              color: 'from-pink-500 to-rose-500'
            },
            {
              name: 'Mike C.',
              avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
              quote: 'Great for beginners like me. The AI understood my fitness level and created a plan I could actually follow.',
              rating: 4,
              result: 'Built confidence',
              icon: ThumbsUp,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              name: 'Emily R.',
              avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
              quote: 'Love how personalized the plan is. It actually considers my preferences and available equipment.',
              rating: 5,
              result: 'Stayed consistent',
              icon: Smile,
              color: 'from-green-500 to-emerald-500'
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border animate-fade-in-up hover-lift ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Preview Badge */}
              <div className="text-center mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-400' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  Preview
                </span>
              </div>

              {/* Animated icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center animate-heartbeat`}>
                  <testimonial.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>

              <div className="flex items-center mb-4 sm:mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < testimonial.rating 
                        ? 'text-yellow-400 fill-current animate-spin-slow' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              
              <p className={`mb-4 sm:mb-6 italic leading-relaxed text-base sm:text-lg text-center ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-3 sm:mr-4 border-2 border-gray-200 animate-pulse-subtle"
                  />
                  <div>
                    <p className={`font-bold text-base sm:text-lg ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </p>
                    <p className={`text-xs sm:text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Sample User
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.color} text-white animate-glow`}>
                    {testimonial.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className={`font-medium text-base sm:text-lg px-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Be among the first to share your transformation story!
          </p>
        </div>
      </div>
    </section>
  );
}