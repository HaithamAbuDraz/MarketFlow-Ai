/**
 * MarketFlow-AI API Client Wrapper
 * Configured for Laravel Sanctum backend (app/Http/Controllers/Api/AuthController.php)
 * Includes seamless mock fallback for offline frontend testing when Laravel backend is not running.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

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

      let message = result.message || 'Request failed';
      if (result.errors && typeof result.errors === 'object') {
        const firstErrorKey = Object.keys(result.errors)[0];
        if (firstErrorKey && Array.isArray(result.errors[firstErrorKey])) {
          message = result.errors[firstErrorKey][0];
        }
      }

      const error = new Error(message);
      error.status = response.status;
      error.errors = result.errors || {};
      throw error;
    }

    return result;
  } catch (error) {
    // If connection to localhost:8000 failed (backend server offline during frontend dev)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.warn(`[MarketFlow API] Backend offline at ${API_BASE_URL}${endpoint}. Using mock session.`);
      return handleMockFallback(endpoint, method, data);
    }
    throw error;
  }
};

/**
 * Mock simulation of Laravel AuthController endpoints for local testing
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

        case '/auth/forgot-password': {
          const email = (data?.email || '').toLowerCase().trim();
          if (email.includes('notfound') || email.includes('unknown') || email === 'test@test.com') {
            const err = new Error('We could not find an account associated with this email address. Please verify and try again.');
            err.status = 422;
            err.errors = { email: ['We could not find an account associated with this email address. Please verify and try again.'] };
            reject(err);
            break;
          }
          resolve({
            status: 'success',
            message: 'Password reset link sent to your email! (Mock mode)',
            reset_token: 'mock_reset_token_' + Math.random().toString(36).substring(2),
            isMock: true,
          });
          break;
        }

        case '/auth/reset-password':
          resolve({
            status: 'success',
            message: 'Password reset successful! You can now log in. (Mock mode)',
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
            status: 'success',
            message: 'Onboarding step saved successfully (Mock mode)',
            data: data || {},
            isMock: true,
          });
          break;

        case '/auth/logout':
          resolve({ message: 'Logged out successfully' });
          break;

        default:
          reject(new Error(`Endpoint ${endpoint} not implemented in mock mode.`));
      }
    }, 200);
  });
}

export default apiClient;
