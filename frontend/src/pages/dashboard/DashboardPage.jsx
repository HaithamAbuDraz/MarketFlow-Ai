import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  DashboardSidebar,
  DashboardHeader,
  KpiMetricsGrid,
  SalesChartSection,
  AiInsightsSection,
  TopProductsSection,
  LowStockAlertsSection,
  RecentOrdersSection,
  AiFloatingWidget,
} from '@/components/dashboard';

export const DashboardPage = () => {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If unauthenticated, redirect user flow to login page
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isAuthLoading, navigate]);

  // Dynamic store name from user session
  const storeName =
    user?.store_name ||
    user?.name ||
    localStorage.getItem('marketflow_store_name') ||
    'My Store';

  // Dynamic formatted date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const showToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(''), 3500);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    showToast('Refreshing dashboard metrics and insights...');
    setTimeout(() => {
      setIsLoading(false);
      showToast('Dashboard is up to date.');
    }, 800);
  };

  const handleAddProduct = () => {
    showToast('Add Product modal opened. You can create or import new products.');
  };

  const handleManageInventory = () => {
    showToast('Opening Inventory Manager: 6 low-stock items flagged.');
  };

  const handleViewAllProducts = () => {
    showToast('Navigating to full Products Catalog (64 products).');
  };

  const handleViewAllOrders = () => {
    showToast('Navigating to All Orders (1,248 orders).');
  };

  // If checking auth state or not logged in, prevent layout flicker
  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#070e20] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <span className="text-xs text-slate-400 font-medium">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-[#f8fafc] dark:bg-[#060b18] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-100 dark:selection:bg-blue-950 selection:text-blue-900 dark:selection:text-blue-200 transition-colors duration-200"
      data-node-id="652:3154"
    >
      {/* Left Navigation Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        storeName={storeName}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
      />

      {/* Main Content Workspace (Offset by 240px on lg screens) */}
      <div className="flex-1 flex flex-col lg:pl-[240px] min-w-0">
        {/* Top Navbar with Figma Notifications Dropdown */}
        <DashboardHeader
          storeName={storeName}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onViewAllNotifications={() => showToast('Navigating to full notifications center (18 total).')}
          onSelectNotification={(notif) => {
            if (notif.type === 'stock') {
              handleManageInventory();
            } else if (notif.type === 'order') {
              handleViewAllOrders();
            } else if (notif.type === 'ai') {
              setIsAiModalOpen(true);
            } else {
              showToast(`${notif.title}: ${notif.description}`);
            }
          }}
        />

        {/* Toast Notification Banner */}
        {notificationMsg && (
          <div className="fixed top-20 right-6 z-50 bg-[#0f172a] dark:bg-[#0d1c42] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl animate-modal-in flex items-center gap-2 border border-slate-700 dark:border-[#1e3a75]">
            <span className="text-[#38bdf8]">✦</span>
            <span>{notificationMsg}</span>
          </div>
        )}

        {/* Dashboard Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto space-y-6">
          {/* Section 1: Store Overview Header with Refresh Action */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            data-node-id="719:8649"
          >
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] dark:text-white tracking-tight">
                Store Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {todayFormatted} · {storeName}
              </p>
            </div>

            {/* Quick Refresh Button */}
            <button
              type="button"
              onClick={handleRefreshData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#0b1633] hover:bg-slate-50 dark:hover:bg-[#122244] active:bg-slate-100 dark:active:bg-[#152a55] border border-slate-200/80 dark:border-[#1e3a75] rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw
                size={13}
                className={`text-slate-500 dark:text-slate-400 ${isLoading ? 'animate-spin text-blue-600' : ''}`}
              />
              <span>{isLoading ? 'Syncing...' : 'Refresh Data'}</span>
            </button>
          </div>

          {/* Section 2: 4 Top KPI Metric Cards */}
          <KpiMetricsGrid isLoading={isLoading} />

          {/* Section 3: Sales Chart (8 cols) & MarketFlow AI Insights (4 cols) */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            data-node-id="719:8773"
          >
            <div className="lg:col-span-8">
              <SalesChartSection isLoading={isLoading} />
            </div>
            <div className="lg:col-span-4">
              <AiInsightsSection
                isLoading={isLoading}
                onAskAi={() => setIsAiModalOpen(true)}
              />
            </div>
          </div>

          {/* Section 4: Top Products (8 cols) & Low Stock Alerts (4 cols) */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            data-node-id="719:8865"
          >
            <div className="lg:col-span-8">
              <TopProductsSection
                isLoading={isLoading}
                onViewAll={handleViewAllProducts}
              />
            </div>
            <div className="lg:col-span-4">
              <LowStockAlertsSection
                isLoading={isLoading}
                onManageInventory={handleManageInventory}
              />
            </div>
          </div>

          {/* Section 5: Recent Orders (Full Width 12 cols) */}
          <RecentOrdersSection
            isLoading={isLoading}
            onViewAllOrders={handleViewAllOrders}
          />
        </main>
      </div>

      {/* Floating AI Robot Assistant */}
      <AiFloatingWidget storeName={storeName} />
    </div>
  );
};

export default DashboardPage;
