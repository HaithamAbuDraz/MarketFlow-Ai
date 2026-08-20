import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export const PasswordStrengthIndicator = ({ password = '' }) => {
  if (!password) return null;

  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = requirements.filter((r) => r.met).length;

  const getStrength = () => {
    if (metCount <= 1) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400', width: 'w-1/4' };
    if (metCount === 2) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', width: 'w-2/4' };
    if (metCount === 3) return { label: 'Good', color: 'bg-sky-500', text: 'text-sky-600 dark:text-sky-400', width: 'w-3/4' };
    return { label: 'Strong', color: 'bg-emerald-500 dark:bg-emerald-400', text: 'text-emerald-600 dark:text-emerald-400', width: 'w-full' };
  };

  const strength = getStrength();

  return (
    <div className="bg-[#f8fafc] dark:bg-[#0c1836]/90 border border-[#e2e8f0] dark:border-[#1e3a75] rounded-[8px] p-2.5 flex flex-col gap-2 animate-fade-in select-none transition-colors duration-200">
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-700 dark:text-slate-300">
        <span>Password must contain:</span>
        <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-1 text-[11px]">
        {requirements.map((req, idx) => (
          <div key={idx} className="flex items-center gap-1">
            {req.met ? (
              <CheckCircle2 size={12} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
            ) : (
              <Circle size={12} className="text-slate-300 dark:text-slate-600 shrink-0" />
            )}
            <span className={req.met ? 'text-slate-800 dark:text-slate-200 font-medium' : 'text-slate-500 dark:text-slate-400'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>

      {/* Live Strength Bar */}
      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800/90 rounded-full overflow-hidden">
        <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
