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

    // Generate workout plan
    const workoutPlan = generateWorkoutPlan({ fullName, email, fitnessGoal, daysPerWeek })

    console.log('Processing email request for:', email)
    console.log('Workout plan length:', workoutPlan.length)

    // Use the provided Resend API key
    const resendApiKey = 'AIre_2SeMDkmU_2E5zmBijwpqPkvYiFX4i6dbx'
    
    console.log('Using Resend API key for email delivery')
    
    // Send email using Resend API
    const emailSent = await sendEmailWithResend({
      apiKey: resendApiKey,
      to: email,
      subject: `Your Personalized AI Workout Plan - ${formatGoal(fitnessGoal)}`,
      html: generateEmailHTML(workoutPlan, fullName),
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
    
    const response = await fetch('https://api.resend.com/emails', {
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

function generateEmailHTML(workoutPlan: string, fullName: string): string {
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
          margin: 20px 0; 
          font-weight: 600;
        }
        .highlight {
          background: #eff6ff;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
          margin: 20px 0;
        }
        @media (max-width: 600px) {
          body { padding: 10px; }
          .header, .content, .footer { padding: 20px; }
          .header h1 { font-size: 24px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤖 AI Fit Coach</h1>
          <p>Your Personalized Workout Plan is Ready!</p>
        </div>
        
        <div class="content">
          <div class="highlight">
            <p><strong>Hi ${fullName},</strong></p>
            <p>Thank you for using AI Fit Coach! Your personalized workout plan has been generated based on your specific goals and preferences.</p>
          </div>
          
          ${workoutPlan}
          
          <div class="highlight">
            <p><strong>🎯 Ready to Start?</strong></p>
            <p>Begin with Day 1 of your plan and track your progress. Remember, consistency is key to achieving your fitness goals!</p>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Questions? Need Support?</strong></p>
          <p>Reply to this email for personalized advice and motivation!</p>
          <p style="margin-top: 20px; font-size: 12px;">© 2025 AI Fit Coach. All rights reserved.</p>
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