import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/services/api';
import {
  OnboardingHeader,
  OnboardingStepper,
  SaveExitModal,
  AIAssistantWidget,
  Step1Welcome,
  Step2StoreSetup,
  Step3BusinessInfo,
  Step4Preferences,
  Step5Ready,
} from '@/components/onboarding';

const STORAGE_KEY = 'marketflow_onboarding_draft';

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Determine initial store name from location.state or current user
  const initialStoreName =
    location.state?.storeName || user?.store_name || '';
  const initialSlug = initialStoreName
    ? initialStoreName.toLowerCase().replace(/[^a-z0-9]/g, '')
    : '';

  const [currentStep, setCurrentStep] = useState(1);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    storeName: initialStoreName,
    storeSlug: initialSlug,
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
  });

  // Hydrate or initialize onboarding state on mount
  useEffect(() => {
    // If arriving directly from a new registration
    if (location.state?.newRegistration) {
      const regStoreName = location.state.storeName || '';
      const regSlug = regStoreName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const freshState = {
        storeName: regStoreName,
        storeSlug: regSlug,
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
      };
      setFormData(freshState);
      setCurrentStep(1);
      return;
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // If draft matches active user or no user constraint, restore it
        if (
          !user?.email ||
          !parsed.data?.userEmail ||
          parsed.data.userEmail === user.email
        ) {
          setFormData((prev) => ({ ...prev, ...parsed.data }));
          if (parsed.step && parsed.step >= 1 && parsed.step <= 5) {
            setCurrentStep(parsed.step);
          }
          return;
        }
      }

      // If no valid draft, use active user's store info
      if (user?.store_name) {
        setFormData((prev) => ({
          ...prev,
          storeName: user.store_name,
          storeSlug: user.store_name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        }));
      }
    } catch (e) {
      console.warn('Could not parse onboarding draft', e);
    }
  }, [location.state, user]);

  // Persist draft to localStorage on changes
  const saveDraft = (stepToSave = currentStep, dataToSave = formData) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step: stepToSave,
          data: {
            ...dataToSave,
            storeLogoFile: null, // do not store raw File object
          },
          timestamp: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn('Failed to persist onboarding draft', e);
    }
  };

  const handleNextFromWelcome = () => {
    setError('');
    setCurrentStep(2);
    saveDraft(2);
  };

  const handleNextFromStoreSetup = async () => {
    setError('');
    if (!formData.storeName.trim()) {
      setError('Please enter a store name.');
      return;
    }

    try {
      setIsLoading(true);
      await apiClient('/onboarding/setup', {
        method: 'POST',
        data: {
          store_name: formData.storeName,
          store_slug: formData.storeSlug,
          theme: formData.theme,
        },
      });

      setCurrentStep(3);
      saveDraft(3);
    } catch (err) {
      console.warn('API store setup error, continuing:', err.message);
      setCurrentStep(3);
      saveDraft(3);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextFromBusinessInfo = async () => {
    setError('');
    if (!formData.businessCategory) {
      setError('Please select a business category.');
      return;
    }

    try {
      setIsLoading(true);
      await apiClient('/onboarding/business-info', {
        method: 'POST',
        data: {
          category: formData.businessCategory,
          description: formData.businessDescription,
          type: formData.businessType,
          target_audience: formData.targetAudience,
        },
      });

      setCurrentStep(4);
      saveDraft(4);
    } catch (err) {
      console.warn('API business info error, continuing:', err.message);
      setCurrentStep(4);
      saveDraft(4);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextFromPreferences = async () => {
    setError('');
    try {
      setIsLoading(true);
      await apiClient('/onboarding/preferences', {
        method: 'POST',
        data: {
          language: formData.language,
          currency: formData.currency,
          time_zone: formData.timeZone,
          unit_system: formData.unitSystem,
        },
      });

      await apiClient('/onboarding/complete', {
        method: 'POST',
        data: {
          store_name: formData.storeName,
          store_slug: formData.storeSlug,
          theme: formData.theme,
          category: formData.businessCategory,
          currency: formData.currency,
        },
      });

      // Update cached user in localStorage
      const cachedUser = localStorage.getItem('marketflow_user');
      if (cachedUser) {
        try {
          const parsedUser = JSON.parse(cachedUser);
          parsedUser.store_name = formData.storeName;
          parsedUser.onboarding_completed = true;
          localStorage.setItem('marketflow_user', JSON.stringify(parsedUser));
        } catch (e) {}
      }

      setCurrentStep(5);
      saveDraft(5);
    } catch (err) {
      console.warn('Preferences/complete error, continuing:', err.message);
      setCurrentStep(5);
      saveDraft(5);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    // Clear draft and navigate to dashboard or login
    localStorage.removeItem(STORAGE_KEY);
    navigate('/dashboard');
  };

  const handleSaveAndExitConfirm = () => {
    saveDraft();
    setIsSaveModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col relative font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header with Logo and Save & Exit */}
      <OnboardingHeader onSaveAndExit={() => setIsSaveModalOpen(true)} />

      {/* Stepper (5 Segments) */}
      <OnboardingStepper currentStep={currentStep} totalSteps={5} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 pb-16 flex items-start justify-center">
        {currentStep === 1 && (
          <Step1Welcome onNext={handleNextFromWelcome} />
        )}

        {currentStep === 2 && (
          <Step2StoreSetup
            data={formData}
            onChange={setFormData}
            onNext={handleNextFromStoreSetup}
            onBack={() => setCurrentStep(1)}
            error={error}
          />
        )}

        {currentStep === 3 && (
          <Step3BusinessInfo
            data={formData}
            onChange={setFormData}
            onNext={handleNextFromBusinessInfo}
            onBack={() => setCurrentStep(2)}
            error={error}
          />
        )}

        {currentStep === 4 && (
          <Step4Preferences
            data={formData}
            onChange={setFormData}
            onNext={handleNextFromPreferences}
            onBack={() => setCurrentStep(3)}
            isLoading={isLoading}
            error={error}
          />
        )}

        {currentStep === 5 && (
          <Step5Ready
            data={formData}
            onFinish={handleFinish}
          />
        )}
      </main>

      {/* Floating AI Assistant Robot Widget */}
      <AIAssistantWidget
        currentStep={currentStep}
        storeName={formData.storeName}
      />

      {/* Save & Exit Confirmation Modal */}
      <SaveExitModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleSaveAndExitConfirm}
      />
    </div>
  );
};

export default OnboardingPage;
