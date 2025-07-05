import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
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

    // In a real implementation, you would integrate with an email service like:
    // - Resend (recommended)
    // - SendGrid
    // - AWS SES
    // - Postmark
    
    // For now, we'll simulate the email sending
    console.log('Sending email to:', email)
    console.log('Workout plan generated:', workoutPlan.substring(0, 200) + '...')

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In production, replace this with actual email sending logic
    const emailSent = await sendEmail({
      to: email,
      subject: `Your Personalized AI Workout Plan - ${formatGoal(fitnessGoal)}`,
      html: generateEmailHTML(workoutPlan, fullName),
      text: workoutPlan
    })

    if (emailSent) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `🎉 Success! Your personalized AI workout plan has been sent to ${email}. Check your inbox (and spam folder) within the next few minutes.`
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    } else {
      throw new Error('Failed to send email')
    }

  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: '❌ Failed to send email. Please try again later.' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Mock email sending function - replace with real email service
async function sendEmail({ to, subject, html, text }: { 
  to: string; 
  subject: string; 
  html: string; 
  text: string; 
}): Promise<boolean> {
  // This is where you'd integrate with your email service
  // Example with Resend:
  /*
  const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
  
  try {
    await resend.emails.send({
      from: 'AI Fit Coach <noreply@yourdomain.com>',
      to: [to],
      subject: subject,
      html: html,
      text: text,
    })
    return true
  } catch (error) {
    console.error('Resend error:', error)
    return false
  }
  */
  
  // For demo purposes, always return true
  return true
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
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
        .content { background: #f9fafb; padding: 30px; border-radius: 10px; white-space: pre-line; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🤖 AI Fit Coach</h1>
        <p>Your Personalized Workout Plan is Ready!</p>
      </div>
      
      <div class="content">
        <p>Hi ${fullName},</p>
        <p>Thank you for using AI Fit Coach! Here's your personalized workout plan:</p>
        
        ${workoutPlan}
      </div>
      
      <div class="footer">
        <p>Questions? Reply to this email for personalized advice!</p>
        <p>© 2025 AI Fit Coach. All rights reserved.</p>
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