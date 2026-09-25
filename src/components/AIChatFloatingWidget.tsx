import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  ChevronUp,
  Zap,
  User,
  ExternalLink
} from 'lucide-react';

interface FloatingMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
}

interface Props {
  onOpenFullChat: () => void;
}

export const AIChatFloatingWidget: React.FC<Props> = ({ onOpenFullChat }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<FloatingMessage[]>([
    {
      id: 'init_float',
      role: 'model',
      content: '👋 কোনো প্রশ্ন বা ডাউট আছে? এখানে লিখুন, আমি তৎক্ষণাৎ বুঝিয়ে দিচ্ছি!'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: FloatingMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      const botMsg: FloatingMessage = {
        id: `b_${Date.now()}`,
        role: 'model',
        content: data.reply || 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।'
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'model',
          content: '⚠️ সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col items-end">
      {/* Expanded Pop-up Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[380px] h-[480px] bg-white rounded-3xl shadow-2xl border border-teal-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-800 to-emerald-700 p-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <b className="text-xs sm:text-sm font-bold block">DYD AI স্টাডি রোবট</b>
                <span className="text-[10px] text-teal-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  অনলাইন হেল্পার
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenFullChat();
                }}
                className="p-1.5 hover:bg-white/20 rounded-lg text-teal-100 transition-colors"
                title="পূর্ণাঙ্গ চ্যাটবট খুলুন"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-teal-100 transition-colors"
                title="মিনিমাইজ"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.role === 'user' ? 'ml-auto flex-row-reverse max-w-[85%]' : 'mr-auto max-w-[90%]'}`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] ${
                    m.role === 'user' ? 'bg-teal-700 text-white' : 'bg-emerald-700 text-white'
                  }`}
                >
                  {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-teal-800 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 mr-auto max-w-[80%] items-center text-slate-500 italic">
                <Bot className="w-4 h-4 text-teal-700 animate-bounce" />
                <span>উত্তর তৈরি হচ্ছে...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chip suggestions */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 flex gap-1.5 overflow-x-auto no-scrollbar text-[10px]">
            <button
              onClick={() => handleSend('প্যারাগ্রাফের ৫-লাইনের সূত্রটা বলো')}
              className="px-2 py-1 bg-white border border-slate-200 rounded-lg whitespace-nowrap hover:bg-teal-50"
            >
              📝 প্যারাগ্রাফ সূত্র
            </button>
            <button
              onClick={() => handleSend('ইমেইল লেখার নিয়ম ও ফরম্যাট কী?')}
              className="px-2 py-1 bg-white border border-slate-200 rounded-lg whitespace-nowrap hover:bg-teal-50"
            >
              📧 ইমেইল ফরম্যাট
            </button>
            <button
              onClick={() => handleSend('ভাইভায় কী কী কমন প্রশ্ন আসে?')}
              className="px-2 py-1 bg-white border border-slate-200 rounded-lg whitespace-nowrap hover:bg-teal-50"
            >
              🎤 ভাইভা প্রশ্ন
            </button>
          </div>

          {/* Input Box */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="এখানে প্রশ্ন লিখুন..."
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
            />
            <button
              disabled={isLoading || !input.trim()}
              onClick={() => handleSend()}
              className="w-8 h-8 rounded-xl bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Trigger Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-amber-300/60 cursor-pointer"
        aria-label="AI টিউটর চ্যাটবট"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300"></span>
        </span>
        <Bot className="w-5 h-5 text-amber-300" />
        <span className="font-bold text-xs sm:text-sm">
          {isOpen ? 'চ্যাট বন্ধ করুন' : '🤖 AI চ্যাটবট / হেল্পার'}
        </span>
      </button>
    </div>
  );
};
