import React, { useState, useMemo } from 'react';
import { questions, categories } from '../data/questionsService';
import { Question } from '../types';
import { 
  Search, 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  BookOpen, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Sparkles, 
  SlidersHorizontal,
  Database
} from 'lucide-react';

interface QuestionBankSectionProps {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

export const QuestionBankSection: React.FC<QuestionBankSectionProps> = ({
  bookmarks,
  toggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'study' | 'practice'>('study');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState<boolean>(false);
  const [showOnlyTextbook, setShowOnlyTextbook] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  
  // For practice mode
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<boolean>(true);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // Textbook special filter (SSC / HSC)
      if (showOnlyTextbook) {
        const isTextbook = q.source?.includes('HSC') || q.source?.includes('SSC') || q.source?.includes('বোর্ড');
        if (!isTextbook) return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && q.categoryId !== selectedCategory) {
        return false;
      }
      // Bookmark filter
      if (showOnlyBookmarks && !bookmarks.includes(q.id)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inAnswer = q.correctAnswer.toLowerCase().includes(query);
        const inCategory = q.category.toLowerCase().includes(query);
        const inSource = q.source ? q.source.toLowerCase().includes(query) : false;
        const inOptions = q.options.some(opt => opt.toLowerCase().includes(query));
        if (!inQuestion && !inAnswer && !inCategory && !inSource && !inOptions) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, showOnlyBookmarks, showOnlyTextbook, searchQuery, bookmarks]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;
  const currentQuestions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredQuestions.slice(start, start + pageSize);
  }, [filteredQuestions, currentPage, pageSize]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleOptionSelect = (qId: string, optIdx: number) => {
    if (userAnswers[qId] !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const resetPractice = () => {
    setUserAnswers({});
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Search and Quick Filters Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-teal-100 shadow-sm space-y-3.5">
        
        {/* Top Header: Title, Total Badge & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-teal-700" />
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">
                অনুশীলন প্রশ্নব্যাংক
              </h2>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] sm:text-xs bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-full font-bold">
                মোট ৯৩২টি প্রশ্ন
              </span>
              <span 
                title="ইন্টারনেট ছাড়া পড়তে সবগুলো প্রশ্ন আপনার ব্রাউজারের IndexedDB-তে ক্যাশ করা আছে"
                className="text-[10px] sm:text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1"
              >
                <Database className="w-3 h-3 text-emerald-600" />
                <span className="hidden sm:inline">অফলাইনে সংরক্ষিত</span>
                <span className="sm:hidden">অফলাইন</span>
              </span>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('study')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'study'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              <span>স্টাডি মোড</span>
            </button>
            <button
              onClick={() => setViewMode('practice')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'practice'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>সেলফ-টেস্ট</span>
            </button>
          </div>
        </div>

        {/* Compact Mobile-Friendly Toolbar: Search Bar + Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="প্রশ্ন, অপশন বা বিষয় খুঁজুন (যেমন: HSC, AI, SEO, RAM, F7)..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Toggle Actions Row */}
          <div className="flex items-center gap-1.5">
            {/* Textbook Filter Button */}
            <button
              onClick={() => {
                setShowOnlyTextbook(!showOnlyTextbook);
                setCurrentPage(1);
              }}
              title="মাধ্যমিক ও উচ্চমাধ্যমিক পাঠ্যবই প্রশ্ন"
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                showOnlyTextbook
                  ? 'bg-teal-800 text-white border-teal-900 shadow-xs'
                  : 'bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>SSC/HSC বই</span>
            </button>

            {/* Bookmarks Toggle Button */}
            <button
              onClick={() => {
                setShowOnlyBookmarks(!showOnlyBookmarks);
                setCurrentPage(1);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                showOnlyBookmarks
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-current' : 'text-amber-500'}`} />
              <span>বুকমার্ক ({bookmarks.length})</span>
            </button>

            {/* Explanation Toggle */}
            <button
              onClick={() => setShowExplanations(!showExplanations)}
              title={showExplanations ? 'ব্যাখ্যা লুকান' : 'ব্যাখ্যা দেখুন'}
              className="p-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors shrink-0"
            >
              {showExplanations ? <Eye className="w-4 h-4 text-teal-700" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Categories Horizontal Scrolling Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setShowOnlyTextbook(false);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors border shrink-0 ${
              selectedCategory === 'all' && !showOnlyTextbook
                ? 'bg-teal-800 text-white border-teal-900 shadow-xs'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-teal-50'
            }`}
          >
            সব বিষয় (৯৩২)
          </button>

          <button
            onClick={() => {
              setShowOnlyTextbook(true);
              setSelectedCategory('all');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors border flex items-center gap-1 shrink-0 ${
              showOnlyTextbook
                ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <GraduationCap className="w-3 h-3 text-amber-500" />
            <span>মাধ্যমিক ও উচ্চমাধ্যমিক ICT বিশেষ</span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id && !showOnlyTextbook;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  handleCategoryChange(cat.id);
                  setShowOnlyTextbook(false);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors border shrink-0 ${
                  isSelected
                    ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-teal-50 hover:text-teal-900'
                }`}
              >
                {cat.name} ({cat.target_count})
              </button>
            );
          })}
        </div>

        {/* Filter Summary & Counter */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="truncate">
            পাওয়া গেছে: <b className="text-teal-900">{filteredQuestions.length}</b> টি প্রশ্ন
            {showOnlyTextbook && (
              <span className="ml-1 text-amber-700 font-semibold">(পাঠ্যবই ও বোর্ড প্রশ্ন)</span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {viewMode === 'practice' && Object.keys(userAnswers).length > 0 && (
              <button
                onClick={resetPractice}
                className="text-[11px] text-rose-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3 h-3" />
                রিসেট ({Object.keys(userAnswers).length})
              </button>
            )}
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline">প্রতি পাতায়:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-[11px] sm:text-xs font-medium focus:outline-none"
              >
                <option value={20}>২০</option>
                <option value={50}>৫০</option>
                <option value={100}>১০০</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Listing */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-teal-100 shadow-sm space-y-3">
          <Layers className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm sm:text-base font-bold text-slate-700">কোনো প্রশ্ন পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setShowOnlyBookmarks(false);
              setShowOnlyTextbook(false);
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800 transition-colors"
          >
            সব ফিল্টার সাফ করুন
          </button>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {currentQuestions.map((q: Question, idx: number) => {
            const globalIndex = (currentPage - 1) * pageSize + idx + 1;
            const isBookmarked = bookmarks.includes(q.id);
            const answeredOptionIdx = userAnswers[q.id];
            const isAnswered = answeredOptionIdx !== undefined;

            return (
              <div 
                key={q.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-teal-300 shadow-xs transition-all space-y-3"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    {/* Number Badge */}
                    <span className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-teal-100 text-teal-900 font-bold text-xs flex items-center justify-center font-mono mt-0.5">
                      {globalIndex}
                    </span>

                    <div className="min-w-0 flex-1">
                      {/* Category & Source Badges (Clean Wrapping) */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] sm:text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100 truncate max-w-[240px]">
                          {q.category}
                        </span>

                        {q.source && (
                          <span className="text-[10px] sm:text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                            <GraduationCap className="w-3 h-3 text-amber-600 shrink-0" />
                            <span className="truncate max-w-[200px] sm:max-w-none">{q.source}</span>
                          </span>
                        )}
                      </div>

                      {/* Question Text */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-snug break-words">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    title={isBookmarked ? 'বুকমার্ক সরান' : 'বুকমার্ক করুন'}
                    className={`p-2 rounded-xl border transition-colors shrink-0 ${
                      isBookmarked
                        ? 'bg-amber-50 text-amber-600 border-amber-300'
                        : 'text-slate-400 border-slate-200 hover:text-amber-500 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-amber-500' : ''}`} />
                  </button>
                </div>

                {/* Options Grid (Single column on mobile, 2 cols on tablet+) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctIndex;
                    const bengaliPrefix = ['(ক)', '(খ)', '(গ)', '(ঘ)'][optIdx] || `(${optIdx + 1})`;

                    // Study Mode View
                    if (viewMode === 'study') {
                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm border flex items-center justify-between gap-2 transition-colors ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-bold shadow-xs'
                              : 'bg-slate-50/70 text-slate-700 border-slate-200'
                          }`}
                        >
                          <div className="flex items-start gap-2 min-w-0">
                            <span className="font-semibold text-slate-400 shrink-0">{bengaliPrefix}</span>
                            <span className="break-words">{opt}</span>
                          </div>
                          {isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      );
                    }

                    // Practice Mode View
                    const isSelected = answeredOptionIdx === optIdx;
                    let optStyle = 'bg-slate-50 hover:bg-teal-50/60 border-slate-200 text-slate-700';

                    if (isAnswered) {
                      if (isCorrect) {
                        optStyle = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold';
                      } else if (isSelected) {
                        optStyle = 'bg-rose-100 text-rose-950 border-rose-300 font-bold';
                      } else {
                        optStyle = 'bg-slate-50/50 text-slate-400 border-slate-100 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(q.id, optIdx)}
                        className={`p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm text-left border flex items-center justify-between gap-2 transition-all ${optStyle}`}
                      >
                        <div className="flex items-start gap-2 min-w-0">
                          <span className="font-semibold text-slate-400 shrink-0">{bengaliPrefix}</span>
                          <span className="break-words">{opt}</span>
                        </div>
                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {showExplanations && (viewMode === 'study' || isAnswered) && (
                  <div className="bg-teal-50/70 rounded-xl p-2.5 sm:p-3 border border-teal-100 text-[11px] sm:text-xs text-teal-950 flex items-start gap-2">
                    <span className="font-bold text-teal-800 shrink-0">💡 ব্যাখ্যা:</span>
                    <span className="leading-relaxed break-words">{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-teal-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            পাতা <b className="text-slate-800">{currentPage}</b> / <b>{totalPages}</b> (মোট {filteredQuestions.length}টি প্রশ্ন)
          </div>
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-1.5 sm:p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="পূর্ববর্তী পাতা"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Quick jump to page */}
            <div className="flex items-center gap-1 text-xs">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pNum = currentPage - 2 + i;
                  if (pNum > totalPages) pNum = totalPages - (4 - i);
                }
                return (
                  <button
                    key={pNum}
                    onClick={() => setCurrentPage(pNum)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-bold text-xs transition-colors ${
                      currentPage === pNum
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {pNum}
                  </button>
                );
              })}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-1.5 sm:p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="পরবর্তী পাতা"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
