import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  User, 
  BookOpen, 
  Lightbulb, 
  MessageSquare, 
  PenTool, 
  Award, 
  HelpCircle,
  Volume2,
  VolumeX,
  Zap,
  ArrowRight,
  ShieldCheck,
  Flame
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  mode?: string;
}

const PRESET_MODES = [
  { id: 'general', title: '🤖 সার্বিক স্টাডি মেন্টর', desc: 'ভর্তি পরীক্ষা ও কোর্সের যেকোনো প্রশ্নের সমাধান' },
  { id: 'evaluator', title: '📝 লিখিত খাতা পরীক্ষক', desc: 'আপনার প্যারাগ্রাফ/ইমেইল লিখে দিলে ৫-এ নম্বর ও ভুল সংশোধন' },
  { id: 'viva', title: '🎤 মক ভাইভা প্র্যাকটিস', desc: 'ভাইভা বোর্ডের প্রশ্ন ও আদর্শ উত্তরের রিহার্সাল' },
  { id: 'mcq', title: '💡 আইসিটি ও এআই এক্সপার্ট', desc: 'কঠিন টেকনিক্যাল টার্ম ও শর্টকাটের সহজ ব্যাখ্যা' },
];

const SUGGESTED_PROMPTS = [
  {
    category: 'প্যারাগ্রাফ ও ইমেইল',
    icon: '📝',
    prompt: 'প্যারাগ্রাফ লেখার ৫-লাইনের সার্বজনীন সূত্রটি দিয়ে "Freelancing in Bangladesh" বিষয়ের একটি পূর্ণাঙ্গ প্যারাগ্রাফ বাংলায় অনুবাদসহ লিখে দাও।'
  },
  {
    category: 'ইমেইল ফরম্যাট',
    icon: '📧',
    prompt: 'যুব উন্নয়ন অধিদপ্তরের এআই কোর্সে চূড়ান্তভাবে নির্বাচিত হওয়ার সুসংবাদ জানিয়ে বন্ধুকে একটি প্রফেশনাল ইমেইল লেখার ফরম্যাট দাও।'
  },
  {
    category: 'মক ভাইভা',
    icon: '🎤',
    prompt: 'আমি DYD AI কোর্সের ভাইভা দিতে এসেছি। আমাকে ভাইভা বোর্ডের গুরুত্বপূর্ণ ৩টি প্রশ্ন জিজ্ঞেস করো এবং আমি উত্তর দিলে মূল্যায়ন করো।'
  },
  {
    category: 'টেকনিক্যাল এআই',
    icon: '🤖',
    prompt: 'জেনারেটিভ এআই, এলএলএম (LLM) এবং প্রম্পট ইঞ্জিনিয়ারিং কী? পরীক্ষায় সহজে লেখার মতো পয়েন্ট আকারে বুঝিয়ে দাও।'
  },
  {
    category: 'ডিজিটাল মার্কেটিং',
    icon: '📈',
    prompt: 'অন-পেজ এসইও (On-Page SEO) এবং অফ-পেজ এসইও (Off-Page SEO)-এর মধ্যে প্রধান পার্থক্যগুলো কী কী?'
  },
  {
    category: 'গ্রাফিক্স ডিজাইন',
    icon: '🎨',
    prompt: 'ফটোশপ (রাস্টার) ও ইলাস্ট্রেটর (ভেক্টর) গ্রাফিক্সের মধ্যে পার্থক্য কী এবং কখন কোনটি ব্যবহার করা হয়?'
  },
  {
    category: 'কম্পিউটার শর্টকাট',
    icon: '💻',
    prompt: 'এমএস এক্সেল (MS Excel)-এর ৫টি অতি প্রয়োজনীয় ফর্মুলা (SUM, AVERAGE, IF, VLOOKUP, COUNTIF) উদাহরণসহ বুঝিয়ে দাও।'
  },
];

export const AIChatSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('dyd_ai_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'msg_welcome',
        role: 'model',
        content: `👋 **আসসালামু আলাইকুম! আমি আপনার "DYD AI স্টাডি মেন্টর ও চ্যাটবট"।**

আমি যুব উন্নয়ন অধিদপ্তর (DYD) কর্তৃক পরিচালিত **"এআই স্কিল ডেভেলপমেন্ট ও ভর্তি পরীক্ষা ২০২৬"**-এর জন্য বিশেষভাবে প্রশিক্ষিত।

🎯 **আমি যেভাবে আপনাকে সাহায্য করতে পারি:**
1. **লিখিত প্রস্তুতি:** প্যারাগ্রাফের ৫-লাইনের সূত্র, ইমেইল ফরম্যাট ও খাতা মূল্যায়ন (Score out of 5)।
2. **MCQ সমাধান:** এআই, ডিজিটাল মার্কেটিং, গ্রাফিক্স, ইংরেজি ও কম্পিউটার ফান্ডামেন্টালসের গভীর ব্যাখ্যা।
3. **লাইভ মক ভাইভা:** ভাইভা বোর্ডের বাস্তব প্রশ্ন ও আত্মবিশ্বাস বাড়ানোর কৌশল।
4. **টেকনিক্যাল জিজ্ঞাসা:** প্রম্পট ইঞ্জিনিয়ারিং, এসইও, ফেসবুক অ্যাডস, এক্সেল ফর্মুলা ইত্যাদির সহজ বিশ্লেষণ।

নিচের সাজেস্টেড প্রশ্নগুলোতে ক্লিক করুন অথবা যেকোনো প্রশ্ন বাংলায় বা ইংরেজিতে লিখুন!`,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<string>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dyd_ai_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      mode: activeMode
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare contextual prompt with active mode if needed
      let contextualPrompt = text;
      if (activeMode === 'evaluator') {
        contextualPrompt = `[লিখিত মূল্যায়ন মোড] অনুগ্রহ করে নিচের লেখাটি ভালো করে পড়ে ৫ নম্বরের মধ্যে স্কোর দাও, ভুলগুলো চিহ্নিত করো এবং একটি নিখুঁত মডেল উত্তর দাও:\n\n${text}`;
      } else if (activeMode === 'viva') {
        contextualPrompt = `[মক ভাইভা প্র্যাকটিস মোড] প্রার্থী বলছে: "${text}"। ভাইভা পরীক্ষক হিসেবে মন্তব্য করো এবং পরবর্তী প্রশ্নটি করো।`;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
          })),
          message: contextualPrompt
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।';

      const botMessage: ChatMessage = {
        id: `msg_bot_${Date.now()}`,
        role: 'model',
        content: botReply,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        mode: activeMode
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `msg_err_${Date.now()}`,
        role: 'model',
        content: `⚠️ **রেসপন্স পেতে সাময়িক সমস্যা হয়েছে।**\n\n- আপনি অফলাইনে থাকতে পারেন অথবা সার্ভার ব্যস্ত।\n- দয়া করে আবার প্রশ্নটি পাঠান।`,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('আপনি কি পূর্বের সকল চ্যাট মুছে ফেলতে চান?')) {
      const initialMessage: ChatMessage = {
        id: 'msg_welcome',
        role: 'model',
        content: `🔄 **চ্যাট রিস্টার্ট করা হয়েছে!**\n\nআপনি DYD AI কোর্সের সিলেবাস, প্যারাগ্রাফ ও ইমেইল রাইটিং, MCQ কিংবা ভাইভা প্রস্তুতি নিয়ে যা কিছু জানতে চান তা জিজ্ঞেস করতে পারেন।`,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([initialMessage]);
    }
  };

  const copyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Text to speech (Web Speech API)
  const toggleSpeech = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown characters for cleaner audio
    const cleanText = text.replace(/[*#_`~[\]]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'bn-BD';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    window.speechSynthesis.speak(utterance);
    setIsSpeakingId(id);
  };

  // Render text with basic markdown styling (bold, bullets, code blocks, headers)
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1.5" />;

          // Header ### or ##
          if (trimmed.startsWith('### ')) {
            return (
              <h5 key={idx} className="font-extrabold text-teal-900 text-sm sm:text-base pt-1">
                {trimmed.replace('### ', '')}
              </h5>
            );
          }
          if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
            return (
              <h4 key={idx} className="font-black text-teal-950 text-base sm:text-lg pt-2 pb-0.5 border-b border-teal-200">
                {trimmed.replace(/^#+\s/, '')}
              </h4>
            );
          }

          // Bullet points
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
            const bulletText = trimmed.replace(/^[-*•]\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-teal-600 font-bold shrink-0 mt-0.5">•</span>
                <span>{renderInlineStyles(bulletText)}</span>
              </div>
            );
          }

          // Numbered lists (1. , 2. )
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="font-bold text-teal-800 shrink-0 font-mono">{numMatch[1]}.</span>
                <span>{renderInlineStyles(numMatch[2])}</span>
              </div>
            );
          }

          // Callout quotes or formulas
          if (trimmed.startsWith('> ')) {
            return (
              <div key={idx} className="bg-teal-50/80 border-l-4 border-teal-600 px-3 py-1.5 rounded-r-lg text-teal-950 font-medium italic">
                {renderInlineStyles(trimmed.replace('> ', ''))}
              </div>
            );
          }

          return <p key={idx}>{renderInlineStyles(line)}</p>;
        })}
      </div>
    );
  };

  const renderInlineStyles = (text: string) => {
    // Basic parser for **bold** and `code`
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-slate-200/80 text-teal-900 px-1.5 py-0.5 rounded font-mono text-[11px]">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-teal-600/40 text-teal-100 text-xs font-semibold px-3 py-1 rounded-full border border-teal-400/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>Gemini 3.8 Flash দ্বারা পরিচালিত ২৪/৭ লাইভ স্টাডি সাপোর্ট</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              🤖 DYD AI স্টাডি মেন্টর ও চ্যাটবট
            </h2>
            <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
              যুব উন্নয়ন অধিদপ্তর (DYD) এআই কোর্স ভর্তি পরীক্ষার যেকোনো বিষয়—প্যারাগ্রাফ, ইমেইল রাইটিং, MCQ কনসেপ্ট, ভাইভা প্রস্তুতি কিংবা ডিজিটাল স্কিলের তাৎক্ষণিক সঠিক সমাধান পান।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              onClick={handleClearHistory}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-teal-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>চ্যাট ক্লিয়ার করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role / Mode Switcher Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PRESET_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between gap-1 cursor-pointer ${
              activeMode === mode.id
                ? 'bg-teal-700 text-white border-teal-800 shadow-md ring-2 ring-teal-500/20'
                : 'bg-white hover:bg-teal-50/60 border-slate-200 text-slate-700'
            }`}
          >
            <span className="font-extrabold text-xs sm:text-sm">{mode.title}</span>
            <span className={`text-[10px] leading-tight ${activeMode === mode.id ? 'text-teal-100' : 'text-slate-500'}`}>
              {mode.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-3xl border border-teal-100 shadow-sm overflow-hidden flex flex-col min-h-[550px] max-h-[700px]">
        
        {/* Chat Stream Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isUser
                      ? 'bg-teal-700 text-white'
                      : 'bg-gradient-to-tr from-teal-800 to-emerald-600 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl shadow-xs border relative group transition-all ${
                    isUser
                      ? 'bg-teal-800 text-white border-teal-900 rounded-tr-none'
                      : 'bg-white text-slate-800 border-slate-200/90 rounded-tl-none'
                  }`}
                >
                  {/* Sender & Timestamp bar */}
                  <div className="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-black/5 text-[10px]">
                    <span className={`font-bold ${isUser ? 'text-teal-200' : 'text-teal-800'}`}>
                      {isUser ? 'আপনি (পরীক্ষার্থী)' : '🤖 DYD AI স্টাডি মেন্টর'}
                    </span>
                    <span className={isUser ? 'text-teal-300' : 'text-slate-400'}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="text-slate-800">
                    {isUser ? (
                      <p className="text-xs sm:text-sm text-white whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </p>
                    ) : (
                      renderFormattedText(msg.content)
                    )}
                  </div>

                  {/* Utility Action Buttons for Bot responses */}
                  {!isUser && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100 text-slate-400">
                      <button
                        onClick={() => copyMessage(msg.content, msg.id)}
                        className="p-1 rounded-md hover:bg-slate-100 hover:text-teal-800 transition-colors flex items-center gap-1 text-[11px]"
                        title="কপি করুন"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">কপি হয়েছে</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>কপি</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => toggleSpeech(msg.content, msg.id)}
                        className={`p-1 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1 text-[11px] ${
                          isSpeakingId === msg.id ? 'text-teal-700 font-bold' : 'hover:text-teal-800'
                        }`}
                        title="উচ্চারণ শুনুন"
                      >
                        {isSpeakingId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                            <span className="text-teal-600">বন্ধ করুন</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>শুনুন</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator Bubble */}
          {isLoading && (
            <div className="flex gap-3 max-w-2xl mr-auto animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-800 to-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 rounded-tl-none space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-500" />
                  <span>DYD AI টিউটর উত্তর তৈরি করছে...</span>
                </div>
                <div className="flex gap-1.5 py-1">
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Carousel */}
        <div className="bg-slate-100/80 p-2.5 border-t border-slate-200 overflow-x-auto flex gap-2 no-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 self-center pl-2 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500 fill-current" />
            দ্রুত জিজ্ঞাসা:
          </span>
          {SUGGESTED_PROMPTS.map((item, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSend(item.prompt)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-teal-50 border border-slate-200 text-slate-700 hover:text-teal-900 text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all shadow-2xs hover:border-teal-300 disabled:opacity-50 cursor-pointer"
            >
              <span>{item.icon}</span>
              <span className="font-semibold text-[11px]">{item.category}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 space-y-2">
          <div className="relative flex items-end gap-2">
            <textarea
              ref={inputRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                activeMode === 'evaluator'
                  ? 'আপনার লেখা প্যারাগ্রাফ বা ইমেইলটি এখানে পেস্ট করুন (৫-এ কত পেলেন দেখতে)...'
                  : activeMode === 'viva'
                  ? 'ভাইভা প্র্যাকটিস শুরু করতে লিখুন: "আমাকে প্রথম প্রশ্নটি করুন"...'
                  : 'যেকোনো প্রশ্ন লিখুন (যেমন: AI কোর্সের সিলেবাস কী? অথবা Enter চাপুন)...'
              }
              className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white resize-none shadow-inner leading-relaxed"
            />

            <button
              disabled={isLoading || !input.trim()}
              onClick={() => handleSend()}
              className="h-11 px-5 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">পাঠান</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>Shift + Enter দিলে নতুন লাইন তৈরি হবে</span>
            <span className="flex items-center gap-1 text-teal-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              পরীক্ষার ১০০% নির্ভুল সিলেবাস নির্দেশিকা
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
