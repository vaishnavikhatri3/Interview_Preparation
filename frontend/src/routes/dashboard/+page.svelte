<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getAccessToken } from '$lib/auth';
  import { user, userProgress, levelInfo, addXP, toast } from '$lib/stores';

  let stats = {
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0,
    weakTopics: [] as string[]
  };

  let loading = true;
  let error = '';
  let searchQuery = '';

  $: $levelInfo; // reactively track XP

  // Initialize XP with some starting data
  function initProgress() {
    userProgress.set({
      xp: 340,
      level: 3,
      totalInterviews: 12,
      totalPracticeQuestions: 45,
      studyMinutes: 340,
      streak: 5
    });
  }

  onMount(async () => {
    const token = getAccessToken();
    if (!token) {
      goto('/login');
      return;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        goto('/login');
        return;
      }
    } catch {
      // Continue with placeholder data if API is unavailable
    }

    initProgress();

    // Try to fetch stats from API, fall back to placeholder
    try {
      const res = await fetch('/api/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        stats = {
          totalInterviews: data.totalInterviews ?? 12,
          averageScore: data.averageScore ?? 78,
          bestScore: data.bestScore ?? 94,
          weakTopics: data.weakTopics ?? ['System Design', 'Algorithms']
        };
      }
    } catch {
      // Use placeholder data
      stats = {
        totalInterviews: 12,
        averageScore: 78,
        bestScore: 94,
        weakTopics: ['System Design', 'Algorithms']
      };
    }

    loading = false;
    toast.info('👋 Welcome back! Ready to practice?');
  });

  function startInterview() {
    goto('/interview/start');
  }

  function uploadResume() {
    goto('/resume');
  }

  function viewHistory() {
    goto('/interview/history');
  }

  function practiceQuestions() {
    goto('/interview/start');
  }
</script>

{#if loading}
  <div class="loading-state">
    <div class="spinner"></div>
    <p>Loading dashboard...</p>
  </div>
{:else}
  {#if error}
    <div class="error-banner">{error}</div>
  {/if}

  <!-- Stats Cards -->
  <div class="stats-grid">
    <div class="stat-card total-interviews">
      <div class="stat-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-label">Total Interviews</span>
        <span class="stat-value">{stats.totalInterviews}</span>
      </div>
    </div>

    <div class="stat-card average-score">
      <div class="stat-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-label">Average Score</span>
        <span class="stat-value">{stats.averageScore}%</span>
      </div>
    </div>

    <div class="stat-card best-score">
      <div class="stat-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-label">Best Score</span>
        <span class="stat-value">{stats.bestScore}%</span>
      </div>
    </div>

    <div class="stat-card weak-topics">
      <div class="stat-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-label">Weak Topics</span>
        <div class="weak-topics-list">
          {#each stats.weakTopics as topic}
            <span class="topic-badge">{topic}</span>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <h2 class="section-title">Quick Actions</h2>
  <div class="actions-grid">
    <button class="action-card primary" on:click={startInterview}>
      <div class="action-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>
      <div class="action-content">
        <span class="action-title">Start Mock Interview</span>
        <span class="action-desc">Practice with AI-powered interviews</span>
      </div>
      <span class="action-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </button>

    <button class="action-card" on:click={uploadResume}>
      <div class="action-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <div class="action-content">
        <span class="action-title">Upload Resume</span>
        <span class="action-desc">Get AI analysis of your resume</span>
      </div>
      <span class="action-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </button>

    <button class="action-card" on:click={viewHistory}>
      <div class="action-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <div class="action-content">
        <span class="action-title">View History</span>
        <span class="action-desc">Review past interview sessions</span>
      </div>
      <span class="action-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </button>

    <button class="action-card" on:click={practiceQuestions}>
      <div class="action-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <div class="action-content">
        <span class="action-title">Practice Questions</span>
        <span class="action-desc">Browse question bank by topic</span>
      </div>
      <span class="action-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </button>
  </div>
{/if}

<style>
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    color: #64748b;
  }

  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #e2e8f0;
    border-top: 3px solid #6366f1;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .error-banner {
    background: #fef2f2;
    color: #b91c1c;
    padding: 0.85rem 1.25rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
    margin-bottom: 2.5rem;
  }

  .stat-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .stat-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }

  .stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .total-interviews .stat-icon { background: #eef2ff; color: #6366f1; }
  .average-score .stat-icon { background: #f0fdf4; color: #22c55e; }
  .best-score .stat-icon { background: #fffbeb; color: #f59e0b; }
  .weak-topics .stat-icon { background: #fef2f2; color: #ef4444; }

  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }

  .stat-label {
    font-size: 0.85rem;
    color: #64748b;
    font-weight: 500;
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.03em;
  }

  .weak-topics-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.35rem;
  }

  .topic-badge {
    background: #fef2f2;
    color: #dc2626;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.65rem;
    border-radius: 20px;
  }

  .section-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }

  .action-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    font-family: inherit;
    position: relative;
  }

  .action-card:hover {
    border-color: #6366f1;
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1);
    transform: translateY(-2px);
  }

  .action-card.primary {
    background: linear-gradient(135deg, #6366f1, #2563eb);
    border-color: transparent;
    color: #fff;
  }

  .action-card.primary .action-title { color: #fff; }
  .action-card.primary .action-desc { color: rgba(255, 255, 255, 0.75); }
  .action-card.primary .action-icon { color: rgba(255, 255, 255, 0.9); }
  .action-card.primary .action-arrow { color: rgba(255, 255, 255, 0.7); }

  .action-card.primary:hover {
    box-shadow: 0 6px 24px rgba(99, 102, 241, 0.3);
  }

  .action-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #6366f1;
  }

  .action-card.primary .action-icon {
    background: rgba(255, 255, 255, 0.12);
  }

  .action-card:not(.primary) .action-icon {
    background: #f1f5f9;
  }

  .action-content {
    flex: 1;
    min-width: 0;
  }

  .action-title {
    display: block;
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.2rem;
  }

  .action-desc {
    display: block;
    font-size: 0.82rem;
    color: #64748b;
  }

  .action-arrow {
    color: #94a3b8;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
</style>