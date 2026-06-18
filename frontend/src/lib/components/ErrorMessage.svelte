<script lang="ts">
  export let message: string = '';
  export let onRetry: (() => void) | null = null;
</script>

{#if message}
  <div class="error-banner" role="alert">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
    <span class="error-text">{message}</span>
    {#if onRetry}
      <button class="retry-btn" on:click={onRetry}>Retry</button>
    {/if}
  </div>
{/if}

<style>
  .error-banner {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: #fef2f2;
    color: #b91c1c;
    padding: 0.85rem 1.25rem;
    border-radius: 10px;
    margin-bottom: 1.25rem;
    font-size: 0.9rem;
  }
  .error-text {
    flex: 1;
  }
  .retry-btn {
    padding: 0.35rem 0.75rem;
    border: 1px solid #fca5a5;
    border-radius: 6px;
    background: #fff;
    color: #b91c1c;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
  }
  .retry-btn:hover {
    background: #fef2f2;
  }
</style>
</write_to_file>