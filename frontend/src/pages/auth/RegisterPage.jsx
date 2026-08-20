import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { HeroBanner } from '@/components/hero';
import {
  RegisterForm,
  EmailVerificationStep,
  AccountReadyStep,
  TermsModal,
} from '@/components/auth';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Registration flow step: 'FORM' | 'VERIFY_EMAIL' | 'ACCOUNT_READY'
  const [step, setStep] = useState('FORM');

  const [formData, setFormData] = useState({
    storeName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '' });

  // Countdown timer for email resend
  const [resendTimer, setResendTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval = null;
    if (step === 'VERIFY_EMAIL' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, resendTimer]);

  const validateClientSide = () => {
    const errors = {};
    if (!formData.storeName.trim()) {
      errors.store_name = 'Please enter your store name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.password) {
      errors.password = 'Please create a password.';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.agreeTerms) {
      errors.agreeTerms = 'Please accept the Terms & Conditions and Privacy Policy.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const clientErrors = validateClientSide();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setError(Object.values(clientErrors)[0]);
      return;
    }

    try {
      setIsSubmitting(true);
      await register(
        formData.storeName,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      setStep('VERIFY_EMAIL');
      setResendTimer(59);
      setCanResend(false);
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your information.');
      if (err.errors) {
        setFieldErrors(err.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendEmail = () => {
    if (!canResend) return;
    setResendTimer(59);
    setCanResend(false);
  };

  const handleStartOnboarding = () => {
    const cleanStoreName = formData.storeName.trim();
    const cleanSlug = cleanStoreName.toLowerCase().replace(/[^a-z0-9]/g, '');

    const freshDraft = {
      step: 1,
      data: {
        storeName: cleanStoreName,
        storeSlug: cleanSlug,
        isSlugManual: false,
        storeLogo: null,
        storeLogoFile: null,
        theme: 'modern',
        businessCategory: '',
        businessDescription: '',
        businessType: '',
        targetAudience: '',
        language: 'en-US',
        currency: 'USD',
        timeZone: 'UTC+03:00',
        unitSystem: 'metric-dmy',
        userEmail: formData.email,
      },
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('marketflow_onboarding_draft', JSON.stringify(freshDraft));
    navigate('/onboarding', {
      state: {
        newRegistration: true,
        storeName: cleanStoreName,
        email: formData.email,
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-[#060c1c]">
      {/* Left Column: Figma 3D Hero Banner */}
      <HeroBanner />

      {/* Right Column: Dynamic Form Container */}
      <div className="flex-1 lg:flex-[0.95] flex items-center justify-center bg-[#f8f8fb] dark:bg-[#070d1e] p-3 sm:p-5 lg:p-6 h-full overflow-y-auto no-scrollbar transition-colors duration-200">
        {step === 'FORM' && (
          <RegisterForm
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
            error={error}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onOpenModal={(title) => setModalConfig({ isOpen: true, title })}
            onGoogleSignUp={() => setStep('VERIFY_EMAIL')}
          />
        )}

        {step === 'VERIFY_EMAIL' && (
          <EmailVerificationStep
            email={formData.email}
            resendTimer={resendTimer}
            canResend={canResend}
            onResendEmail={handleResendEmail}
            onUseDifferentEmail={() => setStep('FORM')}
            onContinue={() => setStep('ACCOUNT_READY')}
          />
        )}

        {step === 'ACCOUNT_READY' && (
          <AccountReadyStep
            storeName={formData.storeName}
            email={formData.email}
            onSetupStore={handleStartOnboarding}
          />
        )}
      </div>

      {/* Terms & Privacy Modal */}
      <TermsModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        onClose={() => setModalConfig({ isOpen: false, title: '' })}
      />
    </div>
  );
};

export default RegisterPage;
