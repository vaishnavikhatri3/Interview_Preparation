<script lang="ts">
  export let title: string = 'No data found';
  export let description: string = '';
  export let actionLabel: string = '';
  export let actionIcon: string = '';
  export let onAction: (() => void) | null = null;
</script>

<div class="empty-state">
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
  <h3>{title}</h3>
  {#if description}
    <p>{description}</p>
  {/if}
  {#if actionLabel && onAction}
    <button class="action-btn" on:click={onAction}>
      {#if actionIcon === 'plus'}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      {:else if actionIcon === 'play'}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      {:else if actionIcon === 'upload'}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      {/if}
      {actionLabel}
    </button>
  {/if}
</div>

<style>
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
  h3 {
    margin: 1rem 0 0.5rem;
    color: #0f172a;
    font-size: 1.1rem;
  }
  p {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0 0 1.25rem;
    max-width: 320px;
  }
  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 10px;
    background: #6366f1;
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
  }
  .action-btn:hover {
    background: #4f46e5;
  }
</style>
</write_to_file>