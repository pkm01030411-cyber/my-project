'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, LogOut } from 'lucide-react';
import useNavStore from '@/store/useNavStore';
import useAuthStore from '@/store/useAuthStore';
import { MAIN_NAV_ITEMS, HAMBURGER_EXTRA_ITEMS, LOGOUT_ITEM } from '@/utils/navigationConfig';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setCurrentPage } = useNavStore();
  const { logout } = useAuthStore();

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 z-40 border-r transition-theme"
      style={{
        backgroundColor: 'var(--gw-sidebar-bg)',
        borderColor: 'var(--gw-border)',
      }}
    >
      {/* 로고 */}
      <div
        className="flex items-center gap-3 px-6 h-16 border-b flex-shrink-0"
        style={{ borderColor: 'var(--gw-border)' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--gw-primary)' }}
        >
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-base font-bold" style={{ color: 'var(--gw-text-primary)' }}>
            GlobalWatch
          </p>
          <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
            무역 인텔리전스
          </p>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {/* 기본 메뉴 */}
        <div className="mb-6">
          <p
            className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--gw-text-secondary)' }}
          >
            메인 메뉴
          </p>
          <ul className="space-y-1">
            {MAIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setCurrentPage(item.id)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group"
                    style={{
                      backgroundColor: active ? 'var(--gw-sidebar-active)' : 'transparent',
                      color: active ? 'var(--gw-primary)' : 'var(--gw-text-secondary)',
                    }}
                  >
                    <Icon
                      className="w-5 h-5 flex-shrink-0 transition-colors"
                      style={{ color: active ? 'var(--gw-primary)' : 'var(--gw-text-secondary)' }}
                    />
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--gw-primary)' }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 추가 메뉴 */}
        <div>
          <p
            className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--gw-text-secondary)' }}
          >
            설정
          </p>
          <ul className="space-y-1">
            {HAMBURGER_EXTRA_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setCurrentPage(item.id)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: active ? 'var(--gw-sidebar-active)' : 'transparent',
                      color: active ? 'var(--gw-primary)' : 'var(--gw-text-secondary)',
                    }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0"
                      style={{ color: active ? 'var(--gw-primary)' : 'var(--gw-text-secondary)' }}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 하단: 로그아웃 */}
      <div
        className="px-3 py-4 border-t flex-shrink-0"
        style={{ borderColor: 'var(--gw-border)' }}
      >
        <button
          onClick={async () => { await logout(); router.replace('/login'); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors hover:opacity-70"
          style={{ color: 'var(--gw-danger)' }}
        >
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
