import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  BarChart3,
  Megaphone,
  Sparkles,
  Store,
  Settings,
  CircleHelp,
  ChevronRight,
  X,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/common';

export const DashboardSidebar = ({
  activeTab = 'dashboard',
  onSelectTab,
  storeName,
  userRole = 'Store Owner · Admin',
  isOpen = false,
  onClose,
  onOpenAiAssistant,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    {
      id: 'ai-workspace',
      label: 'AI Workspace',
      icon: Sparkles,
      badge: 'AI',
    },
    { id: 'storefront', label: 'Storefront', icon: Store },
  ];

  const secondaryNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help Center', icon: CircleHelp },
  ];

  const displayName = storeName || user?.store_name || user?.name || 'My Store';
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
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[240px] bg-[#070e20] text-slate-300 flex flex-col justify-between border-r border-[#142347]/60 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } select-none`}
        data-node-id="718:5617"
      >
        {/* Top Section: Logo & Brand */}
        <div>
          <div className="h-[76px] px-5 flex items-center justify-between border-b border-[#142347]/40">
            <div className="flex items-center gap-2.5">
              <Logo size={32} showText={false} />
              <div className="flex items-center text-[17px] font-bold tracking-tight">
                <span className="text-white">MarketFlow</span>
                <span className="text-[#0ea2f2] ml-1">AI</span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav List */}
          <div className="px-3 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-340px)] custom-scrollbar">
            {/* Main Menu Label */}
            <div>
              <div className="px-3 pb-2 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
                Main Menu
              </div>

              <div className="space-y-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab?.(item.id);
                        onClose?.();
                      }}
                      className={`w-full h-[42px] px-3 rounded-lg flex items-center justify-between text-sm font-medium transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#2563eb] text-white shadow-md shadow-blue-600/30'
                          : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? 'text-white' : 'text-[#94a3b8]'} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-[#1e293b] text-[#38bdf8] border border-[#0ea5e9]/40'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Secondary Nav */}
            <div className="space-y-1 pt-2 border-t border-[#142347]/40">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab?.(item.id);
                      onClose?.();
                    }}
                    className={`w-full h-[42px] px-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#2563eb] text-white'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-[#94a3b8]'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Area: AI Assistant Card + Store Profile */}
        <div className="p-3 space-y-3 border-t border-[#142347]/50 bg-[#060b18]">
          {/* AI Assistant Mini Widget (Node 718:5708) */}
          <div className="rounded-xl bg-gradient-to-b from-[#0e1d3e] to-[#09142d] border border-[#1e3a75] p-3.5 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-1.5">
              <span className="text-[#38bdf8] text-sm">✦</span>
              <span>AI Assistant</span>
            </div>
            <p className="text-[11px] text-[#94a3b8] leading-tight mb-3">
              Ask me anything about your business...
            </p>
            <button
              type="button"
              onClick={onOpenAiAssistant}
              className="w-full h-[32px] bg-white hover:bg-slate-100 text-[#0f172a] font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>Open Assistant</span>
              <span className="text-xs">→</span>
            </button>
          </div>

          {/* Store Profile Bar (Node 718:5721) */}
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6366f1] to-[#a855f7] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">
                  {displayName}
                </div>
                <div className="text-[10px] text-[#64748b] truncate">
                  {user?.role === 'admin' ? 'Store Owner · Admin' : 'Store Owner'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              title="Sign Out"
              className="p-1 rounded-md text-[#64748b] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
