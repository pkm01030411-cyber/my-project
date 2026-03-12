'use client';

import Navigation from '@/components/Navigation/Navigation';
import useDarkMode from '@/hooks/useDarkMode';

/**
 * MainLayout - 전체 레이아웃 래퍼
 *
 * 반응형 레이아웃:
 * - Desktop (lg+): 사이드바(w-64) + 메인 콘텐츠 (ml-64)
 * - Tablet/Mobile (<lg): 헤더(h-16) + 메인 콘텐츠 + 하단탭(h-16)
 */
export default function MainLayout({ children }) {
  // useDarkMode 훅으로 다크모드 초기화 (localStorage → DOM 동기화)
  useDarkMode();

  return (
    <div className="min-h-screen transition-theme" style={{ backgroundColor: 'var(--gw-bg)' }}>
      {/* 네비게이션 전체 (Header + Sidebar + HamburgerMenu + BottomTabBar) */}
      <Navigation />

      {/* 메인 콘텐츠 영역 */}
      <main
        className={[
          // Desktop: 사이드바 너비만큼 좌측 마진, 헤더 높이만큼 상단 패딩
          'lg:ml-64',
          // 모든 화면: 헤더 높이(16 = 64px) 만큼 상단 패딩
          'pt-16',
          // 모바일/태블릿: 하단 탭 높이(16 = 64px) 만큼 하단 패딩
          'pb-16 lg:pb-0',
          // 최소 높이
          'min-h-screen',
        ].join(' ')}
      >
        {/* 콘텐츠 패딩 래퍼 */}
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
