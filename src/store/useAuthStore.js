import { create } from 'zustand';
import { supabase } from '@/utils/supabaseClient';

/**
 * GlobalWatch 인증 전역 상태 (Zustand)
 *
 * - user: 현재 로그인한 Supabase 사용자 객체
 * - isLoading: 비동기 처리 중 여부
 * - error: 마지막 에러 메시지
 */
const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  // 유저 직접 설정 (세션 복원 시 사용)
  setUser: (user) => set({ user, error: null }),

  clearError: () => set({ error: null }),

  // 이메일/비밀번호 로그인
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      const msg =
        error.message.includes('Invalid login credentials')
          ? '이메일 또는 비밀번호가 잘못되었습니다.'
          : error.message;
      set({ error: msg, isLoading: false });
      return { error: msg };
    }
    set({ user: data.user, isLoading: false, error: null });
    return { data };
  },

  // 이메일/비밀번호 + Tier 회원가입
  signup: async (email, password, tierLevel = 'tier1') => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { tier_level: tierLevel },
      },
    });
    if (error) {
      const msg =
        error.message.includes('already registered')
          ? '이미 사용 중인 이메일입니다.'
          : error.message;
      set({ error: msg, isLoading: false });
      return { error: msg };
    }
    // 이메일 확인이 필요한 경우 user가 null일 수 있음
    set({ user: data.user, isLoading: false, error: null });
    return { data };
  },

  // 로그아웃
  logout: async () => {
    set({ isLoading: true });
    await supabase.auth.signOut();
    set({ user: null, isLoading: false, error: null });
  },

  // 페이지 로드 시 세션 확인
  checkSession: async () => {
    set({ isLoading: true });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      set({ user: session.user, isLoading: false });
    } else {
      set({ user: null, isLoading: false });
    }
    return session;
  },
}));

export default useAuthStore;
