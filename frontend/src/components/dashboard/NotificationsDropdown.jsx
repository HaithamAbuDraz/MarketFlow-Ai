import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  Package,
  CheckCircle2,
  BarChart3,
  Sparkles,
  Check,
  Trash2,
  ChevronRight,
  X,
} from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'stock',
    icon: AlertTriangle,
    emoji: '⚠️',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/50',
    badgeText: 'text-amber-600 dark:text-amber-400',
    badgeBorder: 'border-amber-200/60 dark:border-amber-500/30',
    title: 'Low Stock Alert',
    description: 'Smart Watch Series X — only 4 units left',
    time: '2m ago',
    unread: true,
    actionLabel: 'Restock',
  },
  {
    id: 'notif-2',
    type: 'order',
    icon: Package,
    emoji: '📦',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/50',
    badgeText: 'text-blue-600 dark:text-blue-400',
    badgeBorder: 'border-blue-200/60 dark:border-blue-500/30',
    title: 'New Order Received',
    description: '#ORD-8822 from Fatima Al-Zahra · $249.99',
    time: '15m ago',
    unread: true,
    actionLabel: 'View Order',
  },
  {
    id: 'notif-3',
    type: 'delivery',
    icon: CheckCircle2,
    emoji: '✅',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50',
    badgeText: 'text-emerald-600 dark:text-emerald-400',
    badgeBorder: 'border-emerald-200/60 dark:border-emerald-500/30',
    title: 'Order Delivered',
    description: '#ORD-8817 delivered successfully to Yuki Tanaka',
    time: '1h ago',
    unread: true,
    actionLabel: 'Details',
  },
  {
    id: 'notif-4',
    type: 'report',
    icon: BarChart3,
    emoji: '📊',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/50',
    badgeText: 'text-purple-600 dark:text-purple-400',
    badgeBorder: 'border-purple-200/60 dark:border-purple-500/30',
    title: 'Weekly Report Ready',
    description: 'Your August performance report is now available',
    time: '3h ago',
    unread: false,
    actionLabel: 'Download',
  },
  {
    id: 'notif-5',
    type: 'ai',
    icon: Sparkles,
    emoji: '💡',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/50',
    badgeText: 'text-cyan-600 dark:text-cyan-400',
    badgeBorder: 'border-cyan-200/60 dark:border-cyan-500/30',
    title: 'AI Insight Available',
    description: 'Bundle opportunity: Headphones + Backpack → +$22 AOV',
    time: '5h ago',
    unread: false,
    actionLabel: 'Explore',
  },
];

export const NotificationsDropdown = ({
  isOpen,
  onClose,
  onViewAll,
  onSelectNotification,
}) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleToggleRead = (id, e) => {
    e?.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const handleDelete = (id, e) => {
    e?.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => n.unread)
      : notifications;

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-[350px] sm:w-[370px] bg-white dark:bg-[#091530] border border-slate-200/90 dark:border-[#173066] rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.18)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.65)] z-50 overflow-hidden animate-modal-in select-none font-sans"
      data-node-id="777:8797"
      role="dialog"
      aria-label="Notifications Dropdown"
    >
      {/* Header (Figma Node 777:8798) */}
      <div className="px-4 py-3.5 border-b border-slate-100 dark:border-[#142347] flex items-center justify-between bg-slate-50/50 dark:bg-[#060c1d]/60">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm sm:text-[15px] text-[#0f172a] dark:text-white tracking-tight" data-node-id="777:8800">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/70 text-[#2563eb] dark:text-[#38bdf8] border border-blue-200/60 dark:border-blue-500/30"
              data-node-id="777:8802"
            >
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-[#2563eb] dark:hover:text-[#38bdf8] transition-colors px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
            >
              Mark all read
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close notifications"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Filter Tabs (All / Unread) */}
      <div className="px-4 py-1.5 border-b border-slate-100 dark:border-[#142347]/60 flex items-center gap-1 bg-white dark:bg-[#091530]">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-slate-100 dark:bg-[#122347] text-[#0f172a] dark:text-white'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('unread')}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
            filter === 'unread'
              ? 'bg-slate-100 dark:bg-[#122347] text-[#0f172a] dark:text-white'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List (Figma Nodes 777:8806 - 777:8877) */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-[#142347]/50 custom-scrollbar">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#0f1f44] flex items-center justify-center text-slate-400 dark:text-slate-500">
              <Check size={20} />
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                onClick={() => onSelectNotification?.(notif)}
                className={`p-3.5 sm:px-4 flex items-start gap-3 transition-colors cursor-pointer group ${
                  notif.unread
                    ? 'bg-blue-50/30 dark:bg-blue-950/15 hover:bg-blue-50/60 dark:hover:bg-blue-950/30'
                    : 'hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                }`}
              >
                {/* Icon Badge */}
                <div
                  className={`w-9 h-9 rounded-xl ${notif.badgeBg} ${notif.badgeText} border ${notif.badgeBorder} flex items-center justify-center shrink-0 shadow-2xs mt-0.5`}
                >
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs sm:text-[13px] text-[#0f172a] dark:text-white leading-tight">
                        {notif.title}
                      </span>
                      {notif.unread && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#2563eb] shadow-[0_0_6px_#2563eb]"
                          title="Unread"
                        />
                      )}
                    </div>
                    <span className="text-[10.5px] font-medium text-slate-400 dark:text-slate-500 shrink-0">
                      {notif.time}
                    </span>
                  </div>

                  <p className="text-[11.5px] sm:text-xs text-slate-600 dark:text-slate-300 font-normal leading-snug mt-1 line-clamp-2">
                    {notif.description}
                  </p>

                  {/* Actions on hover */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-transparent group-hover:border-slate-100 group-hover:dark:border-white/5 transition-colors">
                    <span className="text-[10px] font-semibold text-[#2563eb] dark:text-[#38bdf8] flex items-center gap-0.5 hover:underline">
                      <span>{notif.actionLabel}</span>
                      <ChevronRight size={11} />
                    </span>

                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => handleToggleRead(notif.id, e)}
                        className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
                        title={notif.unread ? 'Mark as read' : 'Mark as unread'}
                      >
                        <Check size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(notif.id, e)}
                        className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer (Figma Node 777:8894) */}
      <div
        className="p-3 border-t border-slate-100 dark:border-[#142347] bg-slate-50/60 dark:bg-[#060c1d]/80 text-center"
        data-node-id="777:8894"
      >
        <button
          type="button"
          onClick={() => {
            onClose();
            onViewAll?.();
          }}
          className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-[#2563eb] dark:text-[#38bdf8] hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer w-full py-1 rounded-lg hover:bg-blue-50/60 dark:hover:bg-blue-950/30"
          data-node-id="777:8895"
        >
          <span>View all notifications</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
