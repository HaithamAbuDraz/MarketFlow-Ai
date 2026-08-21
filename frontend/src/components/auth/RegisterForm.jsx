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
    <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[390px] xl:max-w-[400px] bg-white dark:bg-[#091530] sm:rounded-[16px] p-4 sm:p-5 md:p-5.5 sm:shadow-[0px_4px_20px_rgba(15,34,76,0.04)] sm:border sm:border-[#eaebf0]/60 sm:dark:border-[#173066] my-auto flex flex-col justify-between animate-fade-in transition-colors duration-200">
      <div>
        {/* Mobile Header Brand Logo (Visible on mobile screens < lg) */}
        <div className="lg:hidden flex items-center mb-3 pt-1">
          <Logo size={36} showText={false} />
        </div>

        {/* Header */}
        <div className="mb-2.5">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h2 className="font-['Inter'] font-bold text-xl sm:text-[22px] text-[#0f172a] dark:text-white tracking-tight leading-tight">
              Create your account
            </h2>
            <span className="inline-flex items-center justify-center p-0.5 rounded-md text-[#2563eb] bg-blue-50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-500/30 shadow-xs hover:-translate-y-0.5 transition-transform duration-200">
              <Rocket size={15} className="text-[#2563eb] dark:text-[#38bdf8] fill-[#2563eb]/20" />
            </span>
          </div>
          <p className="font-['Inter'] font-medium text-[11.5px] sm:text-xs text-[#475569] dark:text-slate-400">
            Start managing your store with AI-powered tools.
          </p>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 p-2 rounded-lg text-[11px] mb-2 animate-fade-in">
            <AlertCircle size={14} className="shrink-0 text-rose-600 dark:text-rose-400" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
          {/* Store Name */}
          <InputField
            id="regStoreName"
            label="Store Name"
            icon={Store}
            placeholder="Your store name"
            value={formData.storeName}
            onChange={(e) => handleChange('storeName', e.target.value)}
            inputClassName="h-[38px] sm:h-[38px]"
            error={Array.isArray(fieldErrors.store_name) ? fieldErrors.store_name[0] : fieldErrors.store_name}
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
            inputClassName="h-[38px] sm:h-[38px]"
            error={Array.isArray(fieldErrors.email) ? fieldErrors.email[0] : fieldErrors.email}
            required
          />

          {/* Passwords in 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <InputField
              id="regPassword"
              label="Password"
              type="password"
              icon={Lock}
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              inputClassName="h-[38px] sm:h-[38px]"
              error={Array.isArray(fieldErrors.password) ? fieldErrors.password[0] : fieldErrors.password}
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
              inputClassName="h-[38px] sm:h-[38px]"
              error={
                (Array.isArray(fieldErrors.confirmPassword) ? fieldErrors.confirmPassword[0] : fieldErrors.confirmPassword) ||
                (formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? 'Passwords do not match'
                  : undefined)
              }
              required
            />
          </div>

          {/* Password Strength Checklist */}
          <PasswordStrengthIndicator password={formData.password} />

          {/* Terms & Privacy Checkbox */}
          <div className="pt-0">
            <label className="flex items-start gap-2 cursor-pointer text-[#777c80] dark:text-slate-400 select-none group">
              <div
                onClick={() => handleChange('agreeTerms', !formData.agreeTerms)}
                className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5 ${
                  formData.agreeTerms
                    ? 'bg-[#2563eb] border-[#2563eb] text-white'
                    : 'border-[#cbd5e1] dark:border-[#1e3a75] bg-white dark:bg-[#0c1836] group-hover:border-[#94a3b8]'
                }`}
              >
                {formData.agreeTerms && <Check size={11} strokeWidth={3} />}
              </div>
              <span className="font-['Inter'] text-[11px] text-[#777c80] dark:text-slate-400 leading-snug">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal('Terms & Conditions');
                  }}
                  className="font-semibold text-[#2563eb] dark:text-[#38bdf8] hover:underline cursor-pointer"
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
                  className="font-semibold text-[#2563eb] dark:text-[#38bdf8] hover:underline cursor-pointer"
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
            className="h-[40px] sm:h-[40px] text-xs sm:text-sm font-semibold mt-0.5"
          >
            Sign up
          </Button>

          {/* OR Divider */}
          <div className="flex items-center my-0 text-center">
            <div className="flex-1 border-t border-[#e2e8f0] dark:border-[#1e3a75]/60" />
            <span className="px-2 font-['Inter'] font-medium text-[10px] text-[#475569] dark:text-slate-400 uppercase tracking-wider">
              OR
            </span>
            <div className="flex-1 border-t border-[#e2e8f0] dark:border-[#1e3a75]/60" />
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={onGoogleSignUp}
            className="w-full h-[38px] sm:h-[38px] bg-white dark:bg-[#0b1633] hover:bg-slate-50 dark:hover:bg-[#122244] active:bg-slate-100 dark:active:bg-[#152a55] border border-[#e2e8f0] dark:border-[#1e3a75] text-[#0f172a] dark:text-white font-semibold text-xs rounded-[8px] flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-sm hover:border-slate-300 dark:hover:border-slate-600"
          >
            <img src={googleIcon} alt="Google" className="w-4 h-4 object-contain" />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>

      {/* Footer Navigation */}
      <div className="text-center mt-2.5 pt-1 text-xs text-[#475569] dark:text-slate-400">
        <span className="font-normal font-['Inter']">Already have an account? </span>
        <Link
          to="/login"
          className="font-semibold font-['Inter'] text-[#2563eb] dark:text-[#38bdf8] hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors ml-0.5"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
