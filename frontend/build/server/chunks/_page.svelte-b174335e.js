import { c as create_ssr_component, o as onDestroy, b as each, d as add_attribute, e as escape } from './index2-b5666d43.js';
import './stores2-7b62ca2c.js';
import './index-641b5f1c.js';

const css = {
  code: ".page-description.svelte-1vf4vkk.svelte-1vf4vkk{margin-bottom:1.5rem}.page-description.svelte-1vf4vkk p.svelte-1vf4vkk{color:#64748b;font-size:0.95rem;line-height:1.6;margin:0}.mode-selector.svelte-1vf4vkk.svelte-1vf4vkk{display:flex;gap:0.5rem;justify-content:center;margin-bottom:2rem}.mode-btn.svelte-1vf4vkk.svelte-1vf4vkk{display:flex;align-items:center;gap:0.4rem;padding:0.6rem 1.2rem;border:1.5px solid #e2e8f0;border-radius:30px;background:#fff;color:#475569;font-size:0.85rem;font-weight:500;cursor:pointer;transition:all 0.2s;font-family:inherit}.mode-btn.svelte-1vf4vkk.svelte-1vf4vkk:hover:not(:disabled){border-color:#6366f1;color:#6366f1}.mode-btn.active.svelte-1vf4vkk.svelte-1vf4vkk{background:#6366f1;color:#fff;border-color:#6366f1}.mode-btn.svelte-1vf4vkk.svelte-1vf4vkk:disabled{opacity:0.5;cursor:not-allowed}.timer-card.svelte-1vf4vkk.svelte-1vf4vkk{position:relative;width:260px;height:260px;margin:0 auto 2rem}.timer-ring.svelte-1vf4vkk.svelte-1vf4vkk{width:100%;height:100%}.timer-content.svelte-1vf4vkk.svelte-1vf4vkk{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.timer-label.svelte-1vf4vkk.svelte-1vf4vkk{font-size:0.85rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.08em}.timer-display.svelte-1vf4vkk.svelte-1vf4vkk{font-size:3rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;margin:0.25rem 0}.timer-sessions.svelte-1vf4vkk.svelte-1vf4vkk{font-size:0.8rem;color:#94a3b8}.controls.svelte-1vf4vkk.svelte-1vf4vkk{display:flex;gap:1rem;justify-content:center;margin-bottom:2rem}.control-btn.svelte-1vf4vkk.svelte-1vf4vkk{display:flex;align-items:center;gap:0.5rem;padding:0.85rem 2rem;border:none;border-radius:12px;font-size:0.95rem;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:inherit}.control-btn.primary.svelte-1vf4vkk.svelte-1vf4vkk{background:#6366f1;color:#fff}.control-btn.primary.svelte-1vf4vkk.svelte-1vf4vkk:hover{box-shadow:0 4px 16px rgba(99,102,241,0.3);transform:translateY(-1px)}.control-btn.secondary.svelte-1vf4vkk.svelte-1vf4vkk{background:#fff;border:1.5px solid #d1d5db;color:#475569}.control-btn.secondary.svelte-1vf4vkk.svelte-1vf4vkk:hover{border-color:#6366f1;color:#6366f1}.stats-row.svelte-1vf4vkk.svelte-1vf4vkk{display:flex;justify-content:center;gap:2rem;padding:1.5rem;background:#fff;border:1px solid #e2e8f0;border-radius:14px}.stat-item.svelte-1vf4vkk.svelte-1vf4vkk{text-align:center}.stat-num.svelte-1vf4vkk.svelte-1vf4vkk{display:block;font-size:1.4rem;font-weight:700;color:#0f172a}.stat-lbl.svelte-1vf4vkk.svelte-1vf4vkk{display:block;font-size:0.75rem;color:#64748b;margin-top:0.15rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let minutes;
  let seconds;
  let progress;
  const FOCUS_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;
  let mode = "focus";
  let timeLeft = FOCUS_TIME;
  let sessionsCompleted = 0;
  const modes = [
    {
      id: "focus",
      label: "Focus",
      time: FOCUS_TIME,
      emoji: "🎯"
    },
    {
      id: "shortBreak",
      label: "Short Break",
      time: SHORT_BREAK,
      emoji: "☕"
    },
    {
      id: "longBreak",
      label: "Long Break",
      time: LONG_BREAK,
      emoji: "🌿"
    }
  ];
  onDestroy(() => {
  });
  function getTimeForMode(m) {
    if (m === "focus")
      return FOCUS_TIME;
    if (m === "shortBreak")
      return SHORT_BREAK;
    return LONG_BREAK;
  }
  $$result.css.add(css);
  minutes = Math.floor(timeLeft / 60);
  seconds = timeLeft % 60;
  progress = timeLeft / getTimeForMode(mode) * 100;
  return `<div class="timer-page"><div class="page-description svelte-1vf4vkk"><p class="svelte-1vf4vkk">Use the Pomodoro technique to stay focused during your interview practice sessions.</p></div>

  
  <div class="mode-selector svelte-1vf4vkk">${each(modes, (m) => {
    return `<button class="${["mode-btn svelte-1vf4vkk", mode === m.id ? "active" : ""].join(" ").trim()}" ${""}><span class="mode-emoji">${escape(m.emoji)}</span>
        <span class="mode-label">${escape(m.label)}</span>
      </button>`;
  })}</div>

  
  <div class="timer-card svelte-1vf4vkk"><svg class="timer-ring svelte-1vf4vkk" viewBox="0 0 200 200"><circle cx="100" cy="100" r="88" fill="none" stroke="#e2e8f0" stroke-width="6"></circle><circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-dasharray="553"${add_attribute("stroke-dashoffset", 553 - 553 * progress / 100, 0)} transform="rotate(-90 100 100)" style="${"color: " + escape(
    "#6366f1",
    true
  )}"></circle></svg>
    <div class="timer-content svelte-1vf4vkk"><span class="timer-label svelte-1vf4vkk">${escape(
    "Focus"
  )}</span>
      <span class="timer-display svelte-1vf4vkk">${escape(String(minutes).padStart(2, "0"))}:${escape(String(seconds).padStart(2, "0"))}</span>
      <span class="timer-sessions svelte-1vf4vkk">${escape(sessionsCompleted)} sessions completed</span></div></div>

  
  <div class="controls svelte-1vf4vkk"><button class="control-btn primary svelte-1vf4vkk">${`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        Start`}</button>
    <button class="control-btn secondary svelte-1vf4vkk"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
      Reset
    </button></div>

  
  <div class="stats-row svelte-1vf4vkk"><div class="stat-item svelte-1vf4vkk"><span class="stat-num svelte-1vf4vkk">${escape(sessionsCompleted)}</span>
      <span class="stat-lbl svelte-1vf4vkk">Focus Sessions</span></div>
    <div class="stat-item svelte-1vf4vkk"><span class="stat-num svelte-1vf4vkk">${escape(Math.floor(sessionsCompleted * FOCUS_TIME / 60))}</span>
      <span class="stat-lbl svelte-1vf4vkk">Minutes Focused</span></div>
    <div class="stat-item svelte-1vf4vkk"><span class="stat-num svelte-1vf4vkk">${escape(Math.floor(sessionsCompleted / 4))}</span>
      <span class="stat-lbl svelte-1vf4vkk">Cycles</span></div></div>
</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-b174335e.js.map
