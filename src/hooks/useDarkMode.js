'use client';

import { useEffect } from 'react';
import useNavStore from '@/store/useNavStore';
import { STORAGE_KEYS, THEMES } from '@/utils/constants';

/**
 * useDarkMode - 다크모드 훅
 *
 * - localStorage의 'theme' 값을 읽어 초기 다크모드 설정
 * - 시스템 다크모드 감지 (localStorage 값 없을 때)
 * - isDarkMode 변경 시 document.documentElement에 'dark' 클래스 토글
 * - localStorage에 변경 사항 저장
 */
export function useDarkMode() {
  const { isDarkMode, setIsDarkMode, toggleDarkMode } = useNavStore();

  // 초기 로드: localStorage 또는 시스템 설정에서 읽기
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);

    if (stored === THEMES.DARK) {
      setIsDarkMode(true);
    } else if (stored === THEMES.LIGHT) {
      setIsDarkMode(false);
    } else {
      // localStorage 값 없으면 시스템 다크모드 감지
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, [setIsDarkMode]);

  // isDarkMode 변경 시 DOM과 localStorage 동기화
  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, THEMES.DARK);
    } else {
      root.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, THEMES.LIGHT);
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
}

export default useDarkMode;
