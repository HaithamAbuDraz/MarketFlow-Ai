import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Mail, CheckCircle2, AlertCircle, KeyRound, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { InputField, Button } from '@/components/common';

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send password reset link. Please verify your email.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSent(false);
    setEmail('');
    setError('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-in"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-[460px] bg-white dark:bg-[#091530] rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-100 dark:border-[#173066] relative transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-[#14264e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#eff6ff] dark:bg-[#0c1836] text-[#2563eb] dark:text-[#38bdf8] border border-[#dbeafe] dark:border-[#1e3a75] flex items-center justify-center">
              <KeyRound size={16} className="stroke-[2.2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Forgot your password?</h3>
          </div>
          <button 
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#122244] rounded-lg transition-colors cursor-pointer"
            onClick={handleClose} 
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div>
          {sent ? (
            <div className="text-center py-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={28} />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Reset Link Sent</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                We sent password reset instructions to <strong className="text-slate-900 dark:text-white">{email}</strong>. Please check your inbox.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  to="/forgot-password"
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 bg-[#2563eb] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors text-center flex items-center justify-center gap-1.5"
                >
                  <span>Open Full Reset Page</span>
                  <ArrowRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2 px-4 bg-slate-100 dark:bg-[#0b1633] hover:bg-slate-200 dark:hover:bg-[#122244] text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer border border-transparent dark:border-[#1e3a75]"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Enter your registered store email address, and we will send you instructions to reset your password.
              </p>

              {error && (
                <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 p-2.5 rounded-lg text-xs">
                  <AlertCircle size={16} className="shrink-0 text-rose-600 dark:text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              <InputField
                id="modalResetEmail"
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputClassName="h-[44px] text-sm"
                required
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                isLoading={loading}
                loadingText="Sending reset link..."
                size="md"
                className="h-[46px] font-semibold mt-1"
              >
                Send Reset Link
              </Button>

              <div className="text-center pt-2 border-t border-slate-100 dark:border-[#14264e]">
                <Link
                  to="/forgot-password"
                  onClick={handleClose}
                  className="text-xs font-semibold text-[#2563eb] dark:text-[#38bdf8] hover:underline"
                >
                  Open dedicated reset page →
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
