'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import useAuthStore from '@/store/useAuthStore';

/**
 * useAuth - 인증 상태 훅
 *
 * - 마운트 시 Supabase 세션 확인 후 store 업데이트
 * - onAuthStateChange 리스너로 세션 변경 감지 (탭 간 동기화)
 * - requireAuth=true 이면 미로그인 시 /login으로 리다이렉트
 */
export function useAuth({ requireAuth = false } = {}) {
  const router = useRouter();
  const { user, isLoading, error, setUser, checkSession } = useAuthStore();

  useEffect(() => {
    // 초기 세션 확인
    checkSession();

    // 세션 변경 구독 (로그인/로그아웃/토큰 갱신)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // requireAuth 모드: 로그인 안 됐으면 /login으로 이동
  useEffect(() => {
    if (!requireAuth) return;
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [requireAuth, isLoading, user, router]);

  return { user, isLoading, error };
}

export default useAuth;
