export interface RubricMetric {
  name: string;
  nameBn: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface WrittenEvaluationResult {
  score: number;
  maxScore: number;
  percentage: number;
  grade: 'A+' | 'A' | 'A-' | 'B' | 'C' | 'F';
  gradeTitleBn: string;
  gradeColor: string;
  summaryFeedbackBn: string;
  strengths: string[];
  improvements: string[];
  metrics: RubricMetric[];
  detectedKeywords: string[];
  missingKeywords: string[];
  wordCount: number;
  sentenceCount: number;
  hasProperFormat: boolean;
}

export interface ScoringOptions {
  type: 'paragraph' | 'email' | 'short_question';
  expectedKeywords: string[];
  requiredKeywords?: string[];
  minWords?: number;
  maxWords?: number;
  expectedStructure?: string[];
}

/**
 * Intelligent client-side written evaluation and grading engine
 * Evaluates candidate responses based on structure, keyword coverage, length, and cohesion.
 */
export function evaluateWrittenSubmission(
  text: string,
  options: ScoringOptions
): WrittenEvaluationResult {
  const cleanText = text.trim();
  const words = cleanText ? cleanText.split(/\s+/).filter(w => w.length > 0) : [];
  const wordCount = words.length;
  
  // Sentences split by . ! ?
  const sentences = cleanText
    ? cleanText.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0)
    : [];
  const sentenceCount = sentences.length;

  const lowerText = cleanText.toLowerCase();

  // If empty submission
  if (wordCount === 0) {
    return {
      score: 0,
      maxScore: 5,
      percentage: 0,
      grade: 'F',
      gradeTitleBn: 'উত্তর দেওয়া হয়নি (০ নম্বর)',
      gradeColor: 'text-rose-600 bg-rose-50 border-rose-200',
      summaryFeedbackBn: 'আপনি কোনো উত্তর লেখেননি। পরীক্ষায় নম্বর পাওয়ার জন্য অন্তত নির্ধারিত ফরমেটে কিছু প্রাসঙ্গিক বাক্য লেখা আবশ্যক।',
      strengths: [],
      improvements: [
        'বক্সের মধ্যে নির্ধারিত বিষয়ে ৫-৮টি বাক্য বা ইমেইল ফরম্যাট টাইপ করে জমা দিন।',
        'মডেল উত্তরটি ভালো করে পড়ে ৫-লাইনের ইউনিভার্সাল সূত্রটি অনুশীলন করুন।'
      ],
      metrics: [
        { name: 'Structure & Format', nameBn: 'কাঠামো ও বিন্যাস', score: 0, maxScore: 1.5, feedback: 'কোনো লেখা পাওয়া যায়নি।' },
        { name: 'Keyword & Content', nameBn: 'মূলভাব ও প্রাসঙ্গিকতা', score: 0, maxScore: 2.0, feedback: 'প্রাসঙ্গিক কি-ওয়ার্ডের অনুপস্থিতি।' },
        { name: 'Length & Fluency', nameBn: 'শব্দ সংখ্যা ও সাবলীলতা', score: 0, maxScore: 1.5, feedback: 'শব্দ সংখ্যা শূন্য।' },
      ],
      detectedKeywords: [],
      missingKeywords: options.expectedKeywords.slice(0, 6),
      wordCount: 0,
      sentenceCount: 0,
      hasProperFormat: false
    };
  }

  // Detect keywords
  const detectedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  options.expectedKeywords.forEach(kw => {
    const kwLower = kw.toLowerCase();
    if (lowerText.includes(kwLower)) {
      if (!detectedKeywords.includes(kw)) detectedKeywords.push(kw);
    } else {
      if (!missingKeywords.includes(kw)) missingKeywords.push(kw);
    }
  });

  const strengths: string[] = [];
  const improvements: string[] = [];

  // 1. Structure & Format Evaluation (Max 1.5)
  let structureScore = 0;
  let hasProperFormat = false;

  if (options.type === 'email') {
    const hasTo = /to\s*[:=]/i.test(cleanText);
    const hasSubject = /subject\s*[:=]/i.test(cleanText);
    const hasFrom = /from\s*[:=]/i.test(cleanText);
    const hasGreeting = /(hi|hello|dear|respected|sir|madam)/i.test(cleanText);
    const hasClosing = /(best regards|regards|sincerely|warm regards|take care|thank you|best wishes)/i.test(cleanText);

    let emailFormatPoints = 0;
    if (hasTo) emailFormatPoints += 0.3;
    if (hasSubject) emailFormatPoints += 0.3;
    if (hasFrom) emailFormatPoints += 0.2;
    if (hasGreeting) emailFormatPoints += 0.35;
    if (hasClosing) emailFormatPoints += 0.35;

    structureScore = Math.min(1.5, Number(emailFormatPoints.toFixed(2)));
    hasProperFormat = hasTo && hasSubject && (hasGreeting || hasClosing);

    if (hasTo && hasSubject && hasGreeting && hasClosing) {
      strengths.push('ইমেইলের মূল স্ট্রাকচার (To, Subject, Salutation, Closing) একদম নিখুঁত হয়েছে।');
    } else {
      if (!hasTo || !hasSubject) improvements.push('ইমেইলের শুরুতে অবশ্যই "To:" ও "Subject:" স্পষ্ট করে উল্লেখ করুন।');
      if (!hasGreeting) improvements.push('শুরুতে একটি উপযুক্ত সম্ভাষণ (যেমন: "Dear Sir," বা "Hi Tanvir,") দিন।');
      if (!hasClosing) improvements.push('শেষে সমাপনী ক্লোজিং (যেমন: "Sincerely yours," বা "Best wishes,") ও নাম লিখুন।');
    }
  } else if (options.type === 'paragraph') {
    // Check paragraph 5-step indicators
    const hasIntro = /can (bring|play|help|create|make)/i.test(cleanText) || sentenceCount >= 1;
    const hasConnectors = /(first|second|third|furthermore|moreover|in addition|also|besides|additionally)/i.test(cleanText);
    const hasConclusion = /(in this way|in conclusion|to conclude|overall|therefore|thus|hence|finally)/i.test(cleanText);

    let pPoints = 0.5; // base for writing
    if (hasIntro) pPoints += 0.3;
    if (hasConnectors) {
      pPoints += 0.4;
      strengths.push('বাক্যের ধারাবাহিকতা রক্ষায় লিংকার্স (First, Second, Third/Furthermore) দারুণ ব্যবহার করেছেন।');
    } else {
      improvements.push('পয়েন্টগুলো গুছিয়ে উপস্থাপন করতে First, Second, Third বা Furthermore ব্যবহার করুন।');
    }

    if (hasConclusion) {
      pPoints += 0.3;
      strengths.push('অনুচ্ছেদের শেষে একটি শক্তিশালী উপসংহার বাক্য (In this way/Therefore) রয়েছে।');
    } else {
      improvements.push('শেষে "In this way, [Topic] plays a vital role..." দিয়ে একটি সফল ইতি টানুন।');
    }

    structureScore = Math.min(1.5, Number(pPoints.toFixed(2)));
    hasProperFormat = sentenceCount >= 3;
  } else {
    // Short question
    let qPoints = 0.8;
    if (sentenceCount >= 2) qPoints += 0.4;
    if (cleanText.length > 50) qPoints += 0.3;
    structureScore = Math.min(1.5, Number(qPoints.toFixed(2)));
    hasProperFormat = sentenceCount >= 2;
  }

  // 2. Keyword & Content Relevance Evaluation (Max 2.0)
  const totalExpected = options.expectedKeywords.length || 5;
  const matchRatio = detectedKeywords.length / totalExpected;
  let keywordScore = Number((matchRatio * 2.0).toFixed(2));
  if (keywordScore > 2.0) keywordScore = 2.0;
  if (keywordScore < 0.4 && wordCount >= 20) keywordScore = 0.5; // Minimum effort credit

  if (matchRatio >= 0.6) {
    strengths.push(`বিষয়টির বেশিরভাগ মূল শব্দ ও কনসেপ্ট (${detectedKeywords.slice(0, 4).join(', ')}) সুন্দরভাবে ফুটিয়ে তুলেছেন।`);
  } else if (missingKeywords.length > 0) {
    improvements.push(`লেখায় আরও কিছু প্রাসঙ্গিক কি-ওয়ার্ড যেমন: (${missingKeywords.slice(0, 3).join(', ')}) অন্তর্ভুক্ত করলে নম্বর বৃদ্ধি পাবে।`);
  }

  // 3. Length & Fluency Evaluation (Max 1.5)
  const minW = options.minWords || 35;
  const maxW = options.maxWords || 180;
  let lengthScore = 0;

  if (wordCount >= minW && wordCount <= maxW) {
    lengthScore = 1.5;
    strengths.push(`শব্দ সংখ্যা (${wordCount} টি শব্দ) পরীক্ষার নির্ধারিত পরিধির মধ্যে যথাযথ রয়েছে।`);
  } else if (wordCount < minW) {
    const ratio = wordCount / minW;
    lengthScore = Math.max(0.4, Number((ratio * 1.5).toFixed(2)));
    improvements.push(`আপনার লেখাটি কিছুটা সংক্ষিপ্ত (${wordCount} শব্দ)। পূর্ণ নম্বরের জন্য অন্তত ${minW}টি শব্দে বিস্তারিত লিখুন।`);
  } else {
    // Too long
    lengthScore = 1.2;
    improvements.push(`লেখাটি বেশ দীর্ঘ (${wordCount} শব্দ)। ভর্তি পরীক্ষায় সময় বাঁচাতে সংক্ষিপ্ত ও নির্ভুল লেখায় জোর দিন।`);
  }

  // Calculate Total Score (out of 5.0)
  let totalScore = Number((structureScore + keywordScore + lengthScore).toFixed(1));
  if (totalScore > 5.0) totalScore = 5.0;
  if (totalScore < 0.5 && wordCount > 5) totalScore = 1.0;

  const percentage = Math.round((totalScore / 5.0) * 100);

  // Grade calculation
  let grade: 'A+' | 'A' | 'A-' | 'B' | 'C' | 'F' = 'B';
  let gradeTitleBn = '';
  let gradeColor = '';
  let summaryFeedbackBn = '';

  if (totalScore >= 4.5) {
    grade = 'A+';
    gradeTitleBn = '🌟 অসাধারণ (পূর্ণাঙ্গ ও আদর্শ মান)';
    gradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    summaryFeedbackBn = 'চমৎকার প্রস্তুতি! আপনার লেখাটি পরীক্ষার স্ট্যান্ডার্ড অনুযায়ী অত্যন্ত সমৃদ্ধ ও গোছানো। এভাবেই বজায় রাখুন!';
  } else if (totalScore >= 4.0) {
    grade = 'A';
    gradeTitleBn = '🎯 চমৎকার (খুব ভালো মান)';
    gradeColor = 'text-teal-700 bg-teal-50 border-teal-300';
    summaryFeedbackBn = 'খুবই সুন্দর উপস্থাপনা। মূলভাব ও কাঠামো দারুণ হয়েছে, সামান্য কিছু কি-ওয়ার্ড যোগ করলে সহজেই ৫-এ ৫ পাওয়া সম্ভব।';
  } else if (totalScore >= 3.0) {
    grade = 'A-';
    gradeTitleBn = '👍 সন্তোষজনক (পাসিং স্ট্যান্ডার্ড)';
    gradeColor = 'text-blue-700 bg-blue-50 border-blue-300';
    summaryFeedbackBn = 'আপনার লেখার ভিত্তি ঠিক আছে। তবে বাক্য গঠন ও মূল কি-ওয়ার্ড কভারেজ আরও বাড়ালে নম্বর আরও বাড়বে।';
  } else if (totalScore >= 2.0) {
    grade = 'B';
    gradeTitleBn = '📝 উন্নতি প্রয়োজন (গড় মান)';
    gradeColor = 'text-amber-700 bg-amber-50 border-amber-300';
    summaryFeedbackBn = 'ফরম্যাট ও প্রয়োজনীয় তথ্যে কিছু ঘাটতি রয়েছে। নিচের মডেল উত্তরটি দেখে পয়েন্টগুলো সংশোধন করে পুনরায় লিখুন।';
  } else {
    grade = 'C';
    gradeTitleBn = '⚠️ আরও বেশি অনুশীলন প্রয়োজন';
    gradeColor = 'text-rose-700 bg-rose-50 border-rose-300';
    summaryFeedbackBn = 'লেখাটি বেশ সংক্ষিপ্ত ও অসম্পূর্ণ। আমাদের ৫-লাইনের সার্বজনীন সূত্রটি মুখস্থ করে আবার চেষ্টা করুন।';
  }

  const metrics: RubricMetric[] = [
    {
      name: 'Structure & Format',
      nameBn: 'গঠন ও ফরমেটিং',
      score: structureScore,
      maxScore: 1.5,
      feedback: structureScore >= 1.2 ? 'কাঠামো ও লেআউট যথার্থ হয়েছে' : 'ফরম্যাটের নিয়মগুলোতে উন্নতি প্রয়োজন'
    },
    {
      name: 'Keyword & Content',
      nameBn: 'মূলভাব ও প্রাসঙ্গিক তথ্য',
      score: keywordScore,
      maxScore: 2.0,
      feedback: keywordScore >= 1.5 ? 'বিষয়ভিত্তিক প্রয়োজনীয় পয়েন্ট উল্লেখ রয়েছে' : 'আরও কিছু মূল কনসেপ্ট যুক্ত করা দরকার'
    },
    {
      name: 'Length & Fluency',
      nameBn: 'শব্দ দৈর্ঘ্য ও সাবলীলতা',
      score: lengthScore,
      maxScore: 1.5,
      feedback: lengthScore >= 1.2 ? 'শব্দ সংখ্যা ও বাক্যের পরিধি উপযুক্ত' : 'নির্ধারিত শব্দ সংখ্যার কাছাকাছি রাখা দরকার'
    }
  ];

  return {
    score: totalScore,
    maxScore: 5.0,
    percentage,
    grade,
    gradeTitleBn,
    gradeColor,
    summaryFeedbackBn,
    strengths,
    improvements,
    metrics,
    detectedKeywords,
    missingKeywords: missingKeywords.slice(0, 5),
    wordCount,
    sentenceCount,
    hasProperFormat
  };
}
