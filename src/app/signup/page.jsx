'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Globe, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import useDarkMode from '@/hooks/useDarkMode';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const TIERS = [
  {
    value: 'tier1',
    label: 'Tier 1',
    sublabel: '핵심 시장만',
    description: '미국, 중국, EU 등 10대 주요 교역국 모니터링',
    badge: '기본',
    badgeColor: 'var(--gw-primary)',
  },
  {
    value: 'tier2',
    label: 'Tier 2',
    sublabel: '핵심 + 인접',
    description: 'Tier 1 + 동남아, 중동, 인도 등 신흥 시장 포함',
    badge: '추천',
    badgeColor: 'var(--gw-secondary)',
  },
  {
    value: 'tier3',
    label: 'Tier 3',
    sublabel: '글로벌 모니터링',
    description: '전 세계 100+ 국가 통합 무역 인텔리전스',
    badge: '고급',
    badgeColor: 'var(--gw-accent)',
  },
];

export default function SignupPage() {
  useDarkMode();

  const router = useRouter();
  const { signup, isLoading, error, clearError, user } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedTier, setSelectedTier] = useState('tier1');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [signupDone, setSignupDone] = useState(false);

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  const clearFieldError = (field) => {
    setFieldErrors((prev) => ({ ...prev, [field]: '' }));
    clearError();
  };

  function validate() {
    const errors = {};
    if (!email) errors.email = '이메일을 입력해주세요.';
    else if (!isValidEmail(email)) errors.email = '올바른 이메일 형식이 아닙니다.';
    if (!password) errors.password = '비밀번호를 입력해주세요.';
    else if (password.length < 8) errors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    if (!confirmPassword) errors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    else if (password !== confirmPassword) errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    const result = await signup(email, password, selectedTier);
    if (!result?.error) {
      // Supabase 이메일 확인 필요 여부에 따라 분기
      if (result.data?.user && !result.data?.session) {
        // 이메일 인증 필요 (확인 이메일 발송됨)
        setSignupDone(true);
      } else {
        router.replace('/dashboard');
      }
    }
  };

  // 이메일 확인 안내 화면
  if (signupDone) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 transition-theme"
        style={{ backgroundColor: 'var(--gw-bg)' }}
      >
        <div className="w-full max-w-[400px] text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
          >
            <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--gw-secondary)' }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--gw-text-primary)' }}>
            이메일을 확인해주세요
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--gw-text-secondary)' }}>
            <strong style={{ color: 'var(--gw-text-primary)' }}>{email}</strong>으로<br />
            인증 링크를 발송했습니다. 이메일을 확인한 후 로그인해주세요.
          </p>
          <Link
            href="/login"
            className="inline-block w-full py-2.5 rounded-lg text-sm font-semibold text-white text-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--gw-primary)' }}
          >
            로그인하러 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-theme"
      style={{ backgroundColor: 'var(--gw-bg)' }}
    >
      <div className="w-full max-w-[420px]">
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

        {/* 회원가입 카드 */}
        <div
          className="p-7 rounded-2xl border shadow-sm transition-theme"
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
                onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }}
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
                  onChange={(e) => { setPassword(e.target.value); clearFieldError('password'); }}
                  placeholder="8자 이상 입력"
                  autoComplete="new-password"
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

            {/* 비밀번호 확인 */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--gw-text-primary)' }}
              >
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); }}
                  placeholder="비밀번호 재입력"
                  autoComplete="new-password"
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border text-sm outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--gw-bg)',
                    borderColor: fieldErrors.confirmPassword ? 'var(--gw-danger)' : 'var(--gw-border)',
                    color: 'var(--gw-text-primary)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
                  ) : (
                    <Eye className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-xs" style={{ color: 'var(--gw-danger)' }}>
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Tier 선택 */}
            <div>
              <p className="block text-sm font-medium mb-2" style={{ color: 'var(--gw-text-primary)' }}>
                모니터링 플랜 선택
              </p>
              <div className="space-y-2">
                {TIERS.map((tier) => {
                  const isSelected = selectedTier === tier.value;
                  return (
                    <label
                      key={tier.value}
                      className="flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all"
                      style={{
                        borderColor: isSelected ? 'var(--gw-primary)' : 'var(--gw-border)',
                        backgroundColor: isSelected ? 'var(--gw-sidebar-active)' : 'var(--gw-bg)',
                      }}
                    >
                      {/* 라디오 버튼 */}
                      <div className="flex-shrink-0 mt-0.5">
                        <div
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                          style={{
                            borderColor: isSelected ? 'var(--gw-primary)' : 'var(--gw-border)',
                          }}
                        >
                          {isSelected && (
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: 'var(--gw-primary)' }}
                            />
                          )}
                        </div>
                        <input
                          type="radio"
                          name="tier"
                          value={tier.value}
                          checked={isSelected}
                          onChange={() => setSelectedTier(tier.value)}
                          className="sr-only"
                        />
                      </div>
                      {/* 내용 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-sm font-semibold"
                            style={{ color: isSelected ? 'var(--gw-primary)' : 'var(--gw-text-primary)' }}
                          >
                            {tier.label}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                            {tier.sublabel}
                          </span>
                          <span
                            className="ml-auto text-xs px-1.5 py-0.5 rounded font-semibold"
                            style={{
                              backgroundColor: `${tier.badgeColor}20`,
                              color: tier.badgeColor,
                            }}
                          >
                            {tier.badge}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                          {tier.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  가입 처리 중...
                </>
              ) : (
                '회원가입'
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-5" style={{ color: 'var(--gw-text-secondary)' }}>
            이미 계정이 있으신가요?{' '}
            <Link
              href="/login"
              className="font-semibold transition-opacity hover:opacity-70"
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
