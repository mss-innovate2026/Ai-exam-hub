import React from 'react';
import { 
  BookOpen, 
  Video, 
  HelpCircle, 
  PenTool, 
  Award, 
  Calculator, 
  CheckCircle2, 
  Bookmark,
  Sparkles,
  Menu,
  X,
  Wifi,
  WifiOff,
  Database
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, bookmarkCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isOnline = useOnlineStatus();

  const navItems = [
    { id: 'overview', label: 'প্রকল্প ও বিশ্লেষণ', icon: Award },
    { id: 'videos', label: 'ভিডিও প্রশ্ন সমাধান', icon: Video, badge: '২টি ভিডিও' },
    { id: 'bank', label: 'প্রশ্নব্যাংক (৯৩২)', icon: HelpCircle },
    { id: 'exam', label: 'রিয়েল মডেল টেস্ট', icon: CheckCircle2, badge: '৪০ নম্বর' },
    { id: 'written', label: 'লিখিত অংশ (১০ নম্বর)', icon: PenTool },
    { id: 'viva', label: 'ব্যবহারিক ও ভাইভা', icon: BookOpen },
    { id: 'calculator', label: 'বরিশাল ও জেলা হিসাব', icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-800 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-teal-900 tracking-tight text-base sm:text-lg">
                  DYD AI প্রস্তুতি হাব
                </span>
                <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                  ২০২৬ সেশন
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                যুব উন্নয়ন অধিদপ্তর • কৃত্রিম বুদ্ধিমত্তা কোর্স
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 relative ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-sm shadow-teal-900/10'
                      : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-teal-600'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                      isActive 
                        ? 'bg-white/25 text-white' 
                        : 'bg-teal-100 text-teal-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* PWA Install, Offline Status, Bookmarks & Menu */}
          <div className="flex items-center gap-2">
            {/* PWA In-App Install Prompt */}
            <PWAInstallButton compact={true} />

            {/* Offline ready badge */}
            <div 
              title={isOnline ? "অনলাইন — সব প্রশ্ন অফলাইনেও সেভ করা আছে" : "অফলাইন মোড সক্রিয়"}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                isOnline 
                  ? 'bg-slate-50 text-slate-700 border-slate-200' 
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}
            >
              {isOnline ? (
                <>
                  <Database className="w-3 h-3 text-teal-600" />
                  <span className="text-[11px]">অফলাইন প্রস্তুত</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-600 animate-pulse" />
                  <span className="text-[11px]">অফলাইন</span>
                </>
              )}
            </div>

            <button
              onClick={() => {
                setActiveTab('bank');
              }}
              title="বুকমার্ক করা প্রশ্ন"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden md:inline">বুকমার্ক:</span>
              <span className="bg-teal-600 text-white px-1.5 py-0.2 rounded-full text-[11px] font-bold">
                {bookmarkCount}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-teal-50 hover:text-teal-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-teal-100 bg-white/95 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-teal-700 text-white'
                    : 'text-slate-700 hover:bg-teal-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-teal-600'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
