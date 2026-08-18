import React from 'react';
import { Logo } from '@/components/common/Logo';

export const OnboardingHeader = ({ onSaveAndExit }) => {
  return (
    <header className="w-full h-[72px] bg-white border-b border-[#e4e9f2] px-6 sm:px-10 flex items-center justify-between shrink-0 sticky top-0 z-30">
      {/* Left: Branding */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <Logo size={36} showText={false} />
        <span className="font-['Inter'] font-bold text-lg sm:text-[20px] text-[#0f172a] tracking-tight select-none">
          MarketFlow <span className="text-[#2563eb]">AI</span>
        </span>
      </div>

      {/* Right: Save & Exit Button */}
      <button
        type="button"
        onClick={onSaveAndExit}
        className="h-10 px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium rounded-lg transition-colors duration-150 flex items-center justify-center shadow-sm active:scale-[0.98] cursor-pointer"
      >
        Save &amp; Exit
      </button>
    </header>
  );
};

export default OnboardingHeader;
