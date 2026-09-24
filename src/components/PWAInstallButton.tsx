import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, CheckCircle, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span className="hidden sm:inline">অ্যাপ ইনস্টল করা</span>
      </span>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-1.5 rounded-xl font-bold transition-all shadow-xs ${
          compact 
            ? 'px-2.5 py-1 text-xs bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-300' 
            : 'px-3 py-1.5 text-xs bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-300'
        }`}
        title="ইন্টারনেট ছাড়া পড়তে অ্যাপটি মোবাইলে ইনস্টল করুন"
      >
        <Download className="w-3.5 h-3.5" />
        <span>অ্যাপ ইনস্টল</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl transition-colors"
          title="আইফোনে ইনস্টল করার নিয়ম"
        >
          <Smartphone className="w-3.5 h-3.5 text-teal-600" />
          <span>iOS ইনস্টল</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-teal-100 text-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-teal-700" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">iPhone / iPad-এ ইনস্টল</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <p>
                  ১. Safari ব্রাউজারের নিচের <strong>Share (শেয়ার)</strong> আইকনে চাপুন।
                </p>
                <p>
                  ২. একটু নিচে স্ক্রল করে <strong>Add to Home Screen (হোম স্ক্রিনে যোগ করুন)</strong> নির্বাচন করুন।
                </p>
                <p>
                  ৩. উপরে ডানে <strong>Add</strong> চাপলেই অ্যাপটি মোবাইলে সেভ হয়ে যাবে।
                </p>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2 bg-teal-700 text-white font-bold rounded-xl text-xs hover:bg-teal-800"
              >
                বুঝেছি, বন্ধ করুন
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
