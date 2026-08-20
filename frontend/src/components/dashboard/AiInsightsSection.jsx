import React from 'react';
import { Sparkles } from 'lucide-react';

export const AiInsightsSection = ({ onAskAi, isLoading = false }) => {
  const insights = [
    {
      id: 1,
      icon: '📈',
      text: 'Smart Watch demand up 34% — restock before next week.',
      badge: 'Demand Spike',
    },
    {
      id: 2,
      icon: '💡',
      text: 'Bundle Headphones + Backpack for +$22 avg order value.',
      badge: 'Bundle Tip',
    },
    {
      id: 3,
      icon: '⚠️',
      text: '3 orders at delivery risk — review shipping today.',
      badge: 'Shipping Alert',
    },
    {
      id: 4,
      icon: '📦',
      text: 'New shipment of Laptops arriving — prepare inventory for launch.',
      badge: 'Inventory Inflow',
    },
  ];

  return (
    <div
      className="bg-white dark:bg-[#091530] rounded-xl border border-slate-200/80 dark:border-[#173066] p-5 shadow-xs flex flex-col justify-between h-full transition-colors duration-200"
      data-node-id="719:8834"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100 dark:border-[#14264e]">
        <div className="w-6 h-6 rounded-md bg-[#2563eb] text-white flex items-center justify-center shadow-xs">
          <Sparkles size={13} />
        </div>
        <h3 className="font-bold text-sm sm:text-base text-[#0f172a] dark:text-white tracking-tight">
          MarketFlow AI Insights
        </h3>
      </div>

      {/* Main Body */}
      {isLoading ? (
        <div className="py-5 flex flex-col items-center text-center animate-pulse">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#0e1d3e] flex items-center justify-center mb-3" />
          <div className="h-4 bg-slate-200 dark:bg-[#142347] rounded-md w-32 mb-2" />
          <div className="h-3 bg-slate-100 dark:bg-[#0e1d3e] rounded-md w-48 mb-4" />

          {/* Skeleton Preview Lines */}
          <div className="w-full space-y-2.5 px-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-200 dark:bg-[#142347] shrink-0" />
              <div className="h-2.5 bg-slate-200 dark:bg-[#142347] rounded-full w-4/5" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-200 dark:bg-[#142347] shrink-0" />
              <div className="h-2.5 bg-slate-200 dark:bg-[#142347] rounded-full w-full" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-200 dark:bg-[#142347] shrink-0" />
              <div className="h-2.5 bg-slate-200 dark:bg-[#142347] rounded-full w-3/4" />
            </div>
          </div>
        </div>
      ) : (
        /* Populated AI Insights List */
        <div className="py-2.5 space-y-2 flex-1 flex flex-col justify-around">
          {insights.map((item) => (
            <div
              key={item.id}
              onClick={onAskAi}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50/70 dark:bg-[#0e1d3e]/80 hover:bg-blue-50/60 dark:hover:bg-[#142852] border border-slate-100 dark:border-[#1a3568] hover:border-blue-200/70 dark:hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <span className="text-base shrink-0 select-none mt-0.5">
                {item.icon}
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-snug group-hover:text-blue-900 dark:group-hover:text-blue-200 transition-colors">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      <button
        type="button"
        onClick={onAskAi}
        className="w-full h-9 mt-2 bg-white dark:bg-[#0b1633] hover:bg-slate-50 dark:hover:bg-[#122244] active:bg-slate-100 dark:active:bg-[#152a55] border border-slate-200 dark:border-[#1e3a75] text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
      >
        <span className="text-[#2563eb] dark:text-[#38bdf8] text-sm">✦</span>
        <span>Ask AI Assistant</span>
      </button>
    </div>
  );
};

export default AiInsightsSection;
