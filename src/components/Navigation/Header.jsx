'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  Globe,
  ChevronDown,
  UserCircle,
  Settings,
  LogOut,
} from 'lucide-react';
import useNavStore from '@/store/useNavStore';
import useDarkMode from '@/hooks/useDarkMode';
import useAuthStore from '@/store/useAuthStore';
import { TIER_OPTIONS } from '@/utils/constants';

export default function Header() {
  const router = useRouter();
  const { isMenuOpen, toggleMenu } = useNavStore();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, logout } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTierOpen, setIsTierOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const tierRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (tierRef.current && !tierRef.current.contains(e.target)) {
        setIsTierOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await logout();
    router.replace('/login');
  };

  const currentTierLabel = TIER_OPTIONS.find((t) => t.value === selectedTier)?.label || '전체';

  // 유저 이니셜 (이메일 첫 글자 대문자)
  const userInitial = user?.email ? user.email[0].toUpperCase() : 'U';
  const userEmail = user?.email || '';
  const tierLevel = user?.user_metadata?.tier_level || 'tier1';
  const tierLabel = { tier1: 'Tier 1', tier2: 'Tier 2', tier3: 'Tier 3' }[tierLevel] || 'Tier 1';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 md:px-6 border-b transition-theme"
      style={{
        backgroundColor: 'var(--gw-header-bg)',
        borderColor: 'var(--gw-border)',
      }}
    >
      {/* ─── 좌측: 로고 ─── */}
      <div className="flex items-center flex-shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2 mr-4 lg:mr-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--gw-primary)' }}
          >
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span
            className="hidden sm:block text-lg font-bold"
            style={{ color: 'var(--gw-text-primary)' }}
          >
            GlobalWatch
          </span>
        </Link>
      </div>

      {/* ─── 중앙: 검색 바 (md 이상) ─── */}
      <div className="hidden md:flex flex-1 max-w-2xl items-center gap-2">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 items-center rounded-lg border overflow-hidden transition-theme"
          style={{
            backgroundColor: 'var(--gw-surface)',
            borderColor: 'var(--gw-border)',
          }}
        >
          {/* Tier 필터 */}
          <div className="relative" ref={tierRef}>
            <button
              type="button"
              onClick={() => setIsTierOpen(!isTierOpen)}
              className="flex items-center gap-1 px-3 py-2.5 text-xs font-medium border-r whitespace-nowrap transition-opacity hover:opacity-70"
              style={{
                color: 'var(--gw-text-secondary)',
                borderColor: 'var(--gw-border)',
              }}
            >
              {currentTierLabel}
              <ChevronDown className="w-3 h-3" />
            </button>
            {isTierOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-36 rounded-lg border shadow-lg z-50"
                style={{
                  backgroundColor: 'var(--gw-surface)',
                  borderColor: 'var(--gw-border)',
                }}
              >
                {TIER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSelectedTier(option.value);
                      setIsTierOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs transition-opacity hover:opacity-70"
                    style={{
                      color:
                        selectedTier === option.value
                          ? 'var(--gw-primary)'
                          : 'var(--gw-text-primary)',
                      fontWeight: selectedTier === option.value ? 600 : 400,
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 검색 입력 */}
          <div className="flex flex-1 items-center px-3">
            <Search
              className="w-4 h-4 flex-shrink-0 mr-2"
              style={{ color: 'var(--gw-text-secondary)' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="국가, 산업, 키워드 검색..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-60"
              style={{ color: 'var(--gw-text-primary)' }}
            />
          </div>
        </form>
      </div>

      {/* ─── 우측: 아이콘 그룹 ─── */}
      <div className="flex items-center gap-1 ml-auto">
        {/* 모바일 검색 아이콘 */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="md:hidden p-2 rounded-lg transition-opacity hover:opacity-70"
          aria-label="검색"
        >
          <Search className="w-5 h-5" style={{ color: 'var(--gw-text-secondary)' }} />
        </button>

        {/* 알림 아이콘 */}
        <button
          className="relative p-2 rounded-lg transition-opacity hover:opacity-70"
          aria-label="알림"
        >
          <Bell className="w-5 h-5" style={{ color: 'var(--gw-text-secondary)' }} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--gw-danger)' }}
          />
        </button>

        {/* 다크모드 토글 */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg transition-opacity hover:opacity-70"
          aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" style={{ color: 'var(--gw-accent)' }} />
          ) : (
            <Moon className="w-5 h-5" style={{ color: 'var(--gw-text-secondary)' }} />
          )}
        </button>

        {/* 프로필 드롭다운 (데스크톱) */}
        <div className="hidden md:block relative ml-1" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-lg transition-opacity hover:opacity-80"
            aria-label="프로필 메뉴"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            >
              {userInitial}
            </div>
            <ChevronDown
              className="w-3 h-3 transition-transform duration-200"
              style={{
                color: 'var(--gw-text-secondary)',
                transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>

          {/* 프로필 드롭다운 메뉴 */}
          {isProfileOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-56 rounded-xl border shadow-lg py-1 z-50"
              style={{
                backgroundColor: 'var(--gw-surface)',
                borderColor: 'var(--gw-border)',
              }}
            >
              {/* 유저 정보 */}
              <div
                className="px-4 py-3 border-b"
                style={{ borderColor: 'var(--gw-border)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                    style={{ backgroundColor: 'var(--gw-primary)' }}
                  >
                    {userInitial}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: 'var(--gw-text-primary)' }}
                    >
                      {userEmail || '사용자'}
                    </p>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-medium"
                      style={{
                        backgroundColor: 'var(--gw-sidebar-active)',
                        color: 'var(--gw-primary)',
                      }}
                    >
                      {tierLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* 메뉴 아이템 */}
              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm transition-opacity hover:opacity-70"
                  style={{ color: 'var(--gw-text-primary)' }}
                >
                  <UserCircle className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
                  프로필
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm transition-opacity hover:opacity-70"
                  style={{ color: 'var(--gw-text-primary)' }}
                >
                  <Settings className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
                  설정
                </Link>
              </div>

              {/* 로그아웃 */}
              <div
                className="border-t pt-1 pb-1"
                style={{ borderColor: 'var(--gw-border)' }}
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm w-full transition-opacity hover:opacity-70"
                  style={{ color: 'var(--gw-danger)' }}
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 해머거 버튼 (모바일 / 태블릿) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-lg transition-opacity hover:opacity-70 ml-1"
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" style={{ color: 'var(--gw-text-primary)' }} />
          ) : (
            <Menu className="w-5 h-5" style={{ color: 'var(--gw-text-primary)' }} />
          )}
        </button>
      </div>

      {/* ─── 모바일 검색 바 (펼쳐짐) ─── */}
      {isSearchOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 p-3 border-b"
          style={{
            backgroundColor: 'var(--gw-header-bg)',
            borderColor: 'var(--gw-border)',
          }}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-lg border px-3 py-2 gap-2"
            style={{
              backgroundColor: 'var(--gw-surface)',
              borderColor: 'var(--gw-border)',
            }}
          >
            <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gw-text-secondary)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--gw-text-primary)' }}
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  );
}
