'use client';

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/utils/constants';

/**
 * useResponsive - 반응형 브레이크포인트 감지 훅
 *
 * - isMobile: sm (375px - 767px)
 * - isTablet: md (768px - 1023px)
 * - isDesktop: lg (1024px 이상)
 * - isMobileOrTablet: sm + md (사이드바 숨김, 하단탭 표시)
 */
export function useResponsive() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.lg
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < BREAKPOINTS.md;
  const isTablet = windowWidth >= BREAKPOINTS.md && windowWidth < BREAKPOINTS.lg;
  const isDesktop = windowWidth >= BREAKPOINTS.lg;
  const isMobileOrTablet = windowWidth < BREAKPOINTS.lg;

  return { isMobile, isTablet, isDesktop, isMobileOrTablet, windowWidth };
}

export default useResponsive;
