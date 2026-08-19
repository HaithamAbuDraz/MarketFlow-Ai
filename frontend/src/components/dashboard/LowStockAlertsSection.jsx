import React from 'react';

export const LowStockAlertsSection = ({ onManageInventory, isLoading = false }) => {
  const stockItems = [
    {
      id: 1,
      icon: '⌚',
      name: 'Smart Watch Series X',
      left: '4 left',
      percentage: 25,
      isCritical: false,
    },
    {
      id: 2,
      icon: '👟',
      name: 'Running Shoes Air (Size 42)',
      left: '2 left',
      percentage: 15,
      isCritical: true,
    },
    {
      id: 3,
      icon: '🎧',
      name: 'Wireless Headphones Pro',
      left: '8 left',
      percentage: 45,
      isCritical: false,
    },
    {
      id: 4,
      icon: '📱',
      name: 'Smartphone Model Y',
      left: '5 left',
      percentage: 30,
      isCritical: false,
    },
    {
      id: 5,
      icon: '📷',
      name: 'Digital Camera Z',
      left: '3 left',
      percentage: 20,
      isCritical: true,
    },
    {
      id: 6,
      icon: '🕶️',
      name: 'Sunglasses Classic',
      left: '10 left',
      percentage: 55,
      isCritical: false,
    },
  ];

  return (
    <div
      className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full"
      data-node-id="719:8974"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-sm sm:text-base text-[#0f172a] tracking-tight">
          Low Stock Alerts
        </h3>
        {isLoading ? (
          <div className="w-14 h-5 bg-slate-200 rounded-full animate-pulse" />
        ) : (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200/80">
            3 items
          </span>
        )}
      </div>

      {/* Main Content */}
      {isLoading ? (
        /* Skeleton Loading List */
        <div className="py-3 space-y-3.5 flex-1 flex flex-col justify-around animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-200 rounded-full" />
                  <div className="h-3 bg-slate-200 rounded-md w-32" />
                </div>
                <div className="h-3 bg-slate-200 rounded-md w-8" />
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-200 rounded-full w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Populated Stock Alerts List */
        <div className="py-2 space-y-2.5 flex-1 flex flex-col justify-around">
          {stockItems.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0 pr-2">
                  <span className="text-xs shrink-0 select-none">{item.icon}</span>
                  <span className="font-semibold text-[#0f172a] truncate text-xs">
                    {item.name}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-bold shrink-0 ${
                    item.isCritical ? 'text-rose-600' : 'text-amber-600'
                  }`}
                >
                  {item.left}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    item.isCritical ? 'bg-rose-500' : 'bg-amber-400'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      <button
        type="button"
        onClick={onManageInventory}
        className="w-full h-8.5 mt-2 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
      >
        <span>Manage Inventory</span>
        <span className="text-xs">→</span>
      </button>
    </div>
  );
};

export default LowStockAlertsSection;
