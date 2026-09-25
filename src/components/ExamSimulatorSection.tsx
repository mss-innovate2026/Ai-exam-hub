import React, { useState, useEffect, useRef } from 'react';
import { generateRealisticMockExam } from '../data/questionsService';
import { Question } from '../types';
import { evaluateWrittenSubmission, WrittenEvaluationResult } from '../services/writtenScorer';
import confetti from 'canvas-confetti';
import { 
  Timer, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Award, 
  FileText, 
  AlertTriangle,
  Flag,
  Send,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  BookOpen
} from 'lucide-react';

export const ExamSimulatorSection: React.FC = () => {
  const [examState, setExamState] = useState<'intro' | 'running' | 'result'>('intro');
  const [examData, setExamData] = useState<ReturnType<typeof generateRealisticMockExam> | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(40 * 60); // 40 minutes
  
  // Written responses
  const [paragraphText, setParagraphText] = useState<string>('');
  const [emailText, setEmailText] = useState<string>('');
  const [activeSection, setActiveSection] = useState<'mcq' | 'written'>('mcq');

  // Evaluated Written Results
  const [paragraphResult, setParagraphResult] = useState<WrittenEvaluationResult | null>(null);
  const [emailResult, setEmailResult] = useState<WrittenEvaluationResult | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start exam
  const handleStartExam = () => {
    const data = generateRealisticMockExam();
    setExamData(data);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setParagraphText('');
    setEmailText('');
    setParagraphResult(null);
    setEmailResult(null);
    setCurrentIdx(0);
    setTimeLeft(40 * 60);
    setActiveSection('mcq');
    setExamState('running');
  };

  // Timer logic
  useEffect(() => {
    if (examState === 'running') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState]);

  const handleFinishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Evaluate written submissions
    const pEval = evaluateWrittenSubmission(paragraphText, {
      type: 'paragraph',
      expectedKeywords: ['artificial intelligence', 'freelancing', 'digital', 'skills', 'youth', 'opportunities', 'efficient', 'future', 'income'],
      minWords: 40
    });

    const eEval = evaluateWrittenSubmission(emailText, {
      type: 'email',
      expectedKeywords: ['dyd', 'admission', 'course', 'training', 'certificate', 'freelance', 'regards', 'sincerely'],
      minWords: 35
    });

    setParagraphResult(pEval);
    setEmailResult(eEval);
    setExamState('result');

    // Trigger confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (qIdx: number, optIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const toggleFlag = (qIdx: number) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qIdx]: !prev[qIdx]
    }));
  };

  // Calculate results
  const calculateScore = () => {
    if (!examData) return { correct: 0, total: 30, percentage: 0 };
    let correctCount = 0;
    examData.mcqs.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    return {
      correct: correctCount,
      total: examData.mcqs.length,
      percentage: Math.round((correctCount / examData.mcqs.length) * 100)
    };
  };

  // INTRO SCREEN
  if (examState === 'intro') {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-teal-100 shadow-sm space-y-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto shadow-inner">
          <Award className="w-9 h-9 text-teal-700" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            রিয়েল এক্সাম সিমুলেটর ও লাইভ লিখিত মূল্যায়ন
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            DYD AI কোর্স পূর্ণাঙ্গ মডেল টেস্ট (৪০ নম্বর)
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-xl mx-auto">
            প্রথম ব্যাচের আসল প্রশ্নপত্রের সঠিক অনুপাত অনুযায়ী ৩০টি MCQ এবং ১০ নম্বরের লিখিত অংশের (Paragraph ৫ + Email ৫) সমন্বয়ে তৈরি। লিখিত অংশ জমা দিলে স্বয়ংক্রিয়ভাবে নম্বর ও বিস্তারিত ব্যাখ্যা প্রদান করা হবে।
          </p>
        </div>

        {/* Exam Breakdown Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 font-semibold block">মোট MCQ</span>
            <b className="text-lg text-teal-900">৩০টি প্রশ্ন</b>
            <span className="text-[10px] text-slate-400 block">১ নম্বর করে = ৩০</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 font-semibold block">লিখিত অংশ</span>
            <b className="text-lg text-teal-900">১০ নম্বর</b>
            <span className="text-[10px] text-slate-400 block">লেখা অনুযায়ী স্বয়ংক্রিয় নম্বর</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 font-semibold block">নির্ধারিত সময়</span>
            <b className="text-lg text-amber-700">৪০ মিনিট</b>
            <span className="text-[10px] text-slate-400 block">কাউন্টডাউন টাইমার</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 font-semibold block">নেগেটিভ মার্ক</span>
            <b className="text-lg text-emerald-700">নেই</b>
            <span className="text-[10px] text-slate-400 block">সবগুলো উত্তর দিন</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-left space-y-2 text-amber-950">
          <b className="font-bold flex items-center gap-1.5 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            পরীক্ষার্থীর জন্য বিশেষ নির্দেশনা:
          </b>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>পরীক্ষা শুরু বাটনে চাপার সাথে সাথে ৪০ মিনিটের কাউন্টডাউন শুরু হবে।</li>
            <li>ডিজিটাল মার্কেটিং, ইংরেজি, এআই, গ্রাফিক্স ও অফিস—সব বিভাগ থেকে প্রশ্ন থাকবে।</li>
            <li>লিখিত অংশের বক্সগুলোতে প্যারাগ্রাফ ও ইমেইল টাইপ করে জমা দিলে স্বয়ংক্রিয়ভাবে প্রতিটি অংশের নম্বর ও বিশদ ফিডব্যাক পাবেন।</li>
          </ul>
        </div>

        <button
          onClick={handleStartExam}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-extrabold text-base rounded-xl shadow-md shadow-teal-900/20 hover:scale-[1.02] transition-all cursor-pointer"
        >
          পরীক্ষা শুরু করুন (Start Test)
        </button>
      </div>
    );
  }

  // RESULT SCREEN
  if (examState === 'result' && examData) {
    const mcqScore = calculateScore();
    const pScore = paragraphResult ? paragraphResult.score : 0;
    const eScore = emailResult ? emailResult.score : 0;
    const grandTotal = Number((mcqScore.correct + pScore + eScore).toFixed(1));
    const isPassed = grandTotal >= 20; // 50%+ passing

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Grand Scorecard Header */}
        <div className={`rounded-3xl p-6 sm:p-8 text-white text-center shadow-lg relative overflow-hidden ${
          isPassed 
            ? 'bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700' 
            : 'bg-gradient-to-r from-slate-800 to-slate-700'
        }`}>
          <div className="relative z-10 space-y-3">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-amber-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              {isPassed ? 'অভিনন্দন! আপনি পূর্ণাঙ্গ পরীক্ষায় দারুণ ফলাফল করেছেন' : 'অনুশীলন চালিয়ে যান! লিখিত ও MCQ-তে আরও উন্নতির সুযোগ রয়েছে'}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 max-w-md mx-auto">
              {isPassed 
                ? 'আপনার সর্বমোট প্রাপ্ত নম্বর ভাইভা ও ব্যবহারিক পরীক্ষায় ডাকার জন্য অত্যন্ত নিরাপদ।' 
                : 'কমপক্ষে ২০+ নম্বর নিশ্চিত করতে লিখিত অংশের ৫-লাইনের সূত্র ও MCQ নিয়মিত অনুশীলন করুন।'}
            </p>

            {/* Grand Total Score Badge */}
            <div className="inline-flex items-baseline gap-3 bg-white/15 px-6 py-3.5 rounded-2xl border border-white/20 my-2">
              <span className="text-4xl sm:text-5xl font-black text-amber-300">{grandTotal}</span>
              <span className="text-lg text-white/90 font-bold">/ ৪০ (সর্বমোট)</span>
              <span className="text-xs bg-white/25 px-2.5 py-1 rounded-full ml-1 font-bold">
                {Math.round((grandTotal / 40) * 100)}% নম্বর
              </span>
            </div>

            {/* 3-Part Marks Distribution Row */}
            <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto pt-2 text-xs">
              <div className="bg-black/20 p-2 rounded-xl border border-white/10">
                <span className="text-white/70 block text-[11px]">MCQ স্কোর</span>
                <b className="text-base text-amber-300">{mcqScore.correct}</b> / ৩০
              </div>
              <div className="bg-black/20 p-2 rounded-xl border border-white/10">
                <span className="text-white/70 block text-[11px]">Paragraph</span>
                <b className="text-base text-teal-300">{pScore}</b> / ৫
              </div>
              <div className="bg-black/20 p-2 rounded-xl border border-white/10">
                <span className="text-white/70 block text-[11px]">Email</span>
                <b className="text-base text-teal-300">{eScore}</b> / ৫
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-3">
              <button
                onClick={handleStartExam}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                নতুন প্রশ্নে আবার পরীক্ষা দিন
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* WRITTEN ASSESSMENT DETAILED CARDS */}
        {/* ============================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              লিখিত অংশের বিশদ মূল্যায়ন ও খাতা রিভিউ (১০ নম্বর)
            </h3>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              প্রাপ্ত: {(pScore + eScore).toFixed(1)} / ১০
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Paragraph Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded">
                  ১. Paragraph (৫ নম্বর)
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-teal-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    নম্বর: {pScore} / ৫.০
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ({paragraphResult?.wordCount || 0} শব্দ)
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-800">{examData.paragraphPrompt.title}</h4>
              
              {/* User text */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 min-h-[90px] whitespace-pre-wrap leading-relaxed shadow-inner">
                {paragraphText.trim() || <span className="text-slate-400 italic">আপনি কোনো প্যারাগ্রাফ লেখেননি।</span>}
              </div>

              {/* Evaluated Metrics */}
              {paragraphResult && paragraphResult.wordCount > 0 && (
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-3 gap-1.5">
                    {paragraphResult.metrics.map((m, i) => (
                      <div key={i} className="bg-white p-2 rounded-lg border border-slate-200 text-[11px]">
                        <span className="text-slate-500 block truncate">{m.nameBn}</span>
                        <b className="text-teal-800">{m.score}/{m.maxScore}</b>
                      </div>
                    ))}
                  </div>

                  {paragraphResult.strengths.length > 0 && (
                    <div className="text-[11px] text-emerald-900 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                      <b className="block font-bold">✓ ভালো দিক:</b> {paragraphResult.strengths[0]}
                    </div>
                  )}

                  {paragraphResult.improvements.length > 0 && (
                    <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                      <b className="block font-bold">⚠️ উন্নয়নের সুযোগ:</b> {paragraphResult.improvements[0]}
                    </div>
                  )}
                </div>
              )}

              {/* Model Answer Box */}
              <div className="bg-emerald-50 text-emerald-950 p-3.5 rounded-xl border border-emerald-200 text-xs space-y-1.5">
                <b className="text-emerald-900 font-bold block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  আদর্শ ৫-বাক্যের মডেল প্যারাগ্রাফ:
                </b>
                <p className="italic text-emerald-900 leading-relaxed font-serif">
                  "Artificial Intelligence can bring a lot of positive change to the youth of Bangladesh. First, it can help people learn new skills quickly through easy and modern methods. Second, it can create new opportunities and make work faster, easier, and more efficient. Third, it can help young people earn better income through freelancing and reduce hard manual work. In this way, Artificial Intelligence can play a vital role in building a better future."
                </p>
              </div>
            </div>

            {/* Email Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded">
                  ২. Email (৫ নম্বর)
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-teal-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    নম্বর: {eScore} / ৫.০
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ({emailResult?.wordCount || 0} শব্দ)
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-800">{examData.emailPrompt.title}</h4>
              
              {/* User text */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 min-h-[90px] whitespace-pre-wrap font-mono leading-relaxed shadow-inner">
                {emailText.trim() || <span className="text-slate-400 italic">আপনি কোনো ইমেইল লেখেননি।</span>}
              </div>

              {/* Evaluated Metrics */}
              {emailResult && emailResult.wordCount > 0 && (
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-3 gap-1.5">
                    {emailResult.metrics.map((m, i) => (
                      <div key={i} className="bg-white p-2 rounded-lg border border-slate-200 text-[11px]">
                        <span className="text-slate-500 block truncate">{m.nameBn}</span>
                        <b className="text-teal-800">{m.score}/{m.maxScore}</b>
                      </div>
                    ))}
                  </div>

                  {emailResult.strengths.length > 0 && (
                    <div className="text-[11px] text-emerald-900 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                      <b className="block font-bold">✓ ভালো দিক:</b> {emailResult.strengths[0]}
                    </div>
                  )}

                  {emailResult.improvements.length > 0 && (
                    <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                      <b className="block font-bold">⚠️ উন্নয়নের সুযোগ:</b> {emailResult.improvements[0]}
                    </div>
                  )}
                </div>
              )}

              {/* Model Answer Box */}
              <div className="bg-emerald-50 text-emerald-950 p-3.5 rounded-xl border border-emerald-200 text-xs space-y-1.5">
                <b className="text-emerald-900 font-bold block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  আদর্শ ইমেইল ফরম্যাট মডেল:
                </b>
                <div className="font-mono text-[11px] text-emerald-950 space-y-0.5 leading-snug">
                  <div>To: coordinator.dyd@gov.bd | Sub: Course Information</div>
                  <div>Dear Sir, I am writing to respectfully inquire about the AI course...</div>
                  <div>Sincerely yours, [Your Name]</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed MCQ Answer Review */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-5">
          <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            MCQ বিস্তারিত পর্যালোচনা (প্রশ্ন ১ থেকে ৩০)
          </h3>

          <div className="space-y-4">
            {examData.mcqs.map((q: Question, idx: number) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctIndex;
              const isSkipped = userAns === undefined;

              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border transition-colors space-y-2.5 ${
                    isCorrect 
                      ? 'bg-emerald-50/40 border-emerald-200' 
                      : isSkipped 
                        ? 'bg-slate-50 border-slate-200' 
                        : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isCorrect ? 'bg-emerald-600 text-white' : isSkipped ? 'bg-slate-300 text-slate-800' : 'bg-rose-600 text-white'
                      }`}>
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                        {q.question}
                      </p>
                    </div>
                    {isCorrect ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full shrink-0">
                        সঠিক (+১)
                      </span>
                    ) : isSkipped ? (
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded-full shrink-0">
                        অনুত্তর (০)
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full shrink-0">
                        ভুল (০)
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isThisCorrect = optIdx === q.correctIndex;
                      const isUserChoice = userAns === optIdx;
                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-xl border font-medium flex items-center justify-between ${
                            isThisCorrect
                              ? 'bg-emerald-100 text-emerald-950 border-emerald-300 font-bold'
                              : isUserChoice
                                ? 'bg-rose-100 text-rose-950 border-rose-300 line-through'
                                : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          <span>{['(ক)', '(খ)', '(গ)', '(ঘ)'][optIdx]} {opt}</span>
                          {isThisCorrect && <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />}
                          {isUserChoice && !isThisCorrect && <XCircle className="w-3.5 h-3.5 text-rose-700" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <div>
                      <b className="text-teal-900">বিস্তারিত ব্যাখ্যা:</b> {q.explanation}
                    </div>
                    {q.source && (
                      <div className="text-[11px] text-slate-500 font-medium pt-1">
                        📖 তথ্যসূত্র: {q.source}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // RUNNING EXAM SCREEN
  if (!examData) return null;

  const currentQ = examData.mcqs[currentIdx];
  const isFlagged = flaggedQuestions[currentIdx];
  const currentAnswer = selectedAnswers[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      
      {/* Top Floating Control Bar */}
      <div className="bg-white rounded-2xl p-4 border border-teal-100 shadow-sm flex items-center justify-between gap-4 sticky top-20 z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200">
            <Timer className="w-4 h-4 text-teal-700 animate-pulse" />
            <span className="font-mono text-base sm:text-lg font-black text-teal-900">
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="hidden sm:block text-xs text-slate-500">
            উত্তর দেওয়া হয়েছে: <b className="text-teal-900">{answeredCount}</b> / ৩০
          </div>
        </div>

        {/* Section Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSection('mcq')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSection === 'mcq'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            MCQ (৩০)
          </button>
          <button
            onClick={() => setActiveSection('written')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSection === 'written'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            লিখিত অংশ (১০)
          </button>
        </div>

        <button
          onClick={handleFinishExam}
          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>জমা দিন</span>
        </button>
      </div>

      {activeSection === 'mcq' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Question Active Card (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-teal-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded">
                  প্রশ্ন {currentIdx + 1} / ৩০
                </span>
                <span className="text-xs text-slate-400">
                  {currentQ.category}
                </span>
              </div>

              <button
                onClick={() => toggleFlag(currentIdx)}
                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                  isFlagged
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current text-amber-600' : ''}`} />
                <span>{isFlagged ? 'চিহ্নিত' : 'রিভিউ রাখুন'}</span>
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = currentAnswer === optIdx;
                const prefix = ['(ক)', '(খ)', '(গ)', '(ঘ)'][optIdx];
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(currentIdx, optIdx)}
                    className={`w-full p-3.5 rounded-xl text-xs sm:text-sm text-left border flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-700 text-white border-teal-800 font-bold shadow-sm'
                        : 'bg-slate-50/70 hover:bg-teal-50/50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {prefix}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                পূর্ববর্তী
              </button>

              <button
                disabled={currentIdx === examData.mcqs.length - 1}
                onClick={() => setCurrentIdx(prev => Math.min(examData.mcqs.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 text-white hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs cursor-pointer"
              >
                পরবর্তী
              </button>
            </div>
          </div>

          {/* Question Palette Grid (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-teal-100 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-sm flex items-center justify-between">
              <span>প্রশ্ন প্যালেট (Question Palette)</span>
              <span className="text-xs text-slate-400 font-normal">৩০টি</span>
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {examData.mcqs.map((_, idx) => {
                const isAns = selectedAnswers[idx] !== undefined;
                const isFlg = flaggedQuestions[idx];
                const isCurr = currentIdx === idx;

                let btnStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                if (isCurr) {
                  btnStyle = 'ring-2 ring-teal-600 bg-teal-100 text-teal-900 font-black';
                } else if (isFlg) {
                  btnStyle = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                } else if (isAns) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-lg text-xs border flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1.5 text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600 inline-block"></span>
                <span>উত্তর দেওয়া হয়েছে ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 inline-block"></span>
                <span>রিভিউ রাখা হয়েছে</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200 inline-block"></span>
                <span>অনুত্তর প্রশ্ন ({30 - answeredCount})</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Written Section */
        <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
              লিখিত অংশ — মোট ১০ নম্বর
            </span>
            <h3 className="text-lg font-bold text-slate-800 mt-2">
              ইংরেজি প্যারাগ্রাফ ও ইমেইল লিখন (লেখা অনুযায়ী নম্বর ও ফিডব্যাক)
            </h3>
            <p className="text-xs text-slate-500">
              নিচের ফিল্ডগুলোতে আপনার উত্তর টাইপ করুন। সাবমিট করার পর স্বয়ংক্রিয়ভাবে খাতা মূল্যায়িত হবে।
            </p>
          </div>

          {/* Item 1: Paragraph */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800">
                ১. {examData.paragraphPrompt.title} (৫ নম্বর)
              </label>
              <span className="text-xs text-slate-400 font-mono">
                শব্দ: {paragraphText.trim() ? paragraphText.trim().split(/\s+/).length : 0}
              </span>
            </div>
            <p className="text-xs text-slate-500">{examData.paragraphPrompt.instruction}</p>
            <textarea
              rows={5}
              value={paragraphText}
              onChange={(e) => setParagraphText(e.target.value)}
              placeholder="Start typing your paragraph in English here (5-8 sentences)..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>

          {/* Item 2: Email */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800">
                ২. {examData.emailPrompt.title} (৫ নম্বর)
              </label>
              <span className="text-xs text-slate-400 font-mono">
                শব্দ: {emailText.trim() ? emailText.trim().split(/\s+/).length : 0}
              </span>
            </div>
            <p className="text-xs text-slate-500">{examData.emailPrompt.instruction}</p>
            <textarea
              rows={6}
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="To: ...&#10;From: ...&#10;Subject: ...&#10;Hi [Name],&#10;I am writing to..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setActiveSection('mcq')}
              className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
            >
              MCQ সেকশনে যান
            </button>
            <button
              onClick={handleFinishExam}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>পূর্ণাঙ্গ পরীক্ষা জমা দিন</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
