export interface Question {
  id: string;
  categoryId: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  correctAnswer: string;
  explanation: string;
  source?: string; // e.g. "উচ্চমাধ্যমিক (HSC) ICT অধ্যায় ১" or "মাধ্যমিক (SSC) ICT"
}

export interface Category {
  id: string;
  name: string;
  target_count: number;
  icon: string;
}

export interface VideoResource {
  id: string;
  youtubeId: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  duration?: string;
  badge: string;
  keyTopics: string[];
  solvedHighlights: {
    question: string;
    answer: string;
    category: string;
    timecode?: string;
  }[];
}

export interface WrittenTemplate {
  id: string;
  title: string;
  type: 'paragraph' | 'email';
  description: string;
  formula: { step: string; pattern: string; purpose: string }[];
  examples: {
    topic: string;
    context: string;
    content: string;
  }[];
}

export interface DistrictStat {
  name: string;
  division: string;
  estimatedApplicants: number;
  estimatedExaminees: number;
  basicSeats: number;
  advancedSeats: number;
  totalSeats: number;
  passLikelihoodFromExaminees: string;
}

export interface VivaQuestion {
  id: string;
  questionBn: string;
  questionEn?: string;
  suggestedAnswerBn: string;
  keyPoints: string[];
  category: 'personal' | 'ai' | 'computer' | 'freelancing' | 'general';
}

export interface PracticalTask {
  id: string;
  module: string;
  taskTitle: string;
  instructions: string[];
  keyToolsUsed: string[];
  expectedOutput: string;
}
