import React, { useState } from 'react';
import { vivaQuestions, practicalTasks } from '../data/vivaPracticalData';
import { 
  BookOpen, 
  Monitor, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Terminal,
  Laptop
} from 'lucide-react';

export const VivaPracticalSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'viva' | 'practical'>('viva');
  const [expandedViva, setExpandedViva] = useState<Record<string, boolean>>({
    'viva-1': true,
    'viva-2': true
  });

  const toggleViva = (id: string) => {
    setExpandedViva(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 bg-teal-600/40 text-teal-100 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-teal-400/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>পরবর্তী বাছাই ধাপসমূহ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">
          ব্যবহারিক (Practical) ও মৌখিক (Viva Voce) পরীক্ষার পূর্ণাঙ্গ প্রস্তুতি
        </h2>
        <p className="text-teal-100 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
          লিখিত পরীক্ষায় উত্তীর্ণ হওয়ার পর চূড়ান্ত সিলেকশনের জন্য কম্পিউটার ল্যাবে ব্যবহারিক পরীক্ষা এবং কর্মকর্তাদের বোর্ডে মৌখিক ভাইভা দিতে হয়।
        </p>

        {/* Toggle between Viva and Practical */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setActiveTab('viva')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
              activeTab === 'viva'
                ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>মৌখিক পরীক্ষা (Viva Voce)</span>
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
              activeTab === 'practical'
                ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>ব্যবহারিক পরীক্ষা (Practical Test)</span>
          </button>
        </div>
      </div>

      {activeTab === 'viva' ? (
        /* VIVA SECTION */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
                ভাইভা বোর্ড কমন প্রশ্নোত্তর
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-600" />
                ভাইভা বোর্ডে সম্ভাব্য প্রশ্ন ও আদর্শ উত্তর
              </h3>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">বাংলা ও ইংরেজি</span>
          </div>

          <div className="space-y-4">
            {vivaQuestions.map((q) => {
              const isExpanded = expandedViva[q.id];
              return (
                <div 
                  key={q.id}
                  className="bg-slate-50/80 rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleViva(q.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 hover:bg-teal-50/40 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                        {q.questionBn}
                      </h4>
                      {q.questionEn && (
                        <p className="text-xs text-slate-500 italic mt-0.5 font-sans">
                          {q.questionEn}
                        </p>
                      )}
                    </div>
                    <span className="p-1 rounded-lg bg-white border border-slate-200 text-slate-500 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100 text-xs sm:text-sm">
                      <div className="bg-emerald-50 text-emerald-950 p-4 rounded-xl border border-emerald-200 space-y-1">
                        <b className="text-emerald-900 font-bold block flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          আদর্শ উত্তর:
                        </b>
                        <p className="leading-relaxed text-slate-700">
                          {q.suggestedAnswerBn}
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                        <b className="text-teal-800 font-bold block">💡 পরীক্ষকের নজর রাখার দিকসমূহ:</b>
                        <ul className="list-disc pl-5 space-y-0.5">
                          {q.keyPoints.map((pt, idx) => (
                            <li key={idx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Viva Golden Rules */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950 space-y-2">
            <b className="text-amber-900 font-bold text-sm block">
              🎯 ভাইভায় পূর্ণ নম্বর পাওয়ার ৫টি সোনালী নিয়ম:
            </b>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <p>১. মার্জিত ও পরিচ্ছন্ন পোশাক পরে উপস্থিত হবেন।</p>
              <p>২. চোখে চোখ রেখে মুখে মৃদু হাসি নিয়ে কথা বলুন।</p>
              <p>৩. না জানা থাকলে বানিয়ে না বলে বিনয়ের সাথে বলুন "আমার জানা নেই স্যার"।</p>
              <p>৪. কোর্সে ১০০% উপস্থিতি বজায় রাখার আন্তরিক ইচ্ছা প্রকাশ করুন।</p>
            </div>
          </div>
        </div>
      ) : (
        /* PRACTICAL SECTION */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
                ল্যাব হ্যান্ডস-অন টেস্ট
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2 flex items-center gap-2">
                <Laptop className="w-5 h-5 text-teal-600" />
                কম্পিউটার ল্যাব প্র্যাকটিক্যাল টেস্টের মূল ৪টি টাস্ক
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            লিখিত পরীক্ষায় উত্তীর্ণদের কম্পিউটার ল্যাবে বসিয়ে ১৫-২০ মিনিটের একটি হ্যান্ডস-অন টেস্ট নেওয়া হতে পারে। নিচের ৪টি মডিউল ভালোভাবে প্র্যাকটিস করে যান:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {practicalTasks.map((task) => (
              <div 
                key={task.id}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded">
                      {task.module}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">টাস্ক {task.id.replace('prac-', '')}</span>
                  </div>

                  <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                    {task.taskTitle}
                  </h4>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                    <b className="text-slate-900 block font-bold">নির্দেশনা ধাপসমূহ:</b>
                    <ol className="list-decimal pl-4 space-y-1 leading-relaxed">
                      {task.instructions.map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
                  <div className="flex flex-wrap gap-1">
                    {task.keyToolsUsed.map((tool, i) => (
                      <span key={i} className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="text-emerald-800 font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    ফলাফল: {task.expectedOutput}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
