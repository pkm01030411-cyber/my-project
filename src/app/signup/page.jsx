import Link from 'next/link';
import { Globe } from 'lucide-react';

export const metadata = {
  title: '회원가입 | GlobalWatch',
};

export default function SignupPage() {
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

        {/* 회원가입 카드 */}
        <div
          className="p-6 rounded-2xl border transition-theme"
          style={{
            backgroundColor: 'var(--gw-surface)',
            borderColor: 'var(--gw-border)',
          }}
        >
          <h1 className="text-xl font-bold mb-1 text-center" style={{ color: 'var(--gw-text-primary)' }}>
            회원가입
          </h1>
          <p className="text-sm text-center mb-6" style={{ color: 'var(--gw-text-secondary)' }}>
            무역 담당자를 위한 전문 플랫폼에 합류하세요
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--gw-text-primary)' }}>
                  이름
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
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
                  직책
                </label>
                <input
                  type="text"
                  placeholder="무역팀장"
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-theme"
                  style={{
                    backgroundColor: 'var(--gw-bg)',
                    borderColor: 'var(--gw-border)',
                    color: 'var(--gw-text-primary)',
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--gw-text-primary)' }}>
                회사명
              </label>
              <input
                type="text"
                placeholder="(주)글로벌트레이드"
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
                이메일
              </label>
              <input
                type="email"
                placeholder="user@company.com"
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
                placeholder="8자 이상 입력"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-theme"
                style={{
                  backgroundColor: 'var(--gw-bg)',
                  borderColor: 'var(--gw-border)',
                  color: 'var(--gw-text-primary)',
                }}
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mt-0.5" />
              <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                <Link href="#" className="underline" style={{ color: 'var(--gw-primary)' }}>
                  이용약관
                </Link>
                {' '}및{' '}
                <Link href="#" className="underline" style={{ color: 'var(--gw-primary)' }}>
                  개인정보 처리방침
                </Link>
                에 동의합니다
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            >
              회원가입
            </button>
          </form>

          <p className="text-center text-sm mt-5" style={{ color: 'var(--gw-text-secondary)' }}>
            이미 계정이 있으신가요?{' '}
            <Link
              href="/login"
              className="font-semibold transition-colors hover:opacity-70"
              style={{ color: 'var(--gw-primary)' }}
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
