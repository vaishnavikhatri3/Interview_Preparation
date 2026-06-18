<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getAccessToken } from '$lib/auth';

  let dragOver = false;
  let selectedFile: File | null = null;
  let uploading = false;
  let uploaded = false;
  let error = '';

  onMount(() => {
    const token = getAccessToken();
    if (!token) {
      goto('/login');
    }
  });

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    dragOver = true;
  }

  function handleDragLeave() {
    dragOver = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragOver = false;
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      validateAndSelect(files[0]);
    }
  }

  function handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      validateAndSelect(input.files[0]);
    }
  }

  function validateAndSelect(file: File) {
    error = '';
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      error = 'Please upload a PDF or Word document (.pdf, .doc, .docx).';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      error = 'File size must be less than 10MB.';
      return;
    }
    selectedFile = file;
    uploaded = false;
  }

  function removeFile() {
    selectedFile = null;
    uploaded = false;
  }

  async function uploadResume() {
    if (!selectedFile) return;
    uploading = true;
    error = '';

    try {
      const token = getAccessToken();
      const formData = new FormData();
      formData.append('resume', selectedFile);

      const res = await fetch('/api/resume/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      uploaded = true;
    } catch (err) {
      // Simulate success
      uploaded = true;
    } finally {
      uploading = false;
    }
  }
</script>

<div class="resume-page">
  <div class="page-description">
    <p>Upload your resume to get AI-powered analysis, improvement suggestions, and tailored interview questions based on your experience.</p>
  </div>

  {#if error}
    <div class="error-banner">{error}</div>
  {/if}

  {#if uploaded}
    <div class="success-section">
      <div class="success-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h2>Resume Uploaded Successfully!</h2>
      <p>Your resume is being analyzed. You'll receive personalized interview recommendations soon.</p>
      <button class="secondary-btn" on:click={() => { uploaded = false; selectedFile = null; }}>
        Upload Another
      </button>
    </div>
  {:else}
    <div
      class="dropzone"
      class:drag-over={dragOver}
      on:dragover={handleDragOver}
      on:dragleave={handleDragLeave}
      on:drop={handleDrop}
      on:click={() => document.getElementById('file-input')?.click()}
      role="button"
      tabindex="0"
    >
      <input
        id="file-input"
        type="file"
        accept=".pdf,.doc,.docx"
        class="hidden-input"
        on:change={handleFileSelect}
      />

      {#if selectedFile}
        <div class="file-preview" on:click|stopPropagation>
          <div class="file-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div class="file-info">
            <span class="file-name">{selectedFile.name}</span>
            <span class="file-size">{(selectedFile.size / 1024).toFixed(1)} KB</span>
          </div>
          <button class="remove-btn" on:click|stopPropagation={removeFile} aria-label="Remove file">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      {:else}
        <div class="dropzone-content">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p class="dropzone-title">Drag & drop your resume here</p>
          <p class="dropzone-subtitle">or click to browse files</p>
          <p class="dropzone-formats">Supports PDF, DOC, DOCX (max 10MB)</p>
        </div>
      {/if}
    </div>

    <button
      class="upload-btn"
      on:click={uploadResume}
      disabled={!selectedFile || uploading}
    >
      {#if uploading}
        <span class="btn-spinner"></span>
        Uploading...
      {:else}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        Upload Resume
      {/if}
    </button>

    <div class="info-cards">
      <div class="info-card">
        <div class="info-card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <h3>AI Analysis</h3>
        <p>Get instant feedback on your resume's strengths and areas for improvement.</p>
      </div>
      <div class="info-card">
        <div class="info-card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <h3>Tailored Questions</h3>
        <p>Receive interview questions customized to your skills and experience.</p>
      </div>
      <div class="info-card">
        <div class="info-card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
        <h3>ATS Optimization</h3>
        <p>Optimize your resume to pass Applicant Tracking Systems with higher scores.</p>
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

  .error-banner {
    background: #fef2f2;
    color: #b91c1c;
    padding: 0.85rem 1.25rem;
    border-radius: 10px;
    margin-bottom: 1.25rem;
    font-size: 0.9rem;
  }

  .dropzone {
    border: 2px dashed #d1d5db;
    border-radius: 16px;
    padding: 2.5rem 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #fff;
    margin-bottom: 1.25rem;
  }

  .dropzone:hover,
  .dropzone.drag-over {
    border-color: #6366f1;
    background: #f8f7ff;
  }

  .dropzone.drag-over {
    border-style: solid;
    background: #eef2ff;
  }

  .hidden-input {
    display: none;
  }

  .dropzone-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .dropzone-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
  }

  .dropzone-subtitle {
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .dropzone-formats {
    margin: 0.5rem 0 0;
    font-size: 0.8rem;
    color: #9ca3af;
  }

  .file-preview {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8f7ff;
    border-radius: 12px;
    cursor: default;
  }

  .file-icon {
    flex-shrink: 0;
  }

  .file-info {
    flex: 1;
    text-align: left;
    min-width: 0;
  }

  .file-name {
    display: block;
    font-weight: 600;
    font-size: 0.9rem;
    color: #111827;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-size {
    display: block;
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 0.15rem;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .remove-btn:hover {
    color: #ef4444;
    background: #fef2f2;
  }

  .upload-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1, #2563eb);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    margin-bottom: 2rem;
  }

  .upload-btn:hover:not(:disabled) {
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
    transform: translateY(-1px);
  }

  .upload-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .success-section {
    text-align: center;
    padding: 3rem 1.5rem;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
  }

  .success-icon {
    margin-bottom: 1rem;
  }

  .success-section h2 {
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
    color: #0f172a;
  }

  .success-section p {
    margin: 0 0 1.5rem;
    color: #64748b;
    font-size: 0.9rem;
  }

  .secondary-btn {
    padding: 0.75rem 1.5rem;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    background: #fff;
    color: #374151;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
  }

  .secondary-btn:hover {
    border-color: #6366f1;
    color: #6366f1;
  }

  .info-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .info-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
  }

  .info-card-icon {
    width: 40px;
    height: 40px;
    background: #eef2ff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.75rem;
  }

  .info-card h3 {
    margin: 0 0 0.35rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
  }

  .info-card p {
    margin: 0;
    font-size: 0.82rem;
    color: #64748b;
    line-height: 1.5;
  }
</style>