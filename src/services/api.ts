import axios from 'axios';

/**
 * Base API client for the UrbanPulse Mysuru backend.
 *
 * The backend endpoints are prepared for integration with the team's
 * Node.js + PostgreSQL server. During frontend development we fall back
 * to sample data, so all service methods handle both live and simulated
 * responses gracefully.
 *
 * Endpoints (to be provided by the team):
 *   GET  /api/traffic
 *   GET  /api/environment
 *   GET  /api/issues
 *   POST /api/issues
 *   PUT  /api/issues/:id
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Traffic ──────────────────────────────────────────────────────────
export async function fetchTraffic() {
  const { data } = await api.get('/traffic');
  return data;
}

// ── Environment ──────────────────────────────────────────────────────
export async function fetchEnvironment() {
  const { data } = await api.get('/environment');
  return data;
}

// ── Issues ───────────────────────────────────────────────────────────
export async function fetchIssues() {
  const { data } = await api.get('/issues');
  return data;
}

export type CreateIssuePayload = {
  title: string;
  description: string;
  category: string;
  location: string;
  lat: number;
  lng: number;
  priority: string;
};

export async function createIssue(payload: CreateIssuePayload) {
  const { data } = await api.post('/issues', payload);
  return data;
}

export type UpdateIssuePayload = {
  status?: string;
  priority?: string;
};

export async function updateIssue(id: string, payload: UpdateIssuePayload) {
  const { data } = await api.put(`/issues/${id}`, payload);
  return data;
}

export default api;
