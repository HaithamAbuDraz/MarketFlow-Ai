import React from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Boxes,
  BarChart3,
  Send,
  Users,
  Sparkles,
  Settings,
  Headphones,
  Watch,
  Briefcase,
  ChevronDown,
  TrendingUp,
  Activity,
  CheckCircle2,
} from 'lucide-react';

/* ==========================================================================
   MarketFlow AI Brand SVG Components
   ========================================================================== */

const LogoMarkIcon = ({ className = 'w-9 h-7' }) => (
  <svg
    viewBox="0 0 47 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="mf_hero_logo_g1" x1="40.4894" y1="13" x2="40.4894" y2="37" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0EA2F2" />
        <stop offset="1" stopColor="#065CED" />
      </linearGradient>
      <linearGradient id="mf_hero_logo_g2" x1="17.9453" y1="2" x2="17.9453" y2="37" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0EA2F2" />
        <stop offset="1" stopColor="#065CED" />
      </linearGradient>
      <linearGradient id="mf_hero_logo_g3" x1="34.8942" y1="21.3084" x2="34.8942" y2="29.8401" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8AE9FF" />
        <stop offset="1" stopColor="#05BDE9" />
      </linearGradient>
    </defs>
    <path
      d="M37 18.618L41.4545 13.2566C43.1855 12.4397 43.8727 13.7672 44 14.5332V35.2129C44 36.2341 43.1091 37 42.6 37H39.0364C37.3818 36.8723 37.0848 35.6809 37.1273 35.2129L37 28.3196C37.2036 26.6857 38.2727 26.7878 39.6727 26.4048C42.7273 25.1283 41.55 24.1071 39.9273 23.7241C37.7636 23.2135 37.2121 22.9582 37 22.32V18.618Z"
      fill="url(#mf_hero_logo_g1)"
    />
    <path
      d="M1.52643 37C1.9317 34.1643 5.1569 30.3327 6.71885 28.7714L6.46556 12.9471L16.7237 22.948C17.9395 24.2646 19.7632 24.847 21.9162 23.3278L35.3405 10.5418C37.1135 8.13652 34.8339 6.74398 34.074 7.25036L21.9162 18.6438L5.7057 3.07275C2.4636 0.642139 0.555495 2.90396 0.0067033 4.33869V33.7086C-0.0946121 36.0379 0.977643 36.8734 1.52643 37Z"
      fill="url(#mf_hero_logo_g2)"
    />
    <path
      d="M7.86101 37H2C3.27877 30.4171 11.5019 27.4414 15.4537 26.7765C18.7572 26.0783 23.668 23.4102 25.7105 22.1634C30.8255 19.4704 38.5869 9.15547 41.8283 4.33463L39.1642 3.71124C38.5248 3.41202 38.8089 3.08786 39.031 2.96318L45.8244 0.22029C46.6769 -0.178676 46.89 0.054054 46.89 0.22029V7.32688C47.2097 8.22455 46.7568 8.44897 46.4904 8.44897L44.4924 6.08011C42.1479 10.8677 31.7935 20.4595 26.9093 24.657H28.641C29.2804 25.0559 28.9962 25.405 28.7742 25.5297H25.3109C22.9664 27.2253 18.6506 28.896 16.7857 29.5194C11.2444 30.816 8.52704 35.0467 7.86101 37Z"
      fill="#05BDE9"
    />
    <path
      d="M31.4939 25.0087C34.3382 24.5919 34.4144 22.5339 34.2874 21.6222C34.1604 20.7104 35.5571 20.8407 35.3032 21.7524C35.2016 24.6701 37.2078 24.7482 38.3506 25.0087C39.3146 25.2285 39.1125 26.0508 38.3506 26.0508C35.6079 25.9466 35.2609 28.265 35.4302 29.4373C35.3032 30.4793 34.2288 29.8281 34.2874 29.4373C34.6937 26.7281 32.5944 26.0508 31.4939 26.0508C30.6051 25.9205 31.113 25.0087 31.4939 25.0087Z"
      fill="url(#mf_hero_logo_g3)"
    />
  </svg>
);

/* ==========================================================================
   Holographic AI Brain Illustration SVG
   ========================================================================== */

const HolographicAiBrain = ({ className = 'w-16 h-16' }) => (
  <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
    {/* Ambient Glow */}
    <div className="absolute inset-0 rounded-full bg-[#00d2ff]/25 blur-md animate-pulse" />
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
      <defs>
        <radialGradient id="brain_core_glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8AE9FF" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#0EA2F2" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#065CED" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="brain_wire_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8AE9FF" />
          <stop offset="50%" stopColor="#0EA2F2" />
          <stop offset="100%" stopColor="#0055ff" />
        </linearGradient>
      </defs>

      {/* Head Profile Silhouette */}
      <path
        d="M 32 78 C 30 75 32 68 34 64 C 28 58 26 48 28 38 C 31 24 44 16 58 16 C 72 16 82 25 84 40 C 85 52 78 62 72 68 C 70 72 71 78 68 82 L 40 82 Z"
        stroke="url(#brain_wire_grad)"
        strokeWidth="1.6"
        strokeDasharray="2 2"
        fill="none"
        opacity="0.6"
      />

      {/* Neural Core Radial Background */}
      <circle cx="53" cy="44" r="28" fill="url(#brain_core_glow)" />

      {/* Neural Lobes and Curvature */}
      <path
        d="M 36 44 C 36 34 44 26 54 26 C 66 26 74 34 74 44 C 74 54 65 62 53 62 C 43 62 36 54 36 44 Z"
        stroke="#38bdf8"
        strokeWidth="1.8"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M 42 44 C 42 37 47 31 54 31 C 61 31 67 37 67 44 C 67 51 61 57 54 57 C 47 57 42 51 42 44 Z"
        stroke="#0ea5e9"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />

      {/* Neural Interconnection Lines */}
      <line x1="53" y1="44" x2="38" y2="35" stroke="#7dd3fc" strokeWidth="1.2" />
      <line x1="53" y1="44" x2="68" y2="34" stroke="#7dd3fc" strokeWidth="1.2" />
      <line x1="53" y1="44" x2="40" y2="52" stroke="#7dd3fc" strokeWidth="1.2" />
      <line x1="53" y1="44" x2="67" y2="53" stroke="#7dd3fc" strokeWidth="1.2" />
      <line x1="53" y1="44" x2="53" y2="26" stroke="#7dd3fc" strokeWidth="1.2" />
      <line x1="53" y1="44" x2="54" y2="62" stroke="#7dd3fc" strokeWidth="1.2" />
      <line x1="38" y1="35" x2="53" y2="26" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
      <line x1="68" y1="34" x2="53" y2="26" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
      <line x1="40" y1="52" x2="54" y2="62" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
      <line x1="67" y1="53" x2="54" y2="62" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />

      {/* Neural Synapse Nodes */}
      <circle cx="38" cy="35" r="2.2" fill="#e0f2fe" />
      <circle cx="68" cy="34" r="2.2" fill="#e0f2fe" />
      <circle cx="40" cy="52" r="2.2" fill="#e0f2fe" />
      <circle cx="67" cy="53" r="2.2" fill="#e0f2fe" />
      <circle cx="53" cy="26" r="2.5" fill="#bae6fd" />
      <circle cx="54" cy="62" r="2.5" fill="#bae6fd" />

      {/* Central Super-Luminous AI Core */}
      <circle cx="53" cy="44" r="4.5" fill="#ffffff" />
      <circle cx="53" cy="44" r="7" stroke="#38bdf8" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: '53px 44px' }} />
    </svg>
  </div>
);

/* ==========================================================================
   Sub-Card 1: Mini Total Revenue Card (Top Left - Node 94:129)
   ========================================================================== */

const RevenueMetricCard = () => (
  <div className="w-[155px] sm:w-[172px] shrink-0 rounded-xl bg-[#091530]/90 border border-[#17469e]/70 p-3 sm:p-3.5 shadow-[0px_20px_35px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb]/80 select-none">
    <div className="text-[11px] font-medium text-[#8ea5c8]">Total Revenue</div>
    <div className="text-[19px] sm:text-[20px] font-bold text-white tracking-tight mt-0.5">
      $28,540
    </div>
    
    <div className="flex items-end justify-between mt-1 gap-1.5">
      <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold leading-none">
        <span className="text-[11px]">↑</span>
        <span>18.6%</span>
        <span className="text-[#7c92b5] font-normal text-[9px] block">vs last month</span>
      </div>

      {/* Vector Sparkline Area Chart */}
      <div className="w-[58px] h-[26px] shrink-0">
        <svg viewBox="0 0 60 28" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="rev_spark_grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 24 Q 14 22 24 13 T 44 17 T 60 4 L 60 28 L 0 28 Z"
            fill="url(#rev_spark_grad)"
          />
          <path
            d="M 0 24 Q 14 22 24 13 T 44 17 T 60 4"
            fill="none"
            stroke="#00d2ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="4" r="2.5" fill="#ffffff" stroke="#00d2ff" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  </div>
);

/* ==========================================================================
   Sub-Card 2: Main Dashboard Preview Window (Top Right - Node 94:168)
   ========================================================================== */

const DashboardPreviewWindow = () => {
  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, active: true },
    { name: 'Products', icon: Package },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Inventory', icon: Boxes },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Marketing', icon: Send },
    { name: 'Customers', icon: Users },
    { name: 'AI Insights', icon: Sparkles },
    { name: 'Settings', icon: Settings },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', category: 'Electronics', count: '2,420', icon: Headphones },
    { name: 'Smart Watch', category: 'Wearables', count: '1,892', icon: Watch },
    { name: 'Backpack', category: 'Accessories', count: '1,230', icon: Briefcase },
  ];

  return (
    <div className="w-[390px] sm:w-[430px] lg:w-[446px] shrink-0 rounded-2xl bg-[#070f23]/95 border border-[#144299]/70 shadow-[0px_25px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#1d5ce5]/80 select-none">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-[#143673]/40 bg-[#060c1d]/90">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-white tracking-tight">MarketFlow</span>
          <span className="text-[11px] font-extrabold text-[#0ea2f2]">AI</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-60">
          <div className="w-2.5 h-0.5 bg-slate-400 rounded-full" />
          <div className="w-2.5 h-2.5 border border-slate-400 rounded-[2px]" />
          <div className="text-[10px] text-slate-400 leading-none">×</div>
        </div>
      </div>

      {/* Dashboard Body Grid */}
      <div className="flex">
        {/* Left Sidebar Mini Nav */}
        <div className="w-[98px] sm:w-[104px] shrink-0 border-r border-[#143673]/40 p-2 flex flex-col gap-1 bg-[#050b1a]/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[9.5px] font-medium transition-all ${
                  item.active
                    ? 'bg-gradient-to-r from-[#0d6efd] to-[#0ea2f2] text-white shadow-sm shadow-blue-500/30'
                    : 'text-[#879bb7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={11} className="shrink-0" />
                <span className="truncate">{item.name}</span>
              </div>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-2.5 sm:p-3 flex flex-col gap-2.5">
          {/* Section Header */}
          <div className="text-[12px] font-bold text-white tracking-tight">
            Overview
          </div>

          {/* Top Row: Sales Chart + Top Products */}
          <div className="grid grid-cols-12 gap-2">
            {/* Sales Performance Card (Col 7) */}
            <div className="col-span-7 rounded-xl bg-[#091530]/85 border border-[#193d7c]/60 p-2 sm:p-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-medium text-[#8ba2c4]">Sales Performance</span>
                  <button className="flex items-center gap-0.5 text-[8.5px] text-[#cbd5e1] bg-[#122244] border border-[#21437c]/60 px-1.5 py-0.5 rounded">
                    <span>This Month</span>
                    <ChevronDown size={9} />
                  </button>
                </div>
                <div className="text-[15px] sm:text-[16px] font-bold text-white mt-0.5">
                  $28,540
                </div>
                <div className="text-[8.5px] text-emerald-400 font-medium flex items-center gap-0.5">
                  <span>↑ 18.6%</span>
                  <span className="text-[#6d84a7] font-normal">vs last month</span>
                </div>
              </div>

              {/* Glowing Wave Area Chart */}
              <div className="w-full h-[42px] sm:h-[48px] mt-1 relative">
                <svg viewBox="0 0 160 45" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="sales_wave_grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea2f2" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#0ea2f2" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Wave Area Fill */}
                  <path
                    d="M 0 38 Q 15 34 26 24 T 52 28 T 78 16 T 104 22 T 130 10 T 160 8 L 160 45 L 0 45 Z"
                    fill="url(#sales_wave_grad)"
                  />
                  {/* Wave Stroke Line */}
                  <path
                    d="M 0 38 Q 15 34 26 24 T 52 28 T 78 16 T 104 22 T 130 10 T 160 8"
                    fill="none"
                    stroke="#00d2ff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Node Points */}
                  <circle cx="26" cy="24" r="2" fill="#ffffff" stroke="#00d2ff" strokeWidth="1" />
                  <circle cx="52" cy="28" r="2" fill="#ffffff" stroke="#00d2ff" strokeWidth="1" />
                  <circle cx="78" cy="16" r="2" fill="#ffffff" stroke="#00d2ff" strokeWidth="1" />
                  <circle cx="104" cy="22" r="2" fill="#ffffff" stroke="#00d2ff" strokeWidth="1" />
                  <circle cx="130" cy="10" r="2" fill="#ffffff" stroke="#00d2ff" strokeWidth="1" />
                  <circle cx="160" cy="8" r="2.5" fill="#ffffff" stroke="#00d2ff" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Top Products Card (Col 5) */}
            <div className="col-span-5 rounded-xl bg-[#091530]/85 border border-[#193d7c]/60 p-2 flex flex-col justify-between">
              <div className="text-[9.5px] font-semibold text-white">Top Products</div>
              
              <div className="flex flex-col gap-1.5 my-1">
                {topProducts.map((prod) => {
                  const ProdIcon = prod.icon;
                  return (
                    <div key={prod.name} className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <div className="w-5 h-5 rounded-md bg-[#13254b] border border-[#224580]/50 flex items-center justify-center shrink-0 text-[#38bdf8]">
                          <ProdIcon size={10} />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-[8.5px] font-medium text-white truncate leading-tight">
                            {prod.name}
                          </div>
                          <div className="text-[7px] text-[#6d84a7] truncate leading-none">
                            {prod.category}
                          </div>
                        </div>
                      </div>
                      <span className="text-[8.5px] font-bold text-slate-200 shrink-0">
                        {prod.count}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button className="w-full text-center py-0.5 text-[8px] font-medium text-slate-300 bg-[#122347]/80 hover:bg-[#1a3161] border border-[#204480]/60 rounded transition-colors">
                View all
              </button>
            </div>
          </div>

          {/* Bottom Row: 4 Metric Cards */}
          <div className="grid grid-cols-4 gap-1.5">
            <div className="rounded-lg bg-[#091530]/80 border border-[#193d7c]/50 p-1.5">
              <div className="text-[7.5px] text-[#7d96b9] font-medium truncate">Orders</div>
              <div className="text-[11px] font-bold text-white mt-0.5">1,248</div>
              <div className="text-[7.5px] text-emerald-400 font-semibold flex items-center gap-0.5">
                <span>↑</span> 12.4%
              </div>
            </div>

            <div className="rounded-lg bg-[#091530]/80 border border-[#193d7c]/50 p-1.5">
              <div className="text-[7.5px] text-[#7d96b9] font-medium truncate">Conversion Rate</div>
              <div className="text-[11px] font-bold text-white mt-0.5">3.62%</div>
              <div className="text-[7.5px] text-emerald-400 font-semibold flex items-center gap-0.5">
                <span>↑</span> 8.7%
              </div>
            </div>

            <div className="rounded-lg bg-[#091530]/80 border border-[#193d7c]/50 p-1.5">
              <div className="text-[7.5px] text-[#7d96b9] font-medium truncate">Avg. Order Value</div>
              <div className="text-[11px] font-bold text-white mt-0.5">$65.24</div>
              <div className="text-[7.5px] text-emerald-400 font-semibold flex items-center gap-0.5">
                <span>↑</span> 15.3%
              </div>
            </div>

            <div className="rounded-lg bg-[#091530]/80 border border-[#193d7c]/50 p-1.5">
              <div className="text-[7.5px] text-[#7d96b9] font-medium truncate">Customers</div>
              <div className="text-[11px] font-bold text-white mt-0.5">8,542</div>
              <div className="text-[7.5px] text-emerald-400 font-semibold flex items-center gap-0.5">
                <span>↑</span> 11.8%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   Sub-Card 3: AI Recommendation Card (Bottom Left - Node 94:135)
   ========================================================================== */

const AiRecommendationCard = () => (
  <div className="w-[270px] sm:w-[285px] shrink-0 rounded-2xl bg-[#091530]/95 border border-[#16449b]/70 p-3.5 sm:p-4 shadow-[0px_24px_60px_rgba(15,34,76,0.56)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb]/80 relative overflow-hidden select-none">
    {/* Subtle Glow Corner */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#0ea2f2]/15 rounded-full blur-2xl pointer-events-none" />

    <div className="flex items-start justify-between gap-2.5 relative z-10">
      <div className="flex-1">
        {/* Title with Sparkle */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
          <Sparkles size={13} className="text-[#38bdf8]" />
          <span>AI Recommendation</span>
        </div>

        {/* Recommendation Copy */}
        <p className="text-[11px] text-[#9cb1cf] font-normal leading-snug mt-2">
          Increase stock for Smart Watch in anticipation of high demand next week.
        </p>

        {/* Action Button */}
        <button className="mt-3 inline-flex items-center justify-center px-3.5 py-1.5 text-[10.5px] font-medium text-white bg-[#14284d]/90 hover:bg-[#1d396d] border border-[#26559f]/70 rounded-lg shadow-sm shadow-blue-900/30 transition-all duration-200">
          View Insight
        </button>
      </div>

      {/* Holographic AI Brain Graphic */}
      <HolographicAiBrain className="w-16 h-16 sm:w-[72px] sm:h-[72px]" />
    </div>
  </div>
);

/* ==========================================================================
   Sub-Card 4: Inventory Status Gauge Card (Bottom Right - Node 94:136)
   ========================================================================== */

const InventoryStatusCard = () => {
  const percentage = 76;
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-[155px] sm:w-[170px] shrink-0 rounded-xl bg-[#091530]/95 border border-[#16449b]/80 p-3 sm:p-3.5 shadow-[0px_24px_60px_rgba(15,34,76,0.56)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb]/80 select-none">
      <div className="text-[11px] font-semibold text-slate-300 mb-2.5">
        Inventory Status
      </div>

      <div className="flex items-center gap-2.5">
        {/* Circular Progress Gauge */}
        <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
            <defs>
              <linearGradient id="inv_gauge_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5b3" />
                <stop offset="100%" stopColor="#00d2ff" />
              </linearGradient>
            </defs>
            {/* Background Track */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="#1a2d52"
              strokeWidth="4"
              fill="none"
            />
            {/* Progress Stroke */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="url(#inv_gauge_grad)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-white tracking-tight">
            {percentage}%
          </span>
        </div>

        {/* Status Text Details */}
        <div className="flex flex-col">
          <span className="text-[10.5px] font-medium text-white leading-tight">
            Stock Health
          </span>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            <span className="text-[9.5px] text-[#9cb1cf] leading-none">All good</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   Atmospheric Vector Background Layer (Waves, Halo lights, Star particles)
   ========================================================================== */

const AtmosphericBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Deep Atmospheric Radial Lighting */}
    <div className="absolute -top-[10%] -left-[10%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(14,162,242,0.22)_0%,rgba(6,92,237,0.08)_50%,transparent_70%)] blur-[90px]" />
    <div className="absolute bottom-[0%] right-[0%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,92,237,0.28)_0%,rgba(14,162,242,0.12)_45%,transparent_70%)] blur-[100px]" />
    <div className="absolute top-[45%] left-[30%] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(0,210,255,0.12)_0%,transparent_60%)] blur-[80px]" />

    {/* Subtle Wave Contours */}
    <svg
      className="absolute inset-0 w-full h-full opacity-25"
      viewBox="0 0 720 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M -100 280 C 120 220 340 380 520 260 C 660 180 780 290 880 340"
        stroke="url(#ambient_wave_1)"
        strokeWidth="1.2"
      />
      <path
        d="M -60 420 C 160 360 380 500 560 390 C 690 320 800 420 900 480"
        stroke="url(#ambient_wave_1)"
        strokeWidth="1"
      />
      <path
        d="M -120 600 C 100 520 320 680 500 580 C 650 500 750 630 860 700"
        stroke="url(#ambient_wave_1)"
        strokeWidth="1.2"
      />
      <path
        d="M -80 750 C 140 680 360 840 540 760 C 680 700 780 810 880 880"
        stroke="url(#ambient_wave_1)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient id="ambient_wave_1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0EA2F2" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#065CED" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>

    {/* Glowing Light Particles */}
    <div className="absolute top-[12%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_12px_#38bdf8] animate-pulse" />
    <div className="absolute top-[28%] right-[14%] w-1 h-1 rounded-full bg-[#80e5ff] shadow-[0_0_8px_#80e5ff]" />
    <div className="absolute top-[48%] left-[16%] w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_14px_#00d2ff] animate-pulse" />
    <div className="absolute top-[68%] left-[8%] w-2.5 h-2.5 rounded-full bg-[#0ea2f2] shadow-[0_0_16px_#0ea2f2] animate-pulse" />
    <div className="absolute top-[82%] right-[12%] w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
    <div className="absolute top-[88%] left-[28%] w-1 h-1 rounded-full bg-[#bae6fd] shadow-[0_0_8px_#bae6fd]" />
  </div>
);

/* ==========================================================================
   Main HeroBanner Component (Figma Node 94:126)
   ========================================================================== */

export const HeroBanner = () => {
  return (
    <div
      className="hidden lg:flex relative flex-col justify-between flex-1 lg:flex-[1.08] h-full min-h-full overflow-hidden bg-[#060c1c] p-6 lg:p-10 xl:p-12 select-none"
      data-node-id="94:126"
    >
      {/* Background Lighting and Atmospheric Effects */}
      <AtmosphericBackground />

      {/* Main Container Content */}
      <div className="relative z-10 flex flex-col justify-between h-full max-w-[620px] mx-auto w-full">
        {/* Top Header & Branding (Node 94:164) */}
        <div className="flex flex-col gap-5 pt-2" data-node-id="94:164">
          {/* Logo Mark + Wordmark (Node 94:138) */}
          <div className="flex items-center gap-3 w-fit" data-node-id="94:138">
            <LogoMarkIcon className="w-10 sm:w-11 h-auto" />
            <div className="flex items-center text-[21px] sm:text-[23px] font-extrabold tracking-tight">
              <span className="text-white">MarketFlow</span>
              <span className="text-[#0ea2f2] ml-1.5">AI</span>
            </div>
          </div>

          {/* Headline and Subtitle (Node 94:157) */}
          <div className="flex flex-col gap-2.5">
            <h1 className="font-['Inter'] font-semibold text-3xl sm:text-4xl lg:text-[44px] text-white leading-[1.18] tracking-tight">
              Manage smarter.<br />
              <span className="text-[#0ea2f2]">Grow</span> faster.
            </h1>
            <p className="font-['Inter'] font-medium text-[#adb6c3] text-sm sm:text-base lg:text-[18px] leading-relaxed">
              Your AI-powered ecommerce<br className="hidden sm:inline" /> operating system.
            </p>
          </div>
        </div>

        {/* Floating 3D Dashboard Mockup Presentation (Node 94:167) */}
        <div
          className="relative w-full my-auto py-4 sm:py-6 flex flex-col items-center gap-4 lg:gap-5"
          data-node-id="94:167"
        >
          {/* Top Row: Mini Revenue Card (Left) + Main Dashboard Preview Window (Right) */}
          <div className="flex items-end justify-center gap-3 sm:gap-4 w-full" data-node-id="94:165">
            <RevenueMetricCard />
            <DashboardPreviewWindow />
          </div>

          {/* Bottom Row: AI Recommendation Card (Left) + Inventory Status Gauge (Right) */}
          <div className="flex items-start justify-center gap-3 sm:gap-4 w-full" data-node-id="94:134">
            <AiRecommendationCard />
            <InventoryStatusCard />
          </div>
        </div>

        {/* Footer Micro Tag */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#7d96b9] font-medium">
          <span>MarketFlow AI</span>
          <span>Enterprise E-Commerce Cloud</span>
        </div>
      </div>
    </div>
  );
};

// Also export AuthHeroBanner alias for seamless backward compatibility
export const AuthHeroBanner = HeroBanner;
export default HeroBanner;
