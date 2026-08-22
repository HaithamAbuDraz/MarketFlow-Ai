import { http, HttpResponse } from 'msw';

export const handlers = [
  // Auth login mock handler
  http.post('http://localhost:8000/api/auth/login', async ({ request }) => {
    const body = await request.json();
    if (body.email === 'invalid@test.com' || body.password === 'wrong') {
      return HttpResponse.json(
        {
          status: 'error',
          message: 'The provided credentials are incorrect.',
          errors: { email: ['The provided credentials are incorrect.'] },
        },
        { status: 422 }
      );
    }

    return HttpResponse.json({
      user: {
        id: 1,
        name: 'Test Seller',
        email: body.email,
        role: 'seller',
        store_name: 'Test Store',
      },
      token: 'valid_sanctum_test_token_123',
    });
  }),

  // Auth register mock handler
  http.post('http://localhost:8000/api/auth/register', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        user: {
          id: 2,
          name: body.store_name,
          email: body.email,
          role: 'seller',
          store_name: body.store_name,
        },
        store: {
          id: 1,
          name: body.store_name,
          slug: 'test-store',
          status: 'pending',
        },
        token: 'registered_sanctum_test_token_456',
        message: 'Account created successfully. Proceed to onboarding.',
      },
      { status: 201 }
    );
  }),

  // Auth me mock handler
  http.get('http://localhost:8000/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.includes('Bearer')) {
      return HttpResponse.json(
        { status: 'error', message: 'Unauthenticated. Please log in to continue.' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      id: 1,
      name: 'Test Seller',
      email: 'seller@test.com',
      role: 'seller',
      store: { id: 1, name: 'Test Store', slug: 'test-store' },
    });
  }),
];
