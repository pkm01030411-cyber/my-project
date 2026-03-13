/**
 * GlobalWatch Supabase 클라이언트
 *
 * - createSupabaseBrowserClient: 클라이언트 컴포넌트('use client')에서 사용
 * - supabase: 하위 호환성을 위한 기본 브라우저 클라이언트 (싱글톤)
 */
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn(
    '[GlobalWatch] Supabase 환경 변수가 설정되지 않았습니다.\n' +
      '.env.example을 참고하여 .env.local을 생성해주세요.'
  );
}

const SUPABASE_URL = supabaseUrl || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = supabaseAnonKey || 'placeholder-anon-key';

// 클라이언트 컴포넌트용 브라우저 클라이언트 팩토리
export function createSupabaseBrowserClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// 하위 호환성 싱글톤 (클라이언트 컴포넌트에서 직접 import)
export const supabase = createSupabaseBrowserClient();

export default supabase;
