import React from 'react';
import { Users, CheckCircle, Trophy, Shield } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-bg opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
            TRUSTED BY FITNESS ENTHUSIASTS
            <br />
            <span className="gradient-text">WORLDWIDE</span>
          </h2>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Join a community of people who have successfully transformed their fitness with AI-powered workout plans
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 text-center mb-16">
          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
            <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-black mb-2">500+</div>
            <p className="text-blue-100">Success Stories</p>
          </div>
          
          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-black mb-2">95%</div>
            <p className="text-blue-100">Satisfaction Rate</p>
          </div>
          
          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
            <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-black mb-2">4.9★</div>
            <p className="text-blue-100">Average Rating</p>
          </div>
          
          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-black mb-2">100%</div>
            <p className="text-blue-100">Free to Use</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm max-w-4xl mx-auto border border-white/20">
          <img
            src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
            alt="Fitness transformation"
            className="w-full h-64 object-cover rounded-2xl mb-6"
          />
          <div className="text-center">
            <p className="text-xl text-blue-100 mb-4">
              "The results speak for themselves. Our AI creates personalized plans that actually work for real people."
            </p>
            <p className="text-sm text-gray-400">
              Based on user feedback and success metrics
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}