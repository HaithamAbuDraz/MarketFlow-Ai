import React from 'react';

export const RecentOrdersSection = ({
  orders,
  onViewAllOrders,
  isLoading = false,
}) => {
  // Default populated orders from Figma node 719:9051
  const defaultOrders = [
    {
      id: 1,
      order_number: '#ORD-8821',
      customer_name: 'Sara Al-Rashidi',
      product_name: 'Smart Watch Series X',
      amount: '$249.99',
      status: 'Delivered',
      statusType: 'success',
      date: 'Aug 15, 2026',
    },
    {
      id: 2,
      order_number: '#ORD-8820',
      customer_name: 'Ahmed Khalil',
      product_name: 'Wireless Headphones Pro',
      amount: '$79.99',
      status: 'Shipped',
      statusType: 'info',
      date: 'Aug 15, 2026',
    },
    {
      id: 3,
      order_number: '#ORD-8819',
      customer_name: 'Lena Müller',
      product_name: 'Leather Backpack',
      amount: '$89.99',
      status: 'Processing',
      statusType: 'warning',
      date: 'Aug 14, 2026',
    },
    {
      id: 4,
      order_number: '#ORD-8818',
      customer_name: 'James Okonkwo',
      product_name: 'Running Shoes Air',
      amount: '$149.99',
      status: 'Pending',
      statusType: 'pending',
      date: 'Aug 14, 2026',
    },
    {
      id: 5,
      order_number: '#ORD-8817',
      customer_name: 'Yuki Tanaka',
      product_name: 'Sunglasses UV400',
      amount: '$49.99',
      status: 'Delivered',
      statusType: 'success',
      date: 'Aug 13, 2026',
    },
    {
      id: 6,
      order_number: '#ORD-8816',
      customer_name: 'Maria Santos',
      product_name: 'Smart Watch Series X',
      amount: '$249.99',
      status: 'Cancelled',
      statusType: 'danger',
      date: 'Aug 13, 2026',
    },
  ];

  const displayOrders = orders && orders.length > 0 ? orders : defaultOrders;

  const getStatusBadge = (status, type) => {
    switch (type) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{status}</span>
          </span>
        );
      case 'info':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>{status}</span>
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>{status}</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>{status}</span>
          </span>
        );
      case 'danger':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>{status}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-50 text-slate-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div
      className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between"
      data-node-id="719:9051"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-base text-[#0f172a] tracking-tight">
            Recent Orders
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Latest orders and status
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAllOrders}
          className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 rounded-md transition-colors cursor-pointer"
        >
          View All Orders
        </button>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto my-1.5">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="py-2.5 pl-2 w-32">Order ID</th>
              <th className="py-2.5 w-48">Customer</th>
              <th className="py-2.5">Product</th>
              <th className="py-2.5 text-right w-28">Amount</th>
              <th className="py-2.5 text-center w-36">Status</th>
              <th className="py-2.5 text-right w-32 pr-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              /* Skeleton Loading Order Rows */
              [1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className="border-b border-slate-50 animate-pulse">
                  <td className="py-3 pl-2">
                    <div className="h-3.5 bg-slate-200 rounded-md w-20" />
                  </td>
                  <td className="py-3">
                    <div className="h-3.5 bg-slate-200 rounded-md w-28" />
                  </td>
                  <td className="py-3">
                    <div className="h-3.5 bg-slate-200 rounded-md w-36" />
                  </td>
                  <td className="py-3 text-right">
                    <div className="h-3.5 bg-slate-200 rounded-md w-14 ml-auto" />
                  </td>
                  <td className="py-3 text-center">
                    <div className="h-5 bg-slate-200 rounded-full w-20 mx-auto" />
                  </td>
                  <td className="py-3 text-right pr-2">
                    <div className="h-3.5 bg-slate-200 rounded-md w-20 ml-auto" />
                  </td>
                </tr>
              ))
            ) : (
              /* Populated Order Rows */
              displayOrders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors text-xs"
                >
                  <td className="py-3 pl-2 font-mono font-medium text-slate-600">
                    {o.order_number}
                  </td>
                  <td className="py-3 font-semibold text-[#0f172a]">
                    {o.customer_name}
                  </td>
                  <td className="py-3 text-slate-600 font-medium">
                    {o.product_name}
                  </td>
                  <td className="py-3 text-right font-bold text-[#0f172a]">
                    {o.amount}
                  </td>
                  <td className="py-3 text-center">
                    {getStatusBadge(o.status, o.statusType)}
                  </td>
                  <td className="py-3 text-right pr-2 text-slate-400 font-medium">
                    {o.date}
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

export default RecentOrdersSection;
