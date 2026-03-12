'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import HamburgerMenu from './HamburgerMenu';
import BottomTabBar from './BottomTabBar';

/**
 * Navigation - 전체 네비게이션 조합 컴포넌트
 *
 * - Header: 모든 화면에서 상단에 표시
 * - Sidebar: 데스크톱(lg)에서만 좌측 고정
 * - HamburgerMenu: 모바일/태블릿에서 우측 슬라이드
 * - BottomTabBar: 모바일/태블릿 하단 고정
 */
export default function Navigation() {
  return (
    <>
      <Header />
      <Sidebar />
      <HamburgerMenu />
      <BottomTabBar />
    </>
  );
}
