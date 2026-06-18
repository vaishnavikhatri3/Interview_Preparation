import { writable, derived } from 'svelte/store';
import { getAccessToken, clearTokens } from './auth';
import { browser } from '$app/environment';

export interface User {
  userId: string;
  email: string;
}

export const user = writable<User | null>(null);
export const isSidebarOpen = writable<boolean>(false);

// Dark Mode
function createDarkMode() {
  const stored = browser ? localStorage.getItem('interviewace_dark_mode') : null;
  const initial = stored === 'true';
  const { subscribe, set, update } = writable<boolean>(initial);

  return {
    subscribe,
    toggle: () => {
      update(v => {
        const next = !v;
        if (browser) localStorage.setItem('interviewace_dark_mode', String(next));
        if (browser) document.documentElement.classList.toggle('dark', next);
        return next;
      });
    },
    set: (v: boolean) => {
      if (browser) localStorage.setItem('interviewace_dark_mode', String(v));
      if (browser) document.documentElement.classList.toggle('dark', v);
      set(v);
    }
  };
}

export const isDarkMode = createDarkMode();

// Toast / Notification system
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);
  let counter = 0;

  return {
    subscribe,
    show: (message: string, type: ToastType = 'info', duration = 3500) => {
      const id = `toast-${++counter}`;
      update(t => [...t, { id, message, type, duration }]);
      if (duration > 0) {
        setTimeout(() => {
          update(t => t.filter(toast => toast.id !== id));
        }, duration);
      }
    },
    success: (msg: string) => { toast.show(msg, 'success'); },
    error: (msg: string) => { toast.show(msg, 'error'); },
    info: (msg: string) => { toast.show(msg, 'info'); },
    warning: (msg: string) => { toast.show(msg, 'warning'); },
    dismiss: (id: string) => {
      update(t => t.filter(toast => toast.id !== id));
    }
  };
}

export const toast = createToastStore();

// XP / Progress tracking
export interface UserProgress {
  xp: number;
  level: number;
  totalInterviews: number;
  totalPracticeQuestions: number;
  studyMinutes: number;
  streak: number;
}

export const userProgress = writable<UserProgress>({
  xp: 0,
  level: 1,
  totalInterviews: 0,
  totalPracticeQuestions: 0,
  studyMinutes: 0,
  streak: 0
});

// Derived level info
export const levelInfo = derived(userProgress, $p => {
  const xpForLevel = (level: number) => level * 100;
  const currentLevelXp = xpForLevel($p.level);
  const nextLevelXp = xpForLevel($p.level + 1);
  const progress = Math.min(100, (($p.xp - (($p.level - 1) * 100)) / (currentLevelXp)) * 100);
  return {
    xp: $p.xp,
    level: $p.level,
    progress: Math.max(0, progress),
    xpForNextLevel: nextLevelXp - $p.xp,
    title: getLevelTitle($p.level)
  };
});

function getLevelTitle(level: number): string {
  if (level >= 50) return 'Interview Legend';
  if (level >= 30) return 'Ace Architect';
  if (level >= 20) return 'Master Candidate';
  if (level >= 15) return 'Senior Prospect';
  if (level >= 10) return 'Interview Expert';
  if (level >= 7) return 'Confident Candidate';
  if (level >= 5) return 'Rising Star';
  if (level >= 3) return 'Apprentice';
  return 'Beginner';
}

export function addXP(amount: number) {
  userProgress.update(p => {
    let newXp = p.xp + amount;
    let newLevel = p.level;
    
    // Level up check
    const xpForLevel = (level: number) => level * 100;
    while (newXp >= xpForLevel(newLevel)) {
      newXp -= xpForLevel(newLevel);
      newLevel++;
      toast.show(`🎉 Level ${newLevel} reached! You're now a ${getLevelTitle(newLevel)}`, 'success', 5000);
    }

    return { ...p, xp: p.xp + amount, level: newLevel };
  });
}

export async function fetchUser(): Promise<User | null> {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      clearTokens();
      return null;
    }
    const data = await res.json();
    const u: User = { userId: data.userId, email: data.email || '' };
    user.set(u);
    return u;
  } catch {
    return null;
  }
}