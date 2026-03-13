import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

/**
 * GlobalWatch 프록시 (구 미들웨어) - 보호된 라우트 인증 처리
 *
 * Next.js 16+: middleware.js → proxy.js, export 'middleware' → export 'proxy'
 *
 * 보호된 경로: /dashboard, /news, /analytics, /recommendation, /settings, /profile
 * - 세션 없음 → /login으로 리다이렉트
 * - /login, /signup 접근 시 이미 로그인 → /dashboard로 리다이렉트
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // 응답 객체 생성 (쿠키 갱신을 위해)
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Supabase 서버 클라이언트 생성 (미들웨어용 — 쿠키 R/W)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 세션 갱신 (토큰 만료 자동 처리)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isProtectedPage = [
    '/dashboard',
    '/news',
    '/analytics',
    '/recommendation',
    '/settings',
    '/profile',
  ].some((p) => pathname === p || pathname.startsWith(p + '/'));

  // 미로그인 상태로 보호된 페이지 접근 → /login
  if (isProtectedPage && !user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 이미 로그인한 상태로 인증 페이지 접근 → /dashboard
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // 정적 파일, API 라우트 제외하고 모든 경로 처리
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
