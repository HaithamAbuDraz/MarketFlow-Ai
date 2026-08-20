import React from 'react';
import { BookmarkCheck, X, ArrowRight } from 'lucide-react';

export const SaveExitModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-modal-in">
      <div className="bg-white dark:bg-[#091530] rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100 dark:border-[#173066] flex flex-col gap-5 relative transition-colors duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#2563eb] dark:text-[#38bdf8] flex items-center justify-center shrink-0">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0f172a] dark:text-white">Save &amp; Exit?</h3>
            <p className="text-sm text-[#475569] dark:text-slate-400">
              Your progress will be saved automatically so you can continue anytime.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-[#475569] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#122244] rounded-lg transition-colors cursor-pointer"
          >
            Stay &amp; Continue
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-lg shadow-sm transition-all duration-150 flex items-center gap-2 cursor-pointer"
          >
            <span>Save &amp; Exit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveExitModal;
