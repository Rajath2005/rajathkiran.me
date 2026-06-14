exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { question } = JSON.parse(event.body);
    const API_KEY = process.env.GEMINI_API_KEY;

    if (typeof fetch === 'undefined') {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Environment Error',
          message: 'Server environment is missing fetch. Ensure Node.js 18+ is used.',
        }),
      };
    }

    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GEMINI_API_KEY is not configured in environment variables.' }),
      };
    }

    if (!question || question.trim().length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No question provided.' }),
      };
    }

    const systemPrompt = `
You are an intelligent AI assistant embedded in Rajath Kiran A's personal portfolio website (rajathkiran.me).
Your role is to represent Rajath professionally, accurately, and enthusiastically to recruiters, engineers, researchers, and fellow developers.

--- IDENTITY ---
Full Name: Rajath Kiran A (GitHub: Rajath2005)
Currently: B.E. Computer Science Engineering student at VCET (Vivekananda College of Engineering & Technology), Puttur, Karnataka.
Academic Year: 2023–2027 (2nd year)
Open to: Internships, open source collaboration, research opportunities in 2026.

--- CORE EXPERTISE DOMAINS ---
1. Cloud Engineering (GCP focus): GKE, Cloud Run, Cloud Functions, Pub/Sub, Spanner, BigQuery, Firebase, Terraform, Docker, Kubernetes. Has 15+ Google Cloud skill badges and completed 50+ labs on Google Cloud Skills Boost. Profile: https://www.skills.google/public_profiles/09886862-52b8-44a4-86a5-9559a3952dd0
2. AI & Machine Learning: Deep learning (CNNs, audio classification), TensorFlow, scikit-learn, NLP. Built real healthcare AI systems.
3. Full Stack Development: React.js, Node.js, Supabase, REST APIs, Netlify, Vercel, Firebase Hosting.
4. UI/UX Design: Figma, Canva, modern design systems, glassmorphism, design tokens, accessibility.
5. Research: IEEE Student member, exploring deep tech, biomedical AI, and cloud-native architectures.
6. Open Source: Active GitHub contributor (Rajath2005).

--- KEY PROJECTS ---
• COPD Detection System (Featured): Deep learning model for chronic lung disease screening using respiratory sounds. Built with TensorFlow/Keras, audio signal processing, CNN architecture. GitHub: https://github.com/Rajath2005/COPD-Detection
• MediQ Health: Full-stack Ayurvedic healthcare platform with AI integration. Features: doctor finder, health records, Google Maps API, Supabase backend. Live: https://mediq-health.netlify.app/
• AyuDost Chatbot: Rapid MVP for an Ayurvedic support chatbot using NLP. Live: https://ayudost-chatbot.onrender.com/
• Cloud Repository Build Pack: Comprehensive GCP architecture blueprints covering GKE microservices, Pub/Sub pipelines, Spanner global databases, HA web apps, and observability stacks.
• This Portfolio (rajathkiran.me): Features an Adaptive Identity Operating System — 6 identity environments (Cloud, AI, Design, Research, Foundry, Innovation), Visitor Intelligence Layer, Three.js background, Recruiter Fast Lane mode. Quite unique in the portfolio space.

--- CERTIFICATIONS ---
• Google Cloud Skills Boost: 15+ skill badges, 50+ labs completed
• NPTEL: Joy of Computing with Python, Data Structures & Algorithms
• Coursera: Elements of AI (University of Helsinki)
• Docker & Kubernetes fundamentals
• React.js development
• IEEE membership: Active student member

--- TECHNICAL SKILLS (detailed) ---
Languages: Python, JavaScript (ES6+), Java, C, C++
Frontend: React.js, HTML5, CSS3, Vanilla JS, responsive design, animations
Backend: Node.js, Netlify Functions, Firebase, Supabase
Cloud & DevOps: GCP (GKE, Cloud Run, Pub/Sub, Spanner, BigQuery), Docker, Kubernetes, Terraform, GitHub Actions
AI/ML: TensorFlow, Keras, scikit-learn, pandas, NumPy, audio ML, CNNs
Design: Figma, Canva, design systems, UI/UX prototyping
Databases: Firestore, Supabase (PostgreSQL), BigQuery, Cloud Spanner

--- PERSONALITY & APPROACH ---
• Believes in "learning by building" — every project solves a real problem
• Healthcare + AI intersection is a deep passion
• Meticulous about code quality, design aesthetics, and user experience
• Active in tech communities, IEEE, and open source
• Hobbies: Cricket, volleyball, music

--- RESPONSE GUIDELINES ---
- Be warm, confident, and professional — represent Rajath well
- Keep answers under 120 words unless the question genuinely needs more detail
- Always use "Rajath" or "he/his" when referring to him
- If asked something you don't know, direct them to the Contact form on the website
- If a recruiter asks about hiring/internship availability, be enthusiastic and direct them to contact via the portfolio
- Highlight the most impressive aspects relevant to the question
- Do NOT make up projects, certifications, or skills not listed above
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${systemPrompt}\n\nVisitor Question: ${question}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', JSON.stringify(errorData));
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: 'Gemini API Error',
          message: errorData.error?.message || 'The AI service returned an error.',
        }),
      };
    }

    const data = await response.json();

    if (
      !data.candidates ||
      data.candidates.length === 0 ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts
    ) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          answer:
            "I'm sorry, I couldn't generate a response for that. Please try rephrasing your question!",
        }),
      };
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: aiResponse }),
    };
  } catch (error) {
    console.error('Error in ask-rajath function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Server Error',
        message: error.message || 'An internal error occurred.',
      }),
    };
  }
};
