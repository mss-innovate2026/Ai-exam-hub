/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ProjectOverviewSection } from './components/ProjectOverviewSection';
import { VideoSolutionsSection } from './components/VideoSolutionsSection';
import { QuestionBankSection } from './components/QuestionBankSection';
import { ExamSimulatorSection } from './components/ExamSimulatorSection';
import { WrittenGuideSection } from './components/WrittenGuideSection';
import { VivaPracticalSection } from './components/VivaPracticalSection';
import { DistrictCalculatorSection } from './components/DistrictCalculatorSection';
import { 
  Sparkles, 
  Heart, 
  ShieldAlert 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dyd_ai_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dyd_ai_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  // Scroll to top on tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Hind_Siliguri',sans-serif]">
      {/* Sticky Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        bookmarkCount={bookmarks.length} 
      />

      {/* Main Content Area with bottom padding for mobile bottom nav */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-24 md:pb-12">
        {activeTab === 'overview' && (
          <ProjectOverviewSection onNavigateTab={handleTabChange} />
        )}
        {activeTab === 'videos' && (
          <VideoSolutionsSection onStartQuizWithVideoTopics={() => handleTabChange('exam')} />
        )}
        {activeTab === 'bank' && (
          <QuestionBankSection 
            bookmarks={bookmarks} 
            toggleBookmark={toggleBookmark} 
          />
        )}
        {activeTab === 'exam' && (
          <ExamSimulatorSection />
        )}
        {activeTab === 'written' && (
          <WrittenGuideSection />
        )}
        {activeTab === 'viva' && (
          <VivaPracticalSection />
        )}
        {activeTab === 'calculator' && (
          <DistrictCalculatorSection />
        )}
      </main>

      {/* Floating Offline Notification */}
      <OfflineIndicator />

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        bookmarkCount={bookmarks.length} 
      />

      {/* Comprehensive Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-10 pb-24 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Project Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <b className="text-white text-base">DYD AI প্রস্তুতি হাব ২০২৬</b>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                যুব ও ক্রীড়া মন্ত্রণালয় ও যুব উন্নয়ন অধিদপ্তর (DYD) পরিচালিত "তথ্যপ্রযুক্তি জ্ঞানসম্পন্ন যুবদের কৃত্রিম বুদ্ধিমত্তা (এআই) প্রযুক্তির মাধ্যমে দক্ষতা উন্নয়ন" প্রকল্পের ভর্তি পরীক্ষার্থীদের জন্য সম্পূর্ণ উন্মুক্ত ও স্বনির্মিত প্রস্তুতি প্ল্যাটফর্ম।
              </p>
              <div className="text-xs text-teal-400">
                অফিসিয়াল ওয়েবসাইট: <a href="https://dydaiproject.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-300">dydaiproject.com</a>
              </div>
            </div>

            {/* Column 2: Quick Features */}
            <div className="space-y-3">
              <b className="text-white text-sm block">প্রস্তুতির গুরুত্বপূর্ণ লিঙ্ক</b>
              <ul className="text-xs space-y-2 text-slate-400">
                <li>
                  <button onClick={() => handleTabChange('videos')} className="hover:text-amber-300 transition-colors">
                    • ইউটিউব ভিডিও প্রশ্ন সমাধান (১ম ব্যাচ ও সেট A)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabChange('exam')} className="hover:text-amber-300 transition-colors">
                    • আসল মডেল টেস্ট (৪০ নম্বরের পূর্ণাঙ্গ পরীক্ষা)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabChange('written')} className="hover:text-amber-300 transition-colors">
                    • লিখিত অংশের ৫-লাইন সূত্র ও ইমেইল ফরম্যাট
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabChange('calculator')} className="hover:text-amber-300 transition-colors">
                    • বরিশাল জেলা ও ৬৪ জেলার আসন সম্ভাবনা ক্যালকুলেটর
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabChange('viva')} className="hover:text-amber-300 transition-colors">
                    • ল্যাব ব্যবহারিক পরীক্ষা ও ভাইভা গাইড
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Disclaimer & Official Notice */}
            <div className="space-y-3">
              <b className="text-white text-sm flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                সতর্কতা ও তথ্যসূত্র
              </b>
              <p className="text-xs text-slate-400 leading-relaxed">
                এই প্ল্যাটফর্মের প্রশ্নব্যাংক ও বিশ্লেষণ মাধ্যমিক (SSC ICT) ও উচ্চমাধ্যমিক (HSC ICT) পাঠ্যবই এবং প্রথম ব্যাচের প্রশ্নপত্রের আদলে সাজানো। জেলাভিত্তিক সংখ্যা প্রক্ষেপণমূলক। সর্বশেষ তথ্যের জন্য সংশ্লিষ্ট জেলা যুব উন্নয়ন কার্যালয়ে যোগাযোগ করুন।
              </p>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © ২০২৬ যুব উন্নয়ন এআই প্রস্তুতি হাব। সকল তরুণ শিক্ষার্থীর উজ্জ্বল ভবিষ্যতের জন্য নিবেদিত।
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline mx-1" /> for Bangladeshi Youth
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
