import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import { offlineDB } from './services/db';

// Register Service Worker for offline capability
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('New content available, auto-updating...');
  },
  onOfflineReady() {
    console.log('App ready to work offline with full question bank cached!');
  },
});

// Warm up and verify IndexedDB cache on startup
offlineDB.getOfflineStatus().catch((err) => {
  console.warn('IndexedDB initial verification note:', err);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

