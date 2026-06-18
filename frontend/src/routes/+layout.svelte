<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getAccessToken } from '$lib/auth';
  import { fetchUser, user, isDarkMode } from '$lib/stores';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Topbar from '$lib/components/Topbar.svelte';
  import Toast from '$lib/components/Toast.svelte';

  const authPages = ['/login', '/register'];

  $: isAuthPage = authPages.includes($page.url.pathname);
  $: isDashboardPage = !isAuthPage;

  function getPageTitle(path: string): string {
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/interview/start') return 'Start Interview';
    if (path === '/interview/session') return 'Interview Session';
    if (path === '/interview/history') return 'Interview History';
    if (path === '/interview/result') return 'Interview Results';
    if (path === '/profile') return 'Profile';
    if (path === '/resume') return 'Resume';
    if (path === '/practice') return 'Practice';
    if (path === '/timer') return 'Focus Timer';
    return 'InterviewAce AI';
  }

  $: pageTitle = getPageTitle($page.url.pathname);

  // Apply dark mode class on load
  onMount(async () => {
    if ($isDarkMode) {
      document.documentElement.classList.add('dark');
    }

    const token = getAccessToken();
    if (!token) {
      if (!isAuthPage) {
        goto('/login');
      }
      return;
    }

    const u = await fetchUser();
    if (!u && !isAuthPage) {
      goto('/login');
    }
  });
</script>

<Toast />

{#if isDashboardPage}
  <div class="app-layout">
    <Sidebar />
    <div class="main-area">
      <Topbar>
        <h1 slot="title">{pageTitle}</h1>
      </Topbar>
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
{:else}
  <main class="auth-layout">
    <slot />
  </main>
{/if}

<style>
  :root {
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --bg-card: #ffffff;
    --text-primary: #111827;
    --text-secondary: #475569;
    --text-muted: #64748b;
    --border-color: #e2e8f0;
    --border-light: #f1f5f9;
    --sidebar-bg: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  }

  :root.dark {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-card: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --border-color: #334155;
    --border-light: #1e293b;
  }

  :global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    transition: background 0.3s, color 0.3s;
  }

  .app-layout {
    display: flex;
    min-height: 100vh;
  }

  .main-area {
    flex: 1;
    margin-left: 260px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    width: 100%;
    box-sizing: border-box;
  }

  .auth-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1.5rem;
    background: linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%);
  }

  .auth-layout :global(section) {
    width: min(100%, 420px);
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
    padding: 2rem;
    border: 1px solid rgba(148, 163, 184, 0.15);
  }

  .auth-layout :global(h1) {
    margin: 0 0 1.5rem;
    font-size: clamp(1.75rem, 2.4vw, 2.5rem);
    letter-spacing: -0.03em;
    color: #0f172a;
  }

  .auth-layout :global(form) { display: grid; gap: 1rem; }
  .auth-layout :global(label) { display: block; margin-bottom: 0.25rem; font-size: 0.95rem; color: #475569; }
  .auth-layout :global(input) {
    width: 100%; padding: 0.95rem 1rem; margin-top: 0.5rem;
    border: 1px solid #cbd5e1; border-radius: 14px;
    background: #f8fafc; font-size: 1rem; color: #0f172a; box-sizing: border-box;
  }
  .auth-layout :global(button) {
    width: 100%; padding: 1rem; margin-top: 1rem; border: none; border-radius: 14px;
    background: #2563eb; color: #fff; font-weight: 700; cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .auth-layout :global(button:hover) { background: #1d4ed8; }
  .auth-layout :global(p.error) { margin: 0.85rem 0 0; color: #b91c1c; font-size: 0.95rem; }
  .auth-layout :global(p) { margin: 1.25rem 0 0; color: #475569; }
  .auth-layout :global(a) { color: #2563eb; text-decoration: none; }
  .auth-layout :global(a:hover) { text-decoration: underline; }

  @media (max-width: 768px) {
    .main-area { margin-left: 0; }
    .content { padding: 1rem; }
  }
</style>