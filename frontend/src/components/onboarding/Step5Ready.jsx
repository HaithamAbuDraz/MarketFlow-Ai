import React, { useState } from 'react';
import { ArrowRight, Check, Copy, CheckCheck, ExternalLink, Sparkles } from 'lucide-react';

export const Step5Ready = ({ data, onFinish }) => {
  const [copied, setCopied] = useState(false);

  const fullStoreUrl = `${data.storeSlug || 'mystore'}.marketflow.ai`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://${fullStoreUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[560px] bg-white dark:bg-[#091530] rounded-[20px] p-6 sm:p-10 drop-shadow-[0px_8px_16px_rgba(15,23,42,0.06)] border border-[#e2e8f0]/80 dark:border-[#173066] flex flex-col items-center gap-8 animate-modal-in transition-colors duration-200">
      {/* Success Visual */}
      <div className="relative flex items-center justify-center">
        <div className="w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] rounded-full bg-[rgba(37,99,235,0.08)] dark:bg-blue-950/60 flex items-center justify-center animate-pulse-glow">
          <div className="w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Check className="w-12 h-12 stroke-[3] animate-scale-in" />
          </div>
        </div>
      </div>

      {/* Typography Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <h2 className="text-2xl sm:text-[28px] font-bold text-[#0f172a] dark:text-white leading-tight">
          Your store is ready!
        </h2>
        <p className="text-sm sm:text-[16px] text-[#475569] dark:text-slate-400 leading-relaxed max-w-sm">
          Your MarketFlow store is set up and ready to manage.
        </p>
      </div>

      {/* Store Summary Card */}
      <div className="w-full bg-white dark:bg-[#0c1836] border border-[#e5e7eb] dark:border-[#1e3a75] rounded-[10px] p-5 flex flex-col gap-4">
        {/* Row 1: Store Name */}
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-[#6b7280] dark:text-slate-400">
            Store Name
          </span>
          <span className="text-[15px] font-semibold text-[#0f1b2d] dark:text-slate-200">
            {data.storeName || 'My MarketFlow Store'}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#e5e7eb] dark:bg-[#1e3a75]" />

        {/* Row 2: Store URL */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#6b7280] dark:text-slate-400">
              Store URL
            </span>
            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1 text-xs text-[#2563eb] dark:text-[#38bdf8] hover:text-blue-700 dark:hover:text-blue-300 font-medium cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy link</span>
                </>
              )}
            </button>
          </div>
          <span className="text-[15px] font-semibold text-[#2563eb] dark:text-[#38bdf8] break-all">
            {fullStoreUrl}
          </span>
        </div>
      </div>

      {/* CTA Action */}
      <button
        type="button"
        onClick={onFinish}
        className="w-full h-12 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] text-white font-semibold text-sm sm:text-base rounded-lg shadow-[0px_4px_6px_rgba(37,99,235,0.25)] hover:shadow-[0px_6px_12px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
      >
        <span>Continue</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default Step5Ready;
