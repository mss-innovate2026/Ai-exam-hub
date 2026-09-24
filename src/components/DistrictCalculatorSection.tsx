import React, { useState } from 'react';
import { sampleDistrictData } from '../data/projectData';
import { DistrictStat } from '../types';
import { 
  Calculator, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Award, 
  CheckCircle, 
  PhoneCall, 
  Building2 
} from 'lucide-react';

export const DistrictCalculatorSection: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictStat>(sampleDistrictData[0]); // Barisal default
  const [customExaminees, setCustomExaminees] = useState<number>(780);

  // Dynamic chances calculation based on user input
  const calculatedChance = Math.min(
    100, 
    Math.round(((selectedDistrict.totalSeats) / (customExaminees || 1)) * 1000) / 10
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 bg-teal-600/40 text-teal-100 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-teal-400/20">
          <MapPin className="w-3.5 h-3.5 text-amber-300" />
          <span>বরিশাল জেলা ও জাতীয় আসন বিশ্লেষণ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">
          📍 বরিশাল জেলা ও ৬৪ জেলার আসন ও প্রতিযোগিতা ক্যালকুলেটর
        </h2>
        <p className="text-teal-100 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
          জাতীয় মোট ১১,২০০ আসন ও ৮৩,০০০ আবেদনকারীর তথ্যের ভিত্তিতে জেলাভিত্তিক আসন সংখ্যা ও প্রতিযোগী প্রতি সুযোগ পাওয়ার সম্ভাবনা হিসাব করুন।
        </p>
      </div>

      {/* Barisal Highlight Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              বিশেষ বিশ্লেষণ
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-600" />
              বরিশাল জেলার আসন ও আনুমানিক সম্ভাবনা
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200">
            সম্ভাবনা: ২২–২৩%
          </span>
        </div>

        {/* Warning Note */}
        <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-xl text-xs text-rose-900 space-y-1">
          <b className="font-bold flex items-center gap-1.5 text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            সতর্কতা ও তথ্যের উৎস:
          </b>
          <p className="leading-relaxed">
            জেলাভিত্তিক প্রকৃত সংখ্যা যুব উন্নয়ন অধিদপ্তর এখনো অফিশিয়ালি প্রকাশ করেনি। 
            নিচের সংখ্যাগুলো জাতীয় মোট আসন ও আবেদনকারী থেকে ৬৪ জেলায় সমান বণ্টনের ভিত্তিতে করা <b>গাণিতিক বিশ্লেষণ ও আনুমানিক প্রক্ষেপণ মাত্র</b>।
          </p>
        </div>

        {/* Barisal Grid Table */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-1">
            <span className="text-xs text-slate-500 font-semibold">বরিশালে আনুমানিক আবেদনকারী</span>
            <b className="text-2xl font-black text-slate-800 block">≈ ১,২৯৭ জন</b>
            <span className="text-[11px] text-slate-400">জাতীয় ৮৩,০০০ ÷ ৬৪</span>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-1">
            <span className="text-xs text-slate-500 font-semibold">লিখিত পরীক্ষার্থী (আনুমানিক)</span>
            <b className="text-2xl font-black text-teal-800 block">≈ ৭৮১ জন</b>
            <span className="text-[11px] text-slate-400">জাতীয় ৫০,০০০ ÷ ৬৪</span>
          </div>

          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 text-center space-y-1">
            <span className="text-xs text-emerald-700 font-semibold">বরিশাল জেলার মোট আসন</span>
            <b className="text-2xl font-black text-emerald-800 block">≈ ১৭৫ জন</b>
            <span className="text-[11px] text-emerald-600">বেসিক ১৫০ + অ্যাডভান্সড ২৫</span>
          </div>
        </div>

        {/* Probability Explanatory Box */}
        <div className="bg-teal-50/70 p-5 rounded-2xl border border-teal-200 text-xs sm:text-sm text-teal-950 space-y-2">
          <b className="font-bold text-teal-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-teal-600" />
            বরিশালের পরীক্ষার্থীদের সুযোগ পাওয়ার অনুপাত:
          </b>
          <p className="leading-relaxed text-slate-700">
            • <b>লিখিত পরীক্ষার্থীদের মধ্য থেকে:</b> প্রায় <b>২২–২৩%</b> (প্রতি ৪-৫ জনে ১ জন সুযোগ পাবেন)।<br />
            • <b>মোট আবেদনকারীর পর্যায় থেকে:</b> প্রায় <b>১৩–১৪%</b> (প্রতি ৭-৮ জনে ১ জন)।<br />
            • অর্থাৎ, আপনি যদি লিখিত পরীক্ষায় ভালো করে কাট-মার্ক অর্জন করতে পারেন, তবে চূড়ান্ত ব্যাচে সুযোগ পাওয়ার সম্ভাবনা অত্যন্ত জোরালো!
          </p>
        </div>
      </div>

      {/* Interactive 64-District Estimator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                ইন্টারঅ্যাক্টিভ জেলা ক্যালকুলেটর
              </h3>
              <p className="text-xs text-slate-500">
                অন্যান্য জেলা বা ভিন্ন পরীক্ষার্থী সংখ্যা দিয়ে সুযোগের হার যাচাই করুন
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                জেলা নির্বাচন করুন:
              </label>
              <select
                value={selectedDistrict.name}
                onChange={(e) => {
                  const dist = sampleDistrictData.find(d => d.name === e.target.value);
                  if (dist) {
                    setSelectedDistrict(dist);
                    setCustomExaminees(dist.estimatedExaminees);
                  }
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {sampleDistrictData.map((d, idx) => (
                  <option key={idx} value={d.name}>{d.name} ({d.division} বিভাগ)</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>পরীক্ষায় অংশ নেওয়া আনুমানিক পরীক্ষার্থী:</span>
                <span className="text-teal-800 font-mono text-sm">{customExaminees} জন</span>
              </div>
              <input
                type="range"
                min={200}
                max={3000}
                step={20}
                value={customExaminees}
                onChange={(e) => setCustomExaminees(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>২০০ জন</span>
                <span>১৫০০ জন</span>
                <span>৩০০০ জন</span>
              </div>
            </div>
          </div>

          {/* Dynamic Result Display */}
          <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white p-6 rounded-2xl text-center space-y-3 shadow-md">
            <span className="text-xs text-teal-300 font-bold uppercase tracking-wider">
              {selectedDistrict.name} — চূড়ান্ত ফলাফল
            </span>
            <div className="text-4xl sm:text-5xl font-black text-amber-300 font-mono">
              {calculatedChance}%
            </div>
            <p className="text-xs text-slate-300">
              {customExaminees} জন পরীক্ষার্থীর মধ্যে মোট <b>{selectedDistrict.totalSeats}</b> টি আসন বরাদ্দ।
            </p>
            <div className="pt-2 flex justify-center gap-4 text-xs text-teal-200 border-t border-white/10">
              <span>বেসিক আসন: <b>{selectedDistrict.basicSeats}</b></span>
              <span>অ্যাডভান্সড আসন: <b>{selectedDistrict.advancedSeats}</b></span>
            </div>
          </div>
        </div>

        {/* Office Advisory */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <PhoneCall className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            জেলা কার্যালয়ের চূড়ান্ত নোটিশ ও পরীক্ষার স্থান সম্পর্কিত যে কোনো তথ্যের জন্য স্ব-স্ব 
            <b> জেলা যুব উন্নয়ন অধিদপ্তর কার্যালয়ে</b> সরাসরি যোগাযোগ করার পরামর্শ দেওয়া হচ্ছে।
          </p>
        </div>

      </div>

    </div>
  );
};
