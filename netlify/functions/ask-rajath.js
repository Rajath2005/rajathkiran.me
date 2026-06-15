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
Academic Year: 4th year (Graduating 2026)
Open to: 2026 Internships, open source collaboration, research opportunities.
Roles: Cloud Engineer, AI/ML Engineer, Full Stack Developer
Relocation: Open to relocation

--- CORE EXPERTISE DOMAINS ---
1. Cloud Engineering: Google Cloud Platform (GCP), Kubernetes (GKE), Docker, Load Balancing, Compute Engine, Pub/Sub. Has 15+ Google Cloud skill badges and completed 50+ labs on Google Cloud Skills Boost. Profile: https://www.skills.google/public_profiles/09886862-52b8-44a4-86a5-9559a3952dd0
2. AI & Machine Learning: TensorFlow, PyTorch, CNN, LSTM, Natural Language Processing (NLP), RAG architectures. Built real healthcare AI systems.
3. Full Stack Development: React.js, Next.js, Node.js, Python Flask, Supabase, PostgreSQL.
4. UI/UX Design: Figma, Canva, modern design systems, glassmorphism, design tokens, accessibility.
5. Research: IEEE Student member, exploring deep tech, biomedical AI, and cloud-native architectures.
6. Open Source: Active GitHub contributor (Rajath2005).

--- KEY PROJECTS ---
• AyuDost AI: AI-powered Ayurvedic healthcare platform with NLP chatbot. Live: https://ayudost-chatbot.onrender.com/
• COPD Detection System (Featured): Deep learning screening using respiratory sound analysis (CNN + CNN-LSTM) with 95%+ accuracy. GitHub: https://github.com/Rajath2005/COPD-Detection
• Cloud Infrastructure: Scalable Compute Engine deployments with HTTP(S) Load Balancing and GKE microservices.
• MediQ Health: Full-stack Ayurvedic healthcare platform with AI integration. Features: doctor finder, health records, Google Maps API, Supabase backend. Live: https://mediq-health.netlify.app/
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
Frontend: React.js, Next.js, HTML5, CSS3, Vanilla JS, responsive design, animations
Backend: Node.js, Python Flask, Supabase
Cloud & DevOps: GCP (GKE, Compute Engine, Pub/Sub, Load Balancing), Docker, Kubernetes, Terraform, GitHub Actions
AI/ML: TensorFlow, PyTorch, CNN, LSTM, NLP, RAG, scikit-learn, pandas, NumPy
Design: Figma, Canva, design systems, UI/UX prototyping
Databases: PostgreSQL, Supabase, BigQuery, Cloud Spanner

--- PERSONALITY & APPROACH ---
• Believes in "learning by building" — every project solves a real problem
• Healthcare + AI intersection is a deep passion
• Meticulous about code quality, design aesthetics, and user experience
• Active in tech communities, IEEE, and open source
• Hobbies: Cricket, volleyball, music

--- RESPONSE GUIDELINES ---
- Be warm, confident, and professional — represent Rajath well.
- Provide DETAILED, SPECIFIC answers. If asked about certifications or skills, list them explicitly.
- ALWAYS use markdown for links when mentioning projects, e.g., [Project Name](https://link.com).
- Use **bold** text to emphasize key technologies or important terms.
- Keep answers concise but ensure all requested information is fully delivered.
- Always use "Rajath" or "he/his" when referring to him.
- If asked something you don't know, direct them to the Contact form on the website.
- If a recruiter asks about hiring/internship availability, be enthusiastic and direct them to contact via the portfolio.
- Do NOT make up projects, certifications, or skills not listed above.
    `;

    const fetchOptions = {
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
    };

    // Debugging step: fetch available models to see what this API key actually has access to
    let availableModelsList = [];
    try {
      const modelsReq = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
      if (modelsReq.ok) {
        const modelsData = await modelsReq.json();
        // Log the actual model names available
        availableModelsList = modelsData.models
          .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
          .map(m => m.name.replace('models/', ''));
        console.log("AVAILABLE MODELS FOR THIS KEY:", availableModelsList);
      }
    } catch (e) {
      console.warn("Failed to fetch available models list:", e);
    }

    const modelsToTry = [
      'gemini-1.5-flash',
      'gemini-1.5-flash-8b',
      'gemini-1.5-pro',
      'gemini-1.0-pro',
      'gemini-1.0-pro-latest'
    ];

    // If we successfully fetched available models, prioritize them
    const actualModelsToTry = availableModelsList.length > 0 
      ? availableModelsList.filter(m => modelsToTry.includes(m) || m.includes('flash') || m.includes('pro'))
      : modelsToTry;

    // Fallback just in case none match
    if (actualModelsToTry.length === 0 && availableModelsList.length > 0) {
      actualModelsToTry.push(availableModelsList[0]);
    }

    let response;
    for (const model of (actualModelsToTry.length > 0 ? actualModelsToTry : modelsToTry)) {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
        fetchOptions
      );
      
      if (response.ok) {
        break; // Successfully got a response
      }
      
      if (response.status === 404) {
        console.warn(`${model} not found for this API version or region. Trying next...`);
        continue;
      } else {
        // If it's a 400, 403 or 500 error, we shouldn't keep trying models
        break;
      }
    }

    if (!response || !response.ok) {
      const errorData = await response ? await response.json() : { error: { message: 'All models failed' } };
      console.error('Gemini API Error:', JSON.stringify(errorData));
      
      let errorMessage = errorData.error?.message || 'The AI service returned an error.';
      if (availableModelsList.length > 0) {
        errorMessage += `\nModels actually available to your key: ${availableModelsList.join(', ')}`;
      }

      return {
        statusCode: response ? response.status : 500,
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
