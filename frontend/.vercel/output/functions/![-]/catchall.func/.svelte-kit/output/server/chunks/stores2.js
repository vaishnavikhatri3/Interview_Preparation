import { d as derived, w as writable } from "./index.js";
const user = writable(null);
const isSidebarOpen = writable(false);
function createDarkMode() {
  const stored = null;
  const initial = stored === "true";
  const { subscribe, set, update } = writable(initial);
  return {
    subscribe,
    toggle: () => {
      update((v) => {
        const next = !v;
        return next;
      });
    },
    set: (v) => {
      set(v);
    }
  };
}
const isDarkMode = createDarkMode();
function createToastStore() {
  const { subscribe, update } = writable([]);
  let counter = 0;
  return {
    subscribe,
    show: (message, type = "info", duration = 3500) => {
      const id = `toast-${++counter}`;
      update((t) => [...t, { id, message, type, duration }]);
      if (duration > 0) {
        setTimeout(() => {
          update((t) => t.filter((toast2) => toast2.id !== id));
        }, duration);
      }
    },
    success: (msg) => {
      toast.show(msg, "success");
    },
    error: (msg) => {
      toast.show(msg, "error");
    },
    info: (msg) => {
      toast.show(msg, "info");
    },
    warning: (msg) => {
      toast.show(msg, "warning");
    },
    dismiss: (id) => {
      update((t) => t.filter((toast2) => toast2.id !== id));
    }
  };
}
const toast = createToastStore();
const userProgress = writable({
  xp: 0,
  level: 1,
  totalInterviews: 0,
  totalPracticeQuestions: 0,
  studyMinutes: 0,
  streak: 0
});
const levelInfo = derived(userProgress, ($p) => {
  const xpForLevel = (level) => level * 100;
  const currentLevelXp = xpForLevel($p.level);
  const nextLevelXp = xpForLevel($p.level + 1);
  const progress = Math.min(100, ($p.xp - ($p.level - 1) * 100) / currentLevelXp * 100);
  return {
    xp: $p.xp,
    level: $p.level,
    progress: Math.max(0, progress),
    xpForNextLevel: nextLevelXp - $p.xp,
    title: getLevelTitle($p.level)
  };
});
function getLevelTitle(level) {
  if (level >= 50) return "Interview Legend";
  if (level >= 30) return "Ace Architect";
  if (level >= 20) return "Master Candidate";
  if (level >= 15) return "Senior Prospect";
  if (level >= 10) return "Interview Expert";
  if (level >= 7) return "Confident Candidate";
  if (level >= 5) return "Rising Star";
  if (level >= 3) return "Apprentice";
  return "Beginner";
}
export {
  isDarkMode as a,
  isSidebarOpen as i,
  levelInfo as l,
  toast as t,
  user as u
};
