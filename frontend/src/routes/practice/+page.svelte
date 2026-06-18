<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getAccessToken } from '$lib/auth';

  interface PracticeQuestion {
    id: string;
    question: string;
    difficulty: string;
    category: string;
  }

  let selectedCategory = '';
  let selectedDifficulty = 'all';
  let questions: PracticeQuestion[] = [];
  let filteredQuestions: PracticeQuestion[] = [];
  let loading = true;
  let error = '';

  const categories = [
    { id: 'DSA', label: 'Data Structures & Algorithms', icon: 'code' },
    { id: 'DBMS', label: 'Database Management Systems', icon: 'database' },
    { id: 'OOP', label: 'Object-Oriented Programming', icon: 'cube' },
    { id: 'OS', label: 'Operating Systems', icon: 'monitor' },
    { id: 'CN', label: 'Computer Networks', icon: 'wifi' },
    { id: 'HR', label: 'HR Questions', icon: 'users' },
    { id: 'Aptitude', label: 'Aptitude', icon: 'brain' },
  ];

  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const questionBank: Record<string, PracticeQuestion[]> = {
    'DSA': [
      { id: 'dsa1', question: 'Explain the difference between an array and a linked list. When would you use each?', difficulty: 'easy', category: 'DSA' },
      { id: 'dsa2', question: 'What is the time complexity of binary search? Explain how it works.', difficulty: 'easy', category: 'DSA' },
      { id: 'dsa3', question: 'How does a hash table work? How do you handle collisions?', difficulty: 'medium', category: 'DSA' },
      { id: 'dsa4', question: 'Design an LRU cache. Discuss the data structures you would use.', difficulty: 'hard', category: 'DSA' },
      { id: 'dsa5', question: 'What is the difference between BFS and DFS? When would you use each?', difficulty: 'medium', category: 'DSA' },
    ],
    'DBMS': [
      { id: 'db1', question: 'Explain the difference between SQL and NoSQL databases.', difficulty: 'easy', category: 'DBMS' },
      { id: 'db2', question: 'What is normalization? Explain the different normal forms.', difficulty: 'medium', category: 'DBMS' },
      { id: 'db3', question: 'What is ACID in database transactions? Explain each property.', difficulty: 'easy', category: 'DBMS' },
      { id: 'db4', question: 'How would you optimize a slow database query?', difficulty: 'hard', category: 'DBMS' },
      { id: 'db5', question: 'What is indexing and how does it work? What are the trade-offs?', difficulty: 'medium', category: 'DBMS' },
    ],
    'OOP': [
      { id: 'oop1', question: 'Explain the four pillars of object-oriented programming.', difficulty: 'easy', category: 'OOP' },
      { id: 'oop2', question: 'What is the difference between composition and inheritance?', difficulty: 'medium', category: 'OOP' },
      { id: 'oop3', question: 'Explain the SOLID principles with examples.', difficulty: 'medium', category: 'OOP' },
      { id: 'oop4', question: 'What is a design pattern? Explain the factory pattern.', difficulty: 'medium', category: 'OOP' },
      { id: 'oop5', question: 'What is polymorphism? Explain compile-time vs runtime polymorphism.', difficulty: 'easy', category: 'OOP' },
    ],
    'OS': [
      { id: 'os1', question: 'Explain the difference between a process and a thread.', difficulty: 'easy', category: 'OS' },
      { id: 'os2', question: 'What is a deadlock? What are the four necessary conditions?', difficulty: 'medium', category: 'OS' },
      { id: 'os3', question: 'Explain virtual memory and paging.', difficulty: 'hard', category: 'OS' },
      { id: 'os4', question: 'What is the difference between preemptive and non-preemptive scheduling?', difficulty: 'medium', category: 'OS' },
      { id: 'os5', question: 'Explain the producer-consumer problem and how semaphores solve it.', difficulty: 'hard', category: 'OS' },
    ],
    'CN': [
      { id: 'cn1', question: 'Explain the OSI model and its seven layers.', difficulty: 'easy', category: 'CN' },
      { id: 'cn2', question: 'What is the difference between TCP and UDP? When would you use each?', difficulty: 'easy', category: 'CN' },
      { id: 'cn3', question: 'How does DNS work? Explain the resolution process.', difficulty: 'medium', category: 'CN' },
      { id: 'cn4', question: 'What is the difference between HTTP and HTTPS? How does SSL/TLS work?', difficulty: 'medium', category: 'CN' },
      { id: 'cn5', question: 'Explain how a load balancer works. What algorithms does it use?', difficulty: 'hard', category: 'CN' },
    ],
    'HR': [
      { id: 'hr1', question: 'Tell me about a time you had a conflict with a teammate. How did you resolve it?', difficulty: 'easy', category: 'HR' },
      { id: 'hr2', question: 'Describe a project you led. What was your approach?', difficulty: 'easy', category: 'HR' },
      { id: 'hr3', question: 'Tell me about a time you failed. What did you learn?', difficulty: 'easy', category: 'HR' },
      { id: 'hr4', question: 'How do you stay updated with the latest technology trends?', difficulty: 'easy', category: 'HR' },
      { id: 'hr5', question: 'Where do you see yourself in 5 years?', difficulty: 'easy', category: 'HR' },
    ],
    'Aptitude': [
      { id: 'apt1', question: 'If a train travels 360 km in 4 hours, what is its speed in m/s?', difficulty: 'easy', category: 'Aptitude' },
      { id: 'apt2', question: 'A bag contains 5 red, 3 blue, and 2 green balls. What is the probability of drawing a blue ball?', difficulty: 'easy', category: 'Aptitude' },
      { id: 'apt3', question: 'If the compound interest on a sum for 2 years at 10% per annum is Rs. 420, what is the principal?', difficulty: 'medium', category: 'Aptitude' },
      { id: 'apt4', question: 'In how many ways can 6 people be seated in a row if 2 particular people must sit together?', difficulty: 'medium', category: 'Aptitude' },
      { id: 'apt5', question: 'A train 225 meters long passes a pole in 9 seconds. How long will it take to pass a platform 150 meters long?', difficulty: 'medium', category: 'Aptitude' },
    ],
  };

  onMount(() => {
    const token = getAccessToken();
    if (!token) goto('/login');
    loading = false;
  });

  function selectCategory(catId: string) {
    selectedCategory = catId;
    filterQuestions();
  }

  function selectDifficulty(d: string) {
    selectedDifficulty = d;
    filterQuestions();
  }

  function filterQuestions() {
    if (!selectedCategory) {
      filteredQuestions = [];
      return;
    }
    let qs = questionBank[selectedCategory] || [];
    if (selectedDifficulty !== 'all') {
      qs = qs.filter(q => q.difficulty === selectedDifficulty);
    }
    filteredQuestions = qs;
  }

  function startPracticeFromCategory() {
    goto(`/interview/start?topic=${encodeURIComponent(categories.find(c => c.id === selectedCategory)?.label || '')}`);
  }

  $: categoryIcon = (catId: string) => {
    const map: Record<string, string> = {
      'DSA': 'code', 'DBMS': 'database', 'OOP': 'cube', 'OS': 'monitor', 'CN': 'wifi', 'HR': 'users', 'Aptitude': 'brain'
    };
    return map[catId] || 'code';
  };
</script>

<div class="practice-page">
  <div class="page-description">
    <p>Browse practice questions by category and difficulty. Select a topic to review questions, then start a full interview session to test your knowledge.</p>
  </div>

  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading questions...</p>
    </div>
  {:else}
    <!-- Category Grid -->
    <h2 class="section-title">Question Categories</h2>
    <div class="category-grid">
      {#each categories as cat}
        <button
          class="category-card"
          class:selected={selectedCategory === cat.id}
          on:click={() => selectCategory(cat.id)}
        >
          <div class="cat-icon" class:cat-dsa={cat.id === 'DSA'} class:cat-dbms={cat.id === 'DBMS'} class:cat-oop={cat.id === 'OOP'} class:cat-os={cat.id === 'OS'} class:cat-cn={cat.id === 'CN'} class:cat-hr={cat.id === 'HR'} class:cat-apt={cat.id === 'Aptitude'}>
            {#if cat.icon === 'code'}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
            {:else if cat.icon === 'database'}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            {:else if cat.icon === 'cube'}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="21 16 8 12 3 16 3 8 8 4 21 8" /><line x1="8" y1="12" x2="8" y2="20" /><line x1="21" y1="8" x2="21" y2="16" />
              </svg>
            {:else if cat.icon === 'monitor'}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            {:else if cat.icon === 'wifi'}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" />
              </svg>
            {:else if cat.icon === 'users'}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            {:else if cat.icon === 'brain'}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a10 10 0 1 0 10 10h-10V2z" /><path d="M12 12 2.93 17.07" /><path d="M12 12 21.07 7.93" />
              </svg>
            {/if}
          </div>
          <span class="cat-label">{cat.label}</span>
          <span class="cat-count">{(questionBank[cat.id] || []).length} questions</span>
        </button>
      {/each}
    </div>

    {#if selectedCategory}
      <!-- Difficulty Filters -->
      <div class="difficulty-filters">
        <span class="filter-label">Filter by difficulty:</span>
        <div class="filter-chips">
          {#each difficulties as d}
            <button
              class="chip"
              class:active={selectedDifficulty === d}
              on:click={() => selectDifficulty(d)}
            >
              {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          {/each}
        </div>
      </div>

      <!-- Questions List -->
      <div class="questions-list">
        <div class="list-header">
          <h3>{categories.find(c => c.id === selectedCategory)?.label} Questions</h3>
          <button class="practice-btn" on:click={startPracticeFromCategory}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Start Practice
          </button>
        </div>

        {#if filteredQuestions.length === 0}
          <p class="no-questions">No questions found for the selected difficulty.</p>
        {:else}
          {#each filteredQuestions as q, i}
            <div class="question-item">
              <div class="q-number">{i + 1}</div>
              <div class="q-content">
                <p class="q-text">{q.question}</p>
                <span class="q-diff" class:diff-easy={q.difficulty === 'easy'} class:diff-medium={q.difficulty === 'medium'} class:diff-hard={q.difficulty === 'hard'}>
                  {q.difficulty}
                </span>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style>
  .page-description { margin-bottom: 1.5rem; }
  .page-description p { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0; }
  .loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 0; color: #64748b; }
  .spinner { width: 36px; height: 36px; border: 3px solid #e2e8f0; border-top: 3px solid #6366f1; border-radius: 50%; animation: spin 0.7s linear infinite; margin-bottom: 1rem; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .section-title { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0 0 1rem; letter-spacing: -0.02em; }
  .category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.85rem; margin-bottom: 1.5rem; }
  .category-card {
    display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
    padding: 1.25rem 1rem; background: #fff; border: 1.5px solid #e2e8f0;
    border-radius: 14px; cursor: pointer; transition: all 0.2s;
    text-align: center; font-family: inherit;
  }
  .category-card:hover { border-color: #6366f1; box-shadow: 0 4px 12px rgba(99,102,241,0.08); }
  .category-card.selected { border-color: #6366f1; background: #f8f7ff; }
  .cat-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
  }
  .cat-dsa { background: #eef2ff; color: #6366f1; }
  .cat-dbms { background: #f0fdf4; color: #22c55e; }
  .cat-oop { background: #fffbeb; color: #f59e0b; }
  .cat-os { background: #fef2f2; color: #ef4444; }
  .cat-cn { background: #eff6ff; color: #3b82f6; }
  .cat-hr { background: #fdf2f8; color: #ec4899; }
  .cat-apt { background: #f5f3ff; color: #8b5cf6; }
  .cat-label { font-size: 0.82rem; font-weight: 600; color: #1e293b; }
  .cat-count { font-size: 0.75rem; color: #94a3b8; }

  .difficulty-filters {
    display: flex; align-items: center; gap: 0.75rem;
    margin-bottom: 1.25rem; flex-wrap: wrap;
  }
  .filter-label { font-size: 0.85rem; font-weight: 500; color: #64748b; }
  .filter-chips { display: flex; gap: 0.5rem; }
  .chip {
    padding: 0.4rem 0.9rem; border: 1.5px solid #e2e8f0;
    border-radius: 20px; background: #fff; color: #475569;
    font-size: 0.8rem; font-weight: 500; cursor: pointer;
    transition: all 0.2s; font-family: inherit;
  }
  .chip:hover { border-color: #6366f1; color: #6366f1; }
  .chip.active { background: #6366f1; color: #fff; border-color: #6366f1; }

  .questions-list { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; }
  .list-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 1.5rem; background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  .list-header h3 { margin: 0; font-size: 1rem; font-weight: 600; color: #0f172a; }
  .practice-btn {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.5rem 1rem; border: none; border-radius: 8px;
    background: #6366f1; color: #fff; font-size: 0.8rem;
    font-weight: 600; cursor: pointer; font-family: inherit;
    transition: background 0.2s;
  }
  .practice-btn:hover { background: #4f46e5; }
  .no-questions { padding: 2rem; text-align: center; color: #94a3b8; font-size: 0.9rem; margin: 0; }
  .question-item {
    display: flex; gap: 1rem; padding: 1rem 1.5rem;
    border-bottom: 1px solid #f1f5f9; align-items: flex-start;
  }
  .question-item:last-child { border-bottom: none; }
  .q-number {
    width: 28px; height: 28px; border-radius: 50%;
    background: #f1f5f9; color: #64748b;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; font-weight: 600; flex-shrink: 0; margin-top: 0.1rem;
  }
  .q-content { flex: 1; min-width: 0; }
  .q-text { margin: 0 0 0.4rem; font-size: 0.88rem; color: #334155; line-height: 1.5; }
  .q-diff { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 12px; font-size: 0.7rem; font-weight: 600; }
  .diff-easy { background: #f0fdf4; color: #15803d; }
  .diff-medium { background: #fffbeb; color: #b45309; }
  .diff-hard { background: #fef2f2; color: #b91c1c; }
</style>