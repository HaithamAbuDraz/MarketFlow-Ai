import { apiClient } from './api';

export const authService = {
  /**
   * Login with Laravel API
   * POST /api/auth/login
   */
  async login(email, password) {
    return await apiClient('/auth/login', {
      method: 'POST',
      data: { email, password },
    });
  },

  /**
   * Register with Laravel API
   * POST /api/auth/register
   */
  async register(storeName, email, password, passwordConfirmation) {
    return await apiClient('/auth/register', {
      method: 'POST',
      data: {
        store_name: storeName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    });
  },

  /**
   * Get authenticated user profile
   * GET /api/auth/me
   */
  async getCurrentUser() {
    return await apiClient('/auth/me');
  },

  /**
   * Logout user and revoke Sanctum token
   * POST /api/auth/logout
   */
  async logout() {
    try {
      await apiClient('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.warn('Logout warning:', err.message);
    } finally {
      localStorage.removeItem('marketflow_token');
      localStorage.removeItem('marketflow_user');
    }
  },

  /**
   * Request password reset link
   * POST /api/auth/forgot-password
   */
  async forgotPassword(email) {
    return await apiClient('/auth/forgot-password', {
      method: 'POST',
      data: { email },
    });
  },

  /**
   * Reset password with token
   * POST /api/auth/reset-password
   */
  async resetPassword(token, email, password, passwordConfirmation) {
    return await apiClient('/auth/reset-password', {
      method: 'POST',
      data: {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    });
  },
};

export default authService;
