import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HeroBanner } from '@/components/hero';

export const SplitScreenLayout = ({
  children,
  heroBanner = <HeroBanner />,
  contentClassName = '',
  containerClassName = '',
  enableZoom = true,
  zoomIntensity = 1,
}) => {
  const scrollContainerRef = useRef(null);
  const zoomContentRef = useRef(null);
  const rafIdRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile && zoomContentRef.current) {
        zoomContentRef.current.style.transform = 'none';
      }
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint, { passive: true });
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  const handleScroll = useCallback(() => {
    if (!enableZoom || isMobile) return;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      const target = zoomContentRef.current;
      if (!container || !target) return;

      const scrollTop = container.scrollTop;
      const depthProgress = Math.min(1, Math.max(0, scrollTop / 800));
      const scale = 1 - (depthProgress * 0.038 * zoomIntensity);
      const translateY = -(depthProgress * 6);

      target.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1) translateY(${translateY.toFixed(1)}px)`;
      target.style.transformOrigin = 'center top';
      target.style.willChange = scrollTop > 0 ? 'transform' : 'auto';
    });
  }, [enableZoom, isMobile, zoomIntensity]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isMobile || !enableZoom) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll, isMobile, enableZoom]);

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen md:h-screen w-full bg-white dark:bg-[#050a18] md:bg-[#060c1c] overflow-y-auto md:overflow-hidden transition-colors duration-200 ${containerClassName}`}
    >
      {/* Fixed Sticky Hero Banner Container (Desktop Only) */}
      <aside
        className="hidden md:flex md:w-[48%] lg:w-[50%] xl:w-[52%] h-screen sticky top-0 left-0 overflow-hidden shrink-0 z-10 select-none"
        aria-label="Product Showcase and Insights"
      >
        {heroBanner}
      </aside>

      {/* Main Content Side */}
      <main
        ref={scrollContainerRef}
        className={`flex-1 w-full md:w-[52%] lg:w-[50%] xl:w-[48%] min-h-screen md:min-h-full bg-white dark:bg-[#070d1e] sm:bg-[#f8f8fb] sm:dark:bg-[#070d1e] overflow-y-auto overflow-x-hidden md:custom-scrollbar no-scrollbar relative z-20 transition-colors duration-200 ${contentClassName}`}
      >
        <div
          ref={zoomContentRef}
          className="w-full min-h-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 transition-transform duration-75 ease-out"
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default SplitScreenLayout;
