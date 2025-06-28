import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'This AI workout plan completely transformed my routine. I lost 15 pounds in 8 weeks and feel stronger than ever!',
      rating: 5,
      result: 'Lost 15 lbs in 8 weeks'
    },
    {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'Perfect for my busy schedule. The AI understood exactly what I needed and created a plan that actually fits my life.',
      rating: 5,
      result: 'Built muscle & saved time'
    },
    {
      name: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'I\'ve tried many fitness programs, but this AI-generated plan actually works! The personalization is incredible.',
      rating: 5,
      result: 'Achieved fitness goals'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
      
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full opacity-50 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full opacity-50 blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Quote className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            WHAT OUR USERS SAY
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Real results from real people who transformed their fitness
          </p>
          <p className="text-sm text-gray-500 font-medium">
            ⭐ Reviews from verified users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-200"
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified User</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {testimonial.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 font-medium">
            Join hundreds of satisfied users who achieved their fitness goals
          </p>
        </div>
      </div>
    </section>
  );
}