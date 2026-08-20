import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export const TermsModal = ({ isOpen, onClose, title = 'Terms & Conditions' }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[480px] bg-white dark:bg-[#091530] rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 dark:border-[#173066] relative max-h-[90vh] flex flex-col transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-[#14264e] shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-blue-600 dark:text-[#38bdf8]" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          </div>
          <button 
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#122244] rounded-lg transition-colors cursor-pointer"
            onClick={onClose} 
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pr-1 flex-1">
          <p className="mb-3">
            Welcome to <strong className="text-slate-900 dark:text-white">MarketFlow-AI</strong>. By creating an account or using our platform, you agree to comply with our store management policies, data privacy protocols, and acceptable usage guidelines.
          </p>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">1. Data Security & Storage</h4>
          <p className="mb-3 text-slate-500 dark:text-slate-400">
            All user credentials are encrypted with Bcrypt and secured using Laravel Sanctum token protocols. Sensitive payment details are processed through PCI-DSS compliant sandbox gateways.
          </p>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">2. Storefront & AI Analytics</h4>
          <p className="mb-2 text-slate-500 dark:text-slate-400">
            MarketFlow-AI provides smart automated inventory alerts, trend analyses, and performance reports designed to help merchants optimize online operations.
          </p>
        </div>

        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-[#14264e] flex justify-end shrink-0">
          <button 
            className="py-2 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-sm"
            onClick={onClose}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
