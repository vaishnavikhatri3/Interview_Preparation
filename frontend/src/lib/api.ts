import { getAccessToken, clearTokens } from './auth';

const API_BASE = import.meta.env.PUBLIC_API_URL || '/api';

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  formData?: FormData;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, formData } = options;

  const token = getAccessToken();
  const requestHeaders: Record<string, string> = {
    ...headers,
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData; browser sets it with boundary
  if (formData) {
    // FormData - don't set Content-Type
  } else if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const fetchOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (formData) {
    fetchOptions.body = formData;
  } else if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, fetchOptions);

  if (res.status === 401) {
    clearTokens();
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
      window.location.href = '/login';
    }
    throw new ApiError('Unauthorized', 401);
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return {} as T;
  }

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(data.message || data.error || 'Request failed', res.status);
  }

  return data as T;
}

// Auth API
export const authApi = {
  register: (email: string, password: string) =>
    request<{ access_token: string; refresh_token: string }>('/auth/register', {
      method: 'POST',
      body: { email, password },
    }),
  login: (email: string, password: string) =>
    request<{ access_token: string; refresh_token: string }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),
  refresh: (refreshToken: string) =>
    request<{ access_token: string; refresh_token: string }>('/auth/refresh', {
      method: 'POST',
      body: { refresh_token: refreshToken },
    }),
  me: () =>
    request<{ userId: string; email?: string; name?: string }>('/auth/me'),
};

// Interviews API (backend not ready - these will fall through to dummy data in interview.ts)
export const interviewsApi = {
  start: (topic: string, difficulty: string, questionCount: number) =>
    request<{ id: string; questions: any[] }>('/interviews', {
      method: 'POST',
      body: { topic, difficulty, questionCount },
    }),
  list: () =>
    request<any[]>('/interviews'),
  getResult: (id: string) =>
    request<any>(`/interviews/${id}/result`),
  submit: (id: string, answers: { questionId: string; answer: string }[]) =>
    request<any>(`/interviews/${id}/submit`, {
      method: 'POST',
      body: { answers },
    }),
};

// Resume API
export const resumeApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);
    return request<{ id: string; score?: number; feedback?: string }>('/resume/upload', {
      method: 'POST',
      formData,
    });
  },
  getAnalysis: (id: string) =>
    request<any>(`/resume/${id}`),
};

// Profile API
export const profileApi = {
  update: (data: { name?: string; bio?: string }) =>
    request<any>('/auth/profile', {
      method: 'PUT',
      body: data,
    }),
};