<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getAccessToken } from '$lib/auth';

  interface Interview {
    id: string;
    topic: string;
    difficulty: string;
    score: number;
    date: string;
    status: string;
  }

  let interviews: Interview[] = [];
  let loading = true;
  let error = '';

  onMount(async () => {
    const token = getAccessToken();
    if (!token) {
      goto('/login');
      return;
    }

    try {
      const res = await fetch('/api/interviews', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        interviews = await res.json();
      } else {
        // Placeholder data
        interviews = getPlaceholderInterviews();
      }
    } catch {
      interviews = getPlaceholderInterviews();
    }
    loading = false;
  });

  function getPlaceholderInterviews(): Interview[] {
    return [
      { id: '1', topic: 'Data Structures & Algorithms', difficulty: 'Medium', score: 82, date: '2026-06-15', status: 'completed' },
      { id: '2', topic: 'System Design', difficulty: 'Hard', score: 68, date: '2026-06-12', status: 'completed' },
      { id: '3', topic: 'Frontend Development', difficulty: 'Medium', score: 91, date: '2026-06-08', status: 'completed' },
      { id: '4', topic: 'Behavioral Questions', difficulty: 'Easy', score: 88, date: '2026-06-05', status: 'completed' },
      { id: '5', topic: 'Database Design', difficulty: 'Medium', score: 0, date: '2026-06-18', status: 'in_progress' },
    ];
  }

  function getScoreClass(score: number): string {
    if (score >= 85) return 'score-high';
    if (score >= 70) return 'score-medium';
    return 'score-low';
  }

  function viewDetails(id: string) {
    goto(`/interview/${id}`);
  }
</script>

<div class="history-page">
  <div class="page-description">
    <p>Review your past interview sessions, scores, and detailed feedback to track your progress over time.</p>
  </div>

  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading interview history...</p>
    </div>
  {:else if interviews.length === 0}
    <div class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <h3>No interviews yet</h3>
      <p>Start your first mock interview to see your history here.</p>
      <button class="start-now-btn" on:click={() => goto('/interview/start')}>
        Start an Interview
      </button>
    </div>
  {:else}
    <div class="table-container">
      <table class="history-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Difficulty</th>
            <th>Score</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each interviews as interview}
            <tr>
              <td class="topic-cell">{interview.topic}</td>
              <td>
                <span class="diff-badge" class:diff-easy={interview.difficulty.toLowerCase() === 'easy'} class:diff-medium={interview.difficulty.toLowerCase() === 'medium'} class:diff-hard={interview.difficulty.toLowerCase() === 'hard'}>
                  {interview.difficulty}
                </span>
              </td>
              <td>
                {#if interview.status === 'in_progress'}
                  <span class="status-in-progress">In Progress</span>
                {:else}
                  <span class="score-value {getScoreClass(interview.score)}">{interview.score}%</span>
                {/if}
              </td>
              <td class="date-cell">{interview.date}</td>
              <td>
                <span class="status-badge" class:completed={interview.status === 'completed'} class:in-progress={interview.status === 'in_progress'}>
                  {interview.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </td>
              <td>
                <button class="view-btn" on:click={() => viewDetails(interview.id)}>
                  View Details
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  .page-description {
    margin-bottom: 1.5rem;
  }

  .page-description p {
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
  }

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

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
  }

  .empty-state h3 {
    margin: 1rem 0 0.5rem;
    color: #0f172a;
    font-size: 1.1rem;
  }

  .empty-state p {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0 0 1.25rem;
  }

  .start-now-btn {
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 10px;
    background: #6366f1;
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s;
    font-family: inherit;
  }

  .start-now-btn:hover {
    background: #4f46e5;
  }

  .table-container {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    overflow: hidden;
  }

  .history-table {
    width: 100%;
    border-collapse: collapse;
  }

  .history-table th {
    text-align: left;
    padding: 1rem 1.25rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .history-table td {
    padding: 1rem 1.25rem;
    font-size: 0.9rem;
    color: #1e293b;
    border-bottom: 1px solid #f1f5f9;
  }

  .history-table tr:last-child td {
    border-bottom: none;
  }

  .history-table tr:hover td {
    background: #f8fafc;
  }

  .topic-cell {
    font-weight: 500;
  }

  .diff-badge {
    display: inline-block;
    padding: 0.2rem 0.65rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .diff-easy { background: #f0fdf4; color: #15803d; }
  .diff-medium { background: #fffbeb; color: #b45309; }
  .diff-hard { background: #fef2f2; color: #b91c1c; }

  .score-value {
    font-weight: 700;
    font-size: 1rem;
  }

  .score-high { color: #15803d; }
  .score-medium { color: #b45309; }
  .score-low { color: #b91c1c; }

  .status-in-progress {
    color: #6366f1;
    font-weight: 600;
    font-style: italic;
  }

  .date-cell {
    color: #64748b;
  }

  .status-badge {
    display: inline-block;
    padding: 0.2rem 0.65rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .status-badge.completed { background: #f0fdf4; color: #15803d; }
  .status-badge.in-progress { background: #eef2ff; color: #6366f1; }

  .view-btn {
    padding: 0.4rem 0.9rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    color: #475569;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    white-space: nowrap;
  }

  .view-btn:hover {
    border-color: #6366f1;
    color: #6366f1;
  }

  @media (max-width: 768px) {
    .table-container {
      overflow-x: auto;
    }

    .history-table th,
    .history-table td {
      padding: 0.75rem 1rem;
      font-size: 0.82rem;
    }
  }
</style>