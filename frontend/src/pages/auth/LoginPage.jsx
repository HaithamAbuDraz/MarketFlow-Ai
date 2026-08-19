import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, CheckCircle2, AlertCircle, Check, Hand } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SplitScreenLayout } from '@/components/layout';
import { ForgotPasswordModal } from '@/components/auth';
import { InputField, Button, Logo } from '@/components/common';
import googleIcon from '@/assets/icons/google-icon.svg';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isMockMode, setIsMockMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!formData.email || !formData.password) {
      setError('Please enter both your email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await login(formData.email, formData.password);
      setIsMockMode(!!res.isMock);
      setSuccessMsg(
        `Welcome back, ${res.user?.store_name || res.user?.name || res.user?.email}! Redirecting to Dashboard...`
      );
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSuccessMsg('');
    try {
      setIsSubmitting(true);
      const res = await login('merchant@marketflow.ai', 'Password123!');
      setIsMockMode(!!res.isMock);
      setSuccessMsg('Signed in with Google! Redirecting to Dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setError(err.message || 'Google authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SplitScreenLayout>
      {/* Main Card */}
      <div
        className="w-full max-w-[360px] sm:max-w-[450px] bg-white sm:rounded-[16px] sm:p-8 sm:shadow-[0px_4px_20px_rgba(15,34,76,0.04)] sm:border sm:border-[#eaebf0]/60 my-auto flex flex-col justify-between"
        data-node-id="404:282"
      >
        <div>
          {/* Mobile Header Brand Logo (Visible on mobile screens <= 768px, Node 404:284) */}
          <div className="md:hidden flex items-center mb-6 pt-1">
            <Logo size={42} showText={false} />
          </div>

          {/* Title & Subtitle (Node 404:307 / 522:550) */}
          <div className="mb-6 sm:mb-6">
            <div className="flex items-center gap-2 mb-1.5">
              <h2 className="font-['Inter'] font-bold text-[26px] sm:text-[28px] text-[#0f172a] tracking-tight leading-tight">
                Welcome back
              </h2>
              <span className="inline-flex items-center justify-center p-1 rounded-md text-amber-500 bg-amber-50/80 border border-amber-200/50 shadow-xs hover:rotate-12 transition-transform duration-200">
                <Hand size={22} className="text-amber-500 fill-amber-400/30" />
              </span>
            </div>
            <p className="font-['Inter'] font-medium text-sm sm:text-base text-[#475569]">
              Manage your store with AI insights..
            </p>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs mb-4 animate-fade-in">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <div className="font-medium">{successMsg}</div>
                {isMockMode && (
                  <div className="text-[10px] text-emerald-600 opacity-90 mt-0.5">
                    (Backend offline — mock session active)
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs mb-4 animate-fade-in">
              <AlertCircle size={16} className="shrink-0 text-rose-600" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Login Form (Node 535:48033) */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-3.5">
            {/* Email Input Field (Node 535:48034) */}
            <InputField
              id="loginEmail"
              label="Email"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              inputClassName="h-[48px] sm:h-[46px] text-sm sm:text-sm"
              required
            />

            {/* Password Input Field (Node 535:48035) */}
            <InputField
              id="loginPassword"
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              inputClassName="h-[48px] sm:h-[46px] text-sm sm:text-sm"
              required
            />

            {/* Remember Me & Forgot Password (Node 404:352) */}
            <div className="flex items-center justify-between text-sm pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-[#777c80] select-none group">
                <div
                  onClick={() => setFormData({ ...formData, rememberMe: !formData.rememberMe })}
                  className={`w-4.5 h-4.5 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer ${
                    formData.rememberMe
                      ? 'bg-[#2563eb] border-[#2563eb] text-white'
                      : 'border-[#cbd5e1] bg-white group-hover:border-[#94a3b8]'
                  }`}
                >
                  {formData.rememberMe && <Check size={12} strokeWidth={3} />}
                </div>
                <span className="text-sm font-normal text-[#777c80]">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="font-['Inter'] font-medium text-sm text-[#2563eb] hover:text-blue-700 hover:underline cursor-pointer transition-colors"
              >
                Forgot password ?
              </Link>
            </div>

            {/* Primary Login Button (Node 404:361) */}
            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting}
              loadingText="Logging in..."
              size="lg"
              className="h-[50px] sm:h-[48px] text-base font-semibold mt-1"
            >
              Login
            </Button>

            {/* OR Divider (Node 404:364) */}
            <div className="flex items-center my-1 text-center">
              <div className="flex-1 border-t border-[#e2e8f0]" />
              <span className="px-3 font-['Inter'] font-medium text-xs sm:text-xs text-[#475569] uppercase tracking-wider">
                OR
              </span>
              <div className="flex-1 border-t border-[#e2e8f0]" />
            </div>

            {/* Continue with Google (Node 404:368) */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full h-[50px] sm:h-[48px] bg-white hover:bg-slate-50 active:bg-slate-100 border border-[#e2e8f0] text-[#0f172a] font-semibold text-sm sm:text-base rounded-[8px] flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer shadow-sm hover:border-slate-300"
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5 object-contain" />
              <span>Continue with Google</span>
            </button>
          </form>
        </div>

        {/* Footer Link (Node 404:375) */}
        <div className="text-center mt-6 pt-3 text-sm sm:text-base text-[#475569]">
          <span className="font-normal font-['Inter']">Don't have an Account? </span>
          <Link
            to="/register"
            className="font-semibold font-['Inter'] text-[#2563eb] hover:text-blue-700 hover:underline transition-colors ml-1"
          >
            Sign up
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </SplitScreenLayout>
  );
};

export default LoginPage;
