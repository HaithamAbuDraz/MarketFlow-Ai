import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Mail, Lock, Check, AlertCircle, Rocket } from 'lucide-react';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';
import { Logo } from '../common/Logo';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import googleIcon from '@/assets/icons/google-icon.svg';

export const RegisterForm = ({
  formData,
  setFormData,
  fieldErrors = {},
  error = '',
  isSubmitting = false,
  onSubmit,
  onOpenModal,
  onGoogleSignUp,
}) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-[360px] sm:max-w-[460px] bg-white sm:rounded-[16px] sm:p-7 sm:shadow-[0px_4px_20px_rgba(15,34,76,0.04)] sm:border sm:border-[#eaebf0]/60 my-auto flex flex-col justify-between animate-fade-in">
      <div>
        {/* Mobile Header Brand Logo (Visible on mobile screens < lg) */}
        <div className="lg:hidden flex items-center mb-5 pt-1">
          <Logo size={42} showText={false} />
        </div>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-['Inter'] font-bold text-2xl sm:text-2xl text-[#0f172a] tracking-tight leading-tight">
              Create your account
            </h2>
            <span className="inline-flex items-center justify-center p-1 rounded-md text-[#2563eb] bg-blue-50 border border-blue-200/50 shadow-xs hover:-translate-y-0.5 transition-transform duration-200">
              <Rocket size={18} className="text-[#2563eb] fill-[#2563eb]/20" />
            </span>
          </div>
          <p className="font-['Inter'] font-medium text-xs sm:text-sm text-[#475569]">
            Start managing your store with AI-powered tools.
          </p>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-lg text-xs mb-3 animate-fade-in">
            <AlertCircle size={15} className="shrink-0 text-rose-600" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {/* Store Name */}
          <InputField
            id="regStoreName"
            label="Store Name"
            icon={Store}
            placeholder="Your store name"
            value={formData.storeName}
            onChange={(e) => handleChange('storeName', e.target.value)}
            inputClassName="h-[46px] sm:h-[42px]"
            error={fieldErrors.store_name?.[0]}
            required
          />

          {/* Email Address */}
          <InputField
            id="regEmail"
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            inputClassName="h-[46px] sm:h-[42px]"
            error={fieldErrors.email?.[0]}
            required
          />

          {/* Passwords in 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-2">
            <InputField
              id="regPassword"
              label="Password"
              type="password"
              icon={Lock}
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              inputClassName="h-[46px] sm:h-[42px]"
              required
            />

            <InputField
              id="regConfirmPassword"
              label="Confirm"
              type="password"
              icon={Lock}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              inputClassName="h-[46px] sm:h-[42px]"
              error={
                formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? 'Passwords do not match'
                  : undefined
              }
              required
            />
          </div>

          {/* Password Strength Checklist */}
          <PasswordStrengthIndicator password={formData.password} />

          {/* Terms & Privacy Checkbox */}
          <div className="pt-0.5">
            <label className="flex items-start gap-2 cursor-pointer text-[#777c80] select-none group">
              <div
                onClick={() => handleChange('agreeTerms', !formData.agreeTerms)}
                className={`w-4.5 h-4.5 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5 ${
                  formData.agreeTerms
                    ? 'bg-[#2563eb] border-[#2563eb] text-white'
                    : 'border-[#cbd5e1] bg-white group-hover:border-[#94a3b8]'
                }`}
              >
                {formData.agreeTerms && <Check size={12} strokeWidth={3} />}
              </div>
              <span className="font-['Inter'] text-xs text-[#777c80] leading-snug">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal('Terms & Conditions');
                  }}
                  className="font-semibold text-[#2563eb] hover:underline cursor-pointer"
                >
                  Terms & Conditions
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal('Privacy Policy');
                  }}
                  className="font-semibold text-[#2563eb] hover:underline cursor-pointer"
                >
                  Privacy Policy
                </button>
                .
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            loadingText="Creating account..."
            size="lg"
            className="h-[48px] sm:h-[46px] text-sm sm:text-sm font-semibold mt-0.5"
          >
            Sign up
          </Button>

          {/* OR Divider */}
          <div className="flex items-center my-0.5 text-center">
            <div className="flex-1 border-t border-[#e2e8f0]" />
            <span className="px-2.5 font-['Inter'] font-medium text-[11px] text-[#475569] uppercase tracking-wider">
              OR
            </span>
            <div className="flex-1 border-t border-[#e2e8f0]" />
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={onGoogleSignUp}
            className="w-full h-[46px] sm:h-[44px] bg-white hover:bg-slate-50 active:bg-slate-100 border border-[#e2e8f0] text-[#0f172a] font-semibold text-xs sm:text-sm rounded-[8px] flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer shadow-sm hover:border-slate-300"
          >
            <img src={googleIcon} alt="Google" className="w-4.5 h-4.5 object-contain" />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>

      {/* Footer Navigation */}
      <div className="text-center mt-5 pt-2 text-xs sm:text-sm text-[#475569]">
        <span className="font-normal font-['Inter']">Already have an account? </span>
        <Link
          to="/login"
          className="font-semibold font-['Inter'] text-[#2563eb] hover:text-blue-700 hover:underline transition-colors ml-0.5"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
