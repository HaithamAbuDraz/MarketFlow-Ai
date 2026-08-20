import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import welcomeHeroImg from '@/assets/onboarding/welcome-hero.png';
import shieldCheckSvg from '@/assets/onboarding/shield-check.svg';

export const Step1Welcome = ({ onNext }) => {
  return (
    <div className="w-full max-w-[560px] bg-white dark:bg-[#091530] rounded-[20px] p-6 sm:p-10 drop-shadow-[0px_8px_16px_rgba(15,23,42,0.06)] border border-[#e2e8f0]/80 dark:border-[#173066] flex flex-col items-center gap-8 animate-modal-in transition-colors duration-200">
      {/* 3D Dashboard Illustration */}
      <div className="w-full flex items-center justify-center h-[220px] sm:h-[248px] relative shrink-0">
        <img
          src={welcomeHeroImg}
          alt="MarketFlow AI Dashboard Preview"
          className="max-h-full max-w-full object-contain select-none transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Typography Group */}
      <div className="w-full flex flex-col items-center text-center gap-3">
        <h1 className="text-2xl sm:text-[32px] font-bold sm:font-semibold text-[#0f172a] dark:text-white leading-tight tracking-tight">
          Welcome to MarketFlow AI
        </h1>
        <p className="text-base sm:text-[18px] font-medium text-[#2563eb] dark:text-[#38bdf8] leading-normal">
          Let&apos;s get your store ready.
        </p>
        <p className="text-sm sm:text-[14px] font-normal text-[#475569] dark:text-slate-400 leading-relaxed max-w-md">
          We&apos;ll help you set up your store, sync your inventory, and configure intelligent pricing engines in just a few simple steps.
        </p>
      </div>

      {/* Primary CTA Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full h-[52px] bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] text-white font-semibold text-[16px] rounded-lg shadow-[0px_4px_12px_rgba(37,99,235,0.25)] hover:shadow-[0px_6px_16px_rgba(37,99,235,0.35)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
      >
        <span>Get Started</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>

      {/* Bottom Trust Note */}
      <div className="flex items-center justify-center gap-2 text-[#98a2b3] dark:text-slate-500 text-sm sm:text-[15px] pt-1">
        <img src={shieldCheckSvg} alt="Shield Check" className="w-5 h-5 object-contain" />
        <span>You can update these details later.</span>
      </div>
    </div>
  );
};

export default Step1Welcome;
