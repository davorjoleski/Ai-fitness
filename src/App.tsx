import React, { useState } from 'react';
import Hero from './components/Hero';
import ChatSimulation from './components/ChatSimulation';
import HowItWorks from './components/HowItWorks';
import LeadForm from './components/LeadForm';
import LoadingScreen from './components/LoadingScreen';
import Testimonials from './components/Testimonials';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import LiveChatbot from './components/LiveChatbot';
import ProgressTracker from './components/ProgressTracker';
import NutritionCalculator from './components/NutritionCalculator';

interface FormData {
  fullName: string;
  email: string;
  fitnessGoal: string;
  daysPerWeek: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setIsLoading(true);
    
    // Simulate loading for 5 seconds
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically redirect to a success page or show a success message
      alert('Your personalized AI workout plan has been sent to your email!');
    }, 5000);
  };

  return (
    <div className="min-h-screen">
      {isLoading && <LoadingScreen />}
      
      <Hero onStartClick={scrollToForm} />
      <ChatSimulation />
      <HowItWorks />
      <NutritionCalculator />
      <ProgressTracker />
      <LeadForm onSubmit={handleFormSubmit} />
      <Testimonials />
      <TrustSection />
      <Footer />
      
      {/* Live AI Chatbot */}
      <LiveChatbot />
    </div>
  );
}

export default App;