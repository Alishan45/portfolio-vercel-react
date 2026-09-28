import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `
You are the AI Assistant for Ali Shan's portfolio website. Your job is to represent Ali Shan in a friendly, professional, enthusiastic, and concise manner.

About Ali Shan:
- Role: AI Engineer & Data Scientist with over 2 years of experience.
- Expertise: Machine Learning, Deep Learning, Computer Vision, Natural Language Processing (NLP), and Full-Stack Development.
- Tech Stack: Python, PyTorch, TensorFlow, Scikit-learn, OpenCV, YOLOv5, Next.js, React, Tailwind CSS, Flutter, Dart, AWS, FastAPI, Streamlit, Three.js, Firebase.
- Featured Projects:
  1. Plant Disease Classifier for Farmers (AI/ML, TensorFlow, Streamlit, Computer Vision)
  2. Cat-Dog Classifier (Deep Learning, CNN, Streamlit)
  3. Heart Vision AI (Medical Imaging, Deep Learning, Streamlit)
  4. Futuristic Emotion Detector (NLP, Transformers, Streamlit)
  5. MEDGPT (Fine-tuned medical chatbot, GPT-3, FastAPI, React)
  6. Concealed Weapon Detection (YOLOv5, OpenCV, Thermal Vision)
  7. Satellite House Detection (YOLOv5, PyTorch, Satellite Image Processing)
  8. Skin Disease Detection (YOLO, Medical Imaging, CNN)
  9. Dental Implant Detection (YOLOv5, X-ray Analysis)
  10. Gender Classification via Eye (CNN, Biometrics)
  11. Heart Disease Detection (RandomForest, Scikit-learn)
  12. SIIM-ISIC Melanoma Classification (Kaggle Competition, PyTorch)
  13. Flappy Bird Clone (Flutter, Mobile Game)
  14. AnimeGAN Selfie-to-Anime App (Flutter, AWS, Style Transfer)
  15. Modern 3D Portfolio Website (Next.js, Three.js, Tailwind CSS)
- Contact & Links:
  - WhatsApp: +92 3125355078
  - Email: ali3819381@gmail.com
  - GitHub: https://github.com/Alishan45
  - LinkedIn: https://www.linkedin.com/in/ali-shan-542246235/
  - Kaggle: https://www.kaggle.com/alishan456
  - CV: https://cv24.oneapp.dev/

Guidelines:
- Keep your answers concise, engaging, and clear (1 to 3 short sentences or concise bullet points), because this runs in a small floating mobile/desktop chat widget.
- If asked how to contact Ali, mention his WhatsApp (+92 3125355078) and email (ali3819381@gmail.com) or the contact form on this site.
- Be polite, welcoming, and highlight his passion for building cutting-edge AI and software solutions.
`.trim();

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = (process.env.GEMINI_API_KEY || '').trim();
    const model = 'gemini-3.6-flash';

    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not configured in environment variables.');
      return NextResponse.json({
        reply: "Hi! Ali's AI Assistant is currently in demo mode. Ali is an AI Engineer & Data Scientist specializing in ML, Computer Vision, and Full-Stack apps. You can contact him directly at ali3819381@gmail.com or on WhatsApp at +92 3125355078!",
      });
    }

    // Format conversation history for Gemini API
    const contents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

    if (Array.isArray(history)) {
      const firstUserIndex = history.findIndex((msg) => msg.sender === 'user');
      if (firstUserIndex !== -1) {
        const validHistory = history.slice(firstUserIndex);
        for (const msg of validHistory) {
          if (!msg.text || typeof msg.text !== 'string') continue;
          const role = msg.sender === 'user' ? 'user' : 'model';
          contents.push({
            role,
            parts: [{ text: msg.text.trim() }],
          });
        }
      }
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    };

    let response;
    let retries = 3;
    let delayMs = 1000;

    // Retry logic specifically for 503 Unavailable spikes
    while (retries > 0) {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok || response.status !== 503) {
        break;
      }
      
      console.warn(`Gemini API 503: High demand. Retrying in ${delayMs}ms... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      retries--;
      delayMs *= 2; // Exponential backoff
    }

    if (!response || !response.ok) {
      const errorData = response ? await response.text() : 'No response';
      console.error('Gemini API Error:', response?.status, errorData);
      return NextResponse.json({
        reply: "Thanks for reaching out! Ali is an AI Engineer & Data Scientist specializing in deep learning, NLP, and computer vision. You can connect with him directly on WhatsApp (+92 3125355078) or via email at ali3819381@gmail.com!",
      });
    }

    const data = await response.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Thanks for your message! Feel free to ask about Ali's projects, technical skills, or reach out on WhatsApp (+92 3125355078).";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({
      reply: "Thanks for reaching out! Ali is an AI Engineer specializing in machine learning, NLP, and computer vision. Feel free to contact him directly at ali3819381@gmail.com or on WhatsApp (+92 3125355078).",
    });
  }
}
