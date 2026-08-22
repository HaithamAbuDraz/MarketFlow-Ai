/**
 * MarketFlow-AI API Client Wrapper
 * Configured for Laravel Sanctum backend (app/Http/Controllers/Api/AuthController.php)
 *
 * Mock fallback is DISABLED by default.
 * To enable during development only, set in your .env:
 *   VITE_ENABLE_MOCK_API=true
 *
 * SECURITY NOTE: Mock mode must NEVER activate automatically in production.
 * A backend outage must surface as a real error — not a silent fake success.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Mock mode is ONLY permitted when:
 *  1. Vite is running in development mode (import.meta.env.DEV), AND
 *  2. The explicit opt-in flag VITE_ENABLE_MOCK_API=true is set.
 *
 * This means production builds can never silently fall through to mocks,
 * even if the backend is unreachable.
 */
const MOCK_ENABLED = import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCK_API === 'true';

export const apiClient = async (endpoint, { method = 'GET', data = null, headers = {} } = {}) => {
  const token = localStorage.getItem('marketflow_token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const config = {
    method,
    headers: defaultHeaders,
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401 && token) {
        localStorage.removeItem('marketflow_token');
        localStorage.removeItem('marketflow_user');
        window.dispatchEvent(new Event('auth:unauthorized'));
      }

      let message = result.message;
      if (!message && result.error) {
        message = typeof result.error === 'string' ? result.error : result.error.message;
      }
      if (result.errors && typeof result.errors === 'object') {
        const firstErrorKey = Object.keys(result.errors)[0];
        if (firstErrorKey) {
          const firstVal = result.errors[firstErrorKey];
          const extracted = Array.isArray(firstVal) ? firstVal[0] : firstVal;
          if (extracted && typeof extracted === 'string') {
            message = extracted;
          }
        }
      }

      if (!message) {
        message = response.statusText || 'An unexpected error occurred. Please try again.';
      }

      const error = new Error(message);
      error.status = response.status;
      error.errors = result.errors || {};
      error.raw = result;
      throw error;
    }

    return result;
  } catch (error) {
    // Only use mock fallback if explicitly enabled for development.
    // A fetch TypeError (network/connection error) in production must
    // propagate as a real error so users see "backend unavailable".
    if (
      error.name === 'TypeError' &&
      error.message.toLowerCase().includes('fetch') &&
      MOCK_ENABLED
    ) {
      console.warn(
        `[MarketFlow API] Mock mode active. Backend offline at ${API_BASE_URL}${endpoint}.`
      );
      return handleMockFallback(endpoint, method, data);
    }

    throw error;
  }
};

/**
 * Mock simulation of Laravel AuthController endpoints.
 *
 * ONLY reachable when VITE_ENABLE_MOCK_API=true in a DEV build.
 * This function must never be called in production.
 */
function handleMockFallback(endpoint, method, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (endpoint) {
        case '/auth/login': {
          const email = data?.email || 'merchant@marketflow.ai';
          resolve({
            user: {
              id: 1,
              store_name: 'Apex Horizon Store',
              email,
              role: 'seller',
              created_at: new Date().toISOString(),
            },
            token: `mock_sanctum_token_${Math.random().toString(36).substring(2)}`,
            isMock: true,
            message: 'Authenticated (Mock mode: Laravel backend offline)',
          });
          break;
        }

        case '/auth/register': {
          const storeName = data?.store_name || 'My Store';
          const email = data?.email || 'merchant@marketflow.ai';
          resolve({
            user: {
              id: Math.floor(Math.random() * 1000) + 1,
              store_name: storeName,
              email,
              role: 'seller',
              created_at: new Date().toISOString(),
            },
            store: {
              id: 1,
              name: storeName,
              slug: `${storeName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`,
              status: 'pending',
            },
            token: `mock_sanctum_token_${Math.random().toString(36).substring(2)}`,
            isMock: true,
            message: `Account created for "${storeName}"!`,
          });
          break;
        }

        case '/auth/forgot-password':
          // Generic response — does not reveal user existence (matching backend behaviour).
          resolve({
            message: 'If an account exists for this email, a reset link has been sent. (Mock mode)',
            isMock: true,
          });
          break;

        case '/auth/reset-password':
          resolve({
            message: 'Your password has been reset successfully. Please log in. (Mock mode)',
            isMock: true,
          });
          break;

        case '/auth/me': {
          const cachedUser = localStorage.getItem('marketflow_user');
          resolve(
            cachedUser
              ? JSON.parse(cachedUser)
              : {
                  id: 1,
                  store_name: 'Apex Horizon Store',
                  email: 'merchant@marketflow.ai',
                  role: 'seller',
                }
          );
          break;
        }

        case '/onboarding/setup':
        case '/onboarding/business-info':
        case '/onboarding/preferences':
        case '/onboarding/complete':
          resolve({
            message: 'Onboarding step saved successfully (Mock mode)',
            data: data || {},
            isMock: true,
          });
          break;

        case '/auth/logout':
          resolve({ message: 'Logged out successfully' });
          break;

        default:
          reject(new Error(`Endpoint ${endpoint} not available. Backend is offline.`));
      }
    }, 200);
  });
}

export default apiClient;
