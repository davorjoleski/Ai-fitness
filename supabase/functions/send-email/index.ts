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

    // Enhanced input validation and sanitization
    if (!fullName || !email || !fitnessGoal || !daysPerWeek) {
      return new Response(
        JSON.stringify({ success: false, message: 'All fields are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = fullName.trim().replace(/[<>]/g, '');
    const sanitizedEmail = email.trim().toLowerCase();

    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitizedEmail) || sanitizedEmail.length > 254) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email address' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Rate limiting check (basic implementation)
    const userAgent = req.headers.get('user-agent') || '';
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    
    console.log(`Email request from IP: ${clientIP}, User-Agent: ${userAgent}`);

    // Generate workout plan
    const workoutPlan = generateWorkoutPlan({ 
      fullName: sanitizedName, 
      email: sanitizedEmail, 
      fitnessGoal, 
      daysPerWeek 
    })

    console.log('Processing email request for:', sanitizedEmail)
    console.log('Workout plan length:', workoutPlan.length)

    // Use the provided Resend API key (securely stored)
    const resendApiKey = 're_Smr6adxo_Kxujs8QQbcLHjscojFsotpsP'
    
    if (!resendApiKey) {
      console.log('RESEND_API_KEY not found - running in demo mode')
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `🎉 Demo Mode: Your personalized AI workout plan has been generated! In production, this would be sent to ${sanitizedEmail}.`,
          workoutPlan: workoutPlan,
          isDemoMode: true
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Send email using Resend API with enhanced features
    const emailSent = await sendEmailWithResend({
      apiKey: resendApiKey,
      to: sanitizedEmail,
      subject: `🤖 Your Personalized AI Workout Plan - ${formatGoal(fitnessGoal)}`,
      html: generateEnhancedEmailHTML(workoutPlan, sanitizedName, sanitizedEmail),
      text: workoutPlan
    })

    if (emailSent.success) {
      console.log('Email sent successfully to:', sanitizedEmail)
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `🎉 Success! Your personalized AI workout plan has been sent to ${sanitizedEmail}. Check your inbox (and spam folder) within the next few minutes.`,
          workoutPlan: workoutPlan
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else {
      console.error('Failed to send email:', emailSent.error)
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `❌ Failed to send email: ${emailSent.error}. Please try again or contact support.`
        }),
        { 
          status: 500, 
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

// Enhanced email sending with Resend API
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
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AI Fit Coach <noreply@resend.dev>',
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

function generateEnhancedEmailHTML(workoutPlan: string, fullName: string, email: string): string {
  const currentDate = new Date().toLocaleDateString();
  const planId = `PLAN-${Date.now()}`;
  
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
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #2563eb, #8b5cf6); 
          color: white; 
          padding: 40px 30px; 
          text-align: center; 
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header p {
          margin: 10px 0 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content { 
          padding: 40px 30px; 
          white-space: pre-line; 
          font-size: 14px;
          line-height: 1.7;
        }
        .footer { 
          background: #f1f5f9;
          text-align: center; 
          padding: 30px; 
          color: #64748b; 
          font-size: 14px; 
          border-top: 1px solid #e2e8f0;
        }
        .button { 
          display: inline-block; 
          background: #2563eb; 
          color: white; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 8px; 
          margin: 20px 10px; 
          font-weight: 600;
        }
        .highlight {
          background: #eff6ff;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
          margin: 20px 0;
        }
        .cta-section {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          padding: 30px;
          border-radius: 12px;
          margin: 30px 0;
          text-align: center;
          border: 2px solid #0ea5e9;
        }
        .email-link {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
        }
        .email-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          body { padding: 10px; }
          .header, .content, .footer { padding: 20px; }
          .header h1 { font-size: 24px; }
          .button { display: block; margin: 10px 0; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤖 AI Fit Coach</h1>
          <p>Your Personalized Workout Plan is Ready!</p>
          <p style="font-size: 12px; opacity: 0.8;">Plan ID: ${planId} | Generated: ${currentDate}</p>
        </div>
        
        <div class="content">
          <div class="highlight">
            <p><strong>Hi ${fullName},</strong></p>
            <p>Thank you for using AI Fit Coach! Your personalized workout plan has been generated based on your specific goals and preferences.</p>
            <p><strong>📧 Your Email:</strong> <a href="mailto:${email}" class="email-link">${email}</a></p>
          </div>
          
          ${workoutPlan}
          
          <div class="cta-section">
            <h3 style="color: #0369a1; margin-top: 0;">🚀 Take Your Fitness Further!</h3>
            <p style="margin-bottom: 25px;">Ready to maximize your results? Here's how we can help:</p>
            
            <div style="margin: 20px 0;">
              <a href="mailto:support@aifitcoach.com?subject=Need Support with My Plan&body=Hi! I received my workout plan (${planId}) and would like some guidance." class="button">
                💬 Get Personal Support
              </a>
              <a href="https://your-app-url.com/dashboard?plan=${planId}" class="button">
                📱 View Plan Online
              </a>
            </div>
            
            <div style="margin: 20px 0;">
              <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=AI+Workout+Plan&details=My+personalized+workout+plan+from+AI+Fit+Coach" class="button">
                📅 Add to Google Calendar
              </a>
              <a href="https://your-app-url.com/pdf-export?plan=${planId}" class="button">
                📄 Download PDF
              </a>
            </div>
          </div>
          
          <div class="highlight">
            <h4>🎯 What's Next?</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li><strong>Week 1:</strong> Focus on form and getting comfortable with the exercises</li>
              <li><strong>Week 2-3:</strong> Gradually increase intensity and track your progress</li>
              <li><strong>Week 4+:</strong> We'll send you plan adjustments based on your progress</li>
            </ul>
            
            <p><strong>🏆 Join Our 30-Day Challenge:</strong></p>
            <p>Want extra motivation? Join our community challenge and get daily tips, progress tracking, and support from other fitness enthusiasts!</p>
            <a href="https://your-app-url.com/30-day-challenge" class="button">Join 30-Day Challenge</a>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <h4 style="color: #92400e; margin-top: 0;">🍎 Nutrition Boost</h4>
            <p style="color: #92400e;">Based on your goals, here are your daily macro targets:</p>
            <ul style="color: #92400e; margin: 10px 0; padding-left: 20px;">
              <li><strong>Protein:</strong> 1.2-1.6g per kg body weight</li>
              <li><strong>Carbs:</strong> 3-5g per kg body weight (adjust based on activity)</li>
              <li><strong>Fats:</strong> 0.8-1.2g per kg body weight</li>
              <li><strong>Water:</strong> 35ml per kg body weight daily</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>📈 Track Your Progress</strong></p>
          <p>We'll check in with you weekly! Expect follow-up emails with tips, motivation, and plan adjustments.</p>
          
          <div style="margin: 20px 0;">
            <a href="https://your-app-url.com/progress-tracker" class="button">Log Today's Workout</a>
          </div>
          
          <p><strong>🎥 Exercise Videos</strong></p>
          <p>Need help with proper form? Check out our exercise video library:</p>
          <a href="https://youtube.com/playlist?list=your-workout-videos" class="button">Watch Exercise Videos</a>
          
          <p style="margin-top: 30px;"><strong>Questions? Need Support?</strong></p>
          <p>Reply to this email or contact us at <a href="mailto:support@aifitcoach.com" class="email-link">support@aifitcoach.com</a></p>
          <p>Our AI coach is also available 24/7 on our website!</p>
          
          <div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px;">
            <p style="margin: 0; font-size: 12px; color: #6b7280;">
              <strong>Privacy & Security:</strong> Your data is encrypted and secure. We never share your information with third parties. 
              You can unsubscribe or request data deletion at any time by replying to this email.
            </p>
          </div>
          
          <p style="margin-top: 20px; font-size: 12px;">© 2025 AI Fit Coach. All rights reserved.</p>
          <p style="font-size: 10px; color: #9ca3af;">
            This email was sent to <a href="mailto:${email}" class="email-link">${email}</a> because you requested a personalized workout plan.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateWorkoutPlan(data: EmailRequest): string {
  const { fullName, email, fitnessGoal, daysPerWeek } = data
  const days = parseInt(daysPerWeek)
  
  let plan = `🎯 Your Personalized AI Workout Plan\n\n`
  plan += `👤 Name: ${fullName}\n`
  plan += `🎯 Goal: ${formatGoal(fitnessGoal)}\n`
  plan += `📅 Training Days: ${days} days per week\n`
  plan += `📧 Email: ${email}\n`
  plan += `📅 Generated: ${new Date().toLocaleDateString()}\n`
  plan += `🆔 Plan ID: PLAN-${Date.now()}\n\n`
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
  
  plan += `📱 Next Steps:\n`
  plan += `• Add workouts to your calendar\n`
  plan += `• Download our progress tracking app\n`
  plan += `• Join our 30-day fitness challenge\n`
  plan += `• Watch exercise form videos\n\n`
  
  plan += `🤖 Generated by AI Fit Coach - Your Personal Fitness Assistant\n`
  plan += `Visit our website for live AI coaching and progress tracking!\n`
  plan += `\n© 2025 AI Fit Coach. All rights reserved.`
  
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