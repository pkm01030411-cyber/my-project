import {
  LayoutDashboard,
  Newspaper,
  BarChart3,
  Lightbulb,
  Settings,
  UserCircle,
  HelpCircle,
  LogOut,
} from 'lucide-react';

/**
 * GlobalWatch 네비게이션 메뉴 설정
 */

// 하단 탭 바 + 사이드바 기본 메뉴 (4개)
export const MAIN_NAV_ITEMS = [
  {
    id: 'dashboard',
    label: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
    emoji: '🏠',
  },
  {
    id: 'news',
    label: '뉴스 피드',
    href: '/news',
    icon: Newspaper,
    emoji: '📰',
  },
  {
    id: 'analytics',
    label: '분석 리포트',
    href: '/analytics',
    icon: BarChart3,
    emoji: '📊',
  },
  {
    id: 'recommendation',
    label: '정책 제안',
    href: '/recommendation',
    icon: Lightbulb,
    emoji: '💡',
  },
];

// 해머거 메뉴 추가 항목
export const HAMBURGER_EXTRA_ITEMS = [
  {
    id: 'settings',
    label: '설정',
    href: '/settings',
    icon: Settings,
    emoji: '⚙️',
  },
  {
    id: 'profile',
    label: '프로필',
    href: '/profile',
    icon: UserCircle,
    emoji: '👤',
  },
  {
    id: 'help',
    label: '도움말',
    href: '/help',
    icon: HelpCircle,
    emoji: '📖',
  },
];

// 로그아웃 (액션 아이템 - href 없음)
export const LOGOUT_ITEM = {
  id: 'logout',
  label: '로그아웃',
  icon: LogOut,
  emoji: '🚪',
};

// 전체 사이드바 메뉴 (메인 + 추가)
export const SIDEBAR_ALL_ITEMS = [
  ...MAIN_NAV_ITEMS,
  ...HAMBURGER_EXTRA_ITEMS,
];

export default MAIN_NAV_ITEMS;
