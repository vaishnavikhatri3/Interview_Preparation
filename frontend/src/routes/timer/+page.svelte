<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { getAccessToken } from '$lib/auth';
  import { toast } from '$lib/stores';

  const FOCUS_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;

  type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

  let mode: TimerMode = 'focus';
  let timeLeft = FOCUS_TIME;
  let isRunning = false;
  let sessionsCompleted = 0;
  let interval: ReturnType<typeof setInterval> | null = null;

  const modes = [
    { id: 'focus' as TimerMode, label: 'Focus', time: FOCUS_TIME, emoji: '🎯' },
    { id: 'shortBreak' as TimerMode, label: 'Short Break', time: SHORT_BREAK, emoji: '☕' },
    { id: 'longBreak' as TimerMode, label: 'Long Break', time: LONG_BREAK, emoji: '🌿' },
  ];

  onMount(() => {
    const token = getAccessToken();
    if (!token) goto('/login');
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  $: minutes = Math.floor(timeLeft / 60);
  $: seconds = timeLeft % 60;
  $: progress = timeLeft / (getTimeForMode(mode)) * 100;

  function getTimeForMode(m: TimerMode): number {
    if (m === 'focus') return FOCUS_TIME;
    if (m === 'shortBreak') return SHORT_BREAK;
    return LONG_BREAK;
  }

  function selectMode(m: TimerMode) {
    if (isRunning) return;
    mode = m;
    timeLeft = getTimeForMode(m);
  }

  function toggleTimer() {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }

  function start() {
    if (timeLeft <= 0) {
      timeLeft = getTimeForMode(mode);
    }
    isRunning = true;
    interval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(interval!);
        interval = null;
        isRunning = false;
        onTimerComplete();
      }
    }, 1000);
  }

  function pause() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    isRunning = false;
  }

  function reset() {
    pause();
    timeLeft = getTimeForMode(mode);
  }

  function onTimerComplete() {
    if (mode === 'focus') {
      sessionsCompleted++;
      toast.success(`🎉 Focus session ${sessionsCompleted} completed! Take a break.`);
      mode = sessionsCompleted % 4 === 0 ? 'longBreak' : 'shortBreak';
    } else {
      toast.info('Break over! Time to focus again.');
      mode = 'focus';
    }
    timeLeft = getTimeForMode(mode);
  }
</script>

<div class="timer-page">
  <div class="page-description">
    <p>Use the Pomodoro technique to stay focused during your interview practice sessions.</p>
  </div>

  <!-- Mode Selector -->
  <div class="mode-selector">
    {#each modes as m}
      <button
        class="mode-btn"
        class:active={mode === m.id}
        on:click={() => selectMode(m.id)}
        disabled={isRunning}
      >
        <span class="mode-emoji">{m.emoji}</span>
        <span class="mode-label">{m.label}</span>
      </button>
    {/each}
  </div>

  <!-- Timer Display -->
  <div class="timer-card">
    <svg class="timer-ring" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="88" fill="none" stroke="#e2e8f0" stroke-width="6" />
      <circle
        cx="100" cy="100" r="88"
        fill="none"
        stroke="currentColor"
        stroke-width="6"
        stroke-linecap="round"
        stroke-dasharray="553"
        stroke-dashoffset={553 - (553 * progress) / 100}
        transform="rotate(-90 100 100)"
        style="color: {mode === 'focus' ? '#6366f1' : mode === 'shortBreak' ? '#22c55e' : '#3b82f6'}"
      />
    </svg>
    <div class="timer-content">
      <span class="timer-label">{mode === 'focus' ? 'Focus' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}</span>
      <span class="timer-display">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
      <span class="timer-sessions">{sessionsCompleted} sessions completed</span>
    </div>
  </div>

  <!-- Controls -->
  <div class="controls">
    <button class="control-btn primary" on:click={toggleTimer}>
      {#if isRunning}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
        </svg>
        Pause
      {:else}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        Start
      {/if}
    </button>
    <button class="control-btn secondary" on:click={reset}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
      Reset
    </button>
  </div>

  <!-- Stats -->
  <div class="stats-row">
    <div class="stat-item">
      <span class="stat-num">{sessionsCompleted}</span>
      <span class="stat-lbl">Focus Sessions</span>
    </div>
    <div class="stat-item">
      <span class="stat-num">{Math.floor(sessionsCompleted * FOCUS_TIME / 60)}</span>
      <span class="stat-lbl">Minutes Focused</span>
    </div>
    <div class="stat-item">
      <span class="stat-num">{Math.floor(sessionsCompleted / 4)}</span>
      <span class="stat-lbl">Cycles</span>
    </div>
  </div>
</div>

<style>
  .page-description { margin-bottom: 1.5rem; }
  .page-description p { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0; }

  .mode-selector {
    display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 2rem;
  }
  .mode-btn {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.6rem 1.2rem; border: 1.5px solid #e2e8f0; border-radius: 30px;
    background: #fff; color: #475569; font-size: 0.85rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: inherit;
  }
  .mode-btn:hover:not(:disabled) { border-color: #6366f1; color: #6366f1; }
  .mode-btn.active { background: #6366f1; color: #fff; border-color: #6366f1; }
  .mode-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .timer-card {
    position: relative; width: 260px; height: 260px; margin: 0 auto 2rem;
  }
  .timer-ring { width: 100%; height: 100%; }
  .timer-content {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .timer-label { font-size: 0.85rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
  .timer-display { font-size: 3rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0.25rem 0; }
  .timer-sessions { font-size: 0.8rem; color: #94a3b8; }

  .controls { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; }
  .control-btn {
    display: flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem;
    border: none; border-radius: 12px; font-size: 0.95rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s; font-family: inherit;
  }
  .control-btn.primary { background: #6366f1; color: #fff; }
  .control-btn.primary:hover { box-shadow: 0 4px 16px rgba(99,102,241,0.3); transform: translateY(-1px); }
  .control-btn.secondary { background: #fff; border: 1.5px solid #d1d5db; color: #475569; }
  .control-btn.secondary:hover { border-color: #6366f1; color: #6366f1; }

  .stats-row {
    display: flex; justify-content: center; gap: 2rem; padding: 1.5rem;
    background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  }
  .stat-item { text-align: center; }
  .stat-num { display: block; font-size: 1.4rem; font-weight: 700; color: #0f172a; }
  .stat-lbl { display: block; font-size: 0.75rem; color: #64748b; margin-top: 0.15rem; }
</style>
