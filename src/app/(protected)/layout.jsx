'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

/**
 * (protected) 라우트 그룹 레이아웃
 *
 * 클라이언트 측 보호 레이어 (미들웨어와 이중 보호)
 * - 세션이 없으면 /login으로 리다이렉트
 * - 로딩 중에는 스피너 표시
 */
export default function ProtectedLayout({ children }) {
  const { user, isLoading } = useAuth({ requireAuth: true });

  // 로딩 상태 스피너
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--gw-bg)' }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: 'var(--gw-primary)', borderTopColor: 'transparent' }}
          />
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            인증 확인 중...
          </p>
        </div>
      </div>
    );
  }

  // 미로그인 시 빈 화면 (미들웨어/useAuth가 리다이렉트 처리)
  if (!user) return null;

  return <>{children}</>;
}
