import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, KeyRound, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { InputField, Button, Logo } from '@/components/common';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';
import emailVerifyIcon from '@/assets/illustrations/email-verify-monitor.svg';
import successCheckIcon from '@/assets/illustrations/success-badge-check.svg';

export const ForgotPasswordPage = () => {
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL Query Parameters (e.g. from password reset email link)
  const tokenParam = searchParams.get('token');
  const emailParam = searchParams.get('email');

  // Step state: 'EMAIL_ENTRY' | 'EMAIL_SENT' | 'SET_NEW_PASSWORD' | 'SUCCESS'
  const [step, setStep] = useState(tokenParam ? 'SET_NEW_PASSWORD' : 'EMAIL_ENTRY');

  // Form states
  const [email, setEmail] = useState(emailParam || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState(tokenParam || '');

  // UI status states
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);

  // Sync state if URL query params change
  useEffect(() => {
    if (tokenParam) {
      setResetToken(tokenParam);
      setStep('SET_NEW_PASSWORD');
    }
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [tokenParam, emailParam]);

  // Resend countdown timer for EMAIL_SENT step
  useEffect(() => {
    let interval = null;
    if (step === 'EMAIL_SENT' && resendTimer > 0) {
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

  // Step 1: Submit Email for Reset Instructions
  const handleRequestResetLink = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setFieldErrors({ email: 'Please enter your email address.' });
      setError('Please enter your email address.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setFieldErrors({ email: 'Please provide a valid email address.' });
      setError('Please provide a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await forgotPassword(trimmedEmail);
      if (res?.reset_token) {
        setResetToken(res.reset_token);
      }
      setStep('EMAIL_SENT');
      setResendTimer(59);
      setCanResend(false);
    } catch (err) {
      setError(err.message || 'Failed to send password reset link. Please try again.');
      if (err.errors) {
        setFieldErrors(err.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Handle Resend Email Action
  const handleResend = async () => {
    if (!canResend) return;
    try {
      setIsSubmitting(true);
      setError('');
      setFieldErrors({});
      const res = await forgotPassword(email.trim());
      if (res?.reset_token) {
        setResetToken(res.reset_token);
      }
      setResendTimer(59);
      setCanResend(false);
    } catch (err) {
      setError(err.message || 'Failed to resend reset link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Submit New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = 'Password is required.';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match. Please verify.';
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setError(Object.values(newErrors)[0]);
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPassword(
        resetToken || 'mock_sanctum_token',
        email,
        newPassword,
        confirmPassword
      );
      setStep('SUCCESS');
    } catch (err) {
      setError(err.message || 'Failed to reset password. The link may have expired.');
      if (err.errors) {
        setFieldErrors(err.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SplitScreenLayout>
      {/* Main Elevated Card */}
      <div 
        className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[390px] xl:max-w-[400px] bg-white dark:bg-[#091530] sm:rounded-[16px] p-5 sm:p-7 md:p-7.5 sm:shadow-[0px_4px_20px_rgba(15,34,76,0.04)] sm:border sm:border-[#eaebf0]/60 sm:dark:border-[#173066] my-auto flex flex-col justify-between animate-fade-in transition-colors duration-200"
        data-node-id="401:54"
      >
          <div>
            {/* Mobile Header Brand Logo (Visible on mobile screens < lg) */}
            <div className="lg:hidden flex items-center mb-6 pt-1">
              <Logo size={42} showText={false} />
            </div>

            {/* STEP 1: EMAIL ENTRY (Forgot password?) */}
            {step === 'EMAIL_ENTRY' && (
              <div>
                {/* Header Icon Badge (Centered) */}
                <div className="w-12 h-12 rounded-xl bg-[#eff6ff] dark:bg-[#0c1836] text-[#2563eb] dark:text-[#38bdf8] border border-[#dbeafe] dark:border-[#1e3a75] flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <KeyRound size={22} className="stroke-[2.2]" />
                </div>

                {/* Title & Subtitle (Centered) */}
                <div className="mb-5 text-center">
                  <h2 className="font-['Inter'] font-bold text-[24px] sm:text-[28px] text-[#0f172a] dark:text-white tracking-tight leading-tight mb-2">
                    Forgot password?
                  </h2>
                  <p className="font-['Inter'] font-medium text-xs sm:text-sm text-[#475569] dark:text-slate-400 leading-relaxed">
                    No worries, we'll send you reset instructions. Enter your registered store email below.
                  </p>
                </div>

                {/* Error Banner (Placed Below Icon & Header) */}
                {error && (
                  <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 p-3 rounded-lg text-xs mb-4 animate-fade-in text-left">
                    <AlertCircle size={16} className="shrink-0 text-rose-600 dark:text-rose-400" />
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Email Form */}
                <form onSubmit={handleRequestResetLink} noValidate className="flex flex-col gap-4 sm:gap-3.5">
                    {/* Email Input Field */}
                    <InputField
                      id="resetEmail"
                      label="Email Address"
                      type="email"
                      icon={Mail}
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      error={fieldErrors.email}
                      inputClassName="h-[42px] sm:h-[40px] text-xs sm:text-sm"
                      required
                    />

                    {/* Submit Action Button */}
                    <Button
                      type="submit"
                      fullWidth
                      isLoading={isSubmitting}
                      loadingText="Sending reset link..."
                      size="lg"
                      className="h-[42px] sm:h-[40px] text-xs sm:text-sm font-semibold mt-0.5"
                    >
                      Send Reset Link
                    </Button>
                </form>
              </div>
            )}

            {/* STEP 2: EMAIL SENT CONFIRMATION (Check your email) */}
            {step === 'EMAIL_SENT' && (
              <div className="flex flex-col items-center text-center pt-2">
                {/* Illustration Badge (Centered) */}
                <div className="w-[84px] h-[84px] sm:w-[88px] sm:h-[88px] rounded-full bg-[#38bdf8]/10 dark:bg-[#38bdf8]/20 flex items-center justify-center mb-4 mx-auto">
                  <img src={emailVerifyIcon} alt="Check Email" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
                </div>

                {/* Title & Subtitle */}
                <h2 className="font-['Inter'] font-bold text-2xl sm:text-[26px] text-[#0f172a] dark:text-white mb-2 tracking-tight">
                  Check your email
                </h2>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#64748b] dark:text-slate-400 leading-relaxed max-w-xs mb-4">
                  We've sent a password reset link to:<br />
                  <span className="font-semibold text-[#0f172a] dark:text-white text-sm block mt-1 break-all">{email}</span>
                </p>

                {/* Error Banner if any */}
                {error && (
                  <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 p-3 rounded-lg text-xs mb-4 w-full animate-fade-in text-left">
                    <AlertCircle size={16} className="shrink-0 text-rose-600 dark:text-rose-400" />
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5 w-full mb-5">
                  <a
                    href={`mailto:${email}`}
                    className="w-full h-[48px] sm:h-[46px] bg-[#2563eb] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-[8px] flex items-center justify-center gap-2 shadow-[0px_4px_6px_rgba(37,99,235,0.24)] transition-all cursor-pointer"
                  >
                    <span>Open email app</span>
                    <ArrowRight size={16} />
                  </a>

                  {/* Direct simulation link for local testing */}
                  <button
                    type="button"
                    onClick={() => setStep('SET_NEW_PASSWORD')}
                    className="w-full h-[42px] bg-slate-50 dark:bg-[#0b1633] hover:bg-slate-100 dark:hover:bg-[#122244] border border-[#e2e8f0] dark:border-[#1e3a75] text-slate-700 dark:text-slate-200 font-medium text-xs rounded-[8px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles size={14} className="text-[#0ea2f2]" />
                    <span>Simulate Reset Token Link (Testing)</span>
                  </button>
                </div>

                {/* Resend Link Section */}
                <div className="text-xs text-[#64748b] dark:text-slate-400">
                  <span>Didn't receive the email? </span>
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isSubmitting}
                      className="font-semibold text-[#2563eb] dark:text-[#38bdf8] hover:underline cursor-pointer disabled:opacity-50"
                    >
                      Click to resend
                    </button>
                  ) : (
                    <span className="text-[#94a3b8] dark:text-slate-500 font-medium">
                      Resend code in <strong className="text-[#2563eb] dark:text-[#38bdf8] font-semibold">{resendTimer}s</strong>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: SET NEW PASSWORD */}
            {step === 'SET_NEW_PASSWORD' && (
              <div>
                {/* Header Icon Badge (Centered) */}
                <div className="w-12 h-12 rounded-xl bg-[#eff6ff] dark:bg-[#0c1836] text-[#2563eb] dark:text-[#38bdf8] border border-[#dbeafe] dark:border-[#1e3a75] flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <Lock size={22} className="stroke-[2.2]" />
                </div>

                {/* Title & Subtitle (Centered) */}
                <div className="mb-5 text-center">
                  <h2 className="font-['Inter'] font-bold text-[24px] sm:text-[28px] text-[#0f172a] dark:text-white tracking-tight leading-tight mb-2">
                    Set new password
                  </h2>
                  <p className="font-['Inter'] font-medium text-xs sm:text-sm text-[#475569] dark:text-slate-400 leading-relaxed">
                    Your new password must be different to previously used passwords.
                  </p>
                </div>

                {/* Error Banner (Placed Below Icon & Header) */}
                {error && (
                  <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 p-3 rounded-lg text-xs mb-4 animate-fade-in text-left">
                    <AlertCircle size={16} className="shrink-0 text-rose-600 dark:text-rose-400" />
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleResetPassword} noValidate className="flex flex-col gap-3.5">
                  <InputField
                    id="newPassword"
                    label="New Password"
                    type="password"
                    icon={Lock}
                    placeholder="••••••••••••"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (fieldErrors.newPassword) setFieldErrors((prev) => ({ ...prev, newPassword: '' }));
                      if (error) setError('');
                    }}
                    error={Array.isArray(fieldErrors.newPassword) ? fieldErrors.newPassword[0] : fieldErrors.newPassword}
                    inputClassName="h-[48px] sm:h-[46px] text-sm"
                    required
                    autoFocus
                  />

                  {/* Password Strength Checklist */}
                  <PasswordStrengthIndicator password={newPassword} />

                  <InputField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    icon={Lock}
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (fieldErrors.confirmPassword) setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
                      if (error) setError('');
                    }}
                    error={Array.isArray(fieldErrors.confirmPassword) ? fieldErrors.confirmPassword[0] : fieldErrors.confirmPassword}
                    inputClassName="h-[48px] sm:h-[46px] text-sm"
                    required
                  />

                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isSubmitting}
                    loadingText="Updating password..."
                    size="lg"
                    className="h-[50px] sm:h-[48px] text-base font-semibold mt-1.5"
                  >
                    Reset Password
                  </Button>
                </form>
              </div>
            )}

            {/* STEP 4: PASSWORD RESET SUCCESS */}
            {step === 'SUCCESS' && (
              <div className="flex flex-col items-center text-center pt-2">
                {/* Success Badge */}
                <div className="w-[84px] h-[84px] sm:w-[88px] sm:h-[88px] rounded-full bg-[#e1ecfe] dark:bg-blue-950/60 flex items-center justify-center mb-4 shadow-sm">
                  <img src={successCheckIcon} alt="Password Reset Success" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
                </div>

                {/* Title & Subtitle */}
                <h2 className="font-['Inter'] font-bold text-2xl sm:text-[26px] text-[#0f172a] dark:text-white mb-2 tracking-tight">
                  Password reset complete
                </h2>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#64748b] dark:text-slate-400 leading-relaxed max-w-xs mb-6">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>

                {/* Continue to Login Button */}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full h-[48px] sm:h-[46px] bg-[#2563eb] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-[8px] flex items-center justify-center gap-2 shadow-[0px_4px_6px_rgba(37,99,235,0.24)] hover:shadow-[0px_6px_12px_rgba(37,99,235,0.3)] transition-all cursor-pointer mb-2"
                >
                  <span>Continue to log in</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Footer: Back to Login link (always accessible except on success) */}
          <div className="text-center mt-6 pt-3 border-t border-slate-100/80 dark:border-[#142347]">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 font-semibold font-['Inter'] text-xs sm:text-sm text-[#475569] dark:text-slate-400 hover:text-[#2563eb] dark:hover:text-[#38bdf8] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to log in</span>
            </Link>
          </div>
        </div>

        {/* Bottom Security Note */}
        <div className="py-2 flex items-center justify-center gap-1.5 text-xs text-[#94a3b8] dark:text-slate-500">
          <ShieldCheck size={14} className="shrink-0 text-slate-400 dark:text-slate-500" />
          <span>MarketFlow AI Secure Authentication</span>
        </div>
      </SplitScreenLayout>
  );
};

export default ForgotPasswordPage;

