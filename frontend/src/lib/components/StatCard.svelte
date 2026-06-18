<script lang="ts">
  export let icon: string = 'chart';
  export let label: string = '';
  export let value: string | number = '';
  export let color: string = 'indigo';
  export let children: string = '';

  const colorMap: Record<string, { bg: string; icon: string }> = {
    indigo: { bg: '#eef2ff', icon: '#6366f1' },
    green: { bg: '#f0fdf4', icon: '#22c55e' },
    amber: { bg: '#fffbeb', icon: '#f59e0b' },
    red: { bg: '#fef2f2', icon: '#ef4444' },
    blue: { bg: '#eff6ff', icon: '#3b82f6' },
  };

  $: colors = colorMap[color] || colorMap.indigo;
</script>

<div class="stat-card">
  <div class="stat-icon" style="background: {colors.bg}; color: {colors.icon};">
    {#if icon === 'edit'}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    {:else if icon === 'chart'}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    {:else if icon === 'star'}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    {:else if icon === 'alert'}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    {:else if icon === 'users'}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    {:else}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    {/if}
  </div>
  <div class="stat-content">
    <span class="stat-label">{label}</span>
    <span class="stat-value">{value}</span>
    {#if children}
      <div class="stat-children">{@html children}</div>
    {/if}
  </div>
</div>

<style>
  .stat-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .stat-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
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
  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
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
  .stat-children {
    margin-top: 0.15rem;
  }
</style>
</write_to_file>