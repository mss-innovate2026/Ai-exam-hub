import { VivaQuestion, PracticalTask } from '../types';

export const vivaQuestions: VivaQuestion[] = [
  {
    id: 'viva-1',
    category: 'personal',
    questionBn: 'আপনার নিজের সম্পর্কে সংক্ষেপে বলুন এবং কেন এই এআই কোর্সে ভর্তি হতে চান?',
    questionEn: 'Introduce yourself briefly and why do you want to join this AI course?',
    suggestedAnswerBn: 'নিজের নাম, শিক্ষাগত যোগ্যতা ও এলাকার নাম স্পষ্ট করে বলে বলুন: "আমি বর্তমান ডিজিটাল যুগের কৃত্রিম বুদ্ধিমত্তা ও ফ্রিল্যান্সিং দক্ষতা অর্জন করে স্বাবলম্বী হতে চাই। যুব উন্নয়ন অধিদপ্তরের এই সরকারি প্রশিক্ষণটি মানসম্মত এবং হাতে-কলমে শেখার সুযোগ রয়েছে বলেই আমি এতে যোগ দিতে আগ্রহী।"',
    keyPoints: [
      'স্পষ্ট ও আত্মবিশ্বাসী কণ্ঠস্বরে উত্তর দিন',
      'প্রযুক্তির প্রতি গভীর আগ্রহ ও সময় দেওয়ার প্রতিশ্রুতি ব্যক্ত করুন',
      'নিজের ভবিষ্যৎ ক্যারিয়ার লক্ষ্যের সাথে কোর্সের মেলবন্ধন দেখান'
    ]
  },
  {
    id: 'viva-2',
    category: 'ai',
    questionBn: 'কৃত্রিম বুদ্ধিমত্তা (AI) কি এবং এটি বর্তমান কর্মসংস্থানে কি প্রভাব ফেলছে?',
    questionEn: 'What is Artificial Intelligence and how is it impacting current employment?',
    suggestedAnswerBn: 'এআই হলো এমন কম্পিউটার প্রযুক্তি যা মানুষের মতো চিন্তা, শেখা ও সিদ্ধান্ত নিতে সক্ষম। এআই মানুষের চাকরি পুরোপুরি কেড়ে নিচ্ছে না, বরং যারা এআই টুল ব্যবহার করতে পারে তারা সাধারণ কর্মচারীর চেয়ে দশগুণ দ্রুত কাজ করতে পারছে। তাই এআই জানা মানুষদের চাহিদা হু হু করে বাড়ছে।',
    keyPoints: [
      'সহজ ভাষায় বাস্তব উদাহরণ দিন (যেমন ChatGPT, Copilot, Canva AI)',
      'ইতিবাচক দৃষ্টিকোণ থেকে এআইকে কাজের সহায়ক হিসেবে উপস্থাপন করুন'
    ]
  },
  {
    id: 'viva-3',
    category: 'freelancing',
    questionBn: 'ফ্রিল্যান্সিং কি? বাংলাদেশে বসে কি সত্যিই আন্তর্জাতিক বাজার থেকে আয় করা সম্ভব?',
    questionEn: 'What is freelancing? Is it really possible to earn in international currency from Bangladesh?',
    suggestedAnswerBn: 'ফ্রিল্যান্সিং হলো কোনো প্রতিষ্ঠানে স্থায়ী চাকরি না করে স্বাধীনভাবে নিজের দক্ষতার বিনিময়ে চুক্তিভিত্তিক কাজ করা। হ্যাঁ, Fiverr, Upwork-এর মতো বৈশ্বিক প্ল্যাটফর্মে কোটি কোটি টাকার বৈদেশিক মুদ্রা বাংলাদেশের তরুণরা ঘরে বসেই অর্জন করছে এবং পেওনিয়ার বা লোকাল ব্যাংকে তা আনছে।',
    keyPoints: [
      'জনপ্রিয় মার্কেটপ্লেসের নাম উল্লেখ করুন (Upwork, Fiverr)',
      'পেমেন্ট মেথড (Payoneer, Bank Wire) সম্পর্কে প্রাথমিক ধারণা রাখুন'
    ]
  },
  {
    id: 'viva-4',
    category: 'computer',
    questionBn: 'মাইক্রোসফট এক্সেলে =SUM() ও =AVERAGE() ফাংশন কীভাবে কাজ করে?',
    questionEn: 'How do =SUM() and =AVERAGE() functions work in Microsoft Excel?',
    suggestedAnswerBn: '=SUM(A1:A10) ফাংশনটি A1 থেকে A10 সেলগুলোর সংখ্যার মোট যোগফল বের করে। আর =AVERAGE(A1:A10) ফাংশনটি সেই যোগফলকে মোট সংখ্যা দিয়ে ভাগ করে স্বয়ংক্রিয়ভাবে গড় নির্ণয় করে।',
    keyPoints: [
      'সেল রেফারেন্স ও সিনট্যাক্স সঠিকভাবে বলুন',
      'অফিসিয়াল কাজের উদাহরণ দিন'
    ]
  },
  {
    id: 'viva-5',
    category: 'general',
    questionBn: 'কোর্সের ২ মাস নিয়মিত উপস্থিত থাকতে পারবেন তো? আপনার কি নিজস্ব কম্পিউটার বা ল্যাপটপ আছে?',
    questionEn: 'Can you maintain regular attendance for 2 months? Do you have access to a computer?',
    suggestedAnswerBn: '"হ্যাঁ স্যার, আমি শতভাগ উপস্থিতি বজায় রাখতে সম্পূর্ণ প্রস্তুত। কোর্সের ৩০০ ঘণ্টার প্রশিক্ষণ সফলভাবে শেষ করার জন্য আমি প্রতিদিন সময় বরাদ্দ রেখেছি। আমার বাসায় কম্পিউটার/ল্যাপটপ এবং ইন্টারনেট সংযোগ রয়েছে, যা ক্লাসের বাইরে প্র্যাকটিস করতে সাহায্য করবে।" (ল্যাপটপ না থাকলেও যুব উন্নয়নের ল্যাবে এসে প্র্যাকটিস করার তীব্র ইচ্ছা প্রকাশ করবেন)।',
    keyPoints: [
      'সময়নিষ্ঠতা ও অঙ্গীকার সবচেয়ে বেশি গুরুত্ব পায়',
      'কোনো অজুহাত না দেখিয়ে ইতিবাচক প্রত্যয় জানান'
    ]
  }
];

export const practicalTasks: PracticalTask[] = [
  {
    id: 'prac-1',
    module: 'MS Word (ডকুমেন্ট প্রস্তুতি)',
    taskTitle: 'অফিসিয়াল সিভি বা আবেদনপত্র তৈরি ও ফরম্যাটিং',
    instructions: [
      'একটি নতুন MS Word ডকুমেন্ট খুলুন এবং মার্জিন Normal (1 inch) সেট করুন।',
      'ফন্ট সাইজ Heading-এর জন্য 14pt Bold এবং Body Text-এর জন্য 11pt/12pt নির্বাচন করুন।',
      'Header-এ আপনার নাম ও রোল নম্বর এবং Footer-এ Page Number যুক্ত করুন।',
      'একটি ৩ কলাম ও ৪ সারির Table তৈরি করে শিক্ষাগত যোগ্যতা সাজান।',
      'Spelling & Grammar Check (F7) সম্পন্ন করে ফাইলটি .docx ফরম্যাটে সেভ করুন।'
    ],
    keyToolsUsed: ['Font formatting', 'Table insert', 'Header/Footer', 'Margins', 'Save As'],
    expectedOutput: 'সুন্দর বিন্যস্ত, টাইপোমুক্ত প্রফেশনাল ১ পাতার ডক্যুমেন্ট।'
  },
  {
    id: 'prac-2',
    module: 'MS Excel (হিসাব ও ফর্মুলা)',
    taskTitle: 'স্টুডেন্ট মার্কশিট বা সেলস ডাটাশিট ক্যালকুলেশন',
    instructions: [
      'A1 থেকে E1 পর্যন্ত হেডারে Name, Subject 1, Subject 2, Total, Average লিখুন।',
      'কমপক্ষে ৫ জন শিক্ষার্থীর নম্বর এন্ট্রি করুন।',
      'Total কলামে =SUM(B2:C2) ফর্মুলা দিয়ে যোগফল বের করুন।',
      'Average কলামে =AVERAGE(B2:C2) ফর্মুলা দিয়ে গড় বের করুন।',
      'অটোফিল (Fill Handle) টেনে বাকি সবার হিসাব এক সেকেন্ডে শেষ করুন।',
      'যারা ৮০-এর বেশি পেয়েছে তাদের Conditional Formatting দিয়ে সবুজ রঙে হাইলাইট করুন।'
    ],
    keyToolsUsed: ['=SUM()', '=AVERAGE()', 'AutoFill', 'Conditional Formatting', 'Cell borders'],
    expectedOutput: 'স্বয়ংক্রিয় ফর্মুলাযুক্ত নির্ভুল এক্সেল শিট।'
  },
  {
    id: 'prac-3',
    module: 'Canva / Graphics (ডিজিটাল ব্যানার)',
    taskTitle: 'সোশ্যাল মিডিয়া প্রমোশনাল ব্যানার ডিজাইন',
    instructions: [
      'Canva.com বা ফটোশপে গিয়ে 1080x1080 px (Instagram/Facebook Post) সাইজ নিন।',
      'কোর্সের প্রচারণামূলক একটি হেডিং যোগ করুন: "AI Skill Development Course 2026"।',
      'প্রাসঙ্গিক একটি টেকনোলজি আইকন বা ছবি যুক্ত করুন।',
      'ক্লিয়ার Call To Action (যেমন: "Apply Now", "Free Admission") বাটন যুক্ত করুন।',
      'কালার কম্বিনেশন ৩টির মধ্যে সীমাবদ্ধ রাখুন এবং PNG ফরম্যাটে ডাউনলোড করুন।'
    ],
    keyToolsUsed: ['Canva Templates', 'Typography', 'Elements', 'PNG Export'],
    expectedOutput: 'দৃষ্টি আকর্ষণকারী ব্যানার যা ডিজিটাল মার্কেটিংয়ে ব্যবহারযোগ্য।'
  },
  {
    id: 'prac-4',
    module: 'Generative AI Prompting (এআই টুল ব্যবহার)',
    taskTitle: 'ChatGPT / Copilot দিয়ে প্রফেশনাল প্রম্পট তৈরি ও আউটপুট যাচাই',
    instructions: [
      'ব্রাউজারে ChatGPT বা Gemini ওপেন করুন।',
      'একটি সুনির্দিষ্ট প্রম্পট লিখুন: "Act as an expert digital marketer. Write 3 compelling Facebook ad headlines for an AI training course for youth."',
      'আউটপুট দেখে পুনরায় ফিল্টার প্রম্পট দিন: "Make them shorter and in Bengali language."',
      'লেখাটি কপি করে Grammarly বা QuillBot-এ পরীক্ষা করে উপস্থাপন করুন।'
    ],
    keyToolsUsed: ['Role Prompting', 'Contextual Instructions', 'Multilingual Output', 'Refinement'],
    expectedOutput: 'সুনির্দিষ্ট এআই আউটপুট যা প্রম্পট ইঞ্জিনিয়ারিং দক্ষতার প্রমাণ দেয়।'
  }
];
