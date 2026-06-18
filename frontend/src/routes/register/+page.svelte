<script lang="ts">
  import { goto } from '$app/navigation';
  import { saveTokens } from '$lib/auth';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';

  async function handleSubmit(event: Event) {
    event.preventDefault();
    error = '';

    if (password !== confirmPassword) {
      error = 'Passwords do not match.';
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const body = await response.json();
      if (!response.ok) {
        error = body.message || 'Registration failed. Try again with a valid email.';
        return;
      }

      saveTokens(body);
      goto('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      error = message || 'Unable to reach the authentication server. Please try again.';
      console.error(err);
    }
  }
</script>

<section>
  <h1>Register</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Email
      <input type="email" bind:value={email} required />
    </label>

    <label>
      Password
      <input type="password" bind:value={password} required minlength="8" />
    </label>

    <label>
      Confirm password
      <input type="password" bind:value={confirmPassword} required minlength="8" />
    </label>

    <button type="submit">Register</button>
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </form>
  <p>
    Already have an account? <a href="/login">Login</a>
  </p>
</section>
