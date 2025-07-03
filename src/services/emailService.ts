import emailjs from '@emailjs/browser';

interface EmailData {
  fullName: string;
  email: string;
  fitnessGoal: string;
  daysPerWeek: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

interface EmailServiceConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  isConfigured: boolean;
}

export class EmailService {
  private config: EmailServiceConfig;
  private retryAttempts = 3;
  private retryDelay = 1000; // 1 second

  constructor() {
    this.config = {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
      isConfigured: false
    };
    
    this.config.isConfigured = !!(this.config.serviceId && this.config.templateId && this.config.publicKey);
    
    if (this.config.isConfigured) {
      this.initializeEmailJS();
    }
  }

  private initializeEmailJS(): void {
    try {
      emailjs.init(this.config.publicKey);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
      this.config.isConfigured = false;
    }
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private validateEmailData(data: EmailData): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.fullName?.trim()) {
      throw new Error('Full name is required');
    }
    
    if (!data.email?.trim() || !emailRegex.test(data.email)) {
      throw new Error('Valid email address is required');
    }
    
    if (!data.fitnessGoal?.trim()) {
      throw new Error('Fitness goal is required');
    }
    
    if (!data.daysPerWeek?.trim()) {
      throw new Error('Training days per week is required');
    }
    
    return true;
  }

  async sendWorkoutPlan(data: EmailData): Promise<EmailResponse> {
    try {
      // Validate input data
      this.validateEmailData(data);

      // If EmailJS is not configured, use development mode
      if (!this.config.isConfigured) {
        return this.handleDevelopmentMode(data);
      }

      // Attempt to send email with retry logic
      return await this.sendEmailWithRetry(data);
      
    } catch (error) {
      console.error('Email service error:', error);
      
      if (error instanceof Error) {
        return {
          success: false,
          message: `❌ ${error.message}`
        };
      }
      
      return {
        success: false,
        message: '❌ An unexpected error occurred. Please try again later.'
      };
    }
  }

  private async sendEmailWithRetry(data: EmailData): Promise<EmailResponse> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        console.log(`Email sending attempt ${attempt}/${this.retryAttempts}`);
        
        const result = await this.sendEmailViaEmailJS(data);
        
        if (result.success) {
          return result;
        }
        
        lastError = new Error(result.message);
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        console.error(`Attempt ${attempt} failed:`, lastError.message);
      }
      
      // Wait before retrying (except on last attempt)
      if (attempt < this.retryAttempts) {
        await this.delay(this.retryDelay * attempt);
      }
    }
    
    // All attempts failed
    return {
      success: false,
      message: `❌ Failed to send email after ${this.retryAttempts} attempts. ${lastError?.message || 'Please try again later.'}`
    };
  }

  private async sendEmailViaEmailJS(data: EmailData): Promise<EmailResponse> {
    const workoutPlan = this.generateWorkoutPlan(data);
    
    const templateParams = {
      to_name: data.fullName.trim(),
      to_email: data.email.trim().toLowerCase(),
      fitness_goal: this.formatGoal(data.fitnessGoal),
      days_per_week: data.daysPerWeek,
      workout_plan: workoutPlan,
      from_name: 'AI Fit Coach',
      reply_to: 'support@aifitcoach.com',
      timestamp: new Date().toISOString()
    };

    console.log('Sending email with parameters:', {
      ...templateParams,
      workout_plan: '[Generated Plan]' // Don't log full plan
    });

    const response = await emailjs.send(
      this.config.serviceId,
      this.config.templateId,
      templateParams,
      this.config.publicKey
    );

    console.log('EmailJS response:', response);

    if (response.status === 200) {
      return {
        success: true,
        message: `🎉 Success! Your personalized AI workout plan has been sent to ${data.email}. Check your inbox (and spam folder) within the next few minutes.`
      };
    } else {
      throw new Error(`EmailJS returned status ${response.status}`);
    }
  }

  private async handleDevelopmentMode(data: EmailData): Promise<EmailResponse> {
    console.log('=== DEVELOPMENT MODE - EMAIL SIMULATION ===');
    console.log('Form Data:', data);
    console.log('Generated Workout Plan:', this.generateWorkoutPlan(data));
    console.log('===========================================');
    
    // Simulate realistic network delay
    await this.delay(2000 + Math.random() * 1000);
    
    return {
      success: true,
      message: `✅ Development Mode: Your AI workout plan has been generated! (Configure EmailJS environment variables to send real emails to ${data.email})`
    };
  }

  private generateWorkoutPlan(data: EmailData): string {
    const { fitnessGoal, daysPerWeek } = data;
    const days = parseInt(daysPerWeek);
    
    let plan = `🎯 Your Personalized AI Workout Plan\n\n`;
    plan += `👤 Name: ${data.fullName}\n`;
    plan += `🎯 Goal: ${this.formatGoal(fitnessGoal)}\n`;
    plan += `📅 Training Days: ${days} days per week\n`;
    plan += `📧 Email: ${data.email}\n`;
    plan += `📅 Generated: ${new Date().toLocaleDateString()}\n\n`;
    plan += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    if (fitnessGoal === 'lose-weight') {
      plan += this.getWeightLossPlan(days);
    } else if (fitnessGoal === 'build-muscle') {
      plan += this.getMuscleBuildingPlan(days);
    } else if (fitnessGoal === 'improve-endurance') {
      plan += this.getEndurancePlan(days);
    } else {
      plan += this.getGeneralFitnessPlan(days);
    }
    
    plan += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    plan += `\n💡 Essential Tips for Success:\n\n`;
    plan += `🏋️ Form First: Start with lighter weights and focus on proper technique\n`;
    plan += `⏰ Recovery: Rest 48-72 hours between training the same muscle groups\n`;
    plan += `💧 Hydration: Drink plenty of water before, during, and after workouts\n`;
    plan += `😴 Sleep: Aim for 7-9 hours of quality sleep for optimal recovery\n`;
    plan += `📈 Progress: Gradually increase weight, reps, or duration each week\n`;
    plan += `🍎 Nutrition: Eat a balanced diet with adequate protein for your goals\n\n`;
    
    plan += `🎯 Weekly Goals:\n`;
    plan += `• Complete all scheduled workout days\n`;
    plan += `• Track your progress and how you feel\n`;
    plan += `• Stay consistent for at least 4 weeks to see results\n`;
    plan += `• Listen to your body and rest when needed\n\n`;
    
    plan += `📱 Need Support?\n`;
    plan += `Reply to this email for personalized advice and motivation!\n`;
    plan += `Our AI coach is here to help you succeed.\n\n`;
    
    plan += `🤖 Generated by AI Fit Coach - Your Personal Fitness Assistant\n`;
    plan += `Visit our website for more tools and live AI coaching!\n`;
    plan += `\n© 2025 AI Fit Coach. All rights reserved.`;
    
    return plan;
  }

  private formatGoal(goal: string): string {
    const goalMap: { [key: string]: string } = {
      'lose-weight': 'Weight Loss & Fat Burning',
      'build-muscle': 'Muscle Building & Strength',
      'get-healthier': 'General Health & Wellness',
      'improve-endurance': 'Endurance & Cardiovascular Fitness',
      'general-fitness': 'Overall Fitness & Conditioning'
    };
    return goalMap[goal] || goal;
  }

  private getWeightLossPlan(days: number): string {
    let plan = `🔥 WEIGHT LOSS FOCUSED PROGRAM\n\n`;
    plan += `This plan combines strength training with cardio for maximum fat burning while preserving muscle mass.\n\n`;
    
    if (days >= 5) {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Full Body Strength + Cardio (45-60 min)\n`;
      plan += `• Squats: 3 sets x 12-15 reps\n`;
      plan += `• Push-ups: 3 sets x 8-12 reps\n`;
      plan += `• Bent-over rows: 3 sets x 12-15 reps\n`;
      plan += `• Plank: 3 sets x 30-60 seconds\n`;
      plan += `• 20 minutes moderate cardio (walking, cycling)\n\n`;
      
      plan += `DAY 2 - HIIT Cardio (30-40 min)\n`;
      plan += `• 5 min warm-up\n`;
      plan += `• 20 min HIIT: 30 sec high intensity, 90 sec recovery\n`;
      plan += `• 5-10 min cool-down and stretching\n\n`;
      
      plan += `DAY 3 - Upper Body Strength + Light Cardio (45 min)\n`;
      plan += `• Push-ups variations: 3 sets x 8-12 reps\n`;
      plan += `• Pike push-ups: 3 sets x 6-10 reps\n`;
      plan += `• Tricep dips: 3 sets x 8-12 reps\n`;
      plan += `• Mountain climbers: 3 sets x 20 reps\n`;
      plan += `• 15 minutes light cardio\n\n`;
      
      plan += `DAY 4 - Lower Body Strength + Cardio (45 min)\n`;
      plan += `• Squats: 3 sets x 15-20 reps\n`;
      plan += `• Lunges: 3 sets x 10 reps each leg\n`;
      plan += `• Glute bridges: 3 sets x 15-20 reps\n`;
      plan += `• Calf raises: 3 sets x 20 reps\n`;
      plan += `• 15 minutes cardio\n\n`;
      
      plan += `DAY 5 - Active Recovery (30 min)\n`;
      plan += `• Light walking or yoga\n`;
      plan += `• Stretching and mobility work\n`;
      plan += `• Focus on relaxation and recovery\n\n`;
      
      if (days >= 6) {
        plan += `DAY 6 - Full Body Circuit Training (40 min)\n`;
        plan += `• Circuit: 4 rounds, 45 sec work, 15 sec rest\n`;
        plan += `• Burpees, squats, push-ups, jumping jacks\n`;
        plan += `• Mountain climbers, lunges, plank, high knees\n\n`;
      }
      if (days === 7) {
        plan += `DAY 7 - Light Cardio or Complete Rest (20-30 min)\n`;
        plan += `• Gentle walk or light stretching\n`;
        plan += `• Focus on meal prep and planning\n\n`;
      }
    } else if (days >= 3) {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Full Body Strength + Cardio (50-60 min)\n`;
      plan += `• Squats, push-ups, rows, planks\n`;
      plan += `• 20-25 minutes cardio\n\n`;
      
      plan += `DAY 2 - HIIT Cardio + Core (35-40 min)\n`;
      plan += `• 25 min HIIT training\n`;
      plan += `• 10 min core strengthening\n\n`;
      
      plan += `DAY 3 - Full Body Strength + Cardio (50-60 min)\n`;
      plan += `• Different exercises from Day 1\n`;
      plan += `• 20-25 minutes cardio\n\n`;
      
      if (days >= 4) {
        plan += `DAY 4 - Active Recovery + Light Cardio (30 min)\n`;
        plan += `• Walking, stretching, yoga\n\n`;
      }
    } else {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Full Body Workout (60 min)\n`;
      plan += `• 30 min strength training\n`;
      plan += `• 30 min cardio\n\n`;
      
      if (days === 2) {
        plan += `DAY 2 - HIIT + Core Focus (45 min)\n`;
        plan += `• 30 min HIIT cardio\n`;
        plan += `• 15 min core work\n\n`;
      }
    }
    
    return plan;
  }

  private getMuscleBuildingPlan(days: number): string {
    let plan = `💪 MUSCLE BUILDING PROGRAM\n\n`;
    plan += `This plan focuses on progressive overload and compound movements to maximize muscle growth.\n\n`;
    
    if (days >= 5) {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Chest & Triceps (45-60 min)\n`;
      plan += `• Push-ups: 4 sets x 8-12 reps\n`;
      plan += `• Incline push-ups: 3 sets x 10-15 reps\n`;
      plan += `• Tricep dips: 3 sets x 8-12 reps\n`;
      plan += `• Diamond push-ups: 3 sets x 6-10 reps\n`;
      plan += `• Chest fly (if weights available): 3 sets x 12-15 reps\n\n`;
      
      plan += `DAY 2 - Back & Biceps (45-60 min)\n`;
      plan += `• Pull-ups/Assisted pull-ups: 4 sets x 5-10 reps\n`;
      plan += `• Bent-over rows: 4 sets x 10-12 reps\n`;
      plan += `• Reverse fly: 3 sets x 12-15 reps\n`;
      plan += `• Bicep curls (if weights): 3 sets x 12-15 reps\n`;
      plan += `• Superman: 3 sets x 15 reps\n\n`;
      
      plan += `DAY 3 - Legs & Glutes (45-60 min)\n`;
      plan += `• Squats: 4 sets x 12-15 reps\n`;
      plan += `• Lunges: 3 sets x 10 reps each leg\n`;
      plan += `• Single-leg glute bridges: 3 sets x 12 each leg\n`;
      plan += `• Calf raises: 4 sets x 20 reps\n`;
      plan += `• Wall sit: 3 sets x 30-60 seconds\n\n`;
      
      plan += `DAY 4 - Shoulders & Core (45 min)\n`;
      plan += `• Pike push-ups: 4 sets x 8-12 reps\n`;
      plan += `• Lateral raises: 3 sets x 12-15 reps\n`;
      plan += `• Front raises: 3 sets x 12-15 reps\n`;
      plan += `• Plank: 3 sets x 45-90 seconds\n`;
      plan += `• Russian twists: 3 sets x 20 reps\n\n`;
      
      plan += `DAY 5 - Full Body Compound (50 min)\n`;
      plan += `• Burpees: 4 sets x 8-12 reps\n`;
      plan += `• Squat to press: 3 sets x 12 reps\n`;
      plan += `• Deadlifts (if weights): 4 sets x 8-10 reps\n`;
      plan += `• Mountain climbers: 3 sets x 20 reps\n\n`;
      
      if (days >= 6) {
        plan += `DAY 6 - Arms & Core Focus (40 min)\n`;
        plan += `• Tricep variations and bicep work\n`;
        plan += `• Core strengthening circuit\n\n`;
      }
      if (days === 7) {
        plan += `DAY 7 - Active Recovery (20-30 min)\n`;
        plan += `• Light stretching and mobility\n\n`;
      }
    } else if (days >= 3) {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Upper Body Push (50 min)\n`;
      plan += `• Chest, shoulders, and triceps focus\n\n`;
      
      plan += `DAY 2 - Lower Body (50 min)\n`;
      plan += `• Legs and glutes focus\n\n`;
      
      plan += `DAY 3 - Upper Body Pull (50 min)\n`;
      plan += `• Back and biceps focus\n\n`;
      
      if (days >= 4) {
        plan += `DAY 4 - Full Body Compound (50 min)\n`;
        plan += `• Multi-muscle exercises\n\n`;
      }
    } else {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Full Body Strength (60 min)\n`;
      plan += `• All major muscle groups\n\n`;
      
      if (days === 2) {
        plan += `DAY 2 - Full Body Strength (Different Exercises) (60 min)\n`;
        plan += `• Alternative exercises for variety\n\n`;
      }
    }
    
    return plan;
  }

  private getEndurancePlan(days: number): string {
    let plan = `🏃 ENDURANCE IMPROVEMENT PROGRAM\n\n`;
    plan += `This plan builds cardiovascular fitness and muscular endurance through varied training methods.\n\n`;
    
    if (days >= 5) {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Steady State Cardio (45-60 min)\n`;
      plan += `• Moderate intensity continuous exercise\n`;
      plan += `• Walking, jogging, cycling, or swimming\n`;
      plan += `• Maintain conversational pace\n\n`;
      
      plan += `DAY 2 - Interval Training (35-45 min)\n`;
      plan += `• 10 min warm-up\n`;
      plan += `• 8 x 2 min intervals at higher intensity\n`;
      plan += `• 1 min recovery between intervals\n`;
      plan += `• 10 min cool-down\n\n`;
      
      plan += `DAY 3 - Strength Endurance (45 min)\n`;
      plan += `• Circuit training with bodyweight exercises\n`;
      plan += `• Higher reps, shorter rest periods\n`;
      plan += `• Focus on muscular endurance\n\n`;
      
      plan += `DAY 4 - Long Slow Distance (60-90 min)\n`;
      plan += `• Extended duration at easy pace\n`;
      plan += `• Build aerobic base\n`;
      plan += `• Stay in comfortable zone\n\n`;
      
      plan += `DAY 5 - HIIT Training (30-40 min)\n`;
      plan += `• High-intensity interval training\n`;
      plan += `• Short bursts of maximum effort\n`;
      plan += `• Improve VO2 max and anaerobic capacity\n\n`;
      
      if (days >= 6) {
        plan += `DAY 6 - Active Recovery (30 min)\n`;
        plan += `• Light movement and stretching\n\n`;
      }
      if (days === 7) {
        plan += `DAY 7 - Easy Cardio or Rest (20-30 min)\n`;
        plan += `• Very light activity or complete rest\n\n`;
      }
    } else if (days >= 3) {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Steady Cardio + Strength (60 min)\n`;
      plan += `• 35 min cardio + 25 min strength\n\n`;
      
      plan += `DAY 2 - Interval Training (40 min)\n`;
      plan += `• Mixed intensity intervals\n\n`;
      
      plan += `DAY 3 - Endurance Circuit (50 min)\n`;
      plan += `• Combination cardio and strength\n\n`;
      
      if (days >= 4) {
        plan += `DAY 4 - Long Cardio Session (60-75 min)\n`;
        plan += `• Extended aerobic exercise\n\n`;
      }
    } else {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Cardio + Strength Combo (75 min)\n`;
      plan += `• Comprehensive endurance workout\n\n`;
      
      if (days === 2) {
        plan += `DAY 2 - Interval Training + Core (50 min)\n`;
        plan += `• High-intensity intervals + core work\n\n`;
      }
    }
    
    return plan;
  }

  private getGeneralFitnessPlan(days: number): string {
    let plan = `🎯 GENERAL FITNESS PROGRAM\n\n`;
    plan += `This balanced plan improves overall fitness with a mix of strength, cardio, and flexibility training.\n\n`;
    
    if (days >= 4) {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Full Body Strength (45-50 min)\n`;
      plan += `• Squats: 3 sets x 12-15 reps\n`;
      plan += `• Push-ups: 3 sets x 8-12 reps\n`;
      plan += `• Rows: 3 sets x 12-15 reps\n`;
      plan += `• Plank: 3 sets x 30-60 seconds\n`;
      plan += `• Glute bridges: 3 sets x 15 reps\n\n`;
      
      plan += `DAY 2 - Cardio + Core (40 min)\n`;
      plan += `• 25 min moderate cardio\n`;
      plan += `• 15 min core strengthening\n`;
      plan += `• Include planks, crunches, leg raises\n\n`;
      
      plan += `DAY 3 - Upper Body + Flexibility (45 min)\n`;
      plan += `• Upper body strength exercises\n`;
      plan += `• 15 min stretching and mobility\n`;
      plan += `• Focus on posture and flexibility\n\n`;
      
      plan += `DAY 4 - Lower Body + Cardio (45 min)\n`;
      plan += `• Leg and glute exercises\n`;
      plan += `• 15-20 min cardio intervals\n\n`;
      
      if (days >= 5) {
        plan += `DAY 5 - Active Recovery + Yoga (30-40 min)\n`;
        plan += `• Gentle movement and stretching\n`;
        plan += `• Yoga or Pilates-style exercises\n\n`;
      }
      if (days >= 6) {
        plan += `DAY 6 - Full Body Circuit (40 min)\n`;
        plan += `• Dynamic circuit training\n`;
        plan += `• Combine strength and cardio\n\n`;
      }
      if (days === 7) {
        plan += `DAY 7 - Light Activity or Rest (20-30 min)\n`;
        plan += `• Walking, gentle stretching, or rest\n\n`;
      }
    } else if (days >= 2) {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Full Body Strength + Cardio (60 min)\n`;
      plan += `• 35 min strength training\n`;
      plan += `• 25 min cardio\n\n`;
      
      plan += `DAY 2 - Cardio + Flexibility (45 min)\n`;
      plan += `• 30 min varied cardio\n`;
      plan += `• 15 min stretching\n\n`;
      
      if (days >= 3) {
        plan += `DAY 3 - Full Body Strength + Core (50 min)\n`;
        plan += `• Different exercises from Day 1\n`;
        plan += `• Extra focus on core strength\n\n`;
      }
    } else {
      plan += `📅 WEEKLY SCHEDULE:\n\n`;
      plan += `DAY 1 - Complete Fitness Workout (75-90 min)\n`;
      plan += `• 30 min strength training\n`;
      plan += `• 25 min cardio\n`;
      plan += `• 15-20 min flexibility and cool-down\n\n`;
    }
    
    return plan;
  }

  // Health check method for monitoring
  public async healthCheck(): Promise<boolean> {
    return this.config.isConfigured;
  }

  // Get configuration status
  public getStatus(): { configured: boolean; service: string } {
    return {
      configured: this.config.isConfigured,
      service: this.config.isConfigured ? 'EmailJS' : 'Development Mode'
    };
  }
}