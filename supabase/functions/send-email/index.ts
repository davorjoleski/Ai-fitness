const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EmailRequest {
  fullName: string;
  email: string;
  fitnessGoal: string;
  daysPerWeek: string;
}

Deno.serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    const { fullName, email, fitnessGoal, daysPerWeek }: EmailRequest = await req.json()

    // Validate input
    if (!fullName || !email || !fitnessGoal || !daysPerWeek) {
      return new Response(
        JSON.stringify({ success: false, message: 'All fields are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email address' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate workout plan with enhanced features
    const workoutPlan = generateWorkoutPlan({ fullName, email, fitnessGoal, daysPerWeek })
    const nutritionSuggestions = generateNutritionSuggestions(fitnessGoal)
    const videoLinks = getWorkoutVideos(fitnessGoal)

    console.log('Processing email request for:', email)
    console.log('Workout plan length:', workoutPlan.length)

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.log('RESEND_API_KEY not found - running in demo mode')
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `🎉 Demo Mode: Your personalized AI workout plan has been generated! In production, this would be sent to ${email}.`,
          workoutPlan: workoutPlan,
          isDemoMode: true
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Using Resend API key for email delivery');
    
    // Send email using Resend API
    const emailSent = await sendEmailWithResend({
      apiKey: resendApiKey,
      to: email,
      subject: `🎯 Your Personalized AI Workout Plan - ${formatGoal(fitnessGoal)}`,
      html: generateEnhancedEmailHTML(workoutPlan, fullName, email, fitnessGoal, nutritionSuggestions, videoLinks),
      text: workoutPlan
    })

    if (emailSent.success) {
      console.log('Email sent successfully to:', email)
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `🎉 Success! Your personalized AI workout plan has been sent to ${email}. Check your inbox (and spam folder) within the next few minutes.`,
          workoutPlan: workoutPlan
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else {
      console.error('Failed to send email:', emailSent.error)
      
      // Fallback to demo mode if email fails
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `🎉 Your personalized AI workout plan has been generated! ${emailSent.error ? `(Email delivery issue: ${emailSent.error})` : ''}`,
          workoutPlan: workoutPlan,
          isDemoMode: true
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

  } catch (error) {
    console.error('Error processing email request:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: '❌ Server error occurred. Please try again later.' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// **REAL EMAIL SENDING WITH RESEND API**
async function sendEmailWithResend({ 
  apiKey, 
  to, 
  subject, 
  html, 
  text 
}: { 
  apiKey: string;
  to: string; 
  subject: string; 
  html: string; 
  text: string; 
}): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Sending email via Resend API to:', to)
    
    const response = await fetch("https://api.resend.com/emails", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AI Fit Coach <noreply@resend.dev>', // Using resend.dev domain which is verified by default
        to: [to],
        subject: subject,
        html: html,
        text: text,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Resend API error:', response.status, errorData)
      return { 
        success: false, 
        error: `Email service error (${response.status}): ${errorData}` 
      }
    }

    const result = await response.json()
    console.log('Resend API success:', result)
    
    return { success: true }
    
  } catch (error) {
    console.error('Resend API exception:', error)
    return { 
      success: false, 
      error: `Network error: ${error.message}` 
    }
  }
}

function formatGoal(goal: string): string {
  const goalMap: { [key: string]: string } = {
    'lose-weight': 'Weight Loss & Fat Burning',
    'build-muscle': 'Muscle Building & Strength',
    'get-healthier': 'General Health & Wellness',
    'improve-endurance': 'Endurance & Cardiovascular Fitness',
    'general-fitness': 'Overall Fitness & Conditioning'
  }
  return goalMap[goal] || goal
}

function generateNutritionSuggestions(fitnessGoal: string): string {
  const nutritionMap: { [key: string]: string } = {
    'lose-weight': `
      🥗 **Nutrition for Weight Loss:**
      • Aim for a 300-500 calorie deficit daily
      • Protein: 1.2-1.6g per kg body weight
      • Fill half your plate with vegetables
      • Drink water before meals to feel fuller
      • Sample meal: Grilled chicken salad with olive oil dressing
    `,
    'build-muscle': `
      💪 **Nutrition for Muscle Building:**
      • Eat in a slight calorie surplus (200-500 calories)
      • Protein: 1.6-2.2g per kg body weight
      • Post-workout: Protein + carbs within 30 minutes
      • Include healthy fats for hormone production
      • Sample meal: Salmon with quinoa and roasted vegetables
    `,
    'improve-endurance': `
      🏃 **Nutrition for Endurance:**
      • Focus on complex carbohydrates for energy
      • Protein: 1.2-1.4g per kg body weight
      • Stay hydrated before, during, and after workouts
      • Include antioxidant-rich foods for recovery
      • Sample meal: Oatmeal with berries and Greek yogurt
    `,
    'get-healthier': `
      🌱 **Nutrition for General Health:**
      • Follow the 80/20 rule (80% whole foods, 20% treats)
      • Include all food groups in balanced portions
      • Aim for 5-7 servings of fruits and vegetables daily
      • Choose whole grains over refined options
      • Sample meal: Mediterranean bowl with hummus and vegetables
    `,
    'general-fitness': `
      ⚖️ **Balanced Nutrition Plan:**
      • Eat regular meals to maintain energy levels
      • Include lean proteins, complex carbs, and healthy fats
      • Stay hydrated throughout the day
      • Listen to your hunger and fullness cues
      • Sample meal: Turkey and avocado wrap with side salad
    `
  }
  
  return nutritionMap[fitnessGoal] || nutritionMap['general-fitness']
}

function getWorkoutVideos(fitnessGoal: string): { [key: string]: string } {
  return {
    'beginner-full-body': 'https://www.youtube.com/watch?v=ixkQaZXVQjs',
    'weight-loss-hiit': 'https://www.youtube.com/watch?v=ml6cT4AZdqI',
    'muscle-building': 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    'endurance-cardio': 'https://www.youtube.com/watch?v=gC_L9qAHVJ8',
    'stretching-recovery': 'https://www.youtube.com/watch?v=g_tea8ZNk5A'
  }
}

function generateEnhancedEmailHTML(
  workoutPlan: string, 
  fullName: string, 
  email: string, 
  fitnessGoal: string,
  nutritionSuggestions: string,
  videoLinks: { [key: string]: string }
): string {
  const appUrl = 'https://your-app-domain.com' // Replace with your actual domain
  const planId = btoa(email + Date.now()) // Simple plan ID generation
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your AI Workout Plan</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
          background-color: #f8fafc;
        }
        .container {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #2563eb, #8b5cf6, #ec4899); 
          color: white; 
          padding: 40px 30px; 
          text-align: center; 
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
          font-weight: bold;
        }
        .header p {
          margin: 10px 0 0 0;
          font-size: 18px;
          opacity: 0.9;
        }
        .cta-section {
          background: linear-gradient(135deg, #1e40af, #7c3aed);
          padding: 30px;
          text-align: center;
          color: white;
        }
        .cta-button {
          display: inline-block;
          background: #ffffff;
          color: #1e40af;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 12px;
          font-weight: bold;
          font-size: 18px;
          margin: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        .secondary-button {
          display: inline-block;
          background: transparent;
          color: white;
          border: 2px solid white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 5px;
        }
        .content { 
          padding: 40px 30px; 
          white-space: pre-line; 
          font-size: 15px;
          line-height: 1.7;
        }
        .nutrition-section {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          padding: 25px;
          border-radius: 12px;
          margin: 25px 0;
          border-left: 5px solid #0ea5e9;
        }
        .video-section {
          background: linear-gradient(135deg, #fef3c7, #fed7aa);
          padding: 25px;
          border-radius: 12px;
          margin: 25px 0;
          border-left: 5px solid #f59e0b;
        }
        .video-link {
          display: inline-block;
          background: #dc2626;
          color: white;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 8px;
          margin: 8px 8px 8px 0;
          font-weight: 600;
        }
        .challenge-section {
          background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
          padding: 25px;
          border-radius: 12px;
          margin: 25px 0;
          border-left: 5px solid #8b5cf6;
          text-align: center;
        }
        .footer { 
          background: #1f2937;
          text-align: center; 
          padding: 40px 30px; 
          color: #9ca3af; 
          font-size: 14px; 
        }
        .footer a {
          color: #60a5fa;
          text-decoration: none;
        }
        .footer-button {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 8px;
          margin: 10px;
          font-weight: 600;
        }
        .highlight {
          background: #eff6ff;
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #2563eb;
          margin: 20px 0;
        }
        .progress-reminder {
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
          border-left: 5px solid #10b981;
        }
        @media (max-width: 600px) {
          body { padding: 10px; }
          .header, .content, .footer, .cta-section { padding: 20px; }
          .header h1 { font-size: 24px; }
          .cta-button { 
            display: block; 
            margin: 10px 0; 
            padding: 14px 20px;
            font-size: 16px;
          }
          .secondary-button {
            display: block;
            margin: 8px 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤖 AI Fit Coach</h1>
          <p>Your Personalized Workout Plan is Ready!</p>
        </div>
        
        <div class="cta-section">
          <h2 style="margin: 0 0 20px 0; font-size: 24px;">🎯 Ready to Transform Your Fitness?</h2>
          <a href="${appUrl}/dashboard?plan=${planId}" class="cta-button">🚀 Start Your Plan Now</a>
          <a href="mailto:support@aifitcoach.com?subject=Need Help with My Workout Plan&body=Hi! I just received my workout plan and need some guidance." class="secondary-button">💬 Get Support</a>
          <br>
          <a href="${appUrl}/plan/${planId}" class="secondary-button">📱 View Plan Online</a>
          <a href="${generateCalendarLink(fullName, fitnessGoal)}" class="secondary-button">📅 Add to Calendar</a>
        </div>
        
        <div class="content">
          <div class="highlight">
            <p><strong>Hi ${fullName},</strong></p>
            <p>🎉 Your personalized AI workout plan is ready! This plan has been specifically designed for your ${formatGoal(fitnessGoal).toLowerCase()} goals.</p>
          </div>
          
          ${workoutPlan}
          
          <div class="nutrition-section">
            <h3 style="margin: 0 0 15px 0; color: #0369a1;">🍎 Personalized Nutrition Guide</h3>
            ${nutritionSuggestions}
          </div>
          
          <div class="video-section">
            <h3 style="margin: 0 0 15px 0; color: #d97706;">🎥 Workout Video Library</h3>
            <p>Follow along with these expert-led workout videos:</p>
            <a href="${videoLinks['beginner-full-body']}" class="video-link">🏋️ Full Body Workout</a>
            <a href="${videoLinks['weight-loss-hiit']}" class="video-link">🔥 HIIT Training</a>
            <a href="${videoLinks['muscle-building']}" class="video-link">💪 Strength Building</a>
            <a href="${videoLinks['stretching-recovery']}" class="video-link">🧘 Recovery & Stretching</a>
          </div>
          
          <div class="challenge-section">
            <h3 style="margin: 0 0 15px 0; color: #7c3aed;">🏆 Join the 30-Day Transformation Challenge!</h3>
            <p>Ready to take your fitness to the next level? Join our community challenge and get:</p>
            <ul style="text-align: left; display: inline-block;">
              <li>Daily motivation and tips</li>
              <li>Progress tracking tools</li>
              <li>Community support</li>
              <li>Weekly check-ins</li>
            </ul>
            <br>
            <a href="${appUrl}/challenge?email=${email}" class="cta-button" style="background: #8b5cf6; color: white;">🚀 Join Challenge</a>
          </div>
          
          <div class="progress-reminder">
            <h3 style="margin: 0 0 15px 0; color: #059669;">📊 Track Your Progress</h3>
            <p><strong>Remember to log your workouts!</strong> Consistency is key to achieving your fitness goals.</p>
            <p>💡 <strong>Pro Tip:</strong> Take progress photos and measurements weekly to see your transformation!</p>
            <a href="${appUrl}/progress?email=${email}" style="color: #059669; font-weight: bold; text-decoration: none;">→ Start Tracking Now</a>
          </div>
        </div>
        
        <div class="footer">
          <h3 style="color: white; margin: 0 0 20px 0;">📱 Quick Actions</h3>
          <a href="${appUrl}/plan/${planId}/pdf" class="footer-button">📄 Download PDF</a>
          <a href="${appUrl}/dashboard?plan=${planId}" class="footer-button">🏠 View Dashboard</a>
          <a href="mailto:support@aifitcoach.com" class="footer-button">💬 Contact Support</a>
          
          <div style="margin: 30px 0 20px 0; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 8px;">
            <p><strong>📧 Weekly Check-ins Coming Soon!</strong></p>
            <p>We'll send you motivational check-ins and tips every week to keep you on track.</p>
            <p style="font-size: 12px; opacity: 0.8;">You can unsubscribe from these at any time.</p>
          </div>
          
          <p><strong>Questions? Need Support?</strong></p>
          <p>Reply to this email: <a href="mailto:support@aifitcoach.com?subject=Question about my workout plan&body=Hi! I have a question about my workout plan...">support@aifitcoach.com</a></p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #374151;">
            <p style="font-size: 12px;">© 2025 AI Fit Coach. All rights reserved.</p>
            <p style="font-size: 12px;">
              <a href="${appUrl}/unsubscribe?email=${email}">Unsubscribe</a> | 
              <a href="${appUrl}/privacy">Privacy Policy</a> | 
              <a href="${appUrl}/terms">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateCalendarLink(fullName: string, fitnessGoal: string): string {
  const title = encodeURIComponent(`${fullName}'s Workout Plan - ${formatGoal(fitnessGoal)}`)
  const details = encodeURIComponent('Time to work out! Follow your personalized AI fitness plan.')
  const startDate = new Date()
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour later
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}&recur=RRULE:FREQ=DAILY;COUNT=30`
}

function generateWorkoutPlan(data: EmailRequest): string {
  const { fullName, email, fitnessGoal, daysPerWeek } = data
  const days = parseInt(daysPerWeek)
  
  let plan = `🎯 Your Personalized AI Workout Plan\n\n`
  plan += `👤 Name: ${fullName}\n`
  plan += `🎯 Goal: ${formatGoal(fitnessGoal)}\n`
  plan += `📅 Training Days: ${days} days per week\n`
  plan += `📧 Email: ${email}\n`
  plan += `📅 Generated: ${new Date().toLocaleDateString()}\n\n`
  plan += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`
  
  if (fitnessGoal === 'lose-weight') {
    plan += getWeightLossPlan(days)
  } else if (fitnessGoal === 'build-muscle') {
    plan += getMuscleBuildingPlan(days)
  } else if (fitnessGoal === 'improve-endurance') {
    plan += getEndurancePlan(days)
  } else {
    plan += getGeneralFitnessPlan(days)
  }
  
  plan += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
  plan += `\n💡 Essential Tips for Success:\n\n`
  plan += `🏋️ Form First: Start with lighter weights and focus on proper technique\n`
  plan += `⏰ Recovery: Rest 48-72 hours between training the same muscle groups\n`
  plan += `💧 Hydration: Drink plenty of water before, during, and after workouts\n`
  plan += `😴 Sleep: Aim for 7-9 hours of quality sleep for optimal recovery\n`
  plan += `📈 Progress: Gradually increase weight, reps, or duration each week\n`
  plan += `🍎 Nutrition: Eat a balanced diet with adequate protein for your goals\n\n`
  
  plan += `🎯 Weekly Goals:\n`
  plan += `• Complete all scheduled workout days\n`
  plan += `• Track your progress and how you feel\n`
  plan += `• Stay consistent for at least 4 weeks to see results\n`
  plan += `• Listen to your body and rest when needed\n\n`
  
  plan += `📱 Need Support?\n`
  plan += `Reply to this email for personalized advice and motivation!\n`
  plan += `Our AI coach is here to help you succeed.\n\n`
  
  plan += `🤖 Generated by AI Fit Coach - Your Personal Fitness Assistant\n`
  plan += `Visit our website for more tools and live AI coaching!\n`
  
  return plan
}

function getWeightLossPlan(days: number): string {
  let plan = `🔥 WEIGHT LOSS FOCUSED PROGRAM\n\n`
  plan += `This plan combines strength training with cardio for maximum fat burning while preserving muscle mass.\n\n`
  
  if (days >= 5) {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Full Body Strength + Cardio (45-60 min)\n`
    plan += `• Squats: 3 sets x 12-15 reps\n`
    plan += `• Push-ups: 3 sets x 8-12 reps\n`
    plan += `• Bent-over rows: 3 sets x 12-15 reps\n`
    plan += `• Plank: 3 sets x 30-60 seconds\n`
    plan += `• 20 minutes moderate cardio (walking, cycling)\n\n`
    
    plan += `DAY 2 - HIIT Cardio (30-40 min)\n`
    plan += `• 5 min warm-up\n`
    plan += `• 20 min HIIT: 30 sec high intensity, 90 sec recovery\n`
    plan += `• 5-10 min cool-down and stretching\n\n`
    
    plan += `DAY 3 - Upper Body Strength + Light Cardio (45 min)\n`
    plan += `• Push-ups variations: 3 sets x 8-12 reps\n`
    plan += `• Pike push-ups: 3 sets x 6-10 reps\n`
    plan += `• Tricep dips: 3 sets x 8-12 reps\n`
    plan += `• Mountain climbers: 3 sets x 20 reps\n`
    plan += `• 15 minutes light cardio\n\n`
    
    plan += `DAY 4 - Lower Body Strength + Cardio (45 min)\n`
    plan += `• Squats: 3 sets x 15-20 reps\n`
    plan += `• Lunges: 3 sets x 10 reps each leg\n`
    plan += `• Glute bridges: 3 sets x 15-20 reps\n`
    plan += `• Calf raises: 3 sets x 20 reps\n`
    plan += `• 15 minutes cardio\n\n`
    
    plan += `DAY 5 - Active Recovery (30 min)\n`
    plan += `• Light walking or yoga\n`
    plan += `• Stretching and mobility work\n`
    plan += `• Focus on relaxation and recovery\n\n`
  } else if (days >= 3) {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Full Body Strength + Cardio (50-60 min)\n`
    plan += `• Squats, push-ups, rows, planks\n`
    plan += `• 20-25 minutes cardio\n\n`
    
    plan += `DAY 2 - HIIT Cardio + Core (35-40 min)\n`
    plan += `• 25 min HIIT training\n`
    plan += `• 10 min core strengthening\n\n`
    
    plan += `DAY 3 - Full Body Strength + Cardio (50-60 min)\n`
    plan += `• Different exercises from Day 1\n`
    plan += `• 20-25 minutes cardio\n\n`
  } else {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Full Body Workout (60 min)\n`
    plan += `• 30 min strength training\n`
    plan += `• 30 min cardio\n\n`
  }
  
  return plan
}

function getMuscleBuildingPlan(days: number): string {
  let plan = `💪 MUSCLE BUILDING PROGRAM\n\n`
  plan += `This plan focuses on progressive overload and compound movements to maximize muscle growth.\n\n`
  
  if (days >= 5) {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Chest & Triceps (45-60 min)\n`
    plan += `• Push-ups: 4 sets x 8-12 reps\n`
    plan += `• Incline push-ups: 3 sets x 10-15 reps\n`
    plan += `• Tricep dips: 3 sets x 8-12 reps\n`
    plan += `• Diamond push-ups: 3 sets x 6-10 reps\n\n`
    
    plan += `DAY 2 - Back & Biceps (45-60 min)\n`
    plan += `• Pull-ups/Assisted pull-ups: 4 sets x 5-10 reps\n`
    plan += `• Bent-over rows: 4 sets x 10-12 reps\n`
    plan += `• Reverse fly: 3 sets x 12-15 reps\n`
    plan += `• Superman: 3 sets x 15 reps\n\n`
    
    plan += `DAY 3 - Legs & Glutes (45-60 min)\n`
    plan += `• Squats: 4 sets x 12-15 reps\n`
    plan += `• Lunges: 3 sets x 10 reps each leg\n`
    plan += `• Single-leg glute bridges: 3 sets x 12 each leg\n`
    plan += `• Calf raises: 4 sets x 20 reps\n\n`
  } else if (days >= 3) {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Upper Body Push (50 min)\n`
    plan += `• Chest, shoulders, and triceps focus\n\n`
    
    plan += `DAY 2 - Lower Body (50 min)\n`
    plan += `• Legs and glutes focus\n\n`
    
    plan += `DAY 3 - Upper Body Pull (50 min)\n`
    plan += `• Back and biceps focus\n\n`
  } else {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Full Body Strength (60 min)\n`
    plan += `• All major muscle groups\n\n`
  }
  
  return plan
}

function getEndurancePlan(days: number): string {
  let plan = `🏃 ENDURANCE IMPROVEMENT PROGRAM\n\n`
  plan += `This plan builds cardiovascular fitness and muscular endurance through varied training methods.\n\n`
  
  if (days >= 5) {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Steady State Cardio (45-60 min)\n`
    plan += `• Moderate intensity continuous exercise\n`
    plan += `• Walking, jogging, cycling, or swimming\n\n`
    
    plan += `DAY 2 - Interval Training (35-45 min)\n`
    plan += `• 10 min warm-up\n`
    plan += `• 8 x 2 min intervals at higher intensity\n`
    plan += `• 1 min recovery between intervals\n\n`
    
    plan += `DAY 3 - Strength Endurance (45 min)\n`
    plan += `• Circuit training with bodyweight exercises\n`
    plan += `• Higher reps, shorter rest periods\n\n`
  } else if (days >= 3) {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Steady Cardio + Strength (60 min)\n`
    plan += `• 35 min cardio + 25 min strength\n\n`
    
    plan += `DAY 2 - Interval Training (40 min)\n`
    plan += `• Mixed intensity intervals\n\n`
    
    plan += `DAY 3 - Endurance Circuit (50 min)\n`
    plan += `• Combination cardio and strength\n\n`
  } else {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Cardio + Strength Combo (75 min)\n`
    plan += `• Comprehensive endurance workout\n\n`
  }
  
  return plan
}

function getGeneralFitnessPlan(days: number): string {
  let plan = `🎯 GENERAL FITNESS PROGRAM\n\n`
  plan += `This balanced plan improves overall fitness with a mix of strength, cardio, and flexibility training.\n\n`
  
  if (days >= 4) {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Full Body Strength (45-50 min)\n`
    plan += `• Squats: 3 sets x 12-15 reps\n`
    plan += `• Push-ups: 3 sets x 8-12 reps\n`
    plan += `• Rows: 3 sets x 12-15 reps\n`
    plan += `• Plank: 3 sets x 30-60 seconds\n\n`
    
    plan += `DAY 2 - Cardio + Core (40 min)\n`
    plan += `• 25 min moderate cardio\n`
    plan += `• 15 min core strengthening\n\n`
    
    plan += `DAY 3 - Upper Body + Flexibility (45 min)\n`
    plan += `• Upper body strength exercises\n`
    plan += `• 15 min stretching and mobility\n\n`
    
    plan += `DAY 4 - Lower Body + Cardio (45 min)\n`
    plan += `• Leg and glute exercises\n`
    plan += `• 15-20 min cardio intervals\n\n`
  } else if (days >= 2) {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Full Body Strength + Cardio (60 min)\n`
    plan += `• 35 min strength training\n`
    plan += `• 25 min cardio\n\n`
    
    plan += `DAY 2 - Cardio + Flexibility (45 min)\n`
    plan += `• 30 min varied cardio\n`
    plan += `• 15 min stretching\n\n`
  } else {
    plan += `📅 WEEKLY SCHEDULE:\n\n`
    plan += `DAY 1 - Complete Fitness Workout (75-90 min)\n`
    plan += `• 30 min strength training\n`
    plan += `• 25 min cardio\n`
    plan += `• 15-20 min flexibility and cool-down\n\n`
  }
  
  return plan
}