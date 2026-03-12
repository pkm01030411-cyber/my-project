'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useNavStore from '@/store/useNavStore';
import { MAIN_NAV_ITEMS } from '@/utils/navigationConfig';

export default function BottomTabBar() {
  const pathname = usePathname();
  const { setCurrentPage } = useNavStore();

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 flex items-stretch border-t transition-theme"
      style={{
        backgroundColor: 'var(--gw-header-bg)',
        borderColor: 'var(--gw-border)',
      }}
      role="navigation"
      aria-label="하단 탭 바"
    >
      {MAIN_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setCurrentPage(item.id)}
            className="flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 relative"
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
          >
            {/* 활성 표시 바 (상단) */}
            {active && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b-full"
                style={{ backgroundColor: 'var(--gw-primary)' }}
              />
            )}

            {/* 아이콘 */}
            <div
              className="relative flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: active ? 'var(--gw-sidebar-active)' : 'transparent',
              }}
            >
              <Icon
                className="w-5 h-5 transition-colors duration-200"
                style={{
                  color: active ? 'var(--gw-primary)' : 'var(--gw-text-secondary)',
                }}
              />
            </div>

            {/* 레이블 */}
            <span
              className="text-xs font-medium transition-colors duration-200 leading-none"
              style={{
                color: active ? 'var(--gw-primary)' : 'var(--gw-text-secondary)',
              }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
