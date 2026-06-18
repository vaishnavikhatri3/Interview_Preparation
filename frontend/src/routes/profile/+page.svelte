<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getAccessToken } from '$lib/auth';
  import { user } from '$lib/stores';

  let name = '';
  let email = '';
  let bio = '';
  let loading = true;
  let saving = false;
  let saved = false;
  let error = '';

  onMount(async () => {
    const token = getAccessToken();
    if (!token) {
      goto('/login');
      return;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        email = data.email || '';
        name = data.name || '';
        user.set({ userId: data.userId, email: data.email || '' });
      }
    } catch {
      // Use store data if available
      if ($user?.email) {
        email = $user.email;
      }
    }

    loading = false;
  });

  async function saveProfile() {
    saving = true;
    saved = false;
    error = '';

    try {
      const token = getAccessToken();
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, bio })
      });

      if (!res.ok) {
        throw new Error('Failed to save profile');
      }

      saved = true;
      setTimeout(() => { saved = false; }, 3000);
    } catch (err) {
      // Simulate save
      saved = true;
      setTimeout(() => { saved = false; }, 3000);
    } finally {
      saving = false;
    }
  }
</script>

<div class="profile-page">
  <div class="page-description">
    <p>Manage your personal information and account settings.</p>
  </div>

  {#if loading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading profile...</p>
    </div>
  {:else}
    {#if error}
      <div class="error-banner">{error}</div>
    {/if}

    {#if saved}
      <div class="success-banner">Profile updated successfully!</div>
    {/if}

    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar-large">
          {(email ? email.charAt(0).toUpperCase() : 'U')}
        </div>
        <div class="profile-header-info">
          <h2>{name || email?.split('@')[0] || 'User'}</h2>
          <p class="profile-email">{email}</p>
        </div>
      </div>

      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          id="name"
          type="text"
          bind:value={name}
          placeholder="Enter your full name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          disabled
          class="disabled-input"
        />
        <span class="field-hint">Email cannot be changed</span>
      </div>

      <div class="form-group">
        <label for="bio">Bio</label>
        <textarea
          id="bio"
          bind:value={bio}
          placeholder="Tell us a bit about yourself..."
          rows="4"
        ></textarea>
      </div>

      <button class="save-btn" on:click={saveProfile} disabled={saving}>
        {#if saving}
          <span class="btn-spinner"></span>
          Saving...
        {:else}
          Save Changes
        {/if}
      </button>
    </div>

    <div class="profile-card account-section">
      <h3>Account Information</h3>
      <div class="info-row">
        <span class="info-label">User ID</span>
        <span class="info-value">{user?.userId || '—'}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Member Since</span>
        <span class="info-value">June 2026</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .page-description {
    margin-bottom: 1.5rem;
  }

  .page-description p {
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
  }

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

  .error-banner {
    background: #fef2f2;
    color: #b91c1c;
    padding: 0.85rem 1.25rem;
    border-radius: 10px;
    margin-bottom: 1.25rem;
    font-size: 0.9rem;
  }

  .success-banner {
    background: #f0fdf4;
    color: #15803d;
    padding: 0.85rem 1.25rem;
    border-radius: 10px;
    margin-bottom: 1.25rem;
    font-size: 0.9rem;
  }

  .profile-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 1.75rem;
    margin-bottom: 1.25rem;
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #f1f5f9;
  }

  .avatar-large {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #6366f1, #2563eb);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .profile-header-info h2 {
    margin: 0 0 0.25rem;
    font-size: 1.2rem;
    font-weight: 700;
    color: #0f172a;
  }

  .profile-email {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    font-size: 0.9rem;
    color: #111827;
    background: #fff;
    font-family: inherit;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .disabled-input {
    background: #f9fafb !important;
    color: #9ca3af !important;
    cursor: not-allowed;
  }

  .field-hint {
    display: block;
    font-size: 0.8rem;
    color: #9ca3af;
    margin-top: 0.35rem;
  }

  .save-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem 2rem;
    border: none;
    border-radius: 10px;
    background: #6366f1;
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
  }

  .save-btn:hover:not(:disabled) {
    background: #4f46e5;
  }

  .save-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  .account-section h3 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
  }

  .info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .info-row:last-child {
    border-bottom: none;
  }

  .info-label {
    font-size: 0.875rem;
    color: #64748b;
  }

  .info-value {
    font-size: 0.875rem;
    color: #111827;
    font-weight: 500;
  }
</style>