<script lang="ts">
  import { toast, type ToastType } from '$lib/stores';

  function dismiss(id: string) {
    toast.dismiss(id);
  }

  function icon(type: ToastType): string {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
    }
  }
</script>

<div class="toast-container">
  {#each $toast as t (t.id)}
    <div class="toast toast-{t.type}" role="alert">
      <span class="toast-icon">{icon(t.type)}</span>
      <span class="toast-message">{t.message}</span>
      <button class="toast-close" on:click={() => dismiss(t.id)} aria-label="Dismiss">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 400px;
    pointer-events: none;
  }
  .toast {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.85rem 1rem;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    animation: slideIn 0.3s ease;
    pointer-events: auto;
    font-size: 0.9rem;
    color: #fff;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(100%); }
    to { opacity: 1; transform: translateX(0); }
  }
  .toast-success { background: #059669; }
  .toast-error { background: #dc2626; }
  .toast-warning { background: #d97706; }
  .toast-info { background: #2563eb; }
  .toast-icon { font-size: 1.1rem; font-weight: 700; flex-shrink: 0; }
  .toast-message { flex: 1; line-height: 1.4; }
  .toast-close {
    background: none; border: none; color: rgba(255,255,255,0.7);
    cursor: pointer; padding: 0.15rem; flex-shrink: 0; border-radius: 4px;
  }
  .toast-close:hover { color: #fff; background: rgba(255,255,255,0.1); }
</style>
