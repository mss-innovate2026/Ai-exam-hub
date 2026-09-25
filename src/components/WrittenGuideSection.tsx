import React, { useState } from 'react';
import { 
  paragraphFormula, 
  sampleTopics, 
  emailScenarios, 
  writtenQuestionItems,
  ParagraphTopic,
  EmailScenario,
  WrittenQuestionItem
} from '../data/writtenGuide';
import { 
  evaluateWrittenSubmission, 
  WrittenEvaluationResult 
} from '../services/writtenScorer';
import { 
  PenTool, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  Lightbulb, 
  FileText,
  Send,
  RotateCcw,
  Award,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Sliders,
  HelpCircle
} from 'lucide-react';

export const WrittenGuideSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'practice' | 'paragraph' | 'email' | 'questions'>('practice');
  
  // Practice Lab State
  const [practiceType, setPracticeType] = useState<'paragraph' | 'email' | 'question'>('paragraph');
  const [selectedParagraphTopic, setSelectedParagraphTopic] = useState<ParagraphTopic>(sampleTopics[0]);
  const [selectedEmailScenario, setSelectedEmailScenario] = useState<EmailScenario>(emailScenarios[0]);
  const [selectedQuestionItem, setSelectedQuestionItem] = useState<WrittenQuestionItem>(writtenQuestionItems[0]);
  const [userText, setUserText] = useState<string>('');
  const [evaluationResult, setEvaluationResult] = useState<WrittenEvaluationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Guide Tab States
  const [viewingTopic, setViewingTopic] = useState<ParagraphTopic>(sampleTopics[0]);
  const [viewingEmail, setViewingEmail] = useState<EmailScenario>(emailScenarios[0]);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Custom Builder State
  const [customTopic, setCustomTopic] = useState<string>('Artificial Intelligence');
  const [customGroup, setCustomGroup] = useState<string>('the youth of Bangladesh');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const dynamicParagraph = `${customTopic} can bring a lot of positive change to ${customGroup}. First, it can help people learn new skills quickly through easy and modern methods. Second, it can create new opportunities and make work faster, easier, and more efficient. Third, it can help young people and businesses earn better income and reduce hard manual work. In this way, ${customTopic} can play a vital role in building a better future for ${customGroup}.`;

  // Submit and evaluate practice response
  const handleSubmitPractice = () => {
    setIsSubmitting(true);
    let expectedKeywords: string[] = [];
    let minWords = 40;

    if (practiceType === 'paragraph') {
      expectedKeywords = selectedParagraphTopic.expectedKeywords;
      minWords = 45;
    } else if (practiceType === 'email') {
      expectedKeywords = selectedEmailScenario.expectedKeywords;
      minWords = 40;
    } else {
      expectedKeywords = selectedQuestionItem.expectedKeywords;
      minWords = 35;
    }

    // Small delay to simulate evaluation feel
    setTimeout(() => {
      const result = evaluateWrittenSubmission(userText, {
        type: practiceType === 'email' ? 'email' : practiceType === 'paragraph' ? 'paragraph' : 'short_question',
        expectedKeywords,
        minWords
      });
      setEvaluationResult(result);
      setIsSubmitting(false);
    }, 400);
  };

  const handleResetPractice = () => {
    setUserText('');
    setEvaluationResult(null);
  };

  const handleQuickPracticeQuestion = (item: WrittenQuestionItem) => {
    setSelectedQuestionItem(item);
    setPracticeType('question');
    setActiveTab('practice');
    setUserText('');
    setEvaluationResult(null);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const currentWordsCount = userText.trim() ? userText.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
  const currentSentenceCount = userText.trim() ? userText.trim().split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-teal-600/40 text-teal-100 text-xs font-semibold px-3 py-1 rounded-full border border-teal-400/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>লিখিত অংশের পূর্ণাঙ্গ প্রস্তুতি ও লাইভ মূল্যায়ন — মোট ১০ নম্বর</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            লিখিত অংশে লেখার প্র্যাকটিস ও লেখা অনুযায়ী স্বয়ংক্রিয় গ্রেডিং
          </h2>
          <p className="text-teal-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
            এখানে আপনি নিজে প্যারাগ্রাফ, ইমেইল ও সংক্ষিপ্ত প্রশ্ন লিখে জমা (Submit) দিতে পারবেন। আপনার লেখার কাঠামো, কি-ওয়ার্ড, ব্যাকরণ ও শব্দ দৈর্ঘ্য বিশ্লেষণ করে তৎক্ষণাৎ নম্বর (Marks out of 5) ও সুনির্দিষ্ট ফিডব্যাক প্রদান করা হবে।
          </p>

          {/* Tab Navigation Pill Header */}
          <div className="pt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'practice'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'bg-white/10 hover:bg-white/20 text-teal-50'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>✍️ লিখে জমা দিন ও নম্বর দেখুন (Practice Lab)</span>
            </button>
            <button
              onClick={() => setActiveTab('paragraph')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'paragraph'
                  ? 'bg-white text-teal-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-teal-50'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>📝 প্যারাগ্রাফ সূত্র ও মডেল উত্তর</span>
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'email'
                  ? 'bg-white text-teal-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-teal-50'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>📧 ইমেইল ফরম্যাট ও পরিস্থিতি</span>
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'questions'
                  ? 'bg-white text-teal-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-teal-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>📚 সংক্ষিপ্ত প্রশ্নোত্তর ও বিশদ ব্যাখ্যা</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: PRACTICE LAB & LIVE GRADING ENGINE */}
      {/* ============================================================== */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold shadow-inner">
                  <PenTool className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span>লিখিত প্র্যাকটিস ও স্বয়ংক্রিয় মূল্যায়ন ব্যবস্থা</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                      লাইভ গ্রেডার
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    নির্ধারিত বিষয়ে ইংরেজিতে লিখুন এবং "জমা দিন" বাটনে চাপলে স্বয়ংক্রিয়ভাবে খাতা মূল্যায়িত হবে
                  </p>
                </div>
              </div>

              {/* Type Selector Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl">
                <button
                  onClick={() => {
                    setPracticeType('paragraph');
                    setEvaluationResult(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    practiceType === 'paragraph'
                      ? 'bg-white text-teal-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Paragraph (৫ নম্বর)
                </button>
                <button
                  onClick={() => {
                    setPracticeType('email');
                    setEvaluationResult(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    practiceType === 'email'
                      ? 'bg-white text-teal-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Email (৫ নম্বর)
                </button>
                <button
                  onClick={() => {
                    setPracticeType('question');
                    setEvaluationResult(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    practiceType === 'question'
                      ? 'bg-white text-teal-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Short Q&A (৫ নম্বর)
                </button>
              </div>
            </div>

            {/* Topic Selection Bar */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                {practiceType === 'paragraph' && '১. প্যারাগ্রাফের টপিক নির্বাচন করুন:'}
                {practiceType === 'email' && '১. ইমেইলের প্রেক্ষাপট নির্বাচন করুন:'}
                {practiceType === 'question' && '১. সংক্ষিপ্ত প্রশ্ন নির্বাচন করুন:'}
              </label>

              {practiceType === 'paragraph' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {sampleTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedParagraphTopic(topic);
                        setEvaluationResult(null);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between gap-1.5 ${
                        selectedParagraphTopic.id === topic.id
                          ? 'bg-teal-50 border-teal-500 text-teal-950 font-bold ring-2 ring-teal-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-teal-50/40'
                      }`}
                    >
                      <span className="font-semibold text-teal-900">{topic.title}</span>
                      <span className="text-[11px] text-slate-500 font-normal">{topic.banglaTitle}</span>
                    </button>
                  ))}
                </div>
              )}

              {practiceType === 'email' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {emailScenarios.map((scenario) => (
                    <button
                      key={scenario.id}
                      onClick={() => {
                        setSelectedEmailScenario(scenario);
                        setEvaluationResult(null);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between gap-1.5 ${
                        selectedEmailScenario.id === scenario.id
                          ? 'bg-teal-50 border-teal-500 text-teal-950 font-bold ring-2 ring-teal-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-teal-50/40'
                      }`}
                    >
                      <span className="font-semibold text-teal-900">{scenario.banglaTitle}</span>
                      <span className="text-[11px] text-slate-500 font-mono font-normal truncate">Sub: {scenario.subject}</span>
                    </button>
                  ))}
                </div>
              )}

              {practiceType === 'question' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {writtenQuestionItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedQuestionItem(item);
                        setEvaluationResult(null);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between gap-1.5 ${
                        selectedQuestionItem.id === item.id
                          ? 'bg-teal-50 border-teal-500 text-teal-950 font-bold ring-2 ring-teal-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-teal-50/40'
                      }`}
                    >
                      <span className="font-semibold text-teal-900">{item.questionBn}</span>
                      <span className="text-[10px] bg-teal-100/60 text-teal-800 px-2 py-0.5 rounded self-start font-bold">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Prompt & Instruction Card */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded inline-block">
                    নির্ধারিত পরীক্ষার প্রশ্ন (পূর্ণমান: ৫ নম্বর)
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {practiceType === 'paragraph' && `Write a short paragraph on: "${selectedParagraphTopic.title}"`}
                    {practiceType === 'email' && `Write an email regarding: "${selectedEmailScenario.title}"`}
                    {practiceType === 'question' && selectedQuestionItem.questionEn}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {practiceType === 'paragraph' && `বাংলা অর্থ: ${selectedParagraphTopic.banglaMeaning.slice(0, 140)}...`}
                    {practiceType === 'email' && `প্রয়োজনীয় বিষয়: To, From, Date, Subject, এবং Salutation সহ সম্পূর্ণ ফরম্যাট লিখুন।`}
                    {practiceType === 'question' && `বাংলা প্রশ্ন: ${selectedQuestionItem.questionBn}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Text Editor Area */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-teal-600" />
                  <span>আপনার উত্তর এখানে টাইপ করুন (ইংরেজি বা বাংলায়):</span>
                </label>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500 font-mono">
                    শব্দ: <b className="text-teal-900">{currentWordsCount}</b>
                  </span>
                  <span className="text-slate-500 font-mono">
                    বাক্য: <b className="text-teal-900">{currentSentenceCount}</b>
                  </span>
                </div>
              </div>

              <textarea
                rows={practiceType === 'email' ? 8 : 6}
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder={
                  practiceType === 'paragraph'
                    ? 'Start typing your paragraph here (e.g. Artificial Intelligence can bring a lot of positive change to the youth of Bangladesh. First, it can help...)'
                    : practiceType === 'email'
                    ? 'To      : tanvir.hassan@gmail.com\nFrom    : yourname@gmail.com\nDate    : 24 September 2026\nSubject : Exciting news! I got admission...\n\nHi Tanvir,\nI hope you are well. I am writing to...'
                    : 'Type your detailed answer with key technical points here...'
                }
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-inner leading-relaxed"
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetPractice}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>মুছে ফেলুন</span>
                  </button>
                  <button
                    onClick={() => {
                      if (practiceType === 'paragraph') setUserText(selectedParagraphTopic.modelParagraph);
                      else if (practiceType === 'email') setUserText(selectedEmailScenario.fullSample);
                      else setUserText(selectedQuestionItem.detailedModelAnswerEn);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors flex items-center gap-1.5"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>মডেল উত্তর লোড করুন</span>
                  </button>
                </div>

                <button
                  disabled={isSubmitting || !userText.trim()}
                  onClick={handleSubmitPractice}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'মূল্যায়ন হচ্ছে...' : 'লেখা জমা দিন ও নম্বর দেখুন (Submit)'}</span>
                </button>
              </div>
            </div>

            {/* ============================================================== */}
            {/* LIVE EVALUATION RESULTS CARD */}
            {/* ============================================================== */}
            {evaluationResult && (
              <div className="mt-8 pt-6 border-t-2 border-dashed border-teal-200 space-y-6 animate-fade-in">
                
                {/* Result Header Badge */}
                <div className={`p-6 rounded-3xl border ${evaluationResult.gradeColor} space-y-4 shadow-sm`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Award className="w-6 h-6 text-amber-500" />
                        <h4 className="text-lg sm:text-xl font-black">
                          {evaluationResult.gradeTitleBn}
                        </h4>
                      </div>
                      <p className="text-xs leading-relaxed font-medium">
                        {evaluationResult.summaryFeedbackBn}
                      </p>
                    </div>

                    {/* Numeric Score Circle Card */}
                    <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 text-center shadow-xs shrink-0">
                      <span className="text-[11px] font-bold text-slate-500 block">প্রাপ্ত নম্বর</span>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-black text-teal-800">{evaluationResult.score}</span>
                        <span className="text-sm font-bold text-slate-400">/ ৫.০</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {evaluationResult.percentage}% অর্জন
                      </span>
                    </div>
                  </div>

                  {/* 3 Metrics Progress Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {evaluationResult.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-white/80 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200/80 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{metric.nameBn}</span>
                          <span className="font-mono font-bold text-teal-800">{metric.score} / {metric.maxScore}</span>
                        </div>
                        {/* Bar */}
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-teal-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(metric.score / metric.maxScore) * 100}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-600 leading-tight">{metric.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Feedback & Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-2.5">
                    <b className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      আপনার লেখার শক্তিশালী ও সঠিক দিকসমূহ:
                    </b>
                    {evaluationResult.strengths.length > 0 ? (
                      <ul className="space-y-1.5 text-xs text-emerald-900 pl-5 list-disc">
                        {evaluationResult.strengths.map((str, idx) => (
                          <li key={idx} className="leading-relaxed">{str}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-emerald-800 italic">পয়েন্টগুলো গুছিয়ে লিখলে আরও প্রশংসা পয়েন্ট যোগ হবে।</p>
                    )}
                  </div>

                  {/* Improvements */}
                  <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-2.5">
                    <b className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-amber-600" />
                      পূর্ণ ৫ পেতে যা যা সংশোধন ও যোগ করা প্রয়োজন:
                    </b>
                    {evaluationResult.improvements.length > 0 ? (
                      <ul className="space-y-1.5 text-xs text-amber-900 pl-5 list-disc">
                        {evaluationResult.improvements.map((imp, idx) => (
                          <li key={idx} className="leading-relaxed">{imp}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-amber-800">আপনার লেখায় কোনো বড় ধরনের ঘাটতি পাওয়া যায়নি। চমৎকার!</p>
                    )}
                  </div>
                </div>

                {/* Keyword Detection Check */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      🔍 মূল কনসেপ্ট ও কি-ওয়ার্ড কভারেজ তালিকা:
                    </span>
                    <span className="text-xs text-teal-800 font-semibold">
                      শনাক্ত: {evaluationResult.detectedKeywords.length} টি
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {evaluationResult.detectedKeywords.map((kw, idx) => (
                      <span key={idx} className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-medium px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        {kw}
                      </span>
                    ))}
                    {evaluationResult.missingKeywords.map((kw, idx) => (
                      <span key={idx} className="bg-slate-200/80 text-slate-600 border border-slate-300 text-[11px] font-medium px-2 py-0.5 rounded-lg line-through opacity-70">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Model Answer Side-by-Side Comparison */}
                <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        আদর্শ মডেল উত্তর ও সম্পূর্ণ বাংলা অনুবাদ
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-teal-400 bg-teal-950 px-2.5 py-1 rounded-md border border-teal-800">
                      ১০০% পূর্ণ নম্বরের ফরম্যাট
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                      <b className="text-teal-300 block font-semibold">English Model Answer:</b>
                      <p className="text-slate-200 leading-relaxed whitespace-pre-wrap font-mono text-[11px]">
                        {practiceType === 'paragraph' && selectedParagraphTopic.modelParagraph}
                        {practiceType === 'email' && selectedEmailScenario.fullSample}
                        {practiceType === 'question' && selectedQuestionItem.detailedModelAnswerEn}
                      </p>
                    </div>

                    <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                      <b className="text-amber-300 block font-semibold">সহজ বাংলা অর্থ ও বিশ্লেষণ:</b>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-xs">
                        {practiceType === 'paragraph' && selectedParagraphTopic.banglaMeaning}
                        {practiceType === 'email' && selectedEmailScenario.banglaTranslation}
                        {practiceType === 'question' && selectedQuestionItem.detailedModelAnswerBn}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: PARAGRAPH MASTER GUIDE & 5-LINE FORMULA */}
      {/* ============================================================== */}
      {activeTab === 'paragraph' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <PenTool className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                    📝 Paragraph / Essay-এর ৫-লাইন মাস্টার সূত্র (৫ নম্বর)
                  </h3>
                  <p className="text-xs text-slate-500">
                    যেকোনো টপিক আসুক, এই ৫টি বাক্য ধাপে ধাপে সাজালেই নিশ্চিত ফুল মার্কস পাওয়া যায়
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                ১০০% ইউনিভার্সাল সূত্র
              </span>
            </div>

            {/* 5 Steps Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded inline-block">
                  {paragraphFormula.step1.label}
                </span>
                <p className="text-xs font-mono font-medium text-slate-800">
                  "{paragraphFormula.step1.formula}"
                </p>
                <p className="text-[11px] text-slate-500">{paragraphFormula.step1.instruction}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded inline-block">
                  {paragraphFormula.step2.label}
                </span>
                <p className="text-xs font-mono font-medium text-slate-800">
                  "{paragraphFormula.step2.formula}"
                </p>
                <p className="text-[11px] text-slate-500">{paragraphFormula.step2.instruction}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded inline-block">
                  {paragraphFormula.step3.label}
                </span>
                <p className="text-xs font-mono font-medium text-slate-800">
                  "{paragraphFormula.step3.formula}"
                </p>
                <p className="text-[11px] text-slate-500">{paragraphFormula.step3.instruction}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded inline-block">
                  {paragraphFormula.step4.label}
                </span>
                <p className="text-xs font-mono font-medium text-slate-800">
                  "{paragraphFormula.step4.formula}"
                </p>
                <p className="text-[11px] text-slate-500">{paragraphFormula.step4.instruction}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded inline-block">
                  {paragraphFormula.step5.label}
                </span>
                <p className="text-xs font-mono font-medium text-slate-800">
                  "{paragraphFormula.step5.formula}"
                </p>
                <p className="text-[11px] text-slate-500">{paragraphFormula.step5.instruction}</p>
              </div>
            </div>

            {/* Live Interactive Builder */}
            <div className="bg-teal-50/70 rounded-2xl p-5 border border-teal-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  লাইভ প্যারাগ্রাফ জেনারেটর (নিজের বিষয় বসান)
                </h4>
                <span className="text-xs text-teal-700">স্বয়ংক্রিয় প্যারাগ্রাফ তৈরি</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    [TOPIC] কি বিষয়? (যেমন: Freelancing, Digital Marketing, AI...)
                  </label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-teal-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    [PLACE/GROUP] কাদের জন্য? (যেমন: students, unemployed youth...)
                  </label>
                  <input
                    type="text"
                    value={customGroup}
                    onChange={(e) => setCustomGroup(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-teal-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Generated Result */}
              <div className="bg-white rounded-xl p-4 border border-teal-300/80 shadow-xs relative">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium pr-10">
                  {dynamicParagraph}
                </p>
                <button
                  onClick={() => copyToClipboard(dynamicParagraph, 'custom-p')}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 transition-colors"
                  title="কপি করুন"
                >
                  {copiedIndex === 'custom-p' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Rich Model Topics with Sentence Analysis */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                পরীক্ষার সবচেয়ে কমন ৬টি প্যারাগ্রাফ ও বিস্তারিত বিশ্লেষণ:
              </h4>

              <div className="flex flex-wrap gap-2 mb-2">
                {sampleTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setViewingTopic(topic)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      viewingTopic.id === topic.id
                        ? 'bg-teal-800 text-white border-teal-900 shadow-xs'
                        : 'bg-slate-100 hover:bg-teal-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {topic.banglaTitle}
                  </button>
                ))}
              </div>

              {/* Detailed Active Topic Card */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h5 className="font-extrabold text-teal-950 text-base">{viewingTopic.title}</h5>
                    <p className="text-xs text-slate-600 font-semibold">{viewingTopic.banglaTitle}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedParagraphTopic(viewingTopic);
                        setPracticeType('paragraph');
                        setActiveTab('practice');
                        setUserText('');
                        setEvaluationResult(null);
                        window.scrollTo({ top: 150, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>এটি প্র্যাকটিস করুন</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(viewingTopic.modelParagraph, `viewing-${viewingTopic.id}`)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                      title="কপি করুন"
                    >
                      {copiedIndex === `viewing-${viewingTopic.id}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Model paragraph */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                  <b className="text-xs font-bold text-teal-900 block">English Model Paragraph:</b>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium">
                    {viewingTopic.modelParagraph}
                  </p>
                </div>

                {/* Bangla Translation */}
                <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200 space-y-2">
                  <b className="text-xs font-bold text-teal-950 block">সম্পূর্ণ বাংলা অনুবাদ:</b>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {viewingTopic.banglaMeaning}
                  </p>
                </div>

                {/* Sentence by Sentence Breakdown */}
                <div className="space-y-2.5">
                  <b className="text-xs font-bold text-slate-800 block">বাক্যভিত্তিক বিশদ বিশ্লেষণ (Sentence Breakdown):</b>
                  <div className="space-y-2">
                    {viewingTopic.sentenceBreakdown.map((s, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded text-[11px]">
                            {s.step} — {s.purpose}
                          </span>
                        </div>
                        <p className="font-mono text-slate-900 text-xs">{s.english}</p>
                        <p className="text-slate-600 text-[11px]">{s.bangla}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examiner Tips & Vocabulary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-1.5">
                    <b className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      পরীক্ষকের মূল টিপস:
                    </b>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      {viewingTopic.examinerTips}
                    </p>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 space-y-1.5">
                    <b className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      হাই-স্কোরিং ভোকাবুলারি:
                    </b>
                    <div className="space-y-1 text-[11px] text-indigo-900">
                      {viewingTopic.vocabulary.map((v, i) => (
                        <div key={i}>
                          <span className="font-bold">{v.word}</span> ({v.meaning}): <span className="italic">{v.usage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: EMAIL WRITING MASTER FORMAT & SCENARIOS */}
      {/* ============================================================== */}
      {activeTab === 'email' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                    📧 Email লিখন মাস্টার ফরম্যাট (৫ নম্বর)
                  </h3>
                  <p className="text-xs text-slate-500">
                    ইমেইলে সঠিক হেডার ও ক্লোজিং বজায় রাখাই বেশি নম্বর পাওয়ার মূল রহস্য
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                পূর্ণ ৫ নম্বর
              </span>
            </div>

            {/* Email Blueprint Architecture */}
            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs space-y-2 border border-slate-800 shadow-inner">
              <div className="text-slate-400">// ইমেইলের আদর্শ লেআউট ও স্ট্রাকচার:</div>
              <p><span className="text-teal-400 font-bold">To      :</span> [receiver]_email@gmail.com</p>
              <p><span className="text-teal-400 font-bold">From    :</span> your_email@gmail.com</p>
              <p><span className="text-teal-400 font-bold">Date    :</span> 24 September 2026</p>
              <p><span className="text-teal-400 font-bold">Subject :</span> [সংক্ষিপ্ত ও স্পষ্ট বিষয় লাইন]</p>
              <div className="pt-2 text-amber-300">Hi [Name] / Respected Sir,</div>
              <p className="text-slate-300 leading-relaxed">
                I hope you are well. I am writing to [উদ্দেশ্য ১ লাইনে]. [বিস্তারিত বিষয় ১-২ লাইনে]. [উপকারিতা বা আবেদন ১ লাইনে]।
              </p>
              <p className="text-slate-300">[সমাপনী প্রত্যাশা বা শুভেচ্ছা বাক্য]। Take care!</p>
              <div className="pt-2 text-teal-300">
                Best wishes / Sincerely yours,<br />
                [Your Full Name]
              </div>
            </div>

            {/* Real Email Scenarios */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                পরীক্ষার ৩টি অতি গুরুত্বপূর্ণ ইমেইল পরিস্থিতি ও নমুনা:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {emailScenarios.map((sc, idx) => (
                  <div 
                    key={sc.id}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                        পরিস্থিতি {idx + 1}
                      </span>
                      <h5 className="font-bold text-slate-800 text-xs sm:text-sm mt-1.5 leading-snug">
                        {sc.banglaTitle}
                      </h5>
                      <p className="text-xs text-teal-700 font-mono mt-1 font-semibold truncate">
                        Sub: {sc.subject}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                      {sc.fullSample}
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setSelectedEmailScenario(sc);
                          setPracticeType('email');
                          setActiveTab('practice');
                          setUserText('');
                          setEvaluationResult(null);
                          window.scrollTo({ top: 150, behavior: 'smooth' });
                        }}
                        className="w-full py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <PenTool className="w-3.5 h-3.5" />
                        <span>এটি নিজে লিখুন ও জমা দিন</span>
                      </button>
                      <button
                        onClick={() => copyToClipboard(sc.fullSample, `email-${idx}`)}
                        className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        {copiedIndex === `email-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIndex === `email-${idx}` ? 'কপি সম্পন্ন!' : 'ইমেইল কপি করুন'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <b className="text-amber-900 block font-bold text-sm">পরীক্ষার হলে খাতার প্রেজেন্টেশন ও মার্কিং টিপস:</b>
                <p className="leading-relaxed">
                  ইমেইল লেখার সময় খাতায় স্কেল দিয়ে একটি চতুষ্কোণ বক্স এঁকে নেওয়া সবচেয়ে বুদ্ধিমানের কাজ। 
                  To, From, Subject আলাদা লাইনে কোলন (:) বজায় রেখে লিখবেন। 
                  বন্ধুকে লিখলে "Hi [Name]" বা "Dear Friend" এবং শিক্ষক বা কর্মকর্তাকে লিখলে "Respected Sir" বা "Dear Sir" লিখবেন। 
                  এই ফরম্যাটিংয়ের জন্যই পরীক্ষক ৩ নম্বর দিয়ে দেন!
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: SHORT WRITTEN Q&A BANK WITH DEEP EXPLANATIONS */}
      {/* ============================================================== */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                    📚 সংক্ষিপ্ত লিখিত প্রশ্ন ও বিশদ ব্যাখ্যা ব্যাংক
                  </h3>
                  <p className="text-xs text-slate-500">
                    এআই, ফ্রিল্যান্সিং, প্রম্পট ইঞ্জিনিয়ারিং ও আইসিটির লিখিত প্রশ্নোত্তর এবং পরীক্ষকের চেকলিস্ট
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                {writtenQuestionItems.length}টি গুরুত্বপূর্ণ প্রশ্ন
              </span>
            </div>

            {/* Questions Accordion / Cards List */}
            <div className="space-y-5">
              {writtenQuestionItems.map((item, idx) => (
                <div key={item.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-teal-700 text-white font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-teal-900 bg-teal-100 px-2.5 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className="text-xs text-slate-400">পূর্ণমান: {item.marks} নম্বর</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 pt-1">
                        {item.questionBn}
                      </h4>
                      <p className="text-xs font-mono text-slate-500">
                        {item.questionEn}
                      </p>
                    </div>

                    <button
                      onClick={() => handleQuickPracticeQuestion(item)}
                      className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>এই প্রশ্নে লিখে পরীক্ষা দিন</span>
                    </button>
                  </div>

                  {/* Model Answer (Bangla + English) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <b className="text-xs font-bold text-teal-900 block">বাংলা আদর্শ উত্তর:</b>
                      <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {item.detailedModelAnswerBn}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <b className="text-xs font-bold text-teal-900 block">English Model Answer:</b>
                      <p className="text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {item.detailedModelAnswerEn}
                      </p>
                    </div>
                  </div>

                  {/* Deep Explanation & Key Points */}
                  <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200 space-y-2 text-xs">
                    <b className="text-teal-950 font-bold flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      পরীক্ষকের মূল ব্যাখ্যা ও নম্বর বণ্টনের রহস্য:
                    </b>
                    <p className="text-slate-700 leading-relaxed">
                      {item.deepExplanation}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {item.keyPoints.map((kp, kIdx) => (
                        <span key={kIdx} className="bg-white text-teal-900 border border-teal-300/80 px-2 py-1 rounded text-[11px] font-medium">
                          ✓ {kp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
