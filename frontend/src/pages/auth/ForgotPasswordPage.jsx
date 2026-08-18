import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, KeyRound, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { HeroBanner } from '@/components/hero';
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

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await forgotPassword(email);
      if (res?.reset_token) {
        setResetToken(res.reset_token);
      }
      setStep('EMAIL_SENT');
      setResendTimer(59);
      setCanResend(false);
    } catch (err) {
      setError(err.message || 'Failed to send password reset link. Please try again.');
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
      const res = await forgotPassword(email);
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

    if (!newPassword || newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full bg-white sm:bg-[#f8f8fb] lg:bg-[#060c1c] overflow-y-auto lg:overflow-hidden">
      {/* Left Column: Figma 3D Hero Banner (Hidden on Mobile < lg, Node 94:126) */}
      <HeroBanner />

      {/* Right Column: Responsive Form Container (Node 401:54) */}
      <div className="flex-1 lg:flex-[0.95] flex flex-col items-center justify-between min-h-screen lg:min-h-full bg-white sm:bg-[#f8f8fb] px-4 py-6 sm:p-6 lg:p-8 overflow-y-auto no-scrollbar">
        {/* Main Elevated Card */}
        <div 
          className="w-full max-w-[360px] sm:max-w-[450px] bg-white sm:rounded-[16px] sm:p-8 sm:shadow-[0px_4px_20px_rgba(15,34,76,0.04)] sm:border sm:border-[#eaebf0]/60 my-auto flex flex-col justify-between animate-fade-in"
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
                <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe] flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <KeyRound size={22} className="stroke-[2.2]" />
                </div>

                {/* Title & Subtitle (Centered) */}
                <div className="mb-5 text-center">
                  <h2 className="font-['Inter'] font-bold text-[24px] sm:text-[28px] text-[#0f172a] tracking-tight leading-tight mb-2">
                    Forgot password?
                  </h2>
                  <p className="font-['Inter'] font-medium text-xs sm:text-sm text-[#475569] leading-relaxed">
                    No worries, we'll send you reset instructions. Enter your registered store email below.
                  </p>
                </div>

                {/* Error Banner (Placed Below Icon & Header) */}
                {error && (
                  <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs mb-4 animate-fade-in text-left">
                    <AlertCircle size={16} className="shrink-0 text-rose-600" />
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Email Form */}
                <form onSubmit={handleRequestResetLink} className="flex flex-col gap-4 sm:gap-3.5">
                  <InputField
                    id="resetEmail"
                    label="Email"
                    type="email"
                    icon={Mail}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputClassName="h-[48px] sm:h-[46px] text-sm"
                    required
                    autoFocus
                  />

                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isSubmitting}
                    loadingText="Sending reset link..."
                    size="lg"
                    className="h-[50px] sm:h-[48px] text-base font-semibold mt-1"
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
                <div className="w-[84px] h-[84px] sm:w-[88px] sm:h-[88px] rounded-full bg-[#38bdf8]/10 flex items-center justify-center mb-4 mx-auto">
                  <img src={emailVerifyIcon} alt="Check Email" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
                </div>

                {/* Title & Subtitle */}
                <h2 className="font-['Inter'] font-bold text-2xl sm:text-[26px] text-[#0f172a] mb-2 tracking-tight">
                  Check your email
                </h2>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#64748b] leading-relaxed max-w-xs mb-4">
                  We've sent a password reset link to:<br />
                  <span className="font-semibold text-[#0f172a] text-sm block mt-1 break-all">{email}</span>
                </p>

                {/* Error Banner if any */}
                {error && (
                  <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs mb-4 w-full animate-fade-in text-left">
                    <AlertCircle size={16} className="shrink-0 text-rose-600" />
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
                    className="w-full h-[42px] bg-slate-50 hover:bg-slate-100 border border-[#e2e8f0] text-slate-700 font-medium text-xs rounded-[8px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles size={14} className="text-[#0ea2f2]" />
                    <span>Set new password now (Direct Link)</span>
                  </button>
                </div>

                {/* Resend Countdown */}
                <div className="text-xs text-[#475569]">
                  {canResend ? (
                    <p>
                      Didn't receive the email?{' '}
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={isSubmitting}
                        className="font-semibold text-[#2563eb] hover:underline cursor-pointer ml-1"
                      >
                        Click to resend
                      </button>
                    </p>
                  ) : (
                    <p className="text-slate-400">
                      Resend link in 00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: SET NEW PASSWORD */}
            {step === 'SET_NEW_PASSWORD' && (
              <div>
                {/* Header Icon Badge (Centered) */}
                <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe] flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <Lock size={22} className="stroke-[2.2]" />
                </div>

                {/* Title & Subtitle (Centered) */}
                <div className="mb-5 text-center">
                  <h2 className="font-['Inter'] font-bold text-[24px] sm:text-[28px] text-[#0f172a] tracking-tight leading-tight mb-2">
                    Set new password
                  </h2>
                  <p className="font-['Inter'] font-medium text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Your new password must be different to previously used passwords.
                  </p>
                </div>

                {/* Error Banner (Placed Below Icon & Header) */}
                {error && (
                  <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs mb-4 animate-fade-in text-left">
                    <AlertCircle size={16} className="shrink-0 text-rose-600" />
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleResetPassword} className="flex flex-col gap-3.5">
                  <InputField
                    id="newPassword"
                    label="New Password"
                    type="password"
                    icon={Lock}
                    placeholder="••••••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                <div className="w-[84px] h-[84px] sm:w-[88px] sm:h-[88px] rounded-full bg-[#e1ecfe] flex items-center justify-center mb-4 shadow-sm">
                  <img src={successCheckIcon} alt="Password Reset Success" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
                </div>

                {/* Title & Subtitle */}
                <h2 className="font-['Inter'] font-bold text-2xl sm:text-[26px] text-[#0f172a] mb-2 tracking-tight">
                  Password reset complete
                </h2>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#64748b] leading-relaxed max-w-xs mb-6">
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
          <div className="text-center mt-6 pt-3 border-t border-slate-100/80">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 font-semibold font-['Inter'] text-xs sm:text-sm text-[#475569] hover:text-[#2563eb] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to log in</span>
            </Link>
          </div>
        </div>

        {/* Bottom Security Note */}
        <div className="py-2 flex items-center justify-center gap-1.5 text-xs text-[#94a3b8]">
          <ShieldCheck size={14} className="shrink-0 text-slate-400" />
          <span>MarketFlow AI Secure Authentication</span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
