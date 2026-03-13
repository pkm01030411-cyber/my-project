'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Globe, Shield, TrendingUp, Zap, ChevronRight, BarChart3, Bell, Lock } from 'lucide-react';
import useDarkMode from '@/hooks/useDarkMode';
import useAuthStore from '@/store/useAuthStore';

const FEATURES = [
  { icon: Shield,    color: '#dc2626', title: '실시간 리스크 모니터링', desc: '전 세계 무역 리스크를 AI가 실시간으로 분석하고 위험도를 수치화합니다.' },
  { icon: TrendingUp, color: '#10b981', title: '기회도 분석',          desc: '새로운 시장 진출 기회를 자동으로 탐지하고 실행 가능한 인사이트를 제공합니다.' },
  { icon: BarChart3, color: '#2563eb', title: '심층 분석 리포트',       desc: '지역별·산업별 무역 데이터를 기반으로 한 AI 심층 분석 보고서를 제공합니다.' },
  { icon: Bell,      color: '#f59e0b', title: '맞춤 알림 서비스',       desc: '관심 지역·산업에 변화가 생기면 즉시 알림으로 빠르게 대응할 수 있습니다.' },
  { icon: Zap,       color: '#8b5cf6', title: '정책 제안 AI',          desc: 'AI가 분석한 무역 환경 변화에 맞춰 최적의 대응 전략을 자동으로 제안합니다.' },
  { icon: Lock,      color: '#14b8a6', title: '보안 데이터 관리',       desc: '기업 민감 정보는 암호화 저장되고 철저한 접근 제어로 보호됩니다.' },
];

const TIERS = [
  { key: 'tier1', label: 'Tier 1', sublabel: '핵심 시장', color: '#2563eb', desc: '미국·중국·EU 등 10대 핵심 교역국 모니터링. 일일 리포트 제공.' },
  { key: 'tier2', label: 'Tier 2', sublabel: '핵심 + 인접', color: '#10b981', desc: 'Tier 1 + 동남아·중동·인도 등 20개국. 주간 심층 분석 포함.', recommended: true },
  { key: 'tier3', label: 'Tier 3', sublabel: '글로벌 전체', color: '#f59e0b', desc: '전 세계 100개국 이상 통합 모니터링. 전담 분석팀 지원.' },
];

export default function LandingPage() {
  const { isDarkMode } = useDarkMode();
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  return (
    <div className="min-h-screen transition-theme" style={{ backgroundColor: 'var(--gw-bg)' }}>
      {/* 네비바 */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 border-b"
        style={{ backgroundColor: 'var(--gw-header-bg)', borderColor: 'var(--gw-border)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--gw-primary)' }}>
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold" style={{ color: 'var(--gw-text-primary)' }}>GlobalWatch</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium rounded-xl transition-opacity hover:opacity-70"
            style={{ color: 'var(--gw-text-primary)' }}
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-semibold rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--gw-primary)' }}
          >
            무료 시작
          </Link>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="pt-28 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-6"
            style={{ backgroundColor: 'var(--gw-sidebar-active)', color: 'var(--gw-primary)' }}
          >
            <Zap className="w-3 h-3" /> AI 기반 무역 인텔리전스
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ color: 'var(--gw-text-primary)' }}>
            글로벌 무역 리스크를<br />
            <span style={{ color: 'var(--gw-primary)' }}>한눈에</span> 파악하세요
          </h1>
          <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--gw-text-secondary)' }}>
            GlobalWatch는 AI가 전 세계 무역 뉴스·정책·지표를 실시간으로 분석해<br className="hidden md:block" />
            무역 담당자에게 꼭 필요한 인사이트를 제공하는 전문 플랫폼입니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            >
              지금 무료로 시작하기 <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 rounded-xl text-sm font-medium border transition-all hover:shadow-md"
              style={{
                backgroundColor: 'var(--gw-surface)',
                borderColor: 'var(--gw-border)',
                color: 'var(--gw-text-primary)',
              }}
            >
              기존 계정으로 로그인
            </Link>
          </div>
        </div>
      </section>

      {/* 주요 기능 */}
      <section className="py-16 px-6" style={{ backgroundColor: 'var(--gw-surface)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--gw-text-primary)' }}>
            핵심 기능
          </h2>
          <p className="text-sm text-center mb-10" style={{ color: 'var(--gw-text-secondary)' }}>
            무역 전문가를 위한 모든 것을 한 곳에
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="p-5 rounded-2xl border transition-all hover:shadow-md"
                style={{ backgroundColor: 'var(--gw-bg)', borderColor: 'var(--gw-border)' }}
              >
                <div className="p-2.5 rounded-xl w-fit mb-3" style={{ backgroundColor: color + '18' }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: 'var(--gw-text-primary)' }}>
                  {title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--gw-text-secondary)' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 플랜 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--gw-text-primary)' }}>
            모니터링 플랜
          </h2>
          <p className="text-sm text-center mb-10" style={{ color: 'var(--gw-text-secondary)' }}>
            필요에 맞는 플랜을 선택하세요
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIERS.map((tier) => (
              <div
                key={tier.key}
                className="relative p-6 rounded-2xl border transition-all hover:shadow-lg"
                style={{
                  backgroundColor: tier.recommended ? tier.color + '08' : 'var(--gw-surface)',
                  borderColor: tier.recommended ? tier.color : 'var(--gw-border)',
                }}
              >
                {tier.recommended && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: tier.color }}
                  >
                    추천
                  </span>
                )}
                <div className="mb-4">
                  <p className="text-xl font-bold mb-0.5" style={{ color: tier.color }}>
                    {tier.label}
                  </p>
                  <p className="text-sm font-medium mb-3" style={{ color: 'var(--gw-text-primary)' }}>
                    {tier.sublabel}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--gw-text-secondary)' }}>
                    {tier.desc}
                  </p>
                </div>
                <Link
                  href={`/signup?tier=${tier.key}`}
                  className="block w-full py-2.5 text-center text-sm font-semibold rounded-xl transition-all hover:opacity-90"
                  style={{
                    backgroundColor: tier.recommended ? tier.color : 'var(--gw-bg)',
                    color: tier.recommended ? '#fff' : tier.color,
                    border: `1px solid ${tier.color}`,
                  }}
                >
                  {tier.label}으로 시작
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-6 text-center"
        style={{ backgroundColor: 'var(--gw-primary)' }}
      >
        <h2 className="text-2xl font-bold text-white mb-3">
          지금 바로 시작하세요
        </h2>
        <p className="text-sm text-white/80 mb-6">
          회원가입 후 즉시 대시보드에 접근할 수 있습니다
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:scale-[1.02]"
          style={{ backgroundColor: '#fff', color: 'var(--gw-primary)' }}
        >
          무료 회원가입 <ChevronRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 푸터 */}
      <footer
        className="py-8 px-6 text-center border-t"
        style={{ borderColor: 'var(--gw-border)' }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Globe className="w-4 h-4" style={{ color: 'var(--gw-primary)' }} />
          <span className="text-sm font-bold" style={{ color: 'var(--gw-text-primary)' }}>GlobalWatch</span>
        </div>
        <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
          © 2026 GlobalWatch. 무역 인텔리전스 플랫폼
        </p>
      </footer>
    </div>
  );
}
