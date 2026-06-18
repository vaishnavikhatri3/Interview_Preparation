<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { getAccessToken } from '$lib/auth';
  import type { InterviewResult } from '$lib/interview';

  let result: InterviewResult | null = null;
  let loading = true;
  let error = '';
  let showAnswers = false;

  onMount(() => {
    const token = getAccessToken();
    if (!token) {
      goto('/login');
      return;
    }

    const stored = sessionStorage.getItem('interview_result');
    if (stored) {
      try {
        result = JSON.parse(stored);
        loading = false;
        return;
      } catch {
        // fall through
      }
    }

    // Try to fetch from API
    const id = $page.url.searchParams.get('id');
    if (id) {
      fetchResult(id);
    } else {
      error = 'No interview result found.';
      loading = false;
    }
  });

  async function fetchResult(id: string) {
    try {
      const token = getAccessToken();
      const res = await fetch(`/api/interviews/${id}/result`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        result = await res.json();
      } else {
        error = 'Failed to load interview result.';
      }
    } catch {
      error = 'Failed to load interview result.';
    }
    loading = false;
  }

  function getScoreColor(score: number): string {
    if (score >= 80) return '#22c55e';
    if (score >= 65) return '#f59e0b';
    return '#ef4444';
  }

  function getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent';
    if (score >= 65) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Needs Practice';
  }

  function goToDashboard() {
    sessionStorage.removeItem('interview_result');
    goto('/dashboard');
  }

  function retryInterview() {
    sessionStorage.removeItem('interview_result');
    goto('/interview/start');
  }
</script>

<div class="result-page">
  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading your results...</p>
    </div>
  {:else if error}
    <div class="error-state">
      <p>{error}</p>
      <button class="secondary-btn" on:click={goToDashboard}>Back to Dashboard</button>
    </div>
  {:else if result}
    <!-- Score Hero -->
    <div class="score-hero">
      <div class="score-ring" style="--score-color: {getScoreColor(result.score)}">
        <svg viewBox="0 0 120 120" class="ring-svg">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" stroke-width="8" />
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke="currentColor"
            stroke-width="8"
            stroke-linecap="round"
            stroke-dasharray="326.73"
            stroke-dashoffset={326.73 - (326.73 * result.score) / 100}
            transform="rotate(-90 60 60)"
            style="color: {getScoreColor(result.score)}"
          />
        </svg>
        <div class="score-inner">
          <span class="score-number">{result.score}%</span>
          <span class="score-label">{getScoreLabel(result.score)}</span>
        </div>
      </div>
      <div class="score-meta">
        <div class="meta-item">
          <span class="meta-label">Questions</span>
          <span class="meta-value">{result.totalQuestions}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Topic</span>
          <span class="meta-value">{result.topic}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Difficulty</span>
          <span class="meta-value capitalize">{result.difficulty}</span>
        </div>
      </div>
    </div>

    <!-- AI Feedback -->
    <div class="feedback-card">
      <div class="feedback-header">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
          <path d="M12 2a10 10 0 1 0 10 10h-10V2z" />
          <path d="M12 12 2.93 17.07" />
          <path d="M12 12 21.07 7.93" />
        </svg>
        <h3>AI Feedback</h3>
      </div>
      <p class="feedback-text">{result.aiFeedback}</p>
    </div>

    <!-- Strengths & Weaknesses -->
    <div class="sw-grid">
      <div class="sw-card strengths">
        <div class="sw-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h3>Strengths</h3>
        </div>
        <ul class="sw-list">
          {#each result.strengths as strength}
            <li>{strength}</li>
          {/each}
        </ul>
      </div>
      <div class="sw-card weaknesses">
        <div class="sw-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <h3>Areas to Improve</h3>
        </div>
        <ul class="sw-list">
          {#each result.weaknesses as weakness}
            <li>{weakness}</li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Improved Answer -->
    <div class="improved-card">
      <div class="improved-header">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <h3>Improved Answer</h3>
      </div>
      <p class="improved-text">{result.improvedAnswer}</p>
    </div>

    <!-- Per-Question Breakdown -->
    <button class="toggle-answers" on:click={() => showAnswers = !showAnswers}>
      {showAnswers ? 'Hide' : 'Show'} Detailed Breakdown
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class:rotated={showAnswers}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    {#if showAnswers}
      <div class="answers-breakdown">
        {#each result.answers as answer, i}
          <div class="answer-card">
            <div class="answer-header">
              <span class="answer-num">Question {i + 1}</span>
              <span class="answer-score" style="color: {getScoreColor(answer.score)}">
                {answer.score}%
              </span>
            </div>
            <div class="answer-body">
              <p class="answer-text">{answer.answer}</p>
              <div class="answer-feedback">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
                  <path d="M12 2a10 10 0 1 0 10 10h-10V2z" />
                  <path d="M12 12 2.93 17.07" />
                  <path d="M12 12 21.07 7.93" />
                </svg>
                <span>{answer.feedback}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <!-- Action Buttons -->
    <div class="result-actions">
      <button class="action-btn primary" on:click={retryInterview}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
        Try Another Interview
      </button>
      <button class="action-btn secondary" on:click={goToDashboard}>
        Back to Dashboard
      </button>
    </div>
  {/if}
</div>

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

  .error-state {
    text-align: center;
    padding: 3rem;
    color: #64748b;
  }

  .error-state p {
    margin-bottom: 1.25rem;
  }

  .secondary-btn {
    padding: 0.7rem 1.5rem;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    background: #fff;
    color: #374151;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    font-family: inherit;
  }

  .secondary-btn:hover {
    border-color: #6366f1;
    color: #6366f1;
  }

  /* Score Hero */
  .score-hero {
    display: flex;
    align-items: center;
    gap: 2rem;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 1.5rem;
  }

  .score-ring {
    position: relative;
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }

  .ring-svg {
    width: 100%;
    height: 100%;
  }

  .score-inner {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .score-number {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1;
  }

  .score-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.15rem;
  }

  .score-meta {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .meta-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .meta-value {
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
  }

  .capitalize { text-transform: capitalize; }

  /* Feedback Card */
  .feedback-card {
    background: linear-gradient(135deg, #eef2ff, #f8f7ff);
    border: 1px solid #c7d2fe;
    border-radius: 14px;
    padding: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .feedback-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.75rem;
  }

  .feedback-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #4338ca;
  }

  .feedback-text {
    margin: 0;
    font-size: 0.9rem;
    color: #1e293b;
    line-height: 1.7;
  }

  /* Strengths & Weaknesses */
  .sw-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .sw-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 1.5rem;
  }

  .sw-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .sw-header h3 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .strengths .sw-header h3 { color: #15803d; }
  .weaknesses .sw-header h3 { color: #b91c1c; }

  .sw-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sw-list li {
    position: relative;
    padding-left: 1.25rem;
    font-size: 0.85rem;
    color: #475569;
    line-height: 1.6;
    margin-bottom: 0.4rem;
  }

  .sw-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .strengths .sw-list li::before { background: #22c55e; }
  .weaknesses .sw-list li::before { background: #ef4444; }

  /* Improved Answer */
  .improved-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .improved-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.75rem;
  }

  .improved-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
  }

  .improved-text {
    margin: 0;
    font-size: 0.9rem;
    color: #475569;
    line-height: 1.7;
    background: #f8fafc;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #f1f5f9;
  }

  /* Toggle Answers */
  .toggle-answers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.85rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    background: #fff;
    color: #475569;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    margin-bottom: 1.25rem;
  }

  .toggle-answers:hover {
    border-color: #6366f1;
    color: #6366f1;
  }

  .toggle-answers svg.rotated {
    transform: rotate(180deg);
  }

  /* Answers Breakdown */
  .answers-breakdown {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .answer-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
  }

  .answer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 1.25rem;
    background: #f8fafc;
    border-bottom: 1px solid #f1f5f9;
  }

  .answer-num {
    font-size: 0.85rem;
    font-weight: 600;
    color: #0f172a;
  }

  .answer-score {
    font-size: 0.9rem;
    font-weight: 700;
  }

  .answer-body {
    padding: 1.25rem;
  }

  .answer-text {
    margin: 0 0 0.75rem;
    font-size: 0.85rem;
    color: #475569;
    line-height: 1.6;
    white-space: pre-wrap;
  }

  .answer-feedback {
    display: flex;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: #6366f1;
    line-height: 1.5;
    padding: 0.75rem;
    background: #f8f7ff;
    border-radius: 8px;
  }

  .answer-feedback svg {
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  /* Action Buttons */
  .result-actions {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex: 1;
    padding: 0.9rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
  }

  .action-btn.primary {
    background: linear-gradient(135deg, #6366f1, #2563eb);
    color: #fff;
  }

  .action-btn.primary:hover {
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
    transform: translateY(-1px);
  }

  .action-btn.secondary {
    background: #fff;
    border: 1.5px solid #d1d5db;
    color: #475569;
  }

  .action-btn.secondary:hover {
    border-color: #6366f1;
    color: #6366f1;
  }

  @media (max-width: 768px) {
    .score-hero {
      flex-direction: column;
      text-align: center;
    }

    .score-meta {
      justify-content: center;
    }

    .sw-grid {
      grid-template-columns: 1fr;
    }

    .result-actions {
      flex-direction: column;
    }
  }
</style>