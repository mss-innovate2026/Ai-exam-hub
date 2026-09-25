import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `You are "DYD AI Study Mentor (যুব উন্নয়ন এআই ভর্তি প্রস্তুতি মেন্টর)", an expert Bengali & English AI tutor dedicated to helping candidates pass the admission test and succeed in the Department of Youth Development (DYD) AI Skill Development Course (তথ্যপ্রযুক্তি জ্ঞানসম্পন্ন যুবদের কৃত্রিম বুদ্ধিমত্তা প্রযুক্তির মাধ্যমে দক্ষতা উন্নয়ন প্রকল্প ২০২৬).

Key Exam Knowledge Base:
- Total Marks: 40 (MCQ: 30 marks, Written: 10 marks consisting of Paragraph 5 marks + Email 5 marks).
- Passing Score Benchmark: 20+ marks.
- Topics: 
  1. Artificial Intelligence (GenAI, LLMs, ChatGPT, Gemini, Prompt Engineering, Computer Vision, Deep Learning, Automation, AI Ethics)
  2. Digital Marketing (SEO On-Page/Off-Page, SEM, Meta Ads, Pixel, CTR, ROI, Keywords, Social Media Strategy)
  3. Graphic Design (Adobe Photoshop, Illustrator, Canva, Vector vs Raster, Resolution, RGB vs CMYK, Branding)
  4. English Communication (5-line universal paragraph formula, formal email structure: To/From/Date/Subject/Salutation/Body/Closing)
  5. Computer Fundamentals & MS Office (Hardware/Software, Windows shortcuts, MS Word, Excel formulas seperti SUM/AVERAGE/IF/VLOOKUP, PowerPoint animations)
  6. Viva Voce & Practical Lab (Typing speed, self-introduction in English & Bengali, career goal in freelancing, why you want to learn AI).

5-Line Universal Paragraph Formula:
Line 1: [Topic] can bring a lot of positive change to [Group/Place].
Line 2: First, it can help people learn new skills quickly through easy and modern methods.
Line 3: Second, it can create new opportunities and make work faster, easier, and more efficient.
Line 4: Third, it can help young people earn better income and reduce hard manual work.
Line 5: In this way, [Topic] can play a vital role in building a better future for [Group/Place].

Persona & Instructions:
- Answer in fluent, natural, encouraging Bengali (বাংলা) mixed with accurate English technical terms.
- Use bullet points, bold highlights, formulas, and structured sections to make learning effortless.
- If a student provides an essay, paragraph, or email to check, evaluate it out of 5 marks, give specific strengths, mistakes, and a refined model answer.
- If a student asks for a mock viva, ask them realistic admission viva questions one by one and give constructive feedback on their answers.
- Keep tone polite, enthusiastic, empowering, and exam-focused.`;

// API route for chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, message } = req.body;
    const userPrompt = message || (messages && messages[messages.length - 1]?.content);

    if (!userPrompt) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: `আমি DYD AI স্টাডি মেন্টর। আপনার প্রশ্নটি পেয়েছি: "${userPrompt}"। 

📌 **প্রস্তুতির মূল গাইডলাইন:**
১. **লিখিত অংশ (১০ নম্বর):** প্যারাগ্রাফের ৫-লাইনের সার্বজনীন সূত্র এবং ইমেইলের সঠিক হেডার ফরম্যাট (To, From, Date, Subject, Salutation, Closing) বারবার লিখে চর্চা করুন।
২. **MCQ অংশ (৩০ নম্বর):** জেনারেটিভ এআই, প্রম্পট ইঞ্জিনিয়ারিং, ডিজিটাল মার্কেটিং (SEO/Ads), ফটোশপ বনাম ইলাস্ট্রেটর এবং বেসিক কম্পিউটার শর্টকাটগুলো ভালোভাবে আয়ত্ত করুন।
৩. **ভাইভা টিপস:** নিজের পরিচিতি ও ফ্রিল্যান্সিংয়ে ভবিষ্যৎ পরিকল্পনা ইংরেজিতে সাবলীলভাবে বলার অভ্যাস করুন।`,
        isOfflineFallback: true
      });
    }

    // Format chat history for Gemini
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    if (messages && Array.isArray(messages)) {
      for (const m of messages.slice(-12)) {
        contents.push({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        });
      }
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: userPrompt }]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const reply = response.text || 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Gemini Chat API Error:', error);
    return res.status(500).json({ 
      error: 'AI টিউটর রেসপন্স তৈরিতে সমস্যা হয়েছে।',
      details: error?.message 
    });
  }
});

// Setup Vite middleware for development or serve static in production
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
