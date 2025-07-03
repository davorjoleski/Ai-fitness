import React from 'react';
import { Star, Quote, Heart, ThumbsUp, Smile } from 'lucide-react';

interface TestimonialsProps {
  isDarkMode?: boolean;
}

export default function Testimonials({ isDarkMode = false }: TestimonialsProps) {
  const testimonials = [
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
  ];

  return (
    <section className={`py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center animate-wiggle">
              <Quote className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            WHAT OUR USERS SAY
          </h2>
          <p className={`text-xl max-w-2xl mx-auto mb-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Real feedback from people using our AI fitness coach
          </p>
          <p className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            ⭐ Sample reviews for demonstration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border animate-fade-in-up hover-lift ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Animated icon */}
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center animate-heartbeat`}>
                  <testimonial.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${
                      i < testimonial.rating 
                        ? 'text-yellow-400 fill-current animate-spin-slow' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              
              <p className={`mb-6 italic leading-relaxed text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-200 animate-pulse-subtle"
                  />
                  <div>
                    <p className={`font-bold text-lg ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Sample User
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.color} text-white animate-glow`}>
                    {testimonial.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className={`font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join others who are improving their fitness with AI guidance
          </p>
        </div>
      </div>
    </section>
  );
}