export interface ParagraphTopic {
  id: string;
  title: string;
  banglaTitle: string;
  topicPlaceholder: string;
  groupPlaceholder: string;
  modelParagraph: string;
  banglaMeaning: string;
  keyPoints: string[];
  expectedKeywords: string[];
  examinerTips: string;
  vocabulary: { word: string; meaning: string; usage: string }[];
  sentenceBreakdown: {
    step: string;
    english: string;
    bangla: string;
    purpose: string;
  }[];
}

export interface EmailScenario {
  id: string;
  title: string;
  banglaTitle: string;
  subject: string;
  receiver: string;
  sender: string;
  salutation: string;
  bodyPurpose: string;
  bodyDetails: string;
  bodyBenefit: string;
  closingLine: string;
  fullSample: string;
  banglaTranslation: string;
  expectedKeywords: string[];
  keyFormattingRules: string[];
  examinerTips: string;
}

export interface WrittenQuestionItem {
  id: string;
  questionBn: string;
  questionEn: string;
  marks: number;
  category: string;
  detailedModelAnswerBn: string;
  detailedModelAnswerEn: string;
  keyPoints: string[];
  expectedKeywords: string[];
  examinerChecklist: string[];
  deepExplanation: string;
}

export const paragraphFormula = {
  step1: {
    label: 'লাইন ১ (Introduction & Topic Hook)',
    formula: '[TOPIC] can bring a lot of positive change to [PLACE/GROUP].',
    instruction: 'বিষয়টির নাম উল্লেখ করে কার জন্য এটি যুগান্তকারী ইতিবাচক পরিবর্তন আনবে তা স্পষ্ট করা।'
  },
  step2: {
    label: 'লাইন ২ (Skill & Modern Learning)',
    formula: 'First, it can help people learn new skills quickly through easy and modern methods.',
    instruction: 'প্রথম যুক্তি হিসেবে আধুনিক ডিজিটাল পদ্ধতিতে দ্রুত দক্ষতা অর্জনের সুযোগ তুলে ধরা।'
  },
  step3: {
    label: 'লাইন ৩ (Productivity & Opportunity)',
    formula: 'Second, it can create new opportunities and make work faster, easier, and more efficient.',
    instruction: 'দ্বিতীয় যুক্তি হিসেবে উৎপাদনশীলতা, সময় সাশ্রয় ও কাজের সহজীকরণ ব্যাখ্যা করা।'
  },
  step4: {
    label: 'লাইন ৪ (Income & Practical Value)',
    formula: 'Third, it can help young people earn better income and reduce hard manual work.',
    instruction: 'তৃতীয় যুক্তি হিসেবে স্মার্ট আয়ের পথ তৈরি এবং কায়িক পরিশ্রম লাঘবের কথা বলা।'
  },
  step5: {
    label: 'লাইন ৫ (Strong Conclusion & Vision)',
    formula: 'In this way, [TOPIC] can play a vital role in building a better future for [PLACE/GROUP].',
    instruction: 'সমাপনী বাক্যে সার্বিক সাফল্য ও উজ্জ্বল ভবিষ্যৎ নিশ্চিত করার প্রত্যয় দিয়ে শেষ করা।'
  }
};

export const sampleTopics: ParagraphTopic[] = [
  {
    id: 'topic_ai_youth',
    title: 'AI & Youth Employment in Bangladesh',
    banglaTitle: 'বাংলাদেশে এআই ও যুব কর্মসংস্থান',
    topicPlaceholder: 'Artificial Intelligence',
    groupPlaceholder: 'the youth of Bangladesh',
    modelParagraph: 'Artificial Intelligence can bring a lot of positive change to the youth of Bangladesh. First, it can help people learn new skills quickly through easy and modern methods. Second, it can create new opportunities and make work faster, easier, and more efficient in local and global markets. Third, it can help young people earn better income through freelancing and reduce hard manual work. In this way, Artificial Intelligence can play a vital role in building a better future for the youth of Bangladesh.',
    banglaMeaning: 'কৃত্রিম বুদ্ধিমত্তা বাংলাদেশের যুবসমাজের জন্য ব্যাপক ইতিবাচক পরিবর্তন বয়ে আনতে পারে। প্রথমত, এটি সহজ ও আধুনিক পদ্ধতির মাধ্যমে মানুষকে দ্রুত নতুন দক্ষতা অর্জনে সহায়তা করে। দ্বিতীয়ত, এটি দেশীয় ও বৈশ্বিক বাজারে নতুন সুযোগ তৈরি করে এবং কাজকে দ্রুততর, সহজতর ও অধিক ফলপ্রসূ করে তোলে। তৃতীয়ত, এটি তরুণদের ফ্রিল্যান্সিংয়ের মাধ্যমে উন্নত আয়ের সুযোগ দেয় এবং শারীরিক কায়িক পরিশ্রম হ্রাস করে। এভাবে কৃত্রিম বুদ্ধিমত্তা বাংলাদেশের তরুণদের একটি উন্নত ভবিষ্যৎ নির্মাণে গুরুত্বপূর্ণ ভূমিকা পালন করতে পারে।',
    keyPoints: [
      'তরুণদের আধুনিক এআই দক্ষতা (Prompt Engineering, Automation) অর্জন',
      'আন্তর্জাতিক ফ্রিল্যান্সিং মার্কেটে প্রতিযোগিতামূলক সুবিধা',
      'প্রথাগত কায়িক শ্রমের বদলে স্মার্ট জ্ঞানভিত্তিক কর্মসংস্থান',
      'দেশীয় অর্থনীতিতে বৈদেশিক মুদ্রার প্রবাহ বৃদ্ধি'
    ],
    expectedKeywords: ['artificial intelligence', 'youth', 'bangladesh', 'skills', 'opportunities', 'efficient', 'income', 'freelancing', 'future', 'modern'],
    examinerTips: 'প্যারাগ্রাফ লেখার সময় বিষয়বস্তু AI এর সাথে youth ও employment এর যোগসূত্রটি স্পষ্ট রাখা আবশ্যক। First, Second, Third লিংকার্স ব্যবহারে উপস্থাপনা গোছানো থাকে এবং ফুল মার্কস নিশ্চিত হয়।',
    vocabulary: [
      { word: 'Artificial Intelligence', meaning: 'কৃত্রিম বুদ্ধিমত্তা', usage: 'AI automates repetitive digital tasks.' },
      { word: 'Employment', meaning: 'কর্মসংস্থান বা চাকরি', usage: 'Youth employment is essential for economic growth.' },
      { word: 'Efficient', meaning: 'দক্ষ ও ফলপ্রসূ', usage: 'Modern tools make operations more efficient.' },
      { word: 'Vital role', meaning: 'অপরিহার্য ভূমিকা', usage: 'Technology plays a vital role in education.' }
    ],
    sentenceBreakdown: [
      { step: 'Topic Hook', english: 'Artificial Intelligence can bring a lot of positive change to the youth of Bangladesh.', bangla: 'মূল বিষয়ের সূচনা ও টার্গেট গ্রুপ নির্ধারণ।', purpose: 'বিষয়বস্তু পরিচয় করিয়ে দেওয়া' },
      { step: 'Point 1', english: 'First, it can help people learn new skills quickly through easy and modern methods.', bangla: 'প্রথম সুফল: দ্রুত নতুন দক্ষতা অর্জন।', purpose: 'দক্ষতা উন্নয়নের প্রমাণ দেওয়া' },
      { step: 'Point 2', english: 'Second, it can create new opportunities and make work faster, easier, and more efficient.', bangla: 'দ্বিতীয় সুফল: গতিশীলতা ও নতুন সুযোগ সৃষ্টি।', purpose: 'কর্মদক্ষতা বৃদ্ধির ব্যাখ্যা' },
      { step: 'Point 3', english: 'Third, it can help young people earn better income through freelancing and reduce hard manual work.', bangla: 'তৃতীয় সুফল: ফ্রিল্যান্সিংয়ে আয় বৃদ্ধি।', purpose: 'অর্থনৈতিক সুবিধার উল্লেখ' },
      { step: 'Conclusion', english: 'In this way, Artificial Intelligence can play a vital role in building a better future for the youth of Bangladesh.', bangla: 'পরিশেষে: ভবিষ্যৎ সাফল্যের চূড়ান্ত মূল্যায়ন।', purpose: 'দৃঢ় সমাপ্তি' }
    ]
  },
  {
    id: 'topic_freelancing_unemployment',
    title: 'Freelancing Reducing Unemployment in Bangladesh',
    banglaTitle: 'বেকারত্ব দূরীকরণে ফ্রিল্যান্সিংয়ের ভূমিকা',
    topicPlaceholder: 'Freelancing',
    groupPlaceholder: 'unemployed youth in Bangladesh',
    modelParagraph: 'Freelancing can bring a lot of positive change to unemployed youth in Bangladesh. First, it can help people learn marketable skills quickly through easy and modern online platforms. Second, it can create new opportunities and make international work faster, easier, and accessible from home. Third, it can help young professionals earn better foreign income and reduce dependence on limited government jobs. In this way, Freelancing can play a vital role in eliminating unemployment and building a self-reliant future for Bangladesh.',
    banglaMeaning: 'ফ্রিল্যান্সিং বাংলাদেশের বেকার তরুণদের জন্য বিশাল ইতিবাচক পরিবর্তন বয়ে আনতে পারে। প্রথমত, এটি সহজ ও আধুনিক অনলাইন প্ল্যাটফর্মের মাধ্যমে মানুষকে চাহিদাসম্পন্ন দক্ষতা দ্রুত শিখতে সহায়তা করে। দ্বিতীয়ত, এটি নতুন সুযোগ সৃষ্টি করে এবং আন্তর্জাতিক কাজ ঘরে বসেই দ্রুত ও সহজে করার সুযোগ করে দেয়। তৃতীয়ত, এটি তরুণদের বৈদেশিক মুদ্রা অর্জনের পথ সুগম করে এবং সীমিত সরকারি চাকরির ওপর নির্ভরতা কমায়। এভাবে ফ্রিল্যান্সিং বেকারত্ব দূর করে বাংলাদেশকে আত্মনির্ভরশীল করতে গুরুত্বপূর্ণ ভূমিকা পালন করতে পারে।',
    keyPoints: [
      'ঘরে বসেই আন্তর্জাতিক মার্কেটপ্লেসে (Fiverr, Upwork) কাজের সুযোগ',
      'বৈদেশিক রেমিট্যান্স আয় বৃদ্ধি',
      'চাকরির সীমাবদ্ধতা কাটিয়ে আত্মকর্মসংস্থান সৃষ্টি',
      'দক্ষ জনশক্তিতে রূপান্তর'
    ],
    expectedKeywords: ['freelancing', 'unemployment', 'youth', 'bangladesh', 'skills', 'marketable', 'foreign income', 'international', 'self-reliant', 'future'],
    examinerTips: 'ঘরে বসে আয়ের সুযোগ (remote work) এবং বৈদেশিক মুদ্রা আয়ের কথা উল্লেখ করলে পরীক্ষকের নজর কাড়ে। বানান যেন নির্ভুল থাকে সেদিকে লক্ষ্য রাখবেন।',
    vocabulary: [
      { word: 'Unemployment', meaning: 'বেকারত্ব', usage: 'Freelancing helps solve youth unemployment.' },
      { word: 'Marketable skills', meaning: 'চাহিদাসম্পন্ন দক্ষতা', usage: 'Learn marketable skills like Web Design and AI.' },
      { word: 'Self-reliant', meaning: 'আত্মনির্ভরশীল', usage: 'We aim for a self-reliant economy.' },
      { word: 'Remittance', meaning: 'প্রবাস বা আউটসোর্সিং আয়', usage: 'Freelancers bring valuable foreign currency.' }
    ],
    sentenceBreakdown: [
      { step: 'Topic Hook', english: 'Freelancing can bring a lot of positive change to unemployed youth in Bangladesh.', bangla: 'ফ্রিল্যান্সিং কীভাবে বেকার তরুণদের ভাগ্য বদলে দেয় তা দিয়ে শুরু।', purpose: 'মূল সমস্যার সমাধান সূচনা' },
      { step: 'Point 1', english: 'First, it can help people learn marketable skills quickly through modern methods.', bangla: 'দক্ষতা অর্জনের গতিশীলতা।', purpose: 'বাজারমূল্যের ব্যাখ্যা' },
      { step: 'Point 2', english: 'Second, it can create new opportunities and make international work faster and easier.', bangla: 'গ্লোবাল রিমোট কাজের সুবিধা।', purpose: 'মার্কেটের পরিধি তুলে ধরা' },
      { step: 'Point 3', english: 'Third, it can help young professionals earn better foreign income and reduce job dependency.', bangla: 'ডলার আয় ও কর্মসংস্থান।', purpose: 'আর্থিক সচ্ছলতার প্রতিফলন' },
      { step: 'Conclusion', english: 'In this way, Freelancing can play a vital role in building a self-reliant future for Bangladesh.', bangla: 'আত্মনির্ভরশীল জাতি গঠনের উপসংহার।', purpose: 'ইতিবাচক সমাপ্তি' }
    ]
  },
  {
    id: 'topic_digital_skills',
    title: 'Importance of Digital Skills in Modern Careers',
    banglaTitle: 'আধুনিক কর্মজীবনে ডিজিটাল দক্ষতার গুরুত্ব',
    topicPlaceholder: 'Digital skills',
    groupPlaceholder: 'modern career seekers',
    modelParagraph: 'Digital skills can bring a lot of positive change to modern career seekers. First, it can help people learn essential computer and AI tools quickly through easy and modern methods. Second, it can create new opportunities and make workplace communication faster, easier, and more productive. Third, it can help professionals earn better income and reduce errors in daily tasks. In this way, Digital skills can play a vital role in building a prosperous career for the young generation.',
    banglaMeaning: 'ডিজিটাল দক্ষতা আধুনিক ক্যারিয়ার গড়ার প্রত্যাশীদের জন্য বিপুল ইতিবাচক পরিবর্তন আনতে পারে। প্রথমত, এটি মানুষকে প্রয়োজনীয় কম্পিউটার ও এআই টুলস দ্রুত আয়ত্ত করতে সাহায্য করে। দ্বিতীয়ত, এটি নতুন সুযোগ সৃষ্টি করে এবং কর্মক্ষেত্রে যোগাযোগকে অধিক দ্রুত, সহজ ও ফলপ্রসূ করে। তৃতীয়ত, এটি পেশাজীবীদের আয় বাড়াতে এবং দৈনন্দিন কাজের ভুলভ্রান্তি কমাতে সহায়তা করে। এভাবে ডিজিটাল দক্ষতা তরুণ প্রজন্মের সফল ও সমৃদ্ধ ক্যারিয়ার গঠনে অপরিহার্য ভূমিকা পালন করতে পারে।',
    keyPoints: [
      'কম্পিউটার লিটারেসি ও অফিস অ্যাপ্লিকেশনের অপরিহার্যতা',
      'কমিউনিকেশন ও ডেটা প্রসেসিং গতিশীল করা',
      'চাকরি ও ফ্রিল্যান্সিং উভয় ক্ষেত্রেই প্রতিযোগিতামূলক এগিয়ে থাকা'
    ],
    expectedKeywords: ['digital skills', 'careers', 'computer', 'communication', 'productive', 'opportunities', 'income', 'future', 'tools'],
    examinerTips: 'ডিজিটাল দক্ষতার ক্ষেত্রে MS Office, AI Tools, Graphic Design বা Communication-এর মতো নির্দিষ্ট শব্দ ব্যবহার লেখার মান বৃদ্ধি করে।',
    vocabulary: [
      { word: 'Career seekers', meaning: 'কর্মপ্রত্যাশী ব্যক্তিবর্গ', usage: 'Career seekers must acquire high-demand digital skills.' },
      { word: 'Productive', meaning: 'উৎপাদনশীল', usage: 'Automation tools make employees more productive.' },
      { word: 'Prosperous', meaning: 'সমৃদ্ধ ও সফল', usage: 'Digital learning ensures a prosperous future.' }
    ],
    sentenceBreakdown: [
      { step: 'Topic Hook', english: 'Digital skills can bring a lot of positive change to modern career seekers.', bangla: 'ডিজিটাল স্কিল ও ক্যারিয়ারের মেলবন্ধন।', purpose: 'টপিক প্রস্তাবনা' },
      { step: 'Point 1', english: 'First, it can help people learn essential tools quickly through modern methods.', bangla: 'টুলস শেখার সহজলভ্যতা।', purpose: 'দক্ষতার ভিত্তি স্থাপন' },
      { step: 'Point 2', english: 'Second, it can create new opportunities and make workplace communication faster.', bangla: 'কমিউনিকেশন ও সুযোগ বৃদ্ধি।', purpose: 'অফিস সক্ষমতা তুলে ধরা' },
      { step: 'Point 3', english: 'Third, it can help professionals earn better income and reduce errors.', bangla: 'আয় বৃদ্ধি ও নির্ভুল কাজ।', purpose: 'বাস্তব পেশাগত লাভ' },
      { step: 'Conclusion', english: 'In this way, Digital skills can play a vital role in building a prosperous career.', bangla: 'সমৃদ্ধ ক্যারিয়ারের সমাপনী।', purpose: 'চূড়ান্ত লক্ষ্য প্রকাশ' }
    ]
  },
  {
    id: 'topic_smart_bangladesh',
    title: 'Smart Bangladesh and the Role of Skilled Youth',
    banglaTitle: 'স্মার্ট বাংলাদেশ বিনির্মাণে দক্ষ যুবসমাজের ভূমিকা',
    topicPlaceholder: 'Skilled youth',
    groupPlaceholder: 'building a Smart Bangladesh',
    modelParagraph: 'Skilled youth can bring a lot of positive change to building a Smart Bangladesh. First, they can master advanced technologies like Artificial Intelligence, robotics, and cyber security quickly through modern training programs. Second, they can create new opportunities and make public and private services faster, transparent, and more efficient. Third, they can help our nation earn foreign remittances, innovate tech solutions, and reduce digital divide. In this way, Skilled youth can play a vital role in transforming our nation into an innovative knowledge-based economy.',
    banglaMeaning: 'স্মার্ট বাংলাদেশ বিনির্মাণে দক্ষ যুবসমাজ বিপুল ইতিবাচক পরিবর্তন বয়ে আনতে পারে। প্রথমত, তারা আধুনিক প্রশিক্ষণ কর্মসূচির মাধ্যমে কৃত্রিম বুদ্ধিমত্তা, রোবোটিক্স ও সাইবার নিরাপত্তার মতো উন্নত প্রযুক্তি দ্রুত আয়ত্ত করতে পারে। দ্বিতীয়ত, তারা নতুন সুযোগ সৃষ্টি করে নাগরিক ও প্রাতিষ্ঠানিক সেবাগুলোকে দ্রুততর, স্বচ্ছ ও ফলপ্রসূ করতে পারে। তৃতীয়ত, তারা দেশকে রেমিট্যান্স এনে দিতে, উদ্ভাবনী প্রযুক্তি সমাধান তৈরি করতে এবং ডিজিটাল বৈষম্য কমাতে সহায়তা করে। এভাবে দক্ষ যুবসমাজ আমাদের দেশকে একটি উদ্ভাবনী জ্ঞানভিত্তিক অর্থনীতিতে রূপান্তরে মুখ্য ভূমিকা পালন করতে পারে।',
    keyPoints: [
      'স্মার্ট সিটিজেন, স্মার্ট গভর্নমেন্ট, স্মার্ট ইকোনমি ও স্মার্ট সোসাইটি',
      'যুব উন্নয়ন অধিদপ্তরের এআই ও আইসিটি প্রশিক্ষণের প্রভাব',
      'জ্ঞানের ডিজিটাল রূপান্তর ও উদ্যোক্তা সৃষ্টি'
    ],
    expectedKeywords: ['smart bangladesh', 'skilled youth', 'artificial intelligence', 'technology', 'efficient', 'remittance', 'economy', 'innovation', 'training'],
    examinerTips: 'Smart Bangladesh এর ৪টি মূল স্তম্ভ (Smart Citizen, Economy, Government, Society) মনে রেখে উত্তর লিখলে পরীক্ষক সর্বোচ্চ নম্বর দেবেন।',
    vocabulary: [
      { word: 'Digital divide', meaning: 'প্রযুক্তিগত বৈষম্য', usage: 'Youth training eliminates the rural-urban digital divide.' },
      { word: 'Knowledge-based', meaning: 'জ্ঞানভিত্তিক', usage: 'We are moving toward a knowledge-based society.' },
      { word: 'Innovate', meaning: 'নতুন কিছু উদ্ভাবন করা', usage: 'Young minds innovate digital solutions for everyday problems.' }
    ],
    sentenceBreakdown: [
      { step: 'Topic Hook', english: 'Skilled youth can bring a lot of positive change to building a Smart Bangladesh.', bangla: 'স্মার্ট বাংলাদেশের স্বপ্ন ও যুবশক্তির সম্পর্ক।', purpose: 'জাতীয় লক্ষ্য তুলে ধরা' },
      { step: 'Point 1', english: 'First, they can master advanced technologies like AI and cyber security quickly.', bangla: 'উন্নত প্রযুক্তি শিক্ষায় যুবদের প্রাধান্য।', purpose: 'প্রযুক্তির সক্ষমতা' },
      { step: 'Point 2', english: 'Second, they can create new opportunities and make public services faster and transparent.', bangla: 'স্বচ্ছ ও গতিশীল সেবা ব্যবস্থা।', purpose: 'সুশাসনের প্রভাব' },
      { step: 'Point 3', english: 'Third, they can help our nation earn foreign remittances and innovate tech solutions.', bangla: 'অর্থনৈতিক শক্তি ও রেমিট্যান্স।', purpose: 'আর্থিক বিকাশ' },
      { step: 'Conclusion', english: 'In this way, Skilled youth can play a vital role in transforming our nation into a knowledge-based economy.', bangla: 'জ্ঞানভিত্তিক অর্থনীতির চূড়ান্ত রূপরেখা।', purpose: 'স্বপ্নের বাস্তবায়ন' }
    ]
  },
  {
    id: 'topic_cyber_security',
    title: 'Cyber Security Awareness in Daily Life',
    banglaTitle: 'দৈনন্দিন জীবনে সাইবার নিরাপত্তা সচেতনতা',
    topicPlaceholder: 'Cyber security awareness',
    groupPlaceholder: 'internet users in our country',
    modelParagraph: 'Cyber security awareness can bring a lot of positive change to internet users in our country. First, it can help people learn safe browsing habits and strong password management quickly through easy guidelines. Second, it can create safer opportunities and make digital financial transactions faster, protected, and more reliable. Third, it can help citizens safeguard their private personal data and reduce online fraud and cyber crimes. In this way, Cyber security awareness can play a vital role in building a secure digital ecosystem for everyone.',
    banglaMeaning: 'সাইবার নিরাপত্তা সচেতনতা আমাদের দেশের ইন্টারনেট ব্যবহারকারীদের জন্য বড় ধরনের ইতিবাচক পরিবর্তন আনতে পারে। প্রথমত, এটি সহজ নির্দেশনার মাধ্যমে মানুষকে নিরাপদ ব্রাউজিং এবং শক্তিশালী পাসওয়ার্ড ব্যবস্থাপনা দ্রুত শিখতে সাহায্য করে। দ্বিতীয়ত, এটি নিরাপদ সুযোগ তৈরি করে এবং ডিজিটাল আর্থিক লেনদেনকে দ্রুত, সুরক্ষিত ও নির্ভরযোগ্য করে। তৃতীয়ত, এটি নাগরিকদের ব্যক্তিগত তথ্য সুরক্ষিত রাখতে এবং অনলাইন প্রতারণা ও সাইবার অপরাধ রোধ করতে সহায়তা করে। এভাবে সাইবার নিরাপত্তা সচেতনতা সকলের জন্য একটি নিরাপদ ডিজিটাল ব্যবস্থা গড়ে তুলতে গুরুত্বপূর্ণ ভূমিকা পালন করতে পারে।',
    keyPoints: [
      'শক্তিশালী পাসওয়ার্ড ও Two-Factor Authentication (2FA)',
      'ফিশিং ও স্প্যাম লিংক সম্পর্কে সতর্কতা',
      'বিকাশ/নগদ ও ব্যাংক অ্যাকাউন্ট লেনদেনের সুরক্ষা'
    ],
    expectedKeywords: ['cyber security', 'awareness', 'safe browsing', 'password', 'transactions', 'private data', 'fraud', 'crimes', 'secure'],
    examinerTips: 'Password, OTP, Phishing, Data Privacy শব্দগুলো সাইবার সিকিউরিটি প্যারাগ্রাফের অপরিহার্য উপাদান।',
    vocabulary: [
      { word: 'Safeguard', meaning: 'সুরক্ষা নিশ্চিত করা', usage: 'We must safeguard our online credentials.' },
      { word: 'Transactions', meaning: 'লেনদেন', usage: 'Secure transactions prevent financial fraud.' },
      { word: 'Ecosystem', meaning: 'পরিমণ্ডল বা সার্বিক ব্যবস্থা', usage: 'Awareness creates a healthy digital ecosystem.' }
    ],
    sentenceBreakdown: [
      { step: 'Topic Hook', english: 'Cyber security awareness can bring positive change to internet users.', bangla: 'সাইবার নিরাপত্তার গুরুত্ব দিয়ে সূচনা।', purpose: 'সচেতনতার ডাক' },
      { step: 'Point 1', english: 'First, it helps people learn safe browsing and password habits.', bangla: 'নিরাপদ ব্রাউজিং ও পাসওয়ার্ড কৌশল।', purpose: 'প্রাথমিক সুরক্ষাবিধি' },
      { step: 'Point 2', english: 'Second, it makes digital financial transactions protected and reliable.', bangla: 'আর্থিক লেনদেনের নিরাপত্তা।', purpose: 'অর্থনৈতিক বিশ্বাসযোগ্যতা' },
      { step: 'Point 3', english: 'Third, it safeguards personal data and reduces online fraud.', bangla: 'প্রতারণা ও তথ্য চুরি রোধ।', purpose: 'অপরাধ প্রতিরোধ' },
      { step: 'Conclusion', english: 'In this way, Cyber security awareness plays a vital role in building a secure digital ecosystem.', bangla: 'নিরাপদ ডিজিটাল বাংলাদেশ গঠনের সমাপ্তি।', purpose: 'নিরাপদ ভিশন' }
    ]
  },
  {
    id: 'topic_graphic_design',
    title: 'Graphic Design in Digital Marketing and Branding',
    banglaTitle: 'ডিজিটাল মার্কেটিং ও ব্র্যান্ডিংয়ে গ্রাফিক্স ডিজাইনের ভূমিকা',
    topicPlaceholder: 'Graphic Design',
    groupPlaceholder: 'modern businesses and marketers',
    modelParagraph: 'Graphic Design can bring a lot of positive change to modern businesses and marketers. First, it can help creators learn visual storytelling and branding tools like Photoshop and Illustrator quickly through modern tutorials. Second, it can create attractive marketing materials and make social media promotion faster, engaging, and more impactful. Third, it can help freelance designers earn excellent income in global marketplaces and reduce promotional costs for companies. In this way, Graphic Design can play a vital role in driving commercial growth and creative careers.',
    banglaMeaning: 'গ্রাফিক্স ডিজাইন আধুনিক ব্যবসা প্রতিষ্ঠান ও বিপণনকারীদের জন্য অত্যন্ত ইতিবাচক পরিবর্তন আনতে পারে। প্রথমত, এটি ক্রিয়েটরদের ফটোশপ ও ইলাস্ট্রেটরের মতো ভিজ্যুয়াল টুলসের মাধ্যমে ব্র্যান্ডিং দ্রুত শিখতে সহায়তা করে। দ্বিতীয়ত, এটি আকর্ষণীয় প্রচারণা সামগ্রী তৈরি করে সোশ্যাল মিডিয়া প্রচারণাকে দ্রুততর, আকর্ষণীয় ও কার্যকর করে তোলে। তৃতীয়ত, এটি ফ্রিল্যান্স ডিজাইনারদের আন্তর্জাতিক বাজারে দারুণ আয়ের সুযোগ দেয় এবং কোম্পানির বিজ্ঞাপনী খরচ কমায়। এভাবে গ্রাফিক্স ডিজাইন বাণিজ্যিক উন্নয়ন ও সৃজনশীল ক্যারিয়ার গঠনে বিশেষ ভূমিকা রাখে।',
    keyPoints: [
      'ভিজ্যুয়াল আইডেন্টিটি ও লোগো/ব্যানার ডিজাইন',
      'Adobe Photoshop, Illustrator ও Canva এর বাস্তব ব্যবহার',
      'সোশ্যাল মিডিয়া অ্যাডের ক্লিক রেট (CTR) বৃদ্ধি'
    ],
    expectedKeywords: ['graphic design', 'marketing', 'branding', 'photoshop', 'illustrator', 'social media', 'freelance', 'income', 'creative'],
    examinerTips: 'Adobe Photoshop, Vector, Branding, Visuals ইত্যাদি টেকনিক্যাল টার্ম ব্যবহার করলে লেখার গ্রহণযোগ্যতা বেড়ে যায়।',
    vocabulary: [
      { word: 'Visual storytelling', meaning: 'চিত্রের মাধ্যমে গল্প বলা বা প্রকাশ', usage: 'Graphic design uses visual storytelling to connect.' },
      { word: 'Impactful', meaning: 'গভীর প্রভাব বিস্তারকারী', usage: 'High-quality banners produce impactful marketing results.' },
      { word: 'Branding', meaning: 'ব্র্যান্ডের নিজস্ব ভাবমূর্তি তৈরি', usage: 'A unique logo is vital for company branding.' }
    ],
    sentenceBreakdown: [
      { step: 'Topic Hook', english: 'Graphic Design can bring positive change to modern businesses and marketers.', bangla: 'মার্কেটিংয়ে ডিজাইনের গুরুত্ব।', purpose: 'টপিক সূচনা' },
      { step: 'Point 1', english: 'First, it helps creators learn visual tools like Photoshop and Illustrator.', bangla: 'ডিজাইন টুলস আয়ত্ত করা।', purpose: 'দক্ষতার উল্লেখ' },
      { step: 'Point 2', english: 'Second, it creates attractive materials making social promotion engaging.', bangla: 'বিজ্ঞাপনকে আকর্ষণীয় করা।', purpose: 'মার্কেটিং সুফল' },
      { step: 'Point 3', english: 'Third, it helps freelance designers earn excellent income in global markets.', bangla: 'ডিজাইনারদের বৈদেশিক আয়।', purpose: 'আর্থিক সচ্ছলতা' },
      { step: 'Conclusion', english: 'In this way, Graphic Design plays a vital role in commercial growth and creative careers.', bangla: 'সৃজনশীল ক্যারিয়ারের উপসংহার।', purpose: 'চূড়ান্ত সাফল্য' }
    ]
  }
];

export const emailScenarios: EmailScenario[] = [
  {
    id: 'email_dyd_admission',
    title: 'Informing a Friend about DYD AI Course Admission',
    banglaTitle: '১. যুব উন্নয়ন অধিদপ্তরের এআই কোর্সে ভর্তির সুসংবাদ বন্ধুকে জানানো',
    subject: 'Exciting news! I got selected for the DYD AI Skill Development Course',
    receiver: 'tanvir.hassan@gmail.com',
    sender: 'yourname@gmail.com',
    salutation: 'Hi Tanvir,',
    bodyPurpose: 'I hope you are doing well. I am writing to share exciting and joyful news with you.',
    bodyDetails: 'I have successfully cleared the written and practical admission test and got selected for the prestigious 2-month AI Skill Development Course organized by the Department of Youth Development.',
    bodyBenefit: 'This comprehensive program covers practical Generative AI tools, prompt engineering, digital marketing, and international freelancing with government certification.',
    closingLine: 'I will share regular updates and class notes once my sessions start. Keep me in your prayers! Take care.',
    fullSample: `To      : tanvir.hassan@gmail.com
From    : yourname@gmail.com
Date    : 24 September 2026
Subject : Exciting news! I got selected for the DYD AI Skill Development Course

Hi Tanvir,

I hope you are doing well. I am writing to share exciting and joyful news with you.

I have successfully cleared the written and practical admission test and got selected for the prestigious 2-month AI Skill Development Course organized by the Department of Youth Development (DYD).

This comprehensive program will give me hands-on training in Generative AI tools, prompt engineering, digital marketing, and international freelancing with an official government certificate.

I will share regular updates once the classes begin. Keep me in your prayers! Take care.

Best wishes,
Md. Rayhan Hassan
Barisal Youth Training Center`,
    banglaTranslation: `প্রতি     : tanvir.hassan@gmail.com
প্রেরক    : yourname@gmail.com
তারিখ   : ২৪ সেপ্টেম্বর ২০২৬
বিষয়    : দারুণ সুখবর! আমি যুব উন্নয়ন অধিদপ্তরের এআই কোর্সে ভর্তির সুযোগ পেয়েছি

প্রিয় তানভীর,

আশা করি তুমি ভালো আছো। তোমাকে একটি আনন্দের সুসংবাদ জানানোর জন্য এই ইমেইলটি লিখছি।

আমি অত্যন্ত আনন্দের সাথে জানাচ্ছি যে, আমি যুব উন্নয়ন অধিদপ্তর (DYD) কর্তৃক পরিচালিত ২ মাস মেয়াদি 'এআই স্কিল ডেভেলপমেন্ট' কোর্সের লিখিত ও ব্যবহারিক ভর্তি পরীক্ষায় উত্তীর্ণ হয়ে চূড়ান্তভাবে নির্বাচিত হয়েছি।

এই বিশেষ কোর্সে জেনারেটিভ এআই, প্রম্পট ইঞ্জিনিয়ারিং, ডিজিটাল মার্কেটিং এবং সরকারি সনদসহ আন্তর্জাতিক ফ্রিল্যান্সিংয়ের ওপর বাস্তব প্রশিক্ষণ দেওয়া হবে।

ক্লাস শুরু হলে আমি তোমাকে নিয়মিত আপডেট দেবো। আমার জন্য দোয়া রেখো! ভালো থেকো।

শুভকামনাসহ,
মো: রায়হান হাসান
বরিশাল যুব প্রশিক্ষণ কেন্দ্র`,
    expectedKeywords: ['selected', 'admission', 'dyd', 'ai course', 'training', 'freelancing', 'prompt engineering', 'prayers', 'certificate'],
    keyFormattingRules: [
      'To, From, Date, Subject চারটি লাইন অবশ্যই শুরুতে বামে অ্যালাইন করে লিখবেন।',
      'Subject লাইনটি সবসময় ২০-৪০ শব্দের মধ্যে সংক্ষিপ্ত ও স্পষ্ট হতে হবে।',
      'বন্ধুকে লেখার সময় ফ্রেন্ডলি গ্রিটিংস (Hi Tanvir / Dear Friend) ও ক্লোজিং (Best wishes / Warm regards) ব্যবহার করবেন।'
    ],
    examinerTips: 'ইমেইল ফরম্যাটে টু, ফ্রম, সাবজেক্ট ও বডি প্যারাগ্রাফ ঠিক থাকলে শুরুতেই ৩ নম্বর নিশ্চিত হয়। সঠিক ইংরেজি গ্রামার থাকলে পুরো ৫-এ ৫ পাওয়া যায়।'
  },
  {
    id: 'email_trainer_gratitude',
    title: 'Thanking Course Trainer for Guidance & Mentorship',
    banglaTitle: '২. প্রশিক্ষণ শেষে শিক্ষক/প্রশিক্ষককে কৃতজ্ঞতা জানিয়ে আনুষ্ঠানিক ইমেইল',
    subject: 'Sincere gratitude for your exceptional guidance and mentorship in AI training',
    receiver: 'lead.trainer@dyd.gov.bd',
    sender: 'trainee.student@gmail.com',
    salutation: 'Respected Sir,',
    bodyPurpose: 'I hope this email finds you in great health and high spirits.',
    bodyDetails: 'I am writing to express my deepest gratitude for your inspiring lectures, patience, and dedicated mentorship throughout our 2-month AI Skill Development module.',
    bodyBenefit: 'Your clear explanations of Prompt Engineering, ChatGPT workflows, and practical freelancing strategies have boosted my professional confidence immensely.',
    closingLine: 'Thank you once again for empowering young learners like us. I will always remain grateful for your valuable lessons.',
    fullSample: `To      : lead.trainer@dyd.gov.bd
From    : trainee.student@gmail.com
Date    : 24 September 2026
Subject : Sincere gratitude for your exceptional guidance and mentorship in AI training

Respected Sir,

I hope this email finds you in great health and high spirits. 

I am writing to express my deepest gratitude for your inspiring lectures, patience, and dedicated mentorship throughout our 2-month AI Skill Development training module.

Your clear explanations of Prompt Engineering, automation tools, and practical freelance marketplace strategies have boosted my professional confidence immensely. I have already started applying your methods to real-world tasks.

Thank you once again for your dedication to empowering young professionals. I will always remain grateful for your valuable lessons.

Sincerely yours,
Md. Rayhan Hassan
Trainee, Batch: 02 (AI Basic Training)
Department of Youth Development`,
    banglaTranslation: `প্রতি     : lead.trainer@dyd.gov.bd
প্রেরক    : trainee.student@gmail.com
তারিখ   : ২৪ সেপ্টেম্বর ২০২৬
বিষয়    : এআই প্রশিক্ষণে চমৎকার দিকনির্দেশনার জন্য আন্তরিক কৃতজ্ঞতা প্রকাশ

শ্রদ্ধেয় স্যার,

আশা করি আপনি সুস্থ ও কুশলে আছেন। 

আমাদের ২ মাসব্যাপী এআই প্রশিক্ষণ মডিউলে আপনার অনুপ্রেরণামূলক পাঠদান, ধৈর্য এবং আন্তরিক দিকনির্দেশনার জন্য গভীর কৃতজ্ঞতা প্রকাশ করতে এই ইমেইলটি লিখছি।

প্রম্পট ইঞ্জিনিয়ারিং, অটোমেশন এবং ফ্রিল্যান্স মার্কেটপ্লেস সম্পর্কে আপনার সাবলীল ব্যাখ্যা আমার আত্মবিশ্বাস বহুগুণ বাড়িয়ে দিয়েছে। আমি ইতিমধ্যে আপনার শেখানো কৌশলগুলো বাস্তব কাজে প্রয়োগ করতে শুরু করেছি।

আমাদের মতো তরুণদের দক্ষ করে গড়ে তোলার জন্য আপনাকে অসংখ্য ধন্যবাদ। আপনার অমূল্য শিক্ষার প্রতি আমি আজীবন কৃতজ্ঞ থাকব।

শ্রদ্ধাবনত,
মো: রায়হান হাসান
প্রশিক্ষণার্থী, ব্যাচ: ০২ (এআই বেসিক কোর্স)
যুব উন্নয়ন অধিদপ্তর`,
    expectedKeywords: ['gratitude', 'mentor', 'training', 'prompt engineering', 'freelance', 'confidence', 'empowering', 'sincerely', 'respected sir'],
    keyFormattingRules: [
      'শিক্ষক বা অফিসিয়াল কাউকে লেখার সময় সম্মানসূচক "Respected Sir," বা "Dear Sir," ব্যবহার করবেন।',
      'ক্লোজিং অংশে "Sincerely yours," বা "Respectfully," দিয়ে নিজের নাম ও ব্যাচ নম্বর উল্লেখ করবেন।',
      'ভাষা সবসময় মার্জিত, প্রফেশনাল ও বিনয়ী হতে হবে।'
    ],
    examinerTips: 'ফরমাল ভাষা ও ব্যাচ আইডেন্টিফিকেশন সঠিকভাবে লিখলে পরীক্ষক শিক্ষার্থীর প্রফেশনাল কমিউনিকেশন দক্ষতায় মুগ্ধ হন।'
  },
  {
    id: 'email_certificate_request',
    title: 'Official Request for Course Completion Certificate',
    banglaTitle: '৩. কোর্স সমাপনী সনদের জন্য যুব উন্নয়ন কার্যালয়ে আবেদন',
    subject: 'Formal inquiry regarding issuance of Course Completion Certificate',
    receiver: 'coordinator.dyd@gov.bd',
    sender: 'student.applicant@gmail.com',
    salutation: 'Dear Course Coordinator,',
    bodyPurpose: 'I hope you are having a productive week.',
    bodyDetails: 'I have successfully completed the 2-month (300 hours) AI Skill Development Training program with 100% attendance and submitted all assigned portfolio projects on time.',
    bodyBenefit: 'I require the official government certificate to verify my credentials for international freelance platforms and upcoming job interviews.',
    closingLine: 'Could you kindly inform me about the procedure, required documents, and scheduled date for collecting the certificate from the district office?',
    fullSample: `To      : coordinator.dyd@gov.bd
From    : student.applicant@gmail.com
Date    : 24 September 2026
Subject : Formal inquiry regarding issuance of Course Completion Certificate

Dear Course Coordinator,

I hope you are having a productive week.

I am writing to respectfully inquire about the issuance of my Course Completion Certificate for the AI Skill Development program.

I have completed the 2-month (300 hours) comprehensive training with 100% attendance and submitted all assigned practical projects and lab assessments successfully. I urgently need this official credential to verify my profile on international freelance marketplaces and job applications.

Could you kindly inform me about the collection procedure, required documents, and available dates at the District Youth Training Center?

Thank you for your valuable time and continuous assistance.

Warm regards,
Md. Rayhan Hassan
Roll No: 1042 | Batch: 02 (AI Training)
Barisal Center`,
    banglaTranslation: `প্রতি     : coordinator.dyd@gov.bd
প্রেরক    : student.applicant@gmail.com
তারিখ   : ২৪ সেপ্টেম্বর ২০২৬
বিষয়    : কোর্স সমাপ্তি সনদ উত্তোলনের নিয়মাবলী ও তারিখ সংক্রান্ত আবেদন

শ্রদ্ধেয় কোর্স কো-অর্ডিনেটর,

আশা করি আপনি ভালো আছেন।

আমি এআই স্কিল ডেভেলপমেন্ট কোর্সের সমাপনী সনদ প্রাপ্তির প্রক্রিয়া সম্পর্কে জানার জন্য বিনীতভাবে এই ইমেইলটি লিখছি।

আমি অত্যন্ত সফলতার সাথে শতভাগ উপস্থিতিসহ ২ মাসের (৩০০ ঘণ্টার) প্রশিক্ষণ সম্পন্ন করেছি এবং সকল নির্ধারিত প্রজেক্ট ও ব্যবহারিক মূল্যায়ন যথাসময়ে জমা দিয়েছি। আন্তর্জাতিক ফ্রিল্যান্স প্রোফাইল এবং চাকরির সাক্ষাৎকারে উপস্থাপনের জন্য আমার এই সরকারি সনদটি অত্যন্ত জরুরি।

জেলা যুব প্রশিক্ষণ কেন্দ্র থেকে সনদ সংগ্রহের নির্দিষ্ট তারিখ, সময় এবং প্রয়োজনীয় ডকুমেন্টের বিস্তারিত জানিয়ে বাধিত করবেন।

আপনার মূল্যবান সময় ও সহযোগিতার জন্য ধন্যবাদ।

বিনীত,
মো: রায়হান হাসান
রোল: ১০৪২ | ব্যাচ: ০২ (এআই ট্রেনিং)
বরিশাল কেন্দ্র`,
    expectedKeywords: ['certificate', 'course completion', 'attendance', 'freelance', 'credentials', 'procedure', 'district office', 'roll no'],
    keyFormattingRules: [
      'বিষয় লাইনে "Certificate" এবং "Inquiry" বা "Request" শব্দদ্বয় পরিষ্কারভাবে রাখবেন।',
      'নিজের কোর্স ডিটেইলস (Roll, Batch, Center) স্পষ্টভাবে ফুটিয়ে তুলবেন।',
      'অনুরোধ অংশে "Could you kindly inform me..." জাতীয় মার্জিত প্রশ্নবাচক বাক্য ব্যবহার করবেন।'
    ],
    examinerTips: 'অফিসিয়াল অ্যাপ্লিকেশনে কোর্স সম্পন্নের প্রমাণ (উপস্থিতি, প্রজেক্ট জমা) উল্লেখ করা খুবই গুরুত্বপূর্ণ।'
  }
];

export const writtenQuestionItems: WrittenQuestionItem[] = [
  {
    id: 'wq_1_genai',
    questionBn: 'জেনারেটিভ এআই (Generative AI) কী? তরুণদের আত্মকর্মসংস্থানে এটি কীভাবে সহায়তা করে? সংক্ষেপে লিখুন।',
    questionEn: 'What is Generative AI? How does it assist youth in self-employment? Explain briefly.',
    marks: 5,
    category: 'কৃত্রিম বুদ্ধিমত্তা ও ক্যারিয়ার',
    detailedModelAnswerBn: 'জেনারেটিভ এআই (Generative AI) হলো এমন একটি কৃত্রিম বুদ্ধিমত্তা প্রযুক্তি যা টেক্সট, ছবি, অডিও, ভিডিও বা কোড প্রম্পটের ভিত্তিতে সম্পূর্ণ নতুন ও মৌলিক কনটেন্ট তৈরি করতে পারে (যেমন: ChatGPT, Midjourney, Claude)। \n\nতরুণদের আত্মকর্মসংস্থানে এর ভূমিকা:\n১. কনটেন্ট রাইটিং ও কপিরাইটিং: ফ্রিল্যান্সিংয়ে ব্লগ, বিজ্ঞাপন ও সোশ্যাল মিডিয়া পোস্ট নিমেষেই তৈরি করা যায়।\n২. গ্রাফিক্স ও লোগো ডিজাইন: Midjourney বা DALL-E দিয়ে ক্লায়েন্টের জন্য দ্রুত ড্রাফট ও ডিজাইন তৈরি সম্ভব।\n৩. প্রোগ্রামিং ও কোডিং: কোড ডিবাগিং ও ওয়েব ডেভেলপমেন্টে সময় অনেক বেঁচে যায়।\n৪. মার্কেটপ্লেসে দ্রুত ডেলিভারি: কাজ দ্রুত শেষ করায় একই সময়ে বেশি ক্লায়েন্টের কাজ করা যায় এবং রেমিট্যান্স আয় বৃদ্ধি পায়।',
    detailedModelAnswerEn: 'Generative AI is a branch of artificial intelligence that creates new and original content—such as text, images, code, and videos—based on natural language prompts (e.g., ChatGPT, Midjourney, Claude).\n\nRole in Youth Self-Employment:\n1. Content Creation: Generates marketing copy, blogs, and translations within seconds.\n2. Visual Design: AI image generators produce logos, mockups, and illustrations quickly.\n3. Coding Assistance: Helps developers write, debug, and optimize software code efficiently.\n4. Faster Delivery & Higher Income: Enables freelancers to complete projects faster and handle multiple international clients simultaneously.',
    keyPoints: [
      'সংজ্ঞা: প্রম্পটের মাধ্যমে নতুন কনটেন্ট তৈরির সক্ষমতা',
      'উদাহরণ: ChatGPT, Midjourney, Gemini',
      'ফ্রিল্যান্সিং প্রয়োগ: কনটেন্ট, ডিজাইন, কোডিং ও দ্রুত ডেলিভারি',
      'আয়ের সুফল: আন্তর্জাতিক বাজারে ডলার আয় ও সময় সাশ্রয়'
    ],
    expectedKeywords: ['generative ai', 'chatgpt', 'prompts', 'content', 'freelancing', 'income', 'design', 'coding', 'automation'],
    examinerChecklist: [
      'সঠিক সংজ্ঞা ও অন্তত ২টি টুলের নাম উল্লেখ রয়েছে কিনা',
      'আত্মকর্মসংস্থান ও ফ্রিল্যান্সিংয়ের ৩-৪টি বাস্তব পয়েন্ট আছে কিনা',
      'স্পষ্ট ও পরিচ্ছন্ন বাক্য গঠন'
    ],
    deepExplanation: 'পরীক্ষক দেখতে চান পরীক্ষার্থী কেবল মুখস্থ সংজ্ঞার মধ্যে সীমাবদ্ধ নাকি বাস্তব জীবনের ফ্রিল্যান্সিং মার্কেটপ্লেসে এআই ব্যবহারের প্রয়োগ জানেন। ChatGPT, Midjourney এবং Freelancing আয়ের যোগসূত্র তুলে ধরলে পুরো নম্বর দেওয়া হয়।'
  },
  {
    id: 'wq_2_prompt',
    questionBn: 'প্রম্পট ইঞ্জিনিয়ারিং (Prompt Engineering) কী? একটি আদর্শ প্রম্পট লেখার প্রধান উপাদানগুলো কী কী?',
    questionEn: 'What is Prompt Engineering? What are the key components of an ideal prompt?',
    marks: 5,
    category: 'প্রম্পট ইঞ্জিনিয়ারিং ও এআই স্কিলস',
    detailedModelAnswerBn: 'প্রম্পট ইঞ্জিনিয়ারিং (Prompt Engineering) হলো কৃত্রিম বুদ্ধিমত্তা মডেল (যেমন: ChatGPT, Gemini)-এর কাছ থেকে সবচেয়ে নির্ভুল, প্রাসঙ্গিক ও মানসম্মত ফলাফল পাওয়ার জন্য সুনির্দিষ্ট নির্দেশনা (Prompt) তৈরি ও পরিমার্জন করার কলাকৌশল।\n\nএকটি আদর্শ প্রম্পটের ৪টি প্রধান উপাদান (C-R-E-O Framework):\n১. Context (প্রেক্ষাপট): কাজের ব্যাকগ্রাউন্ড বা পরিস্থিতি স্পষ্ট করা।\n২. Role (ভূমিকা): এআই কোন ভূমিকায় কাজ করবে তা নির্ধারণ করা (যেমন: "Act as a Senior Digital Marketer")।\n৩. Explicit Task (সুনির্দিষ্ট কাজ): ঠিক কী করতে হবে তা পয়েন্ট আকারে বলে দেওয়া।\n৪. Output Constraints (ফলাফলের ফরম্যাট): শব্দের সংখ্যা, টোন, ফরম্যাট (যেমন: "Write in bullet points, max 100 words") বলে দেওয়া।',
    detailedModelAnswerEn: 'Prompt Engineering is the practice of crafting, structuring, and optimizing textual instructions to elicit the most accurate and high-quality responses from Large Language Models (LLMs).\n\nKey Components of an Ideal Prompt:\n1. Context: Provide background situation and target audience.\n2. Role Persona: Instruct the AI on who to act as (e.g., "Act as an expert copywriter").\n3. Clear Instruction: Explicitly define what needs to be created.\n4. Output Constraints: Specify format, length, style, and tone (e.g., table, bullet points, 150 words).',
    keyPoints: [
      'সংজ্ঞা: এআইকে সঠিক নির্দেশ দেওয়ার প্রযুক্তিগত দক্ষতা',
      'মূল উপাদান: Context (প্রেক্ষাপট), Role (ভূমিকা), Task (কাজ), Constraints (শর্তাবলী)',
      'সুফল: নির্ভুল ও উচ্চমানের ফলাফল লাভ'
    ],
    expectedKeywords: ['prompt engineering', 'instructions', 'role', 'context', 'chatgpt', 'constraints', 'accurate', 'output'],
    examinerChecklist: [
      'প্রম্পট ইঞ্জিনিয়ারিংয়ের সুস্পষ্ট সংজ্ঞা',
      'Role, Context, Task, Format-এর সুস্পষ্ট উল্লেখ',
      'একটি বাস্তব উদাহরণের প্রয়োগ'
    ],
    deepExplanation: 'প্রম্পট ইঞ্জিনিয়ারিং বর্তমান ২০২৬ সালের ফ্রিল্যান্সিং বাজারে সবচেয়ে চাহিদাসম্পন্ন দক্ষতা। পরীক্ষক এই প্রশ্নে কাঠামোগত উপাদানগুলো সঠিকভাবে বিশ্লেষণ করেছেন কিনা তা যাচাই করবেন।'
  },
  {
    id: 'wq_3_seo',
    questionBn: 'এসইও (Search Engine Optimization) কী? অন-পেজ ও অফ-পেজ এসইও-এর মূল পার্থক্য ব্যাখ্যা করুন।',
    questionEn: 'What is SEO? Explain the core differences between On-page and Off-page SEO.',
    marks: 5,
    category: 'ডিজিটাল মার্কেটিং',
    detailedModelAnswerBn: 'এসইও (SEO) বা সার্চ ইঞ্জিন অপ্টিমাইজেশন হলো এমন কিছু প্রাকৃতিক কৌশল যার মাধ্যমে কোনো ওয়েবসাইটকে গুগল বা বিং সার্চ ইঞ্জিনের প্রথম পাতায় র‍্যাঙ্ক করিয়ে অর্গানিক (বিনা খরচে) ট্র্যাফিক বৃদ্ধি করা যায়।\n\nঅন-পেজ বনাম অফ-পেজ এসইও-এর পার্থক্য:\n১. কাজের স্থান: অন-পেজ এসইও ওয়েবসাইটের নিজস্ব কনটেন্ট, মেটা ট্যাগ ও কাঠামোর ওপর করা হয়। অফ-পেজ এসইও ওয়েবসাইটের বাইরে ইন্টারনেটে করা হয়।\n২. মূল উপাদান: অন-পেজে থাকে কি-ওয়ার্ড রিসার্চ, Title Tag, Meta Description, Image Alt Tag, এবং Speed। অফ-পেজে থাকে ব্যাকলিংক (Backlinks), গেস্ট পোস্টিং ও সোশ্যাল সিগন্যাল।\n৩. নিয়ন্ত্রণ: অন-পেজ পুরোপুরি সাইট ওনারের নিয়ন্ত্রণে থাকে, কিন্তু অফ-পেজে অন্যের সাইটের আস্থার প্রয়োজন হয়।',
    detailedModelAnswerEn: 'SEO (Search Engine Optimization) is the process of improving website visibility and ranking on search engine result pages (like Google) to attract organic, unpaid traffic.\n\nOn-Page vs. Off-Page SEO Differences:\n1. Location of Action: On-Page optimization happens directly within the website; Off-Page happens outside the website.\n2. Core Elements: On-Page involves Keyword research, Meta tags, Alt text, and site structure. Off-Page involves high-authority Backlinks, guest posts, and brand mentions.\n3. Direct Control: On-Page is 100% under website owner control, whereas Off-Page relies on external website relationships.',
    keyPoints: [
      'এসইও-এর পূর্ণরূপ ও অর্গানিক ট্র্যাফিকের সংজ্ঞা',
      'অন-পেজ: কি-ওয়ার্ড, মেটা ট্যাগ, হেডিং ও সাইট স্পিড',
      'অফ-পেজ: ব্যাকলিংক, সোশ্যাল শেয়ারিং ও অথরিটি বৃদ্ধি'
    ],
    expectedKeywords: ['seo', 'search engine', 'on-page', 'off-page', 'backlinks', 'keywords', 'google', 'meta tags', 'ranking'],
    examinerChecklist: [
      'এসইও-এর সঠিক সংজ্ঞা ও পূর্ণরূপ',
      'অন-পেজ ও অফ-পেজের অন্তত ৩টি স্পষ্ট তুলনামূলক পয়েন্ট',
      'ব্যাকলিংক ও কি-ওয়ার্ডের প্রাসঙ্গিক উল্লেখ'
    ],
    deepExplanation: 'ডিজিটাল মার্কেটিং অংশের সবচেয়ে গুরুত্বপূর্ণ প্রশ্ন এটি। অন-পেজে সাইটের ভিতরের কাজ আর অফ-পেজে ব্যাকলিংকের কাজ—এই মৌলিক পার্থক্যটি পয়েন্ট আকারে লিখলে নিশ্চিত ৫ নম্বর পাওয়া যায়।'
  },
  {
    id: 'wq_4_raster_vector',
    questionBn: 'রাস্টার গ্রাফিক্স (Raster) ও ভেক্টর গ্রাফিক্স (Vector)-এর মধ্যকার পার্থক্য বিস্তারিত লিখুন।',
    questionEn: 'Explain the detailed differences between Raster Graphics and Vector Graphics.',
    marks: 5,
    category: 'গ্রাফিক্স ডিজাইন ও মাল্টিমিডিয়া',
    detailedModelAnswerBn: 'রাস্টার এবং ভেক্টর গ্রাফিক্স হলো ডিজিটাল গ্রাফিক্সের প্রধান দুটি শ্রেণিবিভাগ।\n\nপ্রধান পার্থক্যসমূহ:\n১. গঠন উপাদান: রাস্টার গ্রাফিক্স ক্ষুদ্র ক্ষুদ্র পিক্সেল (Pixels) বা ডট দিয়ে তৈরি। ভেক্টর গ্রাফিক্স গাণিতিক সূত্র, লাইন, কার্ভ ও জ্যামিতিক বিন্দুর মাধ্যমে গঠিত।\n২. জুম বা রিসাইজিং: রাস্টার ছবি বড় করলে পিক্সেল ফেটে যায় (Blurry/Pixelated হয়)। ভেক্টর ছবি যত বড়ই করা হোক না কেন, তার রেজোলিউশন ও শার্পনেস অপরিবর্তিত থাকে।\n৩. সফটওয়্যার: রাস্টার ডিজাইনে Adobe Photoshop ব্যবহৃত হয়; ভেক্টর ডিজাইনে Adobe Illustrator ব্যবহৃত হয়।\n৪. ফাইল ফরম্যাট: রাস্টারের ফরম্যাট হলো JPEG, PNG, GIF, BMP; ভেক্টরের ফরম্যাট হলো AI, EPS, SVG, PDF।\n৫. ব্যবহার ক্ষেত্র: রাস্টার ফটোগ্রাফি ও বাস্তবসম্মত ছবির জন্য উপযুক্ত; ভেক্টর লোগো, আইকন ও প্রিন্ট মিডিয়ার ব্যানারের জন্য আদর্শ।',
    detailedModelAnswerEn: 'Raster and Vector graphics are the two fundamental formats in computer graphics.\n\nCore Differences:\n1. Composition: Raster is made of a grid of individual pixels. Vector is constructed with mathematical formulas, vectors, curves, and geometric paths.\n2. Scalability: Raster images lose quality and become pixelated when enlarged. Vector images are infinitely scalable without any loss of sharpness.\n3. Software: Raster is edited in Adobe Photoshop; Vector is created in Adobe Illustrator.\n4. File Formats: Raster formats include JPG, PNG, GIF. Vector formats include AI, EPS, SVG.\n5. Practical Use: Raster is used for real photographs; Vector is mandatory for logos, typography, and large billboards.',
    keyPoints: [
      'পিক্সেল বনাম গাণিতিক সূত্র',
      'স্কেলিং ও রেজোলিউশন বজায় রাখার সক্ষমতা',
      'Photoshop (Raster) বনাম Illustrator (Vector)',
      'ফাইল এক্সটেনশন ও বাস্তব প্রয়োগক্ষেত্র'
    ],
    expectedKeywords: ['raster', 'vector', 'pixels', 'photoshop', 'illustrator', 'scalable', 'resolution', 'svg', 'png', 'mathematical'],
    examinerChecklist: [
      'পিক্সেল ও গাণিতিক সূত্রের উল্লেখ',
      'স্কেলেবিলিটি (জুম করলে ফেটে যাওয়া বা না যাওয়া)',
      'সফটওয়্যার ও ফাইল ফরম্যাটের উদাহরণ'
    ],
    deepExplanation: 'গ্রাফিক্স অংশের পরীক্ষক দেখতে চান আপনি ফটোশপ ও ইলাস্ট্রেটরের কাজের ধরন বোঝেন কিনা। স্কেলেবিলিটি এবং লোগোর জন্য কেন ভেক্টর দরকার তা বলা আবশ্যক।'
  },
  {
    id: 'wq_5_cyber_phishing',
    questionBn: 'ফিশিং (Phishing) কী? অনলাইন ফিশিং আক্রমণ থেকে সুরক্ষিত থাকার ৪টি কার্যকর উপায় লিখুন।',
    questionEn: 'What is Phishing? Write down 4 effective ways to stay protected from online phishing attacks.',
    marks: 5,
    category: 'সাইবার নিরাপত্তা ও নেটওয়ার্কিং',
    detailedModelAnswerBn: 'ফিশিং (Phishing) হলো এক ধরনের প্রতারণামূলক সাইবার আক্রমণ যেখানে বিশ্বাসযোগ্য প্রতিষ্ঠান বা ব্যক্তির ছদ্মবেশে ভুয়া ইমেইল, মেসেজ বা ফেক ওয়েবসাইটের মাধ্যমে ব্যবহারকারীর গোপন তথ্য (যেমন: পাসওয়ার্ড, ক্রেডিট কার্ড নম্বর, OTP, জাতীয় পরিচয়পত্র) চুরি করা হয়।\n\nফিশিং থেকে নিরাপদ থাকার ৪টি উপায়:\n১. প্রেরকের ইমেইল অ্যাড্রেস ও URL ডোমেইন যাচাই করা: সন্দেহজনক বানান বা ভুয়া সাব-ডোমেইনে (যেমন: bkas-h.com) ক্লিক না করা।\n২. টু-ফ্যাক্টর অথেনটিকেশন (2FA) চালু রাখা: পাসওয়ার্ড ফাঁস হলেও যাতে ওটিপি ছাড়া লগইন করা না যায়।\n৩. কোনো অবস্থাতেই ওটিপি (OTP) ও পিন শেয়ার না করা: ব্যাংক বা কোনো প্রতিষ্ঠান কখনোই ফোনে বা মেসেজে ওটিপি চায় না।\n৪. লোভনীয় অফার ও জরুরি সতর্কবার্তায় সতর্ক থাকা: "লটারিতে কোটি টাকা জিতেছেন" বা "অ্যাকাউন্ট ব্লক হচ্ছে এখনই ক্লিক করুন"—জাতীয় লিংকে প্রবেশ না করা।',
    detailedModelAnswerEn: 'Phishing is a deceptive cybercrime where attackers impersonate legitimate organizations (like banks or government agencies) to steal sensitive information such as passwords, OTPs, and credit card numbers.\n\n4 Ways to Stay Protected:\n1. Verify URL and Sender Email: Always inspect the exact spelling of links before clicking.\n2. Enable Two-Factor Authentication (2FA): Ensures your account is safe even if the password is leaked.\n3. Never Disclose OTP or PIN: Legitimate organizations never ask for your confidential codes.\n4. Beware of Urgency and Fake Rewards: Avoid clicking on sensational claims like prize wins or urgent account suspension alerts.',
    keyPoints: [
      'ফিশিংয়ের সংজ্ঞা: ভুয়া পরিচয়ে গোপন তথ্য চুরি',
      'প্রতিরোধ ১: URL ও ডোমেইন যাচাই',
      'প্রতিরোধ ২: Two-Factor Authentication (2FA) চালু রাখা',
      'প্রতিরোধ ৩: ওটিপি/পিন গোপন রাখা',
      'প্রতিরোধ ৪: লোভনীয় বা হুমকিযুক্ত লিংকে ক্লিক না করা'
    ],
    expectedKeywords: ['phishing', 'passwords', 'otp', 'two-factor authentication', '2fa', 'deceptive', 'url', 'links', 'security'],
    examinerChecklist: [
      'ফিশিংয়ের সঠিক সংজ্ঞা ও উদ্দেশ্য',
      '৪টি সুস্পষ্ট ও বাস্তবসম্মত সুরক্ষাবিধি',
      '2FA এবং OTP সুরক্ষার সুনির্দিষ্ট উল্লেখ'
    ],
    deepExplanation: 'সাইবার সিকিউরিটির এই প্রশ্নটি প্রায় সব সরকারি আইসিটি ও যুব উন্নয়ন পরীক্ষায় নিয়মিত আসে। 2FA এবং ওটিপি গোপনীয়তার পয়েন্টে পরীক্ষক বিশেষ নম্বর দেন।'
  }
];
