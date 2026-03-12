import { create } from 'zustand';

/**
 * GlobalWatch 네비게이션 전역 상태 (Zustand)
 *
 * - isMenuOpen: 해머거 메뉴 열림 여부
 * - currentPage: 현재 활성 페이지 ID
 * - isDarkMode: 다크모드 활성 여부
 * - toggleMenu(): 해머거 메뉴 토글
 * - closeMenu(): 해머거 메뉴 닫기
 * - setCurrentPage(page): 현재 페이지 설정
 * - toggleDarkMode(): 다크모드 토글
 */
const useNavStore = create((set) => ({
  isMenuOpen: false,
  currentPage: 'dashboard',
  isDarkMode: false,

  toggleMenu: () =>
    set((state) => ({ isMenuOpen: !state.isMenuOpen })),

  closeMenu: () => set({ isMenuOpen: false }),

  setCurrentPage: (page) =>
    set({ currentPage: page, isMenuOpen: false }),

  setIsDarkMode: (isDarkMode) => set({ isDarkMode }),

  toggleDarkMode: () =>
    set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export default useNavStore;
