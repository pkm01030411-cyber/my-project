import Link from 'next/link';
import { Globe } from 'lucide-react';

export const metadata = {
  title: '로그인 | GlobalWatch',
};

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-theme"
      style={{ backgroundColor: 'var(--gw-bg)' }}
    >
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--gw-primary)' }}
          >
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xl font-bold" style={{ color: 'var(--gw-text-primary)' }}>
              GlobalWatch
            </p>
            <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
              무역 인텔리전스 플랫폼
            </p>
          </div>
        </div>

        {/* 로그인 카드 */}
        <div
          className="p-6 rounded-2xl border transition-theme"
          style={{
            backgroundColor: 'var(--gw-surface)',
            borderColor: 'var(--gw-border)',
          }}
        >
          <h1 className="text-xl font-bold mb-1 text-center" style={{ color: 'var(--gw-text-primary)' }}>
            로그인
          </h1>
          <p className="text-sm text-center mb-6" style={{ color: 'var(--gw-text-secondary)' }}>
            GlobalWatch에 오신 것을 환영합니다
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--gw-text-primary)' }}>
                이메일
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-theme"
                style={{
                  backgroundColor: 'var(--gw-bg)',
                  borderColor: 'var(--gw-border)',
                  color: 'var(--gw-text-primary)',
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--gw-text-primary)' }}>
                비밀번호
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-theme"
                style={{
                  backgroundColor: 'var(--gw-bg)',
                  borderColor: 'var(--gw-border)',
                  color: 'var(--gw-text-primary)',
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                  로그인 유지
                </span>
              </label>
              <Link
                href="#"
                className="text-xs transition-colors hover:opacity-70"
                style={{ color: 'var(--gw-primary)' }}
              >
                비밀번호 찾기
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            >
              로그인
            </button>
          </form>

          <p className="text-center text-sm mt-5" style={{ color: 'var(--gw-text-secondary)' }}>
            계정이 없으신가요?{' '}
            <Link
              href="/signup"
              className="font-semibold transition-colors hover:opacity-70"
              style={{ color: 'var(--gw-primary)' }}
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
