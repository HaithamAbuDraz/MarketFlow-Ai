import React from 'react';
import { DollarSign, ShoppingBag, Package, Users, ArrowUp } from 'lucide-react';

export const KpiMetricsGrid = ({
  metrics = {
    revenue: '$28,540',
    revenueGrowth: '+18.6%',
    sales: '1,248',
    salesGrowth: '+12.4%',
    orders: '1,248',
    ordersGrowth: '+12.4%',
    customers: '8,542',
    customersGrowth: '+16.8%',
  },
  isLoading = false,
}) => {
  const cards = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: metrics.revenue || '$28,540',
      growth: metrics.revenueGrowth || '+18.6%',
      icon: DollarSign,
    },
    {
      id: 'sales',
      title: 'Total Sales',
      value: metrics.sales || '1,248',
      growth: metrics.salesGrowth || '+12.4%',
      icon: ShoppingBag,
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: metrics.orders || '1,248',
      growth: metrics.ordersGrowth || '+12.4%',
      icon: Package,
    },
    {
      id: 'customers',
      title: 'Total Customers',
      value: metrics.customers || '8,542',
      growth: metrics.customersGrowth || '+16.8%',
      icon: Users,
    },
  ];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      data-node-id="719:8655"
    >
      {cards.map((card) => {
        const Icon = card.icon;

        if (isLoading) {
          return (
            <div
              key={card.id}
              className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 bg-slate-200 rounded-md w-24" />
                <div className="w-5 h-5 bg-slate-100 rounded-md" />
              </div>
              <div className="h-8 bg-slate-200 rounded-md w-32 my-3" />
              <div className="h-4 bg-slate-100 rounded-md w-28" />
            </div>
          );
        }

        return (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
          >
            {/* Header: Title & Icon */}
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-slate-500">
                {card.title}
              </span>
              <div className="w-6 h-6 flex items-center justify-end text-slate-400">
                <Icon size={16} />
              </div>
            </div>

            {/* Value */}
            <div className="text-2xl sm:text-[28px] font-bold text-[#0f172a] tracking-tight my-2">
              {card.value}
            </div>

            {/* Growth Rate vs Last Month */}
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600 bg-emerald-50/80 px-1.5 py-0.5 rounded">
                <ArrowUp size={11} className="stroke-[2.5]" />
                <span>{card.growth}</span>
              </span>
              <span className="text-slate-400 font-normal">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KpiMetricsGrid;
