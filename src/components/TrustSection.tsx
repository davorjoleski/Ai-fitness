import React from 'react';
import { Users, CheckCircle, Trophy } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Over 1,000 People Got Their AI Fitness Plan
            <br />
            And Transformed Their Bodies
          </h2>
          <h2>ANdrej peder</h2>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied users who have achieved their fitness goals with our AI-powered workout plans
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">1,000+</div>
            <p className="text-blue-100">Plans Generated</p>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">98%</div>
            <p className="text-blue-100">Success Rate</p>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">4.9★</div>
            <p className="text-blue-100">Average Rating</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-4xl mx-auto">
            <img
              src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
              alt="Fitness transformation"
              className="w-full h-48 object-cover rounded-xl mb-6"
            />
            <p className="text-lg text-blue-100">
              "The results speak for themselves. Our AI creates personalized plans that actually work."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}