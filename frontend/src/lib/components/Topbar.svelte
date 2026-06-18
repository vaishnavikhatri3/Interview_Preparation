<script lang="ts">
  import { isSidebarOpen, user, isDarkMode, levelInfo } from '$lib/stores';

  function toggleSidebar() {
    isSidebarOpen.update(v => !v);
  }

  function toggleDarkMode() {
    isDarkMode.toggle();
  }

  $: initials = ($user?.email ? $user.email.charAt(0).toUpperCase() : 'U');
</script>

<header class="topbar">
  <div class="topbar-left">
    <button class="hamburger" on:click={toggleSidebar} aria-label="Toggle sidebar">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
    <div class="page-title">
      <slot name="title" />
    </div>
  </div>

  <div class="topbar-right">
    <!-- Dark Mode Toggle -->
    <button class="icon-btn" on:click={toggleDarkMode} title="Toggle dark mode">
      {#if $isDarkMode}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      {:else}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      {/if}
    </button>

    <!-- Level Badge -->
    <div class="level-badge" title="Level {$levelInfo.level} - {$levelInfo.title}">
      <span class="level-num">{$levelInfo.level}</span>
    </div>

    <!-- User Badge -->
    <div class="user-badge" title={$user?.email || 'User'}>
      <span class="avatar">{initials}</span>
      <span class="user-email">{$user?.email?.split('@')[0] || 'User'}</span>
    </div>
  </div>
</header>

<style>
  .topbar {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 68px;
    background: rgba(255,255,255,0.8); backdrop-filter: blur(12px);
    border-bottom: 1px solid #e2e8f0;
  }
  .topbar-left { display: flex; align-items: center; gap: 1rem; }
  .hamburger {
    display: none; background: none; border: none;
    color: #475569; cursor: pointer; padding: 0.25rem; border-radius: 6px;
  }
  .hamburger:hover { background: #f1f5f9; }
  .page-title :global(h1) { margin: 0; font-size: 1.35rem; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; }
  .topbar-right { display: flex; align-items: center; gap: 0.75rem; }

  .icon-btn {
    width: 36px; height: 36px; border: none; border-radius: 8px;
    background: transparent; color: #64748b; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .icon-btn:hover { background: #f1f5f9; color: #6366f1; }

  .level-badge {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #2563eb);
    display: flex; align-items: center; justify-content: center;
    cursor: default;
  }
  .level-num { color: #fff; font-size: 0.75rem; font-weight: 800; }

  .user-badge {
    display: flex; align-items: center; gap: 0.65rem;
    padding: 0.4rem 0.75rem 0.4rem 0.4rem;
    background: #f1f5f9; border-radius: 30px; cursor: default;
  }
  .avatar {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, #6366f1, #2563eb);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    color: #fff; font-weight: 600; font-size: 0.85rem;
  }
  .user-email { font-size: 0.875rem; color: #475569; font-weight: 500; }

  @media (max-width: 768px) {
    .topbar { padding: 0 1rem; }
    .hamburger { display: block; }
    .user-email { display: none; }
  }
</style>