import { Question, Category } from '../types';
import rawQuestions from './questions.json';
import rawCategories from './categories.json';

export const questions: Question[] = rawQuestions as Question[];
export const categories: Category[] = rawCategories as Category[];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getQuestionsByCategory(categoryId: string): Question[] {
  if (!categoryId || categoryId === 'all') {
    return questions;
  }
  return questions.filter(q => q.categoryId === categoryId);
}

export function searchQuestions(query: string, categoryId?: string): Question[] {
  const targetList = categoryId && categoryId !== 'all' 
    ? getQuestionsByCategory(categoryId) 
    : questions;

  if (!query.trim()) return targetList;
  const qLower = query.toLowerCase().trim();

  return targetList.filter(q => 
    q.question.toLowerCase().includes(qLower) ||
    q.correctAnswer.toLowerCase().includes(qLower) ||
    q.options.some(opt => opt.toLowerCase().includes(qLower)) ||
    q.category.toLowerCase().includes(qLower)
  );
}

// Generates an exam following the exact DYD AI Batch 1 distribution:
// Total 30 MCQs:
// - Digital Marketing & Freelancing: 11
// - English: 4
// - Graphics & Design: 4
// - AI, Cloud & Cyber Security: 4
// - Networking: 3
// - MS Office: 3
// - Computer Hardware / Basics: 1
export function generateRealisticMockExam(): {
  mcqs: Question[];
  paragraphPrompt: { title: string; instruction: string };
  emailPrompt: { title: string; instruction: string };
} {
  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());

  const dmQuestions = questions.filter(q => 
    q.categoryId === 'cat_27678' || q.categoryId === 'cat_64368' || q.categoryId === 'cat_35484' || q.categoryId === 'cat_94269'
  );

  const englishQuestions = questions.filter(q =>
    q.categoryId === 'cat_52502' || q.categoryId === 'cat_29944' || q.categoryId === 'cat_4053' || q.categoryId === 'cat_48032'
  );

  const graphicsQuestions = questions.filter(q =>
    q.categoryId === 'cat_1624' || q.categoryId === 'cat_72246'
  );

  const aiCloudQuestions = questions.filter(q =>
    q.categoryId === 'cat_39984' || q.categoryId === 'cat_77181' || q.categoryId === 'cat_73607' || q.categoryId === 'cat_34155'
  );

  const networkingQuestions = questions.filter(q =>
    q.categoryId === 'cat_13456' || q.categoryId === 'cat_24894'
  );

  const officeQuestions = questions.filter(q =>
    q.categoryId === 'cat_87530' || q.categoryId === 'cat_81963'
  );

  const hardwareQuestions = questions.filter(q =>
    q.categoryId === 'cat_38164' || q.categoryId === 'cat_69831'
  );

  const selectedMcqs: Question[] = [
    ...shuffle(dmQuestions).slice(0, 11),
    ...shuffle(englishQuestions).slice(0, 4),
    ...shuffle(graphicsQuestions).slice(0, 4),
    ...shuffle(aiCloudQuestions).slice(0, 4),
    ...shuffle(networkingQuestions).slice(0, 3),
    ...shuffle(officeQuestions).slice(0, 3),
    ...shuffle(hardwareQuestions).slice(0, 1),
  ];

  const shuffledExam = shuffle(selectedMcqs);

  const paragraphPrompts = [
    {
      title: 'Write a short paragraph on: "Artificial Intelligence and Youth Employment in Bangladesh"',
      instruction: 'Explain how AI tools can open new freelancing and job horizons for young people in Bangladesh. (Marks: 5, Length: 5-8 sentences)'
    },
    {
      title: 'Write a short paragraph on: "Importance of Digital Skills in Modern Careers"',
      instruction: 'Highlight how learning digital marketing, graphics, and office tools changes lives. (Marks: 5, Length: 5-8 sentences)'
    },
    {
      title: 'Write a short paragraph on: "How Freelancing Can Reduce Unemployment in Bangladesh"',
      instruction: 'Discuss the opportunities in international freelancing platforms for youth. (Marks: 5, Length: 5-8 sentences)'
    }
  ];

  const emailPrompts = [
    {
      title: 'Email Writing: Informing a Friend about DYD AI Course Admission',
      instruction: 'Write an email to your close friend sharing the happy news of your admission into the 2-month AI Skill Development course. (Marks: 5)'
    },
    {
      title: 'Email Writing: Requesting Guidance on Training and Portfolio Building',
      instruction: 'Write a formal email to your course instructor asking for advice on freelance portfolio creation. (Marks: 5)'
    },
    {
      title: 'Email Writing: Official Query regarding Course Certificate Collection',
      instruction: 'Write a polite email to the District Youth Development Coordinator inquiring about certificate issuance. (Marks: 5)'
    }
  ];

  return {
    mcqs: shuffledExam,
    paragraphPrompt: shuffle(paragraphPrompts)[0],
    emailPrompt: shuffle(emailPrompts)[0]
  };
}
