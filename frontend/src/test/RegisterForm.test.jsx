import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { RegisterForm } from '@/components/auth/RegisterForm';

describe('RegisterForm Component Tests', () => {
  const defaultFormData = {
    storeName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  };

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <RegisterForm
          formData={defaultFormData}
          setFormData={vi.fn()}
          onSubmit={vi.fn((e) => e.preventDefault())}
          onOpenModal={vi.fn()}
          onGoogleSignUp={vi.fn()}
          {...props}
        />
      </BrowserRouter>
    );
  };

  it('renders all form input fields and signup action', () => {
    renderComponent();

    expect(screen.getByLabelText(/store name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^sign up$/i })).toBeInTheDocument();
  });

  it('displays validation errors passed via props', () => {
    renderComponent({
      fieldErrors: {
        store_name: 'Store name is required.',
        email: 'Invalid email address.',
      },
    });

    expect(screen.getByText('Store name is required.')).toBeInTheDocument();
    expect(screen.getByText('Invalid email address.')).toBeInTheDocument();
  });

  it('handles user typing and invokes setFormData', async () => {
    const setFormData = vi.fn();
    const user = userEvent.setup();

    renderComponent({ setFormData });

    const storeInput = screen.getByLabelText(/store name/i);
    await user.type(storeInput, 'A');

    expect(setFormData).toHaveBeenCalled();
  });
});
