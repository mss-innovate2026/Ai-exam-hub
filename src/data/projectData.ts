import { DistrictStat } from '../types';

export const projectOverview = {
  title: 'তথ্যপ্রযুক্তি জ্ঞানসম্পন্ন যুবদের কৃত্রিম বুদ্ধিমত্তা (এআই) প্রযুক্তির মাধ্যমে দক্ষতা উন্নয়ন প্রকল্প',
  ministry: 'যুব ও ক্রীড়া মন্ত্রণালয়',
  executingAgency: 'যুব উন্নয়ন অধিদপ্তর (DYD)',
  officialPortal: 'dydaiproject.com',
  duration: '২ বছর মেয়াদী (২০২৪-২০২৬)',
  totalTrainees: 11200,
  basicTrainees: 9600,
  advancedTrainees: 1600,
  totalBatches: 448,
  batchCapacity: 25,
  districtsCovered: 64,
  courseDuration: '২ মাস (৫০টি ক্লাস, মোট ৩০০ ঘণ্টা)',
  allowanceBenefit: 'সম্পূর্ণ বিনামূল্যে প্রশিক্ষণ + দৈনিক যাতায়াত ও প্রশিক্ষণ ভাতা + সরকারি সনদপত্র',
  selectionStages: [
    {
      step: 'ধাপ ১: লিখিত পরীক্ষা (Written Exam)',
      marks: '৪০ নম্বর (৩০ MCQ + ১০ লিখিত)',
      details: 'এমসিকিউ ও সংক্ষিপ্ত ইংরেজি প্যারাগ্রাফ/ইমেইল লেখার মাধ্যমে প্রাথমিক বাছাই।'
    },
    {
      step: 'ধাপ ২: ব্যবহারিক পরীক্ষা (Practical Test)',
      marks: 'কম্পিউটার হ্যান্ডস-অন টেস্ট',
      details: 'এমএস ওয়ার্ডে ডকুমেন্ট ফরম্যাটিং, এক্সেলে হিসাব, ক্যানভা/ফটোশপে ব্যানার এবং এআই চ্যাটবটে প্রম্পট লেখার দক্ষতা যাচাই।'
    },
    {
      step: 'ধাপ ৩: মৌখিক পরীক্ষা (Viva Voce)',
      marks: 'ব্যক্তিত্ব ও আগ্রহ মূল্যায়ন',
      details: 'আইসিটি জ্ঞান, ফ্রিল্যান্সিংয়ে আগ্রহ, নিয়মিত ক্লাসে উপস্থিত থাকার মানসিকতা যাচাই।'
    }
  ],
  tools: {
    basic: [
      { name: 'ChatGPT', role: 'Conversational LLM & Prompt' },
      { name: 'Microsoft Copilot', role: 'Productivity Assistant' },
      { name: 'DeepSeek', role: 'Logic & Reasoning LLM' },
      { name: 'Google Gemini', role: 'Multimodal Research & AI' },
      { name: 'Grammarly', role: 'English Grammar & Tone' },
      { name: 'QuillBot', role: 'Paraphrasing & Rephrasing' },
      { name: 'Jasper AI', role: 'Marketing Copywriting' },
      { name: 'Canva', role: 'AI Graphics & Posters' },
      { name: 'Pixlr', role: 'Online Photo Editing' },
      { name: 'InVideo AI', role: 'Text-to-Video Creation' },
      { name: 'ElevenLabs', role: 'AI Voice & Speech' }
    ],
    advanced: [
      { name: 'Runway', role: 'Generative Video & VFX' },
      { name: 'Synthesia', role: 'AI Human Avatars' },
      { name: 'Midjourney', role: 'Photorealistic Image Art' },
      { name: 'Tableau', role: 'Data Analysis & Visuals' },
      { name: 'Zapier', role: 'Workflow Automation' },
      { name: 'Descript', role: 'Audio/Video AI Editor' },
      { name: 'ClickUp', role: 'AI Project Management' },
      { name: 'Notion AI', role: 'Knowledge Management' },
      { name: 'Ahrefs', role: 'SEO & Backlink Auditing' },
      { name: 'Salesforce', role: 'AI-Powered CRM' },
      { name: 'HubSpot', role: 'Inbound Sales Automation' },
      { name: 'Copy.ai', role: 'Ad Copy & Sales Copy' },
      { name: 'Adobe Sensei', role: 'Intelligent Creative Suite' },
      { name: 'DALL-E', role: 'Image Generation' },
      { name: 'Google Veo', role: 'High-Definition Video AI' }
    ]
  },
  questionPaperWeightage: [
    { subject: 'ডিজিটাল মার্কেটিং ও ফ্রিল্যান্সিং', percentage: 36.7, count: '১১টি প্রশ্ন', color: '#0f766e' },
    { subject: 'ইংরেজি ব্যাকরণ ও শব্দভাণ্ডার', percentage: 13.3, count: '৪টি প্রশ্ন', color: '#0284c7' },
    { subject: 'গ্রাফিক্স ও ডিজাইন (Photoshop/Canva)', percentage: 13.3, count: '৪টি প্রশ্ন', color: '#8b5cf6' },
    { subject: 'এআই, ক্লাউড ও সাইবার সিকিউরিটি', percentage: 13.3, count: '৪টি প্রশ্ন', color: '#10b981' },
    { subject: 'নেটওয়ার্কিং ও ইন্টারনেট', percentage: 10.0, count: '৩টি প্রশ্ন', color: '#f59e0b' },
    { subject: 'এমএস অফিস (Word/Excel/PPT)', percentage: 10.0, count: '৩টি প্রশ্ন', color: '#06b6d4' },
    { subject: 'কম্পিউটার বেসিক ও হার্ডওয়্যার', percentage: 3.3, count: '১টি প্রশ্ন', color: '#64748b' }
  ]
};

export const sampleDistrictData: DistrictStat[] = [
  {
    name: 'বরিশাল (Barisal)',
    division: 'বরিশাল',
    estimatedApplicants: 1297,
    estimatedExaminees: 781,
    basicSeats: 150,
    advancedSeats: 25,
    totalSeats: 175,
    passLikelihoodFromExaminees: '২২.৪%'
  },
  {
    name: 'ঢাকা (Dhaka)',
    division: 'ঢাকা',
    estimatedApplicants: 3800,
    estimatedExaminees: 2400,
    basicSeats: 300,
    advancedSeats: 50,
    totalSeats: 350,
    passLikelihoodFromExaminees: '১৪.৬%'
  },
  {
    name: 'চট্টগ্রাম (Chattogram)',
    division: 'চট্টগ্রাম',
    estimatedApplicants: 2500,
    estimatedExaminees: 1600,
    basicSeats: 225,
    advancedSeats: 35,
    totalSeats: 260,
    passLikelihoodFromExaminees: '১৬.৩%'
  },
  {
    name: 'রাজশাহী (Rajshahi)',
    division: 'রাজশাহী',
    estimatedApplicants: 1400,
    estimatedExaminees: 850,
    basicSeats: 150,
    advancedSeats: 25,
    totalSeats: 175,
    passLikelihoodFromExaminees: '২০.৬%'
  },
  {
    name: 'খুলনা (Khulna)',
    division: 'খুলনা',
    estimatedApplicants: 1350,
    estimatedExaminees: 820,
    basicSeats: 150,
    advancedSeats: 25,
    totalSeats: 175,
    passLikelihoodFromExaminees: '২১.৩%'
  },
  {
    name: 'সিলেট (Sylhet)',
    division: 'সিলেট',
    estimatedApplicants: 1250,
    estimatedExaminees: 750,
    basicSeats: 150,
    advancedSeats: 25,
    totalSeats: 175,
    passLikelihoodFromExaminees: '২৩.৩%'
  },
  {
    name: 'রংপুর (Rangpur)',
    division: 'রংপুর',
    estimatedApplicants: 1450,
    estimatedExaminees: 890,
    basicSeats: 150,
    advancedSeats: 25,
    totalSeats: 175,
    passLikelihoodFromExaminees: '১৯.৭%'
  },
  {
    name: 'ময়মনসিংহ (Mymensingh)',
    division: 'ময়মনসিংহ',
    estimatedApplicants: 1300,
    estimatedExaminees: 800,
    basicSeats: 150,
    advancedSeats: 25,
    totalSeats: 175,
    passLikelihoodFromExaminees: '২১.৯%'
  }
];
