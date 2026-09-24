import React, { useState } from 'react';
import { 
  paragraphFormula, 
  sampleTopics, 
  emailScenarios, 
  ParagraphTopic 
} from '../data/writtenGuide';
import { 
  PenTool, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  Lightbulb, 
  FileText
} from 'lucide-react';

export const WrittenGuideSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<ParagraphTopic>(sampleTopics[0]);
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

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 bg-teal-600/40 text-teal-100 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-teal-400/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>পরীক্ষার লিখিত অংশ — মোট ১০ নম্বর</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">
          প্যারাগ্রাফ ও ইমেইল লেখার ইউনিভার্সাল টেমপ্লেট
        </h2>
        <p className="text-teal-100 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
          আসল ভর্তি পরীক্ষায় থাকে একটি ৫ নম্বরের অনুচ্ছেদ (Paragraph/Essay) এবং একটি ৫ নম্বরের ইমেইল। 
          বিষয় পাল্টালেও এই জাদুকরী ৫-বাক্যের সূত্র ও ফরম্যাট মুখস্থ রাখলে যেকোনো টপিকে পূর্ণ নম্বর নিশ্চিত করা সম্ভব।
        </p>
      </div>

      {/* Part 1: Paragraph Master Formula */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <PenTool className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                📝 অংশ ১: Paragraph / Essay-এর ৫-লাইন সূত্র (৫ নম্বর)
              </h3>
              <p className="text-xs text-slate-500">
                যে টপিকই আসুক, এই ৫টি বাক্য ধাপে ধাপে বসালেই একটি আদর্শ প্যারাগ্রাফ তৈরি হয়
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            ১০০% ইউনিভার্সাল
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

        {/* Pre-made Topics Library */}
        <div>
          <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600" />
            সম্ভাব্য আসল পরীক্ষার ৬টি কমন টপিক ও মডেল প্যারাগ্রাফ:
          </h4>

          <div className="flex flex-wrap gap-2 mb-4">
            {sampleTopics.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedTopic.title === topic.title
                    ? 'bg-teal-800 text-white border-teal-900 shadow-xs'
                    : 'bg-slate-100 hover:bg-teal-50 text-slate-700 border-slate-200'
                }`}
              >
                {topic.title.split('(')[0]}
              </button>
            ))}
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 relative">
            <h5 className="font-bold text-teal-950 text-sm mb-2">{selectedTopic.title}</h5>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans pr-10">
              {selectedTopic.modelParagraph}
            </p>
            <button
              onClick={() => copyToClipboard(selectedTopic.modelParagraph, `topic-${selectedTopic.title}`)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
              title="কপি করুন"
            >
              {copiedIndex === `topic-${selectedTopic.title}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Part 2: Email Writing Master Format */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                📧 অংশ ২: Email লিখন ফরম্যাট (৫ নম্বর)
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

        {/* 3 Real Scenarios */}
        <div className="space-y-4">
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            আসল পরীক্ষার ৩টি সাধারণ ইমেইল পরিস্থিতি ও নমুনা:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emailScenarios.map((sc, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    পরিস্থিতি {idx + 1}
                  </span>
                  <h5 className="font-bold text-slate-800 text-xs sm:text-sm mt-1.5 leading-snug">
                    {sc.title}
                  </h5>
                  <p className="text-xs text-teal-700 font-mono mt-1 font-semibold truncate">
                    Sub: {sc.subject}
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {sc.fullSample}
                </div>

                <button
                  onClick={() => copyToClipboard(sc.fullSample, `email-${idx}`)}
                  className="w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedIndex === `email-${idx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedIndex === `email-${idx}` ? 'কপি সম্পন্ন!' : 'ইমেইল কপি করুন'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-2.5">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <b className="text-amber-900 block font-bold">পরীক্ষার হলে খাতার প্রেজেন্টেশন টিপস:</b>
            <p className="leading-relaxed">
              লিখিত অংশে অতিরিক্ত বড় না করে ব্যাকরণ ও বানান নির্ভুল রাখাই আসল কৌশল। 
              প্যারাগ্রাফে কাটাকাটি করবেন না। ইমেইলের ক্ষেত্রে অবশ্যই বক্স এঁকে To, From, Subject আলাদা লাইনে লিখবেন। 
              এতেই পরীক্ষক মুগ্ধ হয়ে পূর্ণ ৫-এ ৫ নম্বর দিয়ে দেবেন!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
