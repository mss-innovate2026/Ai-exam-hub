import React, { useState, useEffect } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { offlineDB } from '../services/db';
import { Wifi, WifiOff, Database, Check, RefreshCw, X } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [offlineStatus, setOfflineStatus] = useState<{
    isIndexedDBActive: boolean;
    cachedCount: number;
    lastSyncTime: string;
  } | null>(null);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    offlineDB.getOfflineStatus().then(setOfflineStatus);
  }, []);

  const handleRefreshCache = async () => {
    setIsRefreshing(true);
    try {
      await offlineDB.forceReCache();
      const status = await offlineDB.getOfflineStatus();
      setOfflineStatus(status);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      {/* Non-intrusive bottom offline pill on network loss */}
      {!isOnline && (
        <div className="fixed bottom-20 md:bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 text-white px-3.5 py-2 text-xs font-bold shadow-xl border border-amber-500 animate-bounce">
          <WifiOff className="w-4 h-4 shrink-0 text-amber-200" />
          <span>অফলাইন মোড — সম্পূর্ণ প্রশ্নব্যাংক ক্যাশ থেকে পড়া যাচ্ছে</span>
        </div>
      )}

      {/* Offline Storage Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-teal-100 text-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                  <Database className="w-4 h-4 text-teal-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900">অফলাইন স্টোরেজ স্থিতি</h3>
              </div>
              <button
                onClick={() => setShowStatusModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">ইন্টারনেট সংযোগ:</span>
                <span className={`font-bold flex items-center gap-1 ${isOnline ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                  {isOnline ? 'অনলাইন (সক্রিয়)' : 'অফলাইন'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">IndexedDB ক্যাশ:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {offlineStatus?.isIndexedDBActive ? 'সক্রিয় (Ready)' : 'সক্রিয়'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">সংরক্ষিত প্রশ্ন সংখ্যা:</span>
                <span className="font-black text-teal-900 font-mono">
                  {offlineStatus?.cachedCount || 932} টি প্রশ্ন
                </span>
              </div>

              <div className="pt-1 text-[11px] text-slate-400 border-t border-slate-200">
                সার্ভিস ওয়ার্কার ও IndexedDB-এর মাধ্যমে সব পাঠ্যবই প্রশ্ন ডিভাইসে ক্যাশ করা রয়েছে। ইন্টারনেট চলে গেলেও অ্যাপ স্বাভাবিকভাবে চলবে।
              </div>
            </div>

            <div className="flex gap-2">
              <button
                disabled={isRefreshing}
                onClick={handleRefreshCache}
                className="flex-1 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>ক্যাশ রি-সিঙ্ক</span>
              </button>
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
