import React from 'react';
import { Store, ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from '../common/Logo';
import successCheckIcon from '@/assets/illustrations/success-badge-check.svg';

export const AccountReadyStep = ({ storeName, email, onSetupStore }) => {
  return (
    <div className="w-full max-w-[360px] sm:max-w-[460px] bg-white dark:bg-[#091530] sm:rounded-[16px] p-4 sm:p-8 sm:shadow-[0px_4px_20px_rgba(15,34,76,0.04)] sm:border sm:border-[#eaebf0]/60 sm:dark:border-[#173066] my-auto flex flex-col justify-between animate-fade-in transition-colors duration-200">
      <div className="flex flex-col items-center text-center pt-1">
        {/* Mobile Header Brand Logo */}
        <div className="lg:hidden flex items-center mb-5">
          <Logo size={42} showText={false} />
        </div>

        {/* Success Badge */}
        <div className="w-[84px] h-[84px] sm:w-[88px] sm:h-[88px] rounded-full bg-[#e1ecfe] dark:bg-[#122b5e]/40 flex items-center justify-center mb-4 shadow-sm">
          <img src={successCheckIcon} alt="Success" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
        </div>

        {/* Title & Subtitle */}
        <h2 className="font-['Inter'] font-bold text-2xl text-[#0f172a] dark:text-white mb-1.5 tracking-tight">
          Your account is ready!
        </h2>
        <p className="font-['Inter'] text-xs sm:text-sm text-[#64748b] dark:text-slate-400 leading-relaxed max-w-xs mb-5">
          Your MarketFlow AI account has been created successfully. Let's set up your store.
        </p>

        {/* Store Info Card */}
        <div className="w-full bg-[#fafafa] dark:bg-[#0c1836] border border-[#eaebf0] dark:border-[#1e3a75] rounded-[10px] p-3.5 flex items-center gap-3 text-left mb-5">
          <div className="w-9 h-9 rounded-full bg-[#091023] dark:bg-[#070d1e] border border-transparent dark:border-[#1e3a75] flex items-center justify-center shrink-0 text-white shadow-sm">
            <Store size={18} className="text-[#0ea2f2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-[#0f172a] dark:text-white truncate">
              {storeName || 'Nova Store'}
            </h4>
            <p className="text-xs text-[#94a3b8] dark:text-slate-400 truncate">
              {email || 'hello@novahome.com'}
            </p>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onSetupStore}
          className="w-full h-[48px] sm:h-[46px] bg-[#2563eb] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-[8px] flex items-center justify-center gap-2 shadow-[0px_4px_6px_rgba(37,99,235,0.24)] hover:shadow-[0px_6px_12px_rgba(37,99,235,0.3)] transition-all cursor-pointer"
        >
          <span>Set up my store</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Bottom Note */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-[#14264e] flex items-center justify-center gap-1.5 text-[11px] text-[#94a3b8] dark:text-slate-500">
        <ShieldCheck size={14} className="shrink-0 text-slate-400 dark:text-slate-500" />
        <span>We'll guide you through a few quick steps to get your store ready</span>
      </div>
    </div>
  );
};

export default AccountReadyStep;
