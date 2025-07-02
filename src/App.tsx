import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ChatSimulation from './components/ChatSimulation';
import HowItWorks from './components/HowItWorks';
import LeadForm from './components/LeadForm';
import LoadingScreen from './components/LoadingScreen';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LiveChatbot from './components/LiveChatbot';
import ProgressTracker from './components/ProgressTracker';
import NutritionCalculator from './components/NutritionCalculator';
import FAQ from './components/FAQ';
import StickyFooterCTA from './components/StickyFooterCTA';
import SectionDivider from './components/SectionDivider';
import Toast from './components/Toast';

interface FormData {
  fullName: string;
  email: string;
  fitnessGoal: string;
  daysPerWeek: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  // Set dark mode as default
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showStickyFooter, setShowStickyFooter] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'info' | 'error'>('success');

  // Apply dark mode to document and save preference
  useEffect(() => {
    // Check for saved preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark' || (!savedTheme && true); // Default to dark
    
    setIsDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save theme preference when changed
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showToastMessage = (message: string, type: 'success' | 'info' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleFormSubmit = (data: FormData, emailResult: { success: boolean; message: string }) => {
    console.log('Form submitted:', data);
    setIsLoading(true);
    
    // Show initial loading toast
    showToastMessage('🤖 AI is analyzing your goals and generating your personalized workout plan...', 'info');
    
    // Simulate AI processing time with more realistic feedback
    setTimeout(() => {
      setIsLoading(false);
      
      // Show result based on email sending success/failure
      if (emailResult.success) {
        showToastMessage(emailResult.message, 'success');
        // Hide sticky footer after successful submission
        setShowStickyFooter(false);
        
        // Show celebration message after a delay
        setTimeout(() => {
          showToastMessage('🎉 Welcome to your fitness transformation journey! Check your email for your personalized plan.', 'success');
        }, 3000);
      } else {
        showToastMessage(emailResult.message, 'error');
      }
    }, 3500); // Slightly longer for more realistic AI processing feel
  };

  const handleStickyFooterClose = () => {
    setShowStickyFooter(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {isLoading && <LoadingScreen />}
      
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Add padding top to account for fixed header */}
      <div className="pt-16 overflow-x-hidden">
        <Hero onStartClick={scrollToForm} isDarkMode={isDarkMode} />
        
        <SectionDivider variant="waves" isDarkMode={isDarkMode} />
        
        <div id="features">
          <ChatSimulation isDarkMode={isDarkMode} />
        </div>
        
        <SectionDivider variant="dots" isDarkMode={isDarkMode} />
        
        <HowItWorks isDarkMode={isDarkMode} />
        
        <SectionDivider variant="zigzag" isDarkMode={isDarkMode} />
        
        <div id="calculator">
          <NutritionCalculator isDarkMode={isDarkMode} />
        </div>
        
        <SectionDivider variant="waves" isDarkMode={isDarkMode} />
        
        <ProgressTracker isDarkMode={isDarkMode} />
        
        <SectionDivider variant="dots" isDarkMode={isDarkMode} />
        
        <LeadForm onSubmit={handleFormSubmit} isDarkMode={isDarkMode} />
        
        <SectionDivider variant="zigzag" isDarkMode={isDarkMode} />
        
        <div id="testimonials">
          <Testimonials isDarkMode={isDarkMode} />
        </div>
        
        <SectionDivider variant="waves" isDarkMode={isDarkMode} />
        
        <FAQ isDarkMode={isDarkMode} />
        
        <SectionDivider variant="dots" isDarkMode={isDarkMode} />
        
        <Footer isDarkMode={isDarkMode} />
      </div>
      
      {/* Live AI Chatbot */}
      <LiveChatbot isDarkMode={isDarkMode} />
      
      {/* Sticky Footer CTA */}
      <StickyFooterCTA 
        isVisible={showStickyFooter}
        onClose={handleStickyFooterClose}
        onGetStarted={scrollToForm}
        isDarkMode={isDarkMode}
      />
      
      {/* Toast Notifications */}
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type={toastType}
        message={toastMessage}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;