export interface ParagraphTopic {
  title: string;
  topicPlaceholder: string;
  groupPlaceholder: string;
  modelParagraph: string;
}

export interface EmailScenario {
  title: string;
  subject: string;
  receiver: string;
  salutation: string;
  bodyPurpose: string;
  bodyDetails: string;
  bodyBenefit: string;
  closingLine: string;
  fullSample: string;
}

export const paragraphFormula = {
  step1: {
    label: 'লাইন ১ (Introduction)',
    formula: '[TOPIC] can bring a lot of positive change to [PLACE/GROUP].',
    instruction: 'বিষয়টি উল্লেখ করে কার জন্য এটি ইতিবাচক প্রভাব ফেলবে তা বলা।'
  },
  step2: {
    label: 'লাইন ২ (Skill & Modern Methods)',
    formula: 'First, it can help people learn new skills quickly through easy and modern methods.',
    instruction: 'প্রথম উপকার হিসেবে আধুনিক পদ্ধতিতে দ্রুত নতুন দক্ষতা শেখার কথা বলা।'
  },
  step3: {
    label: 'লাইন ৩ (Productivity & Opportunity)',
    formula: 'Second, it can create new opportunities and make work faster, easier, and more efficient.',
    instruction: 'দ্বিতীয় পয়েন্টে সময় বাঁচানো ও কাজের গতি বাড়ানোর সুযোগের কথা বলা।'
  },
  step4: {
    label: 'লাইন ৪ (Income & Practical Output)',
    formula: 'Third, it can help young people/businesses/the country earn better income and reduce hard manual work.',
    instruction: 'তৃতীয় পয়েন্টে আয় বৃদ্ধি ও শারীরিক পরিশ্রম কমানোর বাস্তব সুফল তুলে ধরা।'
  },
  step5: {
    label: 'লাইন ৫ (Conclusion)',
    formula: 'In this way, [TOPIC] can play a vital role in building a better future for [PLACE/GROUP].',
    instruction: 'সমাপনী বাক্যে ভবিষ্যৎ উজ্জ্বল ও সফল করার নিশ্চয়তা দিয়ে শেষ করা।'
  }
};

export const sampleTopics: ParagraphTopic[] = [
  {
    title: 'AI & Youth Employment in Bangladesh (বাংলাদেশে এআই ও যুব কর্মসংস্থান)',
    topicPlaceholder: 'Artificial Intelligence',
    groupPlaceholder: 'the youth of Bangladesh',
    modelParagraph: 'Artificial Intelligence can bring a lot of positive change to the youth of Bangladesh. First, it can help people learn new skills quickly through easy and modern methods. Second, it can create new opportunities and make work faster, easier, and more efficient. Third, it can help young people earn better income and reduce hard manual work through online freelance careers. In this way, Artificial Intelligence can play a vital role in building a better future for the youth of Bangladesh.'
  },
  {
    title: 'Digital Skills Changing Lives (ডিজিটাল দক্ষতা যেভাবে জীবন বদলে দেয়)',
    topicPlaceholder: 'Digital skills',
    groupPlaceholder: 'our daily lives and careers',
    modelParagraph: 'Digital skills can bring a lot of positive change to our daily lives and careers. First, it can help people learn new skills quickly through easy and modern methods. Second, it can create new opportunities and make work faster, easier, and more efficient. Third, it can help young people and businesses earn better income and reduce hard manual work. In this way, Digital skills can play a vital role in building a better future for our country.'
  },
  {
    title: 'Freelancing Reducing Unemployment (বেকারত্ব দূরীকরণে ফ্রিল্যান্সিং)',
    topicPlaceholder: 'Freelancing',
    groupPlaceholder: 'unemployed youth in our society',
    modelParagraph: 'Freelancing can bring a lot of positive change to unemployed youth in our society. First, it can help people learn new skills quickly through easy and modern methods. Second, it can create new opportunities and make work faster, easier, and more efficient across global marketplaces. Third, it can help young people earn better income in foreign currency and reduce hard manual work. In this way, Freelancing can play a vital role in building a better future for our educated youth.'
  },
  {
    title: 'AI Training for Students (শিক্ষার্থীদের জন্য এআই প্রশিক্ষণ)',
    topicPlaceholder: 'AI training',
    groupPlaceholder: 'modern students',
    modelParagraph: 'AI training can bring a lot of positive change to modern students. First, it can help people learn new skills quickly through easy and modern methods. Second, it can create new opportunities and make work faster, easier, and more efficient in academic and practical tasks. Third, it can help students prepare for high-paying global tech careers and reduce repetitive tasks. In this way, AI training can play a vital role in building a better future for modern students.'
  },
  {
    title: 'Technology & Rural Development (প্রযুক্তি ও গ্রামীণ উন্নয়ন)',
    topicPlaceholder: 'Modern technology',
    groupPlaceholder: 'rural communities',
    modelParagraph: 'Modern technology can bring a lot of positive change to rural communities. First, it can help people learn new skills quickly through easy and modern methods on the internet. Second, it can create new opportunities and make work faster, easier, and more efficient in agriculture and local commerce. Third, it can help villagers earn better income and reduce hard manual work. In this way, Modern technology can play a vital role in building a better future for rural communities.'
  },
  {
    title: 'Digital Marketing & Business Growth (ক্ষুদ্র ব্যবসার প্রসারে ডিজিটাল মার্কেটিং)',
    topicPlaceholder: 'Digital Marketing',
    groupPlaceholder: 'small entrepreneurs and businesses',
    modelParagraph: 'Digital Marketing can bring a lot of positive change to small entrepreneurs and businesses. First, it can help entrepreneurs reach target audiences quickly through easy and modern social media methods. Second, it can create new opportunities and make sales conversions faster, easier, and more efficient. Third, it can help businesses earn better income, reduce marketing costs, and avoid manual flyers. In this way, Digital Marketing can play a vital role in building a better future for small businesses.'
  }
];

export const emailScenarios: EmailScenario[] = [
  {
    title: 'কোর্সে ভর্তির সুযোগের সুসংবাদ বন্ধুকে জানানো',
    subject: 'Exciting news! I got admission into the DYD AI Course',
    receiver: 'friend_name@gmail.com',
    salutation: 'Hi Tanvir,',
    bodyPurpose: 'I hope you are doing well. I am writing to share exciting news with you.',
    bodyDetails: 'I have successfully cleared the admission test and got selected for the AI Skill Development Course organized by the Department of Youth Development.',
    bodyBenefit: 'This 2-month program will give me hands-on training in Generative AI tools and freelancing.',
    closingLine: 'I will share more updates once the classes begin. Keep me in your prayers!',
    fullSample: `To      : tanvir.hassan@gmail.com
From    : yourname@gmail.com
Date    : 24 September 2026
Subject : Exciting news! I got admission into the DYD AI Course

Hi Tanvir,

I hope you are doing well. I am writing to share exciting news with you. 

I have successfully cleared the admission test and got selected for the prestigious AI Skill Development Course organized by the Department of Youth Development. This 2-month comprehensive program will give me hands-on training in cutting-edge Generative AI tools, prompt engineering, and international freelancing.

I will share more updates once my classes begin. Keep me in your prayers! Take care.

Best wishes,
Md. Rayhan Hassan`
  },
  {
    title: 'প্রশিক্ষক/শিক্ষককে দিকনির্দেশনার জন্য ধন্যবাদ জানিয়ে ইমেইল',
    subject: 'Thank you for your invaluable guidance and support',
    receiver: 'trainer_email@dyd.gov.bd',
    salutation: 'Respected Sir,',
    bodyPurpose: 'I hope this email finds you in good health and high spirits.',
    bodyDetails: 'I am writing to express my sincere gratitude for your exceptional teaching and guidance during our recent training module.',
    bodyBenefit: 'Your clear explanations of AI tools and practical market insights have boosted my confidence tremendously.',
    closingLine: 'Thank you once again for your dedication to empowering young professionals like us.',
    fullSample: `To      : trainer.ai@dyd.gov.bd
From    : trainee@gmail.com
Date    : 24 September 2026
Subject : Thank you for your invaluable guidance and support

Respected Sir,

I hope this email finds you in good health and high spirits. I am writing to express my sincere gratitude for your exceptional teaching and mentorship during our AI training module.

Your clear explanations of Prompt Engineering, automation tools, and practical freelancing insights have boosted my confidence tremendously. I am already applying these techniques to real-world tasks.

Thank you once again for your dedication to empowering youth.

Sincerely yours,
Md. Rayhan Hassan
Batch: 02 (AI Basic Training)`
  },
  {
    title: 'প্রশিক্ষণ শেষ করে সার্টিফিকেট অনুরোধ জানিয়ে আবেদন',
    subject: 'Request regarding my course completion certificate',
    receiver: 'office.dyd@gmail.com',
    salutation: 'Dear Course Coordinator,',
    bodyPurpose: 'I hope you are having a productive week.',
    bodyDetails: 'I have successfully completed the 2-month AI Skill Development Course with 100% attendance and submitted all assigned projects.',
    bodyBenefit: 'I require the official certificate to include in my international freelance profile and job applications.',
    closingLine: 'Please let me know the procedure and date for collecting the certificate from the district office.',
    fullSample: `To      : dyd.barisal@gmail.com
From    : candidate@gmail.com
Date    : 24 September 2026
Subject : Request regarding my course completion certificate

Dear Course Coordinator,

I hope this email finds you well. I am writing to kindly inquire about the issuance of my course completion certificate.

I have completed the 2-month (300 hours) AI Skill Development Training with full attendance and submitted all class projects successfully. I need this verified certificate to update my professional portfolio and freelance credentials.

Could you please inform me when and how I can collect the official certificate from our district office?

Thank you for your time and assistance.

Warm regards,
Md. Rayhan Hassan
Roll No: 1042 | Barisal Center`
  }
];
