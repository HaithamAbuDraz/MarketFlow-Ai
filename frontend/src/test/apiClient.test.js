import { describe, it, expect, vi, beforeEach } from 'vitest';
import apiClient from '@/services/api';
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';

describe('apiClient Network & Security Guarantees', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('includes Authorization Bearer header when token exists in localStorage', async () => {
    localStorage.setItem('marketflow_token', 'test_sanctum_token_xyz');

    const result = await apiClient('/auth/me');
    expect(result).toHaveProperty('email', 'seller@test.com');
  });

  it('clears token and dispatches unauthorized event on 401 response', async () => {
    localStorage.setItem('marketflow_token', 'expired_token');

    let eventFired = false;
    const listener = () => {
      eventFired = true;
    };
    window.addEventListener('auth:unauthorized', listener);

    await expect(apiClient('/auth/me')).rejects.toThrow();

    expect(localStorage.getItem('marketflow_token')).toBeNull();
    expect(eventFired).toBe(true);

    window.removeEventListener('auth:unauthorized', listener);
  });

  it('normalizes validation errors from Laravel response format', async () => {
    await expect(
      apiClient('/auth/login', {
        method: 'POST',
        data: { email: 'invalid@test.com', password: 'wrong' },
      })
    ).rejects.toThrow('The provided credentials are incorrect.');
  });

  it('does NOT silently activate mock fallback on network failure when VITE_ENABLE_MOCK_API is false', async () => {
    server.use(
      http.post('http://localhost:8000/api/auth/login', () => {
        return HttpResponse.error();
      })
    );

    await expect(
      apiClient('/auth/login', {
        method: 'POST',
        data: { email: 'any@test.com', password: 'password' },
      })
    ).rejects.toThrow();
  });
});
