<script lang="ts">
  import { page } from '$app/stores';
  import { isSidebarOpen } from '$lib/stores';
  import { clearTokens } from '$lib/auth';
  import { goto } from '$app/navigation';

  let navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: 'grid' },
    { href: '/interview/start', label: 'Start Interview', icon: 'play' },
    { href: '/interview/history', label: 'History', icon: 'clock' },
    { href: '/practice', label: 'Practice', icon: 'book' },
    { href: '/timer', label: 'Focus Timer', icon: 'timer' },
    { href: '/resume', label: 'Resume', icon: 'file' },
    { href: '/profile', label: 'Profile', icon: 'user' },
  ];

  function isActive(href: string): boolean {
    return $page.url.pathname === href;
  }

  function signOut() {
    clearTokens();
    goto('/login');
  }

  function closeSidebar() {
    isSidebarOpen.set(false);
  }

  function handleOverlayKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeSidebar();
    }
  }
</script>

<nav class="sidebar" class:open={$isSidebarOpen}>
  <div class="sidebar-header">
    <div class="logo">
      <span class="logo-icon">AI</span>
      <span class="logo-text">InterviewAce</span>
    </div>
    <button class="close-btn" on:click={closeSidebar} aria-label="Close sidebar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>

  <div class="nav-items">
    {#each navItems as item}
      <a
        href={item.href}
        class="nav-item"
        class:active={isActive(item.href)}
        on:click={closeSidebar}
      >
        <span class="nav-icon">
          {#if item.icon === 'grid'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
          {:else if item.icon === 'play'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          {:else if item.icon === 'clock'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          {:else if item.icon === 'book'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          {:else if item.icon === 'file'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          {:else if item.icon === 'timer'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /><line x1="22" y1="3" x2="19" y2="6" /><line x1="22" y1="3" x2="16" y2="3" />
            </svg>
          {:else if item.icon === 'user'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          {/if}
        </span>
        <span class="nav-label">{item.label}</span>
      </a>
    {/each}
  </div>

  <div class="sidebar-footer">
    <button class="logout-btn" on:click={signOut}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      <span>Logout</span>
    </button>
  </div>
</nav>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $isSidebarOpen}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="overlay" on:click={closeSidebar} on:keydown={handleOverlayKeydown} role="presentation" />
{/if}

<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 260px;
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
    color: #e2e8f0;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    transform: translateX(0);
    transition: transform 0.3s ease;
  }
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.25rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #6366f1, #2563eb);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.85rem; color: #fff;
  }
  .logo-text {
    font-size: 1.15rem; font-weight: 700; color: #fff;
    letter-spacing: -0.02em;
  }
  .close-btn {
    display: none; background: none; border: none;
    color: #94a3b8; cursor: pointer; padding: 0.25rem;
  }
  .nav-items {
    flex: 1; padding: 1rem 0.75rem;
    display: flex; flex-direction: column; gap: 0.25rem; overflow-y: auto;
  }
  .nav-item {
    display: flex; align-items: center; gap: 0.85rem;
    padding: 0.75rem 1rem; border-radius: 10px;
    color: #94a3b8; text-decoration: none;
    font-size: 0.925rem; font-weight: 500;
    transition: all 0.2s ease;
  }
  .nav-item:hover { background: rgba(255,255,255,0.06); color: #e2e8f0; }
  .nav-item.active { background: rgba(99,102,241,0.15); color: #818cf8; }
  .nav-icon { display: flex; align-items: center; flex-shrink: 0; }
  .sidebar-footer {
    padding: 1rem 0.75rem;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .logout-btn {
    display: flex; align-items: center; gap: 0.85rem;
    width: 100%; padding: 0.75rem 1rem; border: none; border-radius: 10px;
    background: transparent; color: #94a3b8; font-size: 0.925rem;
    font-weight: 500; cursor: pointer; transition: all 0.2s ease;
    font-family: inherit;
  }
  .logout-btn:hover { background: rgba(239,68,68,0.1); color: #f87171; }
  .overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.4); z-index: 999;
  }
  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .close-btn { display: block; }
    .overlay { display: block; }
  }
</style>