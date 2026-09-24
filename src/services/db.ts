import { Question, Category } from '../types';
import rawQuestions from '../data/questions.json';
import rawCategories from '../data/categories.json';

const DB_NAME = 'dyd_ai_prep_offline_db';
const DB_VERSION = 1;

export interface OfflineMeta {
  key: string;
  value: any;
}

export interface OfflineExamRecord {
  id?: number;
  date: string;
  score: number;
  total: number;
  percentage: number;
  timeSpentSec: number;
}

class OfflineDatabaseService {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<IDBDatabase> | null = null;

  public async getDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB is not supported on this browser/environment'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Store for questions
        if (!db.objectStoreNames.contains('questions')) {
          const qStore = db.createObjectStore('questions', { keyPath: 'id' });
          qStore.createIndex('categoryId', 'categoryId', { unique: false });
          qStore.createIndex('source', 'source', { unique: false });
        }

        // Store for categories
        if (!db.objectStoreNames.contains('categories')) {
          db.createObjectStore('categories', { keyPath: 'id' });
        }

        // Store for metadata (e.g. sync state, timestamp)
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta', { keyPath: 'key' });
        }

        // Store for offline exam attempts
        if (!db.objectStoreNames.contains('exam_history')) {
          db.createObjectStore('exam_history', { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = async (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        // Ensure initial sync of bundled questions
        await this.syncDefaultData(this.db);
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('Failed to open IndexedDB:', event);
        reject(new Error('IndexedDB open error'));
      };
    });

    return this.initPromise;
  }

  // Populate or verify initial questions into IndexedDB
  private async syncDefaultData(db: IDBDatabase): Promise<void> {
    try {
      const count = await this.getCount(db, 'questions');
      if (count < (rawQuestions as Question[]).length) {
        // Bulk put all questions
        const tx = db.transaction(['questions', 'categories', 'meta'], 'readwrite');
        const qStore = tx.objectStore('questions');
        const cStore = tx.objectStore('categories');
        const mStore = tx.objectStore('meta');

        for (const q of rawQuestions as Question[]) {
          qStore.put(q);
        }

        for (const c of rawCategories as Category[]) {
          cStore.put(c);
        }

        mStore.put({
          key: 'sync_info',
          value: {
            cachedAt: new Date().toISOString(),
            totalQuestions: (rawQuestions as Question[]).length,
            version: '2026.1'
          }
        });

        await new Promise<void>((resolve, reject) => {
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      }
    } catch (err) {
      console.warn('Could not complete default IndexedDB sync:', err);
    }
  }

  private getCount(db: IDBDatabase, storeName: string): Promise<number> {
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.count();
        req.onsuccess = () => resolve(req.result || 0);
        req.onerror = () => resolve(0);
      } catch {
        resolve(0);
      }
    });
  }

  // Retrieve all questions from IndexedDB (fallback to memory if unavailable)
  public async getAllQuestions(): Promise<Question[]> {
    try {
      const db = await this.getDB();
      return new Promise<Question[]>((resolve) => {
        const tx = db.transaction('questions', 'readonly');
        const store = tx.objectStore('questions');
        const req = store.getAll();
        req.onsuccess = () => {
          if (req.result && req.result.length > 0) {
            resolve(req.result as Question[]);
          } else {
            resolve(rawQuestions as Question[]);
          }
        };
        req.onerror = () => resolve(rawQuestions as Question[]);
      });
    } catch {
      return rawQuestions as Question[];
    }
  }

  // Query by Category
  public async getQuestionsByCategory(categoryId: string): Promise<Question[]> {
    if (!categoryId || categoryId === 'all') {
      return this.getAllQuestions();
    }

    try {
      const db = await this.getDB();
      return new Promise<Question[]>((resolve) => {
        const tx = db.transaction('questions', 'readonly');
        const store = tx.objectStore('questions');
        const index = store.index('categoryId');
        const req = index.getAll(categoryId);
        req.onsuccess = () => resolve((req.result as Question[]) || []);
        req.onerror = () => {
          const fallback = (rawQuestions as Question[]).filter(q => q.categoryId === categoryId);
          resolve(fallback);
        };
      });
    } catch {
      return (rawQuestions as Question[]).filter(q => q.categoryId === categoryId);
    }
  }

  // Cache Verification & Offline Metadata
  public async getOfflineStatus(): Promise<{
    isIndexedDBActive: boolean;
    cachedCount: number;
    lastSyncTime: string;
  }> {
    try {
      const db = await this.getDB();
      const count = await this.getCount(db, 'questions');
      
      const meta = await new Promise<any>((resolve) => {
        const tx = db.transaction('meta', 'readonly');
        const store = tx.objectStore('meta');
        const req = store.get('sync_info');
        req.onsuccess = () => resolve(req.result?.value || null);
        req.onerror = () => resolve(null);
      });

      return {
        isIndexedDBActive: true,
        cachedCount: count || (rawQuestions as Question[]).length,
        lastSyncTime: meta?.cachedAt || new Date().toISOString()
      };
    } catch {
      return {
        isIndexedDBActive: false,
        cachedCount: (rawQuestions as Question[]).length,
        lastSyncTime: new Date().toISOString()
      };
    }
  }

  // Force re-cache / refresh from bundle
  public async forceReCache(): Promise<number> {
    const db = await this.getDB();
    const tx = db.transaction(['questions', 'categories', 'meta'], 'readwrite');
    const qStore = tx.objectStore('questions');
    const cStore = tx.objectStore('categories');
    const mStore = tx.objectStore('meta');

    qStore.clear();
    for (const q of rawQuestions as Question[]) {
      qStore.put(q);
    }

    cStore.clear();
    for (const c of rawCategories as Category[]) {
      cStore.put(c);
    }

    mStore.put({
      key: 'sync_info',
      value: {
        cachedAt: new Date().toISOString(),
        totalQuestions: (rawQuestions as Question[]).length,
        version: '2026.1'
      }
    });

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    return (rawQuestions as Question[]).length;
  }

  // Save offline exam attempt
  public async saveExamAttempt(attempt: OfflineExamRecord): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction('exam_history', 'readwrite');
      tx.objectStore('exam_history').add(attempt);
    } catch (err) {
      console.warn('Could not save exam record to IndexedDB:', err);
    }
  }

  // Get exam history
  public async getExamHistory(): Promise<OfflineExamRecord[]> {
    try {
      const db = await this.getDB();
      return new Promise<OfflineExamRecord[]>((resolve) => {
        const tx = db.transaction('exam_history', 'readonly');
        const req = tx.objectStore('exam_history').getAll();
        req.onsuccess = () => resolve((req.result as OfflineExamRecord[]) || []);
        req.onerror = () => resolve([]);
      });
    } catch {
      return [];
    }
  }
}

export const offlineDB = new OfflineDatabaseService();
