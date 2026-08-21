import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Moon, Sun, ChevronDown, Menu, LogOut, Settings, CreditCard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { NotificationsDropdown } from './NotificationsDropdown';

export const DashboardHeader = ({
  storeName,
  onToggleSidebar,
  onOpenNotifications,
  onViewAllNotifications,
  onSelectNotification,
}) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const displayName = storeName || user?.store_name || user?.name || 'My Store';
  const displayEmail = user?.email || '';
  const initials = displayName
    ? displayName
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'MS';

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <header
      className="h-[72px] bg-white dark:bg-[#070e20] border-b border-[#e2e8f0] dark:border-[#142347] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 select-none transition-colors duration-200"
      data-node-id="278:89"
    >
      {/* Left: Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <h1
          className="text-xl sm:text-2xl font-bold text-[#0f172a] dark:text-white tracking-tight"
          data-node-id="278:90"
        >
          Dashboard
        </h1>
      </div>

      {/* Center / Right: Search Bar & Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search Bar (Node 278:94) */}
        <div className="relative hidden md:block w-[240px] lg:w-[280px]">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-[40px] pl-9 pr-4 text-xs sm:text-sm bg-slate-50 dark:bg-[#0b1633] border border-slate-200 dark:border-[#1e3a75] rounded-lg text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Action Controls Group (Node 719:9146) */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle (Node 718:4569) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-slate-200 dark:border-[#1e3a75] bg-white dark:bg-[#0b1633] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#122244] active:scale-95 transition-all cursor-pointer shadow-xs"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <Sun size={18} className="text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon size={18} className="text-slate-600 transition-transform duration-300 rotate-0 hover:-rotate-12" />
            )}
          </button>

          {/* Notifications Bell & Dropdown (Figma Node 777:9480 & 777:8797) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsUserMenuOpen(false);
                onOpenNotifications?.();
              }}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center relative transition-all cursor-pointer shadow-xs ${
                isNotificationsOpen
                  ? 'border-[#2563eb] bg-blue-50/70 dark:bg-[#0c1e48] text-[#2563eb] dark:text-[#38bdf8] ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-[#1e3a75] bg-white dark:bg-[#0b1633] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#122244]'
              }`}
              title="Notifications"
              aria-expanded={isNotificationsOpen}
              aria-label="Open notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-[#070e20]" />
            </button>

            {/* Figma Node 777:8797 Notifications Dropdown */}
            <NotificationsDropdown
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              onViewAll={() => {
                setIsNotificationsOpen(false);
                onViewAllNotifications?.();
              }}
              onSelectNotification={(item) => {
                setIsNotificationsOpen(false);
                onSelectNotification?.(item);
              }}
            />
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-[#142347] mx-1" />

          {/* User / Store Profile Dropdown Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-[#0b1633] border border-transparent hover:border-slate-200 dark:hover:border-[#1e3a75] transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6366f1] to-[#a855f7] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#0f172a] dark:text-white leading-tight truncate max-w-[120px]">
                  {displayName}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  {user?.role === 'admin' ? 'Administrator' : 'Store Owner'}
                </div>
              </div>
              <ChevronDown size={14} className="hidden sm:block text-slate-400 dark:text-slate-400" />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#091530] rounded-xl shadow-lg border border-slate-100 dark:border-[#1e3a75] py-1.5 z-50 animate-modal-in text-xs font-medium text-slate-700 dark:text-slate-200">
                <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-[#142347]">
                  <div className="font-semibold text-[#0f172a] dark:text-white truncate">{displayName}</div>
                  {displayEmail && (
                    <div className="text-[11px] text-slate-400 dark:text-slate-400 truncate mt-0.5">{displayEmail}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-[#122244] transition-colors cursor-pointer text-left"
                >
                  <Settings size={14} className="text-slate-400" />
                  <span>Store Settings</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-[#122244] transition-colors cursor-pointer text-left"
                >
                  <CreditCard size={14} className="text-slate-400" />
                  <span>Billing & Plans</span>
                </button>
                <div className="border-t border-slate-100 dark:border-[#142347] my-1" />
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer text-left font-semibold"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

