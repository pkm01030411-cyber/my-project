'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, Sun, Moon } from 'lucide-react';
import useNavStore from '@/store/useNavStore';
import useDarkMode from '@/hooks/useDarkMode';
import { MAIN_NAV_ITEMS, HAMBURGER_EXTRA_ITEMS } from '@/utils/navigationConfig';

// Framer Motion 애니메이션 변수
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const menuVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { type: 'tween', duration: 0.3, ease: [0.4, 0, 0.6, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05 + 0.1, duration: 0.25 },
  }),
};

export default function HamburgerMenu() {
  const pathname = usePathname();
  const { isMenuOpen, closeMenu, setCurrentPage } = useNavStore();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const isActive = (href) => pathname === href;

  const allItems = [...MAIN_NAV_ITEMS, ...HAMBURGER_EXTRA_ITEMS];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            className="lg:hidden fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* 슬라이드 메뉴 패널 */}
          <motion.nav
            className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col shadow-2xl"
            style={{
              backgroundColor: 'var(--gw-sidebar-bg)',
            }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="메인 메뉴"
          >
            {/* 메뉴 헤더 */}
            <div
              className="flex items-center justify-between px-5 h-16 border-b flex-shrink-0"
              style={{ borderColor: 'var(--gw-border)' }}
            >
              <span className="text-base font-semibold" style={{ color: 'var(--gw-text-primary)' }}>
                메뉴
              </span>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg transition-colors hover:opacity-70"
                aria-label="메뉴 닫기"
              >
                <X className="w-5 h-5" style={{ color: 'var(--gw-text-primary)' }} />
              </button>
            </div>

            {/* 네비게이션 링크 */}
            <div className="flex-1 overflow-y-auto py-4 px-4">
              {/* 메인 메뉴 */}
              <div className="mb-6">
                <p
                  className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--gw-text-secondary)' }}
                >
                  메인 메뉴
                </p>
                <ul className="space-y-1">
                  {MAIN_NAV_ITEMS.map((item, i) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <motion.li
                        key={item.id}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setCurrentPage(item.id)}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all"
                          style={{
                            backgroundColor: active ? 'var(--gw-sidebar-active)' : 'transparent',
                            color: active ? 'var(--gw-primary)' : 'var(--gw-text-primary)',
                          }}
                        >
                          <span className="text-xl">{item.emoji}</span>
                          <span>{item.label}</span>
                          {active && (
                            <span
                              className="ml-auto w-2 h-2 rounded-full"
                              style={{ backgroundColor: 'var(--gw-primary)' }}
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              {/* 추가 항목 */}
              <div>
                <p
                  className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--gw-text-secondary)' }}
                >
                  기타
                </p>
                <ul className="space-y-1">
                  {HAMBURGER_EXTRA_ITEMS.map((item, i) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <motion.li
                        key={item.id}
                        custom={MAIN_NAV_ITEMS.length + i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setCurrentPage(item.id)}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all"
                          style={{
                            backgroundColor: active ? 'var(--gw-sidebar-active)' : 'transparent',
                            color: active ? 'var(--gw-primary)' : 'var(--gw-text-primary)',
                          }}
                        >
                          <span className="text-xl">{item.emoji}</span>
                          <span>{item.label}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* 하단 영역 */}
            <div
              className="px-4 py-4 border-t space-y-2 flex-shrink-0"
              style={{ borderColor: 'var(--gw-border)' }}
            >
              {/* 다크모드 토글 */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium w-full transition-colors hover:opacity-70"
                style={{ color: 'var(--gw-text-primary)' }}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5" style={{ color: 'var(--gw-accent)' }} />
                    <span>라이트 모드</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" style={{ color: 'var(--gw-text-secondary)' }} />
                    <span>다크 모드</span>
                  </>
                )}
              </button>

              {/* 로그아웃 */}
              <button
                onClick={() => {
                  closeMenu();
                  console.log('logout');
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium w-full transition-colors hover:opacity-70"
                style={{ color: 'var(--gw-danger)' }}
              >
                <span className="text-xl">🚪</span>
                <span>로그아웃</span>
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
