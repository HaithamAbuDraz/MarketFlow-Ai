import React from 'react';

export const Logo = ({ size = 37, className = '', showText = false, textClassName = '' }) => {
  const width = size;
  const height = Math.round(size * (37 / 47));

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 47 37"
        fill="none"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
      >
        <path
          d="M37 18.618L41.4545 13.2566C43.1855 12.4397 43.8727 13.7672 44 14.5332V35.2129C44 36.2341 43.1091 37 42.6 37H39.0364C37.3818 36.8723 37.0848 35.6809 37.1273 35.2129L37 28.3196C37.2036 26.6857 38.2727 26.7878 39.6727 26.4048C42.7273 25.1283 41.55 24.1071 39.9273 23.7241C37.7636 23.2135 37.2121 22.9582 37 22.32V18.618Z"
          fill="url(#paint0_linear_logo)"
        />
        <path
          d="M1.52643 37C1.9317 34.1643 5.1569 30.3327 6.71885 28.7714L6.46556 12.9471L16.7237 22.948C17.9395 24.2646 19.7632 24.847 21.9162 23.3278L35.3405 10.5418C37.1135 8.13652 34.8339 6.74398 34.074 7.25036L21.9162 18.6438L5.7057 3.07275C2.4636 0.642139 0.555495 2.90396 0.0067033 4.33869V33.7086C-0.0946121 36.0379 0.977643 36.8734 1.52643 37Z"
          fill="url(#paint1_linear_logo)"
        />
        <path
          d="M7.86101 37H2C3.27877 30.4171 11.5019 27.4414 15.4537 26.7765C18.7572 26.0783 23.668 23.4102 25.7105 22.1634C30.8255 19.4704 38.5869 9.15547 41.8283 4.33463L39.1642 3.71124C38.5248 3.41202 38.8089 3.08786 39.031 2.96318L45.8244 0.22029C46.6769 -0.178676 46.89 0.054054 46.89 0.22029V7.32688C47.2097 8.22455 46.7568 8.44897 46.4904 8.44897L44.4924 6.08011C42.1479 10.8677 31.7935 20.4595 26.9093 24.657H28.641C29.2804 25.0559 28.9962 25.405 28.7742 25.5297H25.3109C22.9664 27.2253 18.6506 28.896 16.7857 29.5194C11.2444 30.816 8.52704 35.0467 7.86101 37Z"
          fill="#05BDE9"
        />
        <path
          d="M31.4939 25.0087C34.3382 24.5919 34.4144 22.5339 34.2874 21.6222C34.1604 20.7104 35.5571 20.8407 35.3032 21.7524C35.2016 24.6701 37.2078 24.7482 38.3506 25.0087C39.3146 25.2285 39.1125 26.0508 38.3506 26.0508C35.6079 25.9466 35.2609 28.265 35.4302 29.4373C35.3032 30.4793 34.2288 29.8281 34.2874 29.4373C34.6937 26.7281 32.5944 26.0508 31.4939 26.0508C30.6051 25.9205 31.113 25.0087 31.4939 25.0087Z"
          fill="url(#paint2_linear_logo)"
        />
        <defs>
          <linearGradient id="paint0_linear_logo" x1="40.4894" y1="13" x2="40.4894" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EA2F2" />
            <stop offset="1" stopColor="#065CED" />
          </linearGradient>
          <linearGradient id="paint1_linear_logo" x1="17.9453" y1="2" x2="17.9453" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EA2F2" />
            <stop offset="1" stopColor="#065CED" />
          </linearGradient>
          <linearGradient id="paint2_linear_logo" x1="34.8942" y1="21.3084" x2="34.8942" y2="29.8401" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8AE9FF" />
            <stop offset="1" stopColor="#05BDE9" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span className={`font-extrabold text-white tracking-tight ${textClassName}`}>
          MarketFlow <span className="text-[#38bdf8]">AI</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
