export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  access_token?: string;
  refresh_token?: string;
}

const ACCESS_TOKEN_KEY = 'interviewaceai_access_token';
const REFRESH_TOKEN_KEY = 'interviewaceai_refresh_token';

export function saveTokens(tokens: AuthResponse) {
  const accessToken = tokens.accessToken || tokens.access_token;
  const refreshToken = tokens.refreshToken || tokens.refresh_token;

  if (!accessToken || !refreshToken) {
    throw new Error('Invalid auth response: missing token values');
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function isAuthenticated() {
  return !!getAccessToken();
}
