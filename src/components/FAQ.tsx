import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What types of fitness goals does this support?",
      answer: "Our AI supports all major fitness goals including weight loss, muscle building, strength training, endurance improvement, general fitness, and rehabilitation. The AI customizes workouts based on your specific objectives, current fitness level, and available time."
    },
    {
      question: "How long does it take to get my plan?",
      answer: "Your personalized AI workout plan is generated instantly! After completing the 3-question form, you'll receive your custom plan via email within seconds. No waiting, no delays - just immediate access to your fitness roadmap."
    },
    {
      question: "Is this suitable for beginners?",
      answer: "Absolutely! Our AI is designed to work with all fitness levels, from complete beginners to advanced athletes. The system asks about your current fitness level and creates appropriate workouts with proper progression, ensuring you start safely and build up gradually."
    },
    {
      question: "Can I customize the workouts?",
      answer: "Yes! While the initial plan is automatically generated based on your preferences, you can always chat with our AI coach to request modifications, ask for alternative exercises, or adjust the intensity. The AI learns from your feedback to make better recommendations."
    },
    {
      question: "What's the pricing and refund policy?",
      answer: "Our AI workout plan generator is completely FREE to use! There are no hidden costs, no credit card required, and no subscription fees. We believe everyone deserves access to personalized fitness guidance, so we've made our core service available at no cost."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white relative">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-50 blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-50 blur-2xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our AI fitness coach
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? Our AI coach is here to help!
          </p>
          <p className="text-sm text-gray-500">
            Click the chat button in the bottom right to get instant answers
          </p>
        </div>
      </div>
    </section>
  );
}