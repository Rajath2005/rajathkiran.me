exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { question } = JSON.parse(event.body);
    const API_KEY = process.env.GEMINI_API_KEY;

    // Check if fetch is available
    if (typeof fetch === 'undefined') {
      console.error('Fetch is not defined. Node version:', process.version);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Environment Error', 
          message: 'The server environment is missing a required feature (fetch). Please ensure Node.js 18+ is used.' 
        }),
      };
    }

    if (!API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Gemini API key not configured' }),
      };
    }

    console.log('Processing request for question length:', question ? question.length : 0);

    const systemPrompt = `
      You are an AI assistant for Rajath Kiran A's portfolio website. 
      Your goal is to answer questions about Rajath in a professional, friendly, and concise manner.
      
      Context about Rajath Kiran A:
      - Full Name: Rajath Kiran A (also known as Rajath2005).
      - Role: Web Developer, SEO Expert, and Computer Science Student at VCET (Vivekananda College of Engineering & Technology), Puttur.
      - Education: B.E. in Computer Science (2023-2027). PUC from Narendra PU College (PCMC).
      - Key Skills: Frontend Development (Advanced), UI/UX Design (Figma, Canva), C, C++, Java, React.js, Node.js.
      - Notable Projects: 
        - AyuDost (Healthcare platform with Supabase, APIs, Google Maps).
        - TextUtils.
        - English learning tool.
      - Experience: Worked with Nexara on Plumbing and NGO websites using WordPress and Divi.
      - Certifications: NPTEL Joy of Computing, React, Elements of AI, DSA, Docker & Kubernetes.
      - Hobbies: Cricket, Volleyball, Listening to music.
      - Personality: Believes learning should be interesting and enjoyable.
      
      Guidelines:
      - Be helpful and highlight Rajath's strengths.
      - If you don't know the answer, politely suggest contacting Rajath via the contact form on the website.
      - Keep responses relatively short (under 100 words).
      - Use "Rajath" or "he" when referring to him.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nVisitor Question: ${question}` }]
        }]
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API Error:', JSON.stringify(errorData));
        return {
          statusCode: response.status,
          body: JSON.stringify({ 
            error: 'Gemini API Error', 
            message: errorData.error?.message || 'The AI service returned an error.',
            details: errorData 
          }),
        };
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content || !data.candidates[0].content.parts) {
        console.error('Unexpected Gemini API response structure:', JSON.stringify(data));
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            answer: "I'm sorry, I'm having trouble processing that right now. It might be due to safety filters or an unexpected response format. Please try rephrasing your question!" 
          }),
        };
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer: aiResponse }),
    };
  } catch (error) {
    console.error('Error in ask-rajath function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Server Error', 
        message: error.message || 'An internal error occurred.' 
      }),
    };
  }
};
