/**
 * GlobalWatch 앱 상수
 */

export const APP_NAME = 'GlobalWatch';
export const APP_DESCRIPTION = '글로벌 무역 시장 인텔리전스 플랫폼';
export const APP_VERSION = '1.0.0';

// 브레이크포인트 (px)
export const BREAKPOINTS = {
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// 로컬스토리지 키
export const STORAGE_KEYS = {
  THEME: 'theme',
  AUTH_TOKEN: 'gw_auth_token',
  USER_PREFERENCES: 'gw_user_prefs',
};

// 테마 값
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// 애니메이션 duration (ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 400,
};

// API 엔드포인트 (기본 경로)
export const API_ROUTES = {
  DASHBOARD: '/api/dashboard',
  NEWS: '/api/news',
  ANALYTICS: '/api/analytics',
  RECOMMENDATION: '/api/recommendation',
};

// 뉴스 티어 필터 옵션
export const TIER_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'tier1', label: 'Tier 1 (주요국)' },
  { value: 'tier2', label: 'Tier 2 (신흥국)' },
  { value: 'tier3', label: 'Tier 3 (기타)' },
];
