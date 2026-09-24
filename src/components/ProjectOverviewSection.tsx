import React from 'react';
import { projectOverview } from '../data/projectData';
import { 
  Users, 
  Clock, 
  MapPin, 
  Award, 
  CheckCircle2, 
  BarChart3, 
  Cpu, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Video
} from 'lucide-react';

interface ProjectOverviewSectionProps {
  onNavigateTab: (tabId: string) => void;
}

export const ProjectOverviewSection: React.FC<ProjectOverviewSectionProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-700/50 backdrop-blur-md border border-teal-400/30 text-teal-100 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার • যুব ও ক্রীড়া মন্ত্রণালয়</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            🎯 যুব উন্নয়ন অধিদপ্তর (DYD) কৃত্রিম বুদ্ধিমত্তা (AI) কোর্স ভর্তি প্রস্তুতি হাব
          </h1>

          <p className="text-teal-100 text-xs sm:text-base leading-relaxed">
            "{projectOverview.title}" — ২ বছর মেয়াদী জাতীয় মেগা প্রকল্প। 
            মাধ্যমিক (SSC ICT) ও উচ্চমাধ্যমিক (HSC ICT) পাঠ্যবই এবং ১ম ব্যাচের প্রশ্নপত্র বিশ্লেষণ, ভিডিও প্রশ্ন সমাধান, ৯৩২টি অনুশীলন প্রশ্ন, 
            লিখিত অংশের ইউনিভার্সাল টেমপ্লেট এবং পূর্ণাঙ্গ মডেল টেস্ট নিয়ে এক প্ল্যাটফর্মে সব প্রস্তুতি।
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('exam')}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>রিয়েল মডেল টেস্ট দিন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('videos')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-amber-300" />
              <span>ভিডিও প্রশ্ন সমাধান দেখুন</span>
            </button>
            <button
              onClick={() => onNavigateTab('bank')}
              className="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm transition-all"
            >
              ৯৩২টি প্রশ্নব্যাংক
            </button>
          </div>
        </div>

        {/* 4 Major Stats Pill Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center">
            <b className="text-2xl sm:text-3xl font-black text-amber-300 block">৯৩২+</b>
            <span className="text-xs text-teal-100">পাঠ্যবই ও প্রশ্নব্যাংক</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center">
            <b className="text-2xl sm:text-3xl font-black text-white block">১১,২০০</b>
            <span className="text-xs text-teal-100">মোট প্রশিক্ষণার্থী আসন</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center">
            <b className="text-2xl sm:text-3xl font-black text-white block">৬৪</b>
            <span className="text-xs text-teal-100">জেলায় ৪৪৮টি ব্যাচ</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center">
            <b className="text-2xl sm:text-3xl font-black text-amber-300 block">≈১৭৫</b>
            <span className="text-xs text-teal-100">বরিশাল জেলার আসন</span>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: First Batch Analysis & 3 Selection Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: First Batch Question Paper Analysis (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
                আসল পরীক্ষার এক্স-রে বিশ্লেষণ
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-600" />
                ১ম ব্যাচের প্রশ্নপত্র বণ্টন (৩০ MCQ + ১০ লিখিত)
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            পরীক্ষার্থীদের পাঠানো প্রথম ব্যাচের মূল প্রশ্নপত্র বিশ্লেষণ করে দেখা গেছে—ডিজিটাল মার্কেটিং ও ফ্রিল্যান্সিং অংশ থেকেই সর্বাধিক প্রশ্ন আসে (৩৬.৭%)। এরপর ইংরেজি, গ্রাফিক্স ও এআই বিষয়গুলোর সমান গুরুত্ব রয়েছে:
          </p>

          {/* Graphical Bars */}
          <div className="space-y-3">
            {projectOverview.questionPaperWeightage.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.subject}</span>
                  <span className="text-teal-800 font-bold">{item.percentage}% ({item.count})</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage * 2.5}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 text-xs text-teal-950 space-y-1.5">
            <b className="text-teal-900 block font-bold">💡 সফলতার স্ট্র্যাটেজি:</b>
            <p className="leading-relaxed">
              ডিজিটাল মার্কেটিং, ফ্রিল্যান্সিং প্ল্যাটফর্ম (Fiverr, Upwork, Payoneer), ইংরেজি ব্যাকরণ ও বানান এবং আধুনিক এআই টুলস ভালোভাবে পড়লেই লিখিত পরীক্ষায় অনায়াসে ২৫+ নম্বর নিশ্চিত করা যায়!
            </p>
          </div>
        </div>

        {/* Right: 3 Selection Stages (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                ৩ ধাপে চূড়ান্ত নির্বাচন প্রক্রিয়া
              </h3>
            </div>

            <div className="space-y-4">
              {projectOverview.selectionStages.map((stage, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-1.5 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-900">
                      {stage.step}
                    </span>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {stage.marks}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('viva')}
              className="w-full py-3 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>ব্যবহারিক ও ভাইভা গাইড দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* AI Tools Grid (Basic & Advanced) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
              সিলেবাসভুক্ত টুলস
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-600" />
              প্রশিক্ষণে অন্তর্ভুক্ত ২৫টি আধুনিক এআই টুলস
            </h3>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">বেসিক + অ্যাডভান্সড</span>
        </div>

        <div className="space-y-5">
          {/* Basic Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-3 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block"></span>
              বেসিক কোর্স টুলস (৯,৬০০ জন শিক্ষার্থীর জন্য):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {projectOverview.tools.basic.map((tool, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 hover:bg-teal-50/50 transition-colors p-3 rounded-xl border border-slate-200"
                >
                  <b className="text-xs sm:text-sm font-bold text-slate-800 block">{tool.name}</b>
                  <span className="text-[11px] text-slate-500 block truncate">{tool.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Tools */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-3 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block"></span>
              অ্যাডভান্সড কোর্স টুলস (১,৬০০ জন শিক্ষার্থীর জন্য):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {projectOverview.tools.advanced.map((tool, idx) => (
                <div 
                  key={idx}
                  className="bg-purple-50/40 hover:bg-purple-50 transition-colors p-3 rounded-xl border border-purple-100"
                >
                  <b className="text-xs sm:text-sm font-bold text-slate-800 block">{tool.name}</b>
                  <span className="text-[11px] text-slate-500 block truncate">{tool.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
