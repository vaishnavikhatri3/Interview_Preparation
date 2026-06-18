<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { getAccessToken } from '$lib/auth';
  import { submitAnswers, type Question } from '$lib/interview';

  interface AnswerEntry {
    questionId: string;
    answer: string;
  }

  const sessionId = $page.params.id;
  let questions: Question[] = [];
  let answers: AnswerEntry[] = [];
  let currentIndex = 0;
  let currentAnswer = '';
  let loading = true;
  let submitting = false;
  let error = '';

  onMount(() => {
    const token = getAccessToken();
    if (!token) {
      goto('/login');
      return;
    }

    // Load questions from sessionStorage (set by start page)
    const stored = sessionStorage.getItem('interview_questions');
    if (stored) {
      try {
        questions = JSON.parse(stored);
        if (questions.length === 0) throw new Error('No questions');
        answers = questions.map(q => ({ questionId: q.id, answer: '' }));
        loading = false;
        return;
      } catch {
        // fall through
      }
    }

    // If no stored questions, redirect to start
    goto('/interview/start');
  });

  $: currentQuestion = questions[currentIndex];
  $: progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  $: isLastQuestion = currentIndex === questions.length - 1;

  function nextQuestion() {
    if (!currentAnswer.trim()) {
      error = 'Please provide an answer before continuing.';
      return;
    }
    error = '';
    answers[currentIndex].answer = currentAnswer;

    if (isLastQuestion) {
      submitAll();
    } else {
      currentIndex++;
      currentAnswer = answers[currentIndex]?.answer || '';
    }
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      answers[currentIndex].answer = currentAnswer;
      currentIndex--;
      currentAnswer = answers[currentIndex]?.answer || '';
    }
  }

  async function submitAll() {
    // Save last answer
    answers[currentIndex].answer = currentAnswer;

    // Check all answered
    const unanswered = answers.filter(a => !a.answer.trim());
    if (unanswered.length > 0) {
      error = 'Please answer all questions before submitting.';
      return;
    }

    submitting = true;
    error = '';

    sessionStorage.removeItem('interview_questions');

    try {
      const result = await submitAnswers(sessionId, answers);
      // Store result in sessionStorage for the result page
      sessionStorage.setItem('interview_result', JSON.stringify(result));
      goto(`/interview/result?id=${sessionId}`);
    } catch (err) {
      error = 'Failed to submit answers. Please try again.';
      submitting = false;
    }
  }
</script>

<div class="session-page">
  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Preparing your interview...</p>
    </div>
  {:else}
    <!-- Progress Bar -->
    <div class="progress-section">
      <div class="progress-info">
        <span class="progress-text">Question {currentIndex + 1} of {questions.length}</span>
        <span class="progress-percent">{Math.round(progress)}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: {progress}%"></div>
      </div>
    </div>

    {#if error}
      <div class="error-banner">{error}</div>
    {/if}

    <!-- Question Card -->
    <div class="question-card">
      <div class="question-header">
        <span class="question-topic">{currentQuestion?.category || 'Interview'}</span>
        <span class="question-difficulty" class:diff-easy={currentQuestion?.difficulty === 'easy'} class:diff-medium={currentQuestion?.difficulty === 'medium'} class:diff-hard={currentQuestion?.difficulty === 'hard'}>
          {currentQuestion?.difficulty || 'medium'}
        </span>
      </div>
      <h2 class="question-text">{currentQuestion?.question}</h2>

      <div class="answer-section">
        <label for="answer" class="answer-label">Your Answer</label>
        <textarea
          id="answer"
          bind:value={currentAnswer}
          placeholder="Type your answer here... Be thorough and structured in your response."
          rows="8"
        ></textarea>
        <div class="answer-char-count">{currentAnswer.length} characters</div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="nav-buttons">
      <button
        class="nav-btn prev"
        on:click={prevQuestion}
        disabled={currentIndex === 0}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Previous
      </button>

      <button
        class="nav-btn next"
        on:click={nextQuestion}
        disabled={submitting}
      >
        {#if submitting}
          <span class="btn-spinner"></span>
          Submitting...
        {:else if isLastQuestion}
          Submit Answers
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        {:else}
          Next Question
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        {/if}
      </button>
    </div>

    <!-- Answer review dots -->
    <div class="review-dots">
      {#each questions as q, i}
        <button
          class="dot"
          class:active={i === currentIndex}
          class:answered={answers[i]?.answer?.trim()}
          on:click={() => {
            answers[currentIndex].answer = currentAnswer;
            currentIndex = i;
            currentAnswer = answers[i]?.answer || '';
          }}
          title="Question {i + 1}"
        >
          {i + 1}
        </button>
      {/each}
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

  .error-banner {
    background: #fef2f2;
    color: #b91c1c;
    padding: 0.85rem 1.25rem;
    border-radius: 10px;
    margin-bottom: 1.25rem;
    font-size: 0.9rem;
  }

  .progress-section {
    margin-bottom: 1.5rem;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .progress-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: #475569;
  }

  .progress-percent {
    font-size: 0.875rem;
    font-weight: 600;
    color: #6366f1;
  }

  .progress-bar {
    height: 6px;
    background: #e2e8f0;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #2563eb);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .question-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 1.25rem;
  }

  .question-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .question-topic {
    font-size: 0.8rem;
    font-weight: 600;
    color: #6366f1;
    background: #eef2ff;
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
  }

  .question-difficulty {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.6rem;
    border-radius: 20px;
    text-transform: capitalize;
  }

  .diff-easy { background: #f0fdf4; color: #15803d; }
  .diff-medium { background: #fffbeb; color: #b45309; }
  .diff-hard { background: #fef2f2; color: #b91c1c; }

  .question-text {
    font-size: 1.15rem;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.6;
    margin: 0;
  }

  .answer-section {
    margin-top: 1.5rem;
  }

  .answer-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.6rem;
  }

  textarea {
    width: 100%;
    padding: 1rem;
    border: 1.5px solid #d1d5db;
    border-radius: 12px;
    font-size: 0.9rem;
    color: #111827;
    background: #f9fafb;
    font-family: inherit;
    line-height: 1.6;
    resize: vertical;
    min-height: 160px;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  textarea:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    background: #fff;
  }

  .answer-char-count {
    text-align: right;
    font-size: 0.8rem;
    color: #9ca3af;
    margin-top: 0.35rem;
  }

  .nav-buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
  }

  .nav-btn.prev {
    background: #fff;
    border: 1.5px solid #d1d5db;
    color: #475569;
  }

  .nav-btn.prev:hover:not(:disabled) {
    border-color: #6366f1;
    color: #6366f1;
  }

  .nav-btn.next {
    background: linear-gradient(135deg, #6366f1, #2563eb);
    color: #fff;
    margin-left: auto;
  }

  .nav-btn.next:hover:not(:disabled) {
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
    transform: translateY(-1px);
  }

  .nav-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .btn-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  .review-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .dot {
    width: 36px;
    height: 36px;
    border: 2px solid #e2e8f0;
    border-radius: 50%;
    background: #fff;
    color: #94a3b8;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dot:hover {
    border-color: #6366f1;
    color: #6366f1;
  }

  .dot.active {
    border-color: #6366f1;
    background: #6366f1;
    color: #fff;
  }

  .dot.answered {
    border-color: #22c55e;
    color: #22c55e;
    background: #f0fdf4;
  }

  .dot.active.answered {
    border-color: #6366f1;
    background: #6366f1;
    color: #fff;
  }
</style>