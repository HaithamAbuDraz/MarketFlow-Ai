import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LoginPage } from '@/pages/auth/LoginPage';

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );
};

describe('LoginPage Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders login inputs and controls correctly', () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument();
  });

  it('validates required email and password fields on submit', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    const submitBtn = screen.getByRole('button', { name: /^login$/i });
    await user.click(submitBtn);

    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
  });

  it('logs in successfully and persists token on valid credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), 'seller@test.com');
    await user.type(screen.getByLabelText(/password/i), 'ValidPass123!');

    const submitBtn = screen.getByRole('button', { name: /^login$/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(localStorage.getItem('marketflow_token')).toBe('valid_sanctum_test_token_123');
    });
  });
});
