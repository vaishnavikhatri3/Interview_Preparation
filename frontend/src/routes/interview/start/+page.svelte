<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getAccessToken } from '$lib/auth';
  import { getDefaultTopics, startInterviewSession } from '$lib/interview';

  let selectedTopic = '';
  let difficulty = 'medium';
  let questionCount = 3;
  let loading = false;
  let error = '';

  const topics = getDefaultTopics();

  const difficulties = [
    { value: 'all', label: 'All Levels', desc: 'Mix of easy, medium, and hard' },
    { value: 'easy', label: 'Easy', desc: 'Basic concepts and fundamentals' },
    { value: 'medium', label: 'Medium', desc: 'Intermediate problem solving' },
    { value: 'hard', label: 'Hard', desc: 'Complex scenarios and depth' }
  ];

  const countOptions = [1, 2, 3, 5];

  onMount(() => {
    const token = getAccessToken();
    if (!token) {
      goto('/login');
    }
  });

  async function startInterview() {
    if (!selectedTopic) {
      error = 'Please select a topic to practice.';
      return;
    }

    loading = true;
    error = '';

    try {
      const session = await startInterviewSession(selectedTopic, difficulty, questionCount);
      // Store questions in sessionStorage for the session page
      sessionStorage.setItem('interview_questions', JSON.stringify(session.questions));
      goto(`/interview/session?id=${session.id}&topic=${encodeURIComponent(selectedTopic)}&difficulty=${difficulty}&count=${questionCount}`);
    } catch (err) {
      error = 'Failed to start interview. Please try again.';
      loading = false;
    }
  }
</script>

<div class="start-interview">
  <div class="page-description">
    <p>Choose a topic, difficulty level, and number of questions to begin your AI-powered mock interview. You'll receive real-time feedback and a detailed performance report.</p>
  </div>

  {#if error}
    <div class="error-banner">{error}</div>
  {/if}

  <div class="card">
    <h2>Select Topic</h2>
    <div class="topic-grid">
      {#each topics as topic}
        <button
          class="topic-chip"
          class:selected={selectedTopic === topic}
          on:click={() => { selectedTopic = topic; error = ''; }}
        >
          {topic}
        </button>
      {/each}
    </div>
  </div>

  <div class="card">
    <h2>Difficulty Level</h2>
    <div class="difficulty-grid">
      {#each difficulties as d}
        <button
          class="difficulty-card"
          class:selected={difficulty === d.value}
          on:click={() => difficulty = d.value}
        >
          <span class="diff-label">{d.label}</span>
          <span class="diff-desc">{d.desc}</span>
        </button>
      {/each}
    </div>
  </div>

  <div class="card">
    <h2>Number of Questions</h2>
    <div class="count-grid">
      {#each countOptions as count}
        <button
          class="count-chip"
          class:selected={questionCount === count}
          on:click={() => questionCount = count}
        >
          {count}
        </button>
      {/each}
    </div>
  </div>

  <button
    class="start-btn"
    on:click={startInterview}
    disabled={loading || !selectedTopic}
  >
    {#if loading}
      <span class="btn-spinner"></span>
      Starting...
    {:else}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
      Start Interview
    {/if}
  </button>
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

  .error-banner {
    background: #fef2f2;
    color: #b91c1c;
    padding: 0.85rem 1.25rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }

  .card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .card h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
  }

  .topic-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .topic-chip {
    padding: 0.6rem 1.1rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 30px;
    background: #fff;
    color: #475569;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .topic-chip:hover {
    border-color: #6366f1;
    color: #6366f1;
    background: #f8f7ff;
  }

  .topic-chip.selected {
    background: #6366f1;
    color: #fff;
    border-color: #6366f1;
  }

  .difficulty-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
  }

  .difficulty-card {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 1rem 1.25rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    font-family: inherit;
  }

  .difficulty-card:hover {
    border-color: #6366f1;
  }

  .difficulty-card.selected {
    border-color: #6366f1;
    background: #f8f7ff;
  }

  .difficulty-card.selected .diff-label {
    color: #6366f1;
  }

  .diff-label {
    font-weight: 600;
    font-size: 0.95rem;
    color: #0f172a;
    text-transform: capitalize;
  }

  .diff-desc {
    font-size: 0.8rem;
    color: #64748b;
  }

  .count-grid {
    display: flex;
    gap: 0.75rem;
  }

  .count-chip {
    width: 56px;
    height: 56px;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    background: #fff;
    color: #475569;
    font-size: 1.15rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .count-chip:hover {
    border-color: #6366f1;
    color: #6366f1;
  }

  .count-chip.selected {
    background: #6366f1;
    color: #fff;
    border-color: #6366f1;
  }

  .start-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1, #2563eb);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    margin-top: 0.5rem;
  }

  .start-btn:hover:not(:disabled) {
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
    transform: translateY(-1px);
  }

  .start-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>