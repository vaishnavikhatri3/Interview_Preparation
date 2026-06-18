import { b as ensure_array_like, a as attr_class, c as attr, e as escape_html, h as attr_style } from "../../../chunks/root.js";
import { o as onDestroy } from "../../../chunks/index-server.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/stores2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let minutes, seconds, progress;
    const FOCUS_TIME = 25 * 60;
    const SHORT_BREAK = 5 * 60;
    const LONG_BREAK = 15 * 60;
    let mode = "focus";
    let timeLeft = FOCUS_TIME;
    let isRunning = false;
    let sessionsCompleted = 0;
    const modes = [
      { id: "focus", label: "Focus", time: FOCUS_TIME, emoji: "🎯" },
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
      return FOCUS_TIME;
    }
    minutes = Math.floor(timeLeft / 60);
    seconds = timeLeft % 60;
    progress = timeLeft / getTimeForMode() * 100;
    $$renderer2.push(`<div class="timer-page"><div class="page-description svelte-u5z8t2"><p class="svelte-u5z8t2">Use the Pomodoro technique to stay focused during your interview practice sessions.</p></div> <div class="mode-selector svelte-u5z8t2"><!--[-->`);
    const each_array = ensure_array_like(modes);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let m = each_array[$$index];
      $$renderer2.push(`<button${attr_class("mode-btn svelte-u5z8t2", void 0, { "active": mode === m.id })}${attr("disabled", isRunning, true)}><span class="mode-emoji">${escape_html(m.emoji)}</span> <span class="mode-label">${escape_html(m.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="timer-card svelte-u5z8t2"><svg class="timer-ring svelte-u5z8t2" viewBox="0 0 200 200"><circle cx="100" cy="100" r="88" fill="none" stroke="#e2e8f0" stroke-width="6"></circle><circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-dasharray="553"${attr("stroke-dashoffset", 553 - 553 * progress / 100)} transform="rotate(-90 100 100)"${attr_style(`color: ${"#6366f1"}`)}></circle></svg> <div class="timer-content svelte-u5z8t2"><span class="timer-label svelte-u5z8t2">${escape_html(
      "Focus"
    )}</span> <span class="timer-display svelte-u5z8t2">${escape_html(String(minutes).padStart(2, "0"))}:${escape_html(String(seconds).padStart(2, "0"))}</span> <span class="timer-sessions svelte-u5z8t2">${escape_html(sessionsCompleted)} sessions completed</span></div></div> <div class="controls svelte-u5z8t2"><button class="control-btn primary svelte-u5z8t2">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Start`);
    }
    $$renderer2.push(`<!--]--></button> <button class="control-btn secondary svelte-u5z8t2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg> Reset</button></div> <div class="stats-row svelte-u5z8t2"><div class="stat-item svelte-u5z8t2"><span class="stat-num svelte-u5z8t2">${escape_html(sessionsCompleted)}</span> <span class="stat-lbl svelte-u5z8t2">Focus Sessions</span></div> <div class="stat-item svelte-u5z8t2"><span class="stat-num svelte-u5z8t2">${escape_html(Math.floor(sessionsCompleted * FOCUS_TIME / 60))}</span> <span class="stat-lbl svelte-u5z8t2">Minutes Focused</span></div> <div class="stat-item svelte-u5z8t2"><span class="stat-num svelte-u5z8t2">${escape_html(Math.floor(sessionsCompleted / 4))}</span> <span class="stat-lbl svelte-u5z8t2">Cycles</span></div></div></div>`);
  });
}
export {
  _page as default
};
