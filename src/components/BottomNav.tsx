import React from 'react';
import { 
  Home, 
  HelpCircle, 
  CheckCircle2, 
  PenTool, 
  Video, 
  Calculator,
  BookOpen
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarkCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  activeTab, 
  setActiveTab,
  bookmarkCount 
}) => {
  const navTabs = [
    { id: 'overview', label: 'প্রকল্প', icon: Home },
    { id: 'bank', label: 'প্রশ্নব্যাংক', icon: HelpCircle, badge: 'পাঠ্যবই' },
    { id: 'exam', label: 'মডেল টেস্ট', icon: CheckCircle2, badge: '৪০' },
    { id: 'written', label: 'লিখিত', icon: PenTool },
    { id: 'videos', label: 'ভিডিও', icon: Video },
    { id: 'calculator', label: 'বরিশাল/জেলা', icon: Calculator },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-teal-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
      <div className="grid grid-cols-6 h-16 max-w-md mx-auto px-1">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center relative py-1 px-0.5 transition-all duration-150 ${
                isActive 
                  ? 'text-teal-700 font-extrabold' 
                  : 'text-slate-500 hover:text-teal-600 font-medium'
              }`}
            >
              {/* Active top indicator pill */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-teal-600 rounded-b-full"></span>
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-teal-700' : 'text-slate-400'}`} />
                {tab.id === 'bank' && bookmarkCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {bookmarkCount > 9 ? '9+' : bookmarkCount}
                  </span>
                )}
              </div>

              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
