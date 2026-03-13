'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Globe, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import useDarkMode from '@/hooks/useDarkMode';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/dashboard';

  const { login, isLoading, error, clearError, user } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (user) router.replace(nextPath);
  }, [user, router, nextPath]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFieldErrors((prev) => ({ ...prev, email: '' }));
    clearError();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFieldErrors((prev) => ({ ...prev, password: '' }));
    clearError();
  };

  function validate() {
    const errors = {};
    if (!email) errors.email = '이메일을 입력해주세요.';
    else if (!isValidEmail(email)) errors.email = '올바른 이메일 형식이 아닙니다.';
    if (!password) errors.password = '비밀번호를 입력해주세요.';
    else if (password.length < 8) errors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    const result = await login(email, password);
    if (!result?.error) {
      router.replace(nextPath);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-theme"
      style={{ backgroundColor: 'var(--gw-bg)' }}
    >
      <div className="w-full max-w-[400px]">
        {/* 로고 */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: 'var(--gw-primary)' }}
          >
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xl font-bold leading-tight" style={{ color: 'var(--gw-text-primary)' }}>
              GlobalWatch
            </p>
            <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
              무역 인텔리전스 플랫폼
            </p>
          </div>
        </div>

        {/* 로그인 카드 */}
        <div
          className="p-7 rounded-2xl border shadow-sm transition-theme"
          style={{
            backgroundColor: 'var(--gw-surface)',
            borderColor: 'var(--gw-border)',
          }}
        >
          <h1 className="text-xl font-bold mb-1 text-center" style={{ color: 'var(--gw-text-primary)' }}>
            로그인
          </h1>
          <p className="text-sm text-center mb-6" style={{ color: 'var(--gw-text-secondary)' }}>
            계정에 로그인하여 시작하세요
          </p>

          {/* 에러 배너 */}
          {error && (
            <div
              className="flex items-start gap-2 p-3 rounded-lg mb-4 text-sm"
              style={{
                backgroundColor: 'rgba(220, 38, 38, 0.08)',
                borderLeft: '3px solid var(--gw-danger)',
              }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--gw-danger)' }} />
              <span style={{ color: 'var(--gw-danger)' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* 이메일 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--gw-text-primary)' }}
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="user@example.com"
                autoComplete="email"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
                style={{
                  backgroundColor: 'var(--gw-bg)',
                  borderColor: fieldErrors.email ? 'var(--gw-danger)' : 'var(--gw-border)',
                  color: 'var(--gw-text-primary)',
                }}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs" style={{ color: 'var(--gw-danger)' }}>
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--gw-text-primary)' }}
              >
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border text-sm outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--gw-bg)',
                    borderColor: fieldErrors.password ? 'var(--gw-danger)' : 'var(--gw-border)',
                    color: 'var(--gw-text-primary)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
                  ) : (
                    <Eye className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs" style={{ color: 'var(--gw-danger)' }}>
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* 로그인 유지 + 비밀번호 찾기 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{ accentColor: 'var(--gw-primary)' }}
                />
                <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                  로그인 유지
                </span>
              </label>
              <Link
                href="#"
                className="text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: 'var(--gw-primary)' }}
              >
                비밀번호 찾기
              </Link>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-5" style={{ color: 'var(--gw-text-secondary)' }}>
            계정이 없으신가요?{' '}
            <Link
              href="/signup"
              className="font-semibold transition-opacity hover:opacity-70"
              style={{ color: 'var(--gw-primary)' }}
            >
              회원가입하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  useDarkMode();
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
