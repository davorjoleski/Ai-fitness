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
    const resendApiKey = 're_2SeMDkmU_2E5zmBijwpqPkvYiFX4i6dbx'
    
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
        subject: subj