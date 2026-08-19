import React from 'react';

export const TopProductsSection = ({
  products,
  onViewAll,
  isLoading = false,
}) => {
  // Default populated products from Figma node 719:8867
  const defaultProducts = [
    {
      id: 1,
      rank: 1,
      name: 'Wireless Headphones Pro',
      sku: 'SKU-00421',
      icon: '🎧',
      units: '2,430',
      revenue: '$194,400',
      trend: '+12%',
      isPositive: true,
    },
    {
      id: 2,
      rank: 2,
      name: 'Smart Watch Series X',
      sku: 'SKU-00318',
      icon: '⌚',
      units: '1,892',
      revenue: '$472,980',
      trend: '+8%',
      isPositive: true,
    },
    {
      id: 3,
      rank: 3,
      name: 'Leather Backpack',
      sku: 'SKU-00205',
      icon: '🎒',
      units: '1,230',
      revenue: '$110,700',
      trend: '+5%',
      isPositive: true,
    },
    {
      id: 4,
      rank: 4,
      name: 'Sunglasses UV400',
      sku: 'SKU-00149',
      icon: '🕶️',
      units: '984',
      revenue: '$49,200',
      trend: '+3%',
      isPositive: true,
    },
    {
      id: 5,
      rank: 5,
      name: 'Running Shoes Air',
      sku: 'SKU-00087',
      icon: '👟',
      units: '743',
      revenue: '$111,450',
      trend: '-2%',
      isPositive: false,
    },
  ];

  const displayList = products && products.length > 0 ? products : defaultProducts;

  return (
    <div
      className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full"
      data-node-id="719:8867"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-base text-[#0f172a] tracking-tight">
            Top Products
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Best-performing products this month
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 rounded-md transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto my-1.5">
        <table className="w-full text-left border-collapse min-w-[520px]">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="py-2.5 pl-2 w-8">#</th>
              <th className="py-2.5">Product</th>
              <th className="py-2.5 text-right w-20">Units</th>
              <th className="py-2.5 text-right w-28">Revenue</th>
              <th className="py-2.5 text-right w-20 pr-2">Trend</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              /* Skeleton Loading Rows */
              [1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-slate-50 animate-pulse">
                  <td className="py-2.5 pl-2">
                    <div className="w-4 h-4 rounded bg-slate-200" />
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-200 shrink-0" />
                      <div className="space-y-1.5">
                        <div className="h-3 bg-slate-200 rounded-md w-36" />
                        <div className="h-2 bg-slate-100 rounded-md w-16" />
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="h-3 bg-slate-200 rounded-md w-12 ml-auto" />
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="h-3 bg-slate-200 rounded-md w-16 ml-auto" />
                  </td>
                  <td className="py-2.5 text-right pr-2">
                    <div className="h-3 bg-slate-200 rounded-md w-10 ml-auto" />
                  </td>
                </tr>
              ))
            ) : (
              /* Populated Product Rows */
              displayList.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors text-xs"
                >
                  <td className="py-2.5 pl-2 font-medium text-slate-400">
                    {p.rank}
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm shrink-0">
                        {p.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-[#0f172a] leading-tight">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {p.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 text-right font-medium text-slate-600">
                    {p.units}
                  </td>
                  <td className="py-2.5 text-right font-bold text-[#0f172a]">
                    {p.revenue}
                  </td>
                  <td className="py-2.5 text-right pr-2">
                    <span
                      className={`font-semibold ${
                        p.isPositive ? 'text-emerald-600' : 'text-rose-500'
                      }`}
                    >
                      {p.trend}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProductsSection;
