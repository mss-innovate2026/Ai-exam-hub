import React, { useState } from 'react';
import { videoSolutions } from '../data/videoSolutions';
import { VideoResource } from '../types';
import { 
  Play, 
  ExternalLink, 
  CheckCircle, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  Layers
} from 'lucide-react';

export const VideoSolutionsSection: React.FC<{ onStartQuizWithVideoTopics?: () => void }> = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoResource>(videoSolutions[0]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-teal-600/40 backdrop-blur-sm border border-teal-400/30 text-teal-100 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ইউটিউব ভিডিও ক্লাস ও আসল প্রশ্ন সমাধান</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
            যুব উন্নয়ন AI কোর্স — ১ম ব্যাচ ও সেট 'A' লিখিত প্রশ্ন সমাধান
          </h2>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
            এখানে যুব উন্নয়ন অধিদপ্তরের কৃত্রিম বুদ্ধিমত্তা (AI) ভর্তি পরীক্ষার আসল প্রশ্নপত্রের প্রশ্ন-উত্তর, 
            লিখিত অংশের সমাধান এবং পরীক্ষার হলের বিশেষ কৌশল বিস্তারিত ভিডিওসহ পর্যালোচনা করা হয়েছে।
          </p>
        </div>

        {/* Video Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-3">
          {videoSolutions.map((vid) => {
            const isSelected = selectedVideo.id === vid.id;
            return (
              <button
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 border ${
                  isSelected
                    ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md shadow-amber-400/20 scale-[1.02]'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                <Play className={`w-4 h-4 fill-current ${isSelected ? 'text-slate-900' : 'text-amber-300'}`} />
                <span>{vid.badge}</span>
                <span className="opacity-75 font-normal hidden md:inline">| {vid.youtubeId}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Video Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Embedded Video & Details (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-teal-100 shadow-sm space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
                {selectedVideo.badge}
              </span>
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline"
              >
                <span>YouTube-এ দেখুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              {selectedVideo.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{selectedVideo.subtitle}</p>
          </div>

          {/* Responsive Embedded YouTube Player */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-inner border border-slate-200">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?rel=0&modestbranding=1`}
              title={selectedVideo.title}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-xs sm:text-sm text-slate-700 space-y-2">
            <p className="font-semibold text-teal-900 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              ভিডিওর মূল সারসংক্ষেপ ও নির্দেশিকা:
            </p>
            <p className="leading-relaxed text-slate-600">
              {selectedVideo.description}
            </p>
          </div>

          {/* Key Topics in Video */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              ভিডিওতে আলোচিত মূল বিষয়বস্তু:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedVideo.keyTopics.map((topic, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2 text-xs text-slate-700 bg-teal-50/60 p-2.5 rounded-lg border border-teal-100"
                >
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Solved Questions Highlight (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-teal-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                ভিডিওতে সমাধানকৃত নমুনা প্রশ্ন
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                আসল পরীক্ষার প্রশ্নপত্রে যে ধরনের প্রশ্ন এসেছে
              </p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
              পরীক্ষা স্পেশাল
            </span>
          </div>

          <div className="space-y-3.5">
            {selectedVideo.solvedHighlights.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/80 hover:bg-teal-50/40 transition-colors p-3.5 rounded-xl border border-slate-200/80 space-y-2"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-slate-400 font-mono">প্রশ্ন {idx + 1}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  {item.question}
                </p>
                <div className="bg-emerald-50 text-emerald-900 border border-emerald-200/80 p-2 rounded-lg text-xs font-medium flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>উত্তর: <b>{item.answer}</b></span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Exam Tip from the Videos */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs space-y-1.5">
            <b className="text-amber-900 flex items-center gap-1.5 font-bold">
              💡 ভিডিও ইন্সট্রাক্টরের গুরুত্বপূর্ণ পরামর্শ:
            </b>
            <p className="text-amber-950/80 leading-relaxed">
              DYD ভর্তি পরীক্ষায় অধিকাংশ ক্ষেত্রেই কোনো নেগেটিভ মার্কিং থাকে না। 
              তাই ৩০টি এমসিকিউ-এর সবগুলোর উত্তর দাগানো বুদ্ধিমানের কাজ। 
              লিখিত অংশের ১০ নম্বরে (Paragraph + Email) ফরম্যাট ঠিক রাখলেই অন্তত ৭-৮ নম্বর নিশ্চিত করা সম্ভব!
            </p>
          </div>
        </div>

      </div>

      {/* Direct YouTube Links Footer Card */}
      <div className="bg-white rounded-2xl p-5 border border-teal-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">
            ইউটিউবে সরাসরি দেখতে চান?
          </h4>
          <p className="text-xs text-slate-500">
            দুইটি ভিডিওর অফিশিয়াল লিংক নিচে দেওয়া হলো:
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <a
            href="https://youtu.be/EempSrJv-Pc?si=y9E5A2-3yJdhY0UR"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>১ম ব্যাচ সমাধান (EempSrJv-Pc)</span>
          </a>
          <a
            href="https://youtu.be/H8nqZipWTC8?si=hKphHmx3yYCqFXsD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>সেট A সমাধান (H8nqZipWTC8)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
