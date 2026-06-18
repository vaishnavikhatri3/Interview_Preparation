<script lang="ts">
  export let message: string = 'Loading...';
</script>

<div class="loading-state">
  <div class="spinner"></div>
  <p>{message}</p>
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
  p {
    margin: 0;
    font-size: 0.9rem;
  }
</style>
</write_to_file>