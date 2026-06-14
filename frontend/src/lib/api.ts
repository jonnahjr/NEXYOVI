const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface FetchOptions {
  method?: string;
  body?: any;
  auth?: boolean;
}

let cachedCsrfToken: string | null = null;

async function getCsrfToken() {
  if (cachedCsrfToken) return cachedCsrfToken;
  try {
    const res = await fetch(`${API_BASE}/api/csrf-token`);
    if (res.ok) {
      const data = await res.json();
      cachedCsrfToken = data.token;
      return cachedCsrfToken;
    }
  } catch (err) {
    console.error('Failed to fetch CSRF token:', err);
  }
  return null;
}

function getToken(): string | null {
  return localStorage.getItem('nexyovi_token');
}

function setToken(token: string) {
  localStorage.setItem('nexyovi_token', token);
}

function clearToken() {
  localStorage.removeItem('nexyovi_token');
}

async function request(path: string, options: FetchOptions = {}, nocache = false) {
  const { method = 'GET', body, auth = false } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  // Attach CSRF token for mutating requests
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
    const csrfToken = await getCsrfToken();
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    cache: nocache ? 'no-store' : 'default',
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

// ── Auth ────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  setToken(data.token);
  return data;
}

export async function logout() {
  clearToken();
  await request('/api/auth/logout', { method: 'POST' }).catch(() => {});
}

export async function getMe() {
  const data = await request('/api/auth/me', { auth: true });
  return data.user;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

// ── Data (CRUD) ────────────────────────────────────────────

export async function listAll(entity: string) {
  return request(`/api/data/${entity}?t=${Date.now()}`, {}, true);
}

export async function getById(entity: string, id: string | number) {
  return request(`/api/data/${entity}/${id}`);
}

export async function create(entity: string, data: any) {
  return request(`/api/data/${entity}`, {
    method: 'POST',
    body: data,
    auth: true,
  });
}

export async function update(entity: string, id: string | number, data: any) {
  return request(`/api/data/${entity}/${id}`, {
    method: 'PUT',
    body: data,
    auth: true,
  });
}

export async function remove(entity: string, id: string | number) {
  return request(`/api/data/${entity}/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}
