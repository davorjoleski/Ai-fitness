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

export class EmailService {
  private baseUrl: string;
  private retryAttempts = 3;
  private retryDelay = 1000; // 1 second

  constructor() {
    // Use Supabase function URL - replace with your actual Supabase project URL
    this.baseUrl = import.meta.env.VITE_SUPABASE_URL 
      ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`
      : '/api/send-email'; // Fallback for development
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
        
        const result = await this.sendEmailViaBackend(data);
        
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

  private async sendEmailViaBackend(data: EmailData): Promise<EmailResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add authorization header if using Supabase
    if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
      headers['Authorization'] = `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;
    }

    console.log('Sending email request to backend:', {
      ...data,
      email: data.email.substring(0, 3) + '***' // Mask email for logging
    });

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        fitnessGoal: data.fitnessGoal,
        daysPerWeek: data.daysPerWeek
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Backend response:', result);

    return result;
  }

  // Health check method for monitoring
  public async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'OPTIONS'
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Get configuration status
  public getStatus(): { configured: boolean; service: string } {
    return {
      configured: !!this.baseUrl,
      service: 'Backend Email Service'
    };
  }
}