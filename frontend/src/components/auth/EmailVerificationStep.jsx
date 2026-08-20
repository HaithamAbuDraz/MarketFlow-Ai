import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Logo } from '../common/Logo';
import emailVerifyIcon from '@/assets/illustrations/email-verify-monitor.svg';

export const EmailVerificationStep = ({
  email,
  resendTimer,
  canResend,
  onResendEmail,
  onUseDifferentEmail,
  onContinue,
}) => {
  return (
    <div className="w-full max-w-[360px] sm:max-w-[460px] bg-white dark:bg-[#091530] sm:rounded-[16px] p-4 sm:p-8 sm:shadow-[0px_4px_20px_rgba(15,34,76,0.04)] sm:border sm:border-[#eaebf0]/60 sm:dark:border-[#173066] my-auto flex flex-col justify-between animate-fade-in transition-colors duration-200">
      <div className="flex flex-col items-center text-center pt-1">
        {/* Mobile Header Brand Logo */}
        <div className="lg:hidden flex items-center mb-5">
          <Logo size={42} showText={false} />
        </div>

        {/* Illustration Badge */}
        <div className="w-[84px] h-[84px] sm:w-[88px] sm:h-[88px] rounded-full bg-[#34a853]/10 dark:bg-[#34a853]/20 flex items-center justify-center mb-4">
          <img src={emailVerifyIcon} alt="Check Email" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
        </div>

        {/* Title & Email Details */}
        <h2 className="font-['Inter'] font-bold text-2xl text-[#0f172a] dark:text-white mb-1.5 tracking-tight">
          Check your email
        </h2>
        <p className="font-['Inter'] text-xs sm:text-sm text-[#64748b] dark:text-slate-400 leading-relaxed max-w-xs mb-6">
          We've sent a verification link to:<br />
          <span className="font-semibold text-[#0f172a] dark:text-white">{email || 'hello@novahome.com'}</span><br />
          Click the link in the email to verify your account and continue.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mb-5">
          <button
            type="button"
            onClick={onUseDifferentEmail}
            className="h-[46px] sm:h-[44px] bg-[#fefefe] dark:bg-[#0b1633] hover:bg-slate-50 dark:hover:bg-[#122244] border border-[#e2e8f0] dark:border-[#1e3a75] text-[#2563eb] dark:text-[#38bdf8] font-semibold text-xs sm:text-sm rounded-[8px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft size={16} />
            <span>Use different email</span>
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="h-[46px] sm:h-[44px] bg-[#2563eb] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-[8px] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Open email</span>
          </button>
        </div>

        {/* Resend Countdown */}
        <div className="text-xs text-[#475569] dark:text-slate-400">
          {canResend ? (
            <p>
              Didn't receive it?{' '}
              <button
                type="button"
                onClick={onResendEmail}
                className="font-semibold text-[#2563eb] dark:text-[#38bdf8] hover:underline cursor-pointer ml-1"
              >
                Resend email
              </button>
            </p>
          ) : (
            <p className="text-slate-400 dark:text-slate-500">
              Resend email in 00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Security Note */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-[#14264e] flex items-center justify-center gap-1.5 text-[11px] text-[#94a3b8] dark:text-slate-500">
        <ShieldCheck size={14} className="shrink-0 text-slate-400 dark:text-slate-500" />
        <span>Check your spam or junk folder if you don't see the email.</span>
      </div>
    </div>
  );
};

export default EmailVerificationStep;
