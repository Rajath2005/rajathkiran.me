exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { question } = JSON.parse(event.body);
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Gemini API key not configured' }),
      };
    }

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
        console.error('Gemini API Error:', errorData);
        throw new Error('Gemini API returned an error');
    }

    const data = await response.json();
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
      body: JSON.stringify({ error: 'Failed to get response from AI' }),
    };
  }
};
