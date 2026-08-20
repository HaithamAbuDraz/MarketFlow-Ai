import React, { useState } from 'react';

export const SalesChartSection = ({ isLoading = false }) => {
  const [period, setPeriod] = useState('30 Days');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Data points matching Figma 652:3154 (Aug 1 to Aug 30)
  const chartData = [
    { label: 'Aug 1', value: 4200, display: '$4,200', x: 20, y: 155 },
    { label: 'Aug 5', value: 3400, display: '$3,400', x: 125, y: 170 },
    { label: 'Aug 10', value: 5800, display: '$5,800', x: 230, y: 125 },
    { label: 'Aug 15', value: 4900, display: '$4,900', x: 335, y: 142 },
    { label: 'Aug 20', value: 7800, display: '$7,800', x: 440, y: 88 },
    { label: 'Aug 25', value: 9600, display: '$9,600', x: 545, y: 55 },
    { label: 'Aug 30', value: 8400, display: '$8,400', x: 650, y: 78 },
  ];

  // SVG Smooth Spline Path
  const linePath = 'M 20 155 C 80 165, 100 175, 125 170 C 170 160, 190 130, 230 125 C 275 120, 300 148, 335 142 C 380 135, 400 95, 440 88 C 485 80, 510 52, 545 55 C 590 60, 620 75, 650 78';
  const areaPath = `${linePath} L 650 215 L 20 215 Z`;

  const yLabels = ['$12k', '$9k', '$6k', '$3k', '$0k'];
  const gridYPositions = [25, 72.5, 120, 167.5, 215];

  return (
    <div
      className="bg-white dark:bg-[#091530] rounded-xl border border-slate-200/80 dark:border-[#173066] p-5 shadow-xs flex flex-col justify-between h-full transition-colors duration-200"
      data-node-id="719:8775"
    >
      {/* Header with Title and Period Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#14264e]">
        <div>
          <h3 className="font-bold text-base text-[#0f172a] dark:text-white tracking-tight">
            Sales Chart
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Revenue performance by period
          </p>
        </div>

        {/* Period Selector Pills */}
        <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-[#060b18] border border-transparent dark:border-[#1e3a75]/50 p-1 rounded-lg self-start sm:self-auto">
          {['7 Days', '30 Days', '90 Days'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                period === item
                  ? 'bg-white dark:bg-[#2563eb] text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas Area */}
      {isLoading ? (
        <div className="py-8 flex flex-col items-center justify-center text-center animate-pulse">
          {/* Skeleton Bar Histogram Graphic */}
          <div className="flex items-end justify-center gap-2.5 h-24 mb-4 px-6">
            <div className="w-4 h-6 bg-slate-100 dark:bg-[#0e1d3e] rounded-t-sm" />
            <div className="w-4 h-12 bg-slate-200 dark:bg-[#142347] rounded-t-sm" />
            <div className="w-4 h-8 bg-slate-100 dark:bg-[#0e1d3e] rounded-t-sm" />
            <div className="w-4 h-16 bg-slate-200 dark:bg-[#142347] rounded-t-sm" />
            <div className="w-4 h-14 bg-slate-100 dark:bg-[#0e1d3e] rounded-t-sm" />
            <div className="w-4 h-20 bg-slate-300 dark:bg-[#193261] rounded-t-sm" />
            <div className="w-4 h-14 bg-slate-200 dark:bg-[#142347] rounded-t-sm" />
          </div>

          <div className="h-4 bg-slate-200 dark:bg-[#142347] rounded-md w-36 mb-2" />
          <div className="h-3 bg-slate-100 dark:bg-[#0e1d3e] rounded-md w-48" />
        </div>
      ) : (
        /* Populated Interactive Spline Chart */
        <div className="pt-4 pb-2 relative">
          <div className="flex w-full">
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between pr-3 text-[11px] font-medium text-slate-400 dark:text-slate-400 select-none pb-7">
              {yLabels.map((lbl) => (
                <span key={lbl} className="h-4 leading-none">
                  {lbl}
                </span>
              ))}
            </div>

            {/* SVG Chart Surface */}
            <div className="flex-1 relative">
              <svg
                viewBox="0 0 670 240"
                className="w-full h-[220px] overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
                    <stop offset="90%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Gridlines */}
                {gridYPositions.map((y, idx) => (
                  <line
                    key={idx}
                    x1="10"
                    y1={y}
                    x2="660"
                    y2={y}
                    className="stroke-[#f1f5f9] dark:stroke-[#14264e]"
                    strokeWidth="1"
                  />
                ))}

                {/* Gradient Area */}
                <path d={areaPath} fill="url(#chartGradient)" />

                {/* Main Blue Spline Curve */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Interactive Points */}
                {chartData.map((pt, idx) => (
                  <g key={idx}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      className={`transition-all duration-150 cursor-pointer ${
                        hoveredPoint?.label === pt.label
                          ? 'fill-[#2563eb] stroke-white dark:stroke-[#091530] stroke-[3] r-[6]'
                          : 'fill-white dark:fill-[#091530] stroke-[#2563eb] stroke-[2]'
                      }`}
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                ))}
              </svg>

              {/* Tooltip Overlay */}
              {hoveredPoint && (
                <div
                  className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 bg-[#0f172a] dark:bg-[#060c1d] text-white text-[11px] font-semibold py-1 px-2.5 rounded-md shadow-lg border border-slate-700 dark:border-[#1e3a75] transition-all duration-75"
                  style={{
                    left: `${(hoveredPoint.x / 670) * 100}%`,
                    top: `${(hoveredPoint.y / 240) * 220 - 8}px`,
                  }}
                >
                  <div className="text-[#38bdf8]">{hoveredPoint.label}</div>
                  <div>{hoveredPoint.display}</div>
                </div>
              )}

              {/* X-Axis Labels */}
              <div className="flex justify-between text-[11px] font-medium text-slate-400 dark:text-slate-400 mt-1 select-none px-1">
                {chartData.map((pt) => (
                  <span key={pt.label}>{pt.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesChartSection;
