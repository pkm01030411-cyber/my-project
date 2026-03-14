'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Globe, Shield, TrendingUp, Zap, ChevronRight, BarChart3,
  Bell, Lock, Check, ArrowDown, Users, Newspaper, MapPin,
} from 'lucide-react';
import useDarkMode from '@/hooks/useDarkMode';
import useAuthStore from '@/store/useAuthStore';

const STATS = [
  { icon: Users,     value: '1,200+', label: '기업 고객' },
  { icon: MapPin,    value: '100+',   label: '모니터링 국가' },
  { icon: Newspaper, value: '50,000+', label: '월간 뉴스 분석' },
  { icon: Zap,       value: '99.8%',  label: '알림 정확도' },
];

const FEATURES = [
  {
    icon: Shield, color: '#dc2626',
    title: '실시간 리스크 모니터링',
    desc: '전 세계 무역 리스크를 AI가 실시간으로 분석하고 위험도를 0~100 수치로 산출합니다.',
    bullets: ['뉴스·정책·경제지표 통합 분석', '지역·산업별 위험 지수 시각화', '임계치 초과 시 즉시 경보'],
  },
  {
    icon: TrendingUp, color: '#10b981',
    title: '기회도 자동 탐지',
    desc: '새로운 시장 진출 기회를 자동으로 발굴하고 실행 가능한 인사이트를 제공합니다.',
    bullets: ['FTA·협정 체결 동향 추적', '신흥 시장 진출 가능성 분석', '산업별 기회 점수 자동 계산'],
  },
  {
    icon: BarChart3, color: '#2563eb',
    title: 'AI 심층 분석 리포트',
    desc: '지역별·산업별 무역 데이터를 기반으로 한 전문 AI 보고서를 주간·월간으로 제공합니다.',
    bullets: ['주간·월간 자동 생성', 'PDF·Excel 다운로드', '이전 리포트 아카이브'],
  },
  {
    icon: Bell, color: '#f59e0b',
    title: '맞춤 알림 서비스',
    desc: '관심 지역·산업에 변화가 생기면 즉시 알림으로 빠르게 대응할 수 있습니다.',
    bullets: ['이메일·브라우저 푸시 지원', '관심 키워드 설정', 'Tier별 알림 주기 선택'],
  },
  {
    icon: Zap, color: '#8b5cf6',
    title: '정책 제안 AI',
    desc: 'AI가 분석한 무역 환경 변화에 맞춰 최적의 대응 전략을 자동으로 제안합니다.',
    bullets: ['우선순위별 Action Item 제공', '기한·영향도 자동 분류', '체크리스트 진행 관리'],
  },
  {
    icon: Lock, color: '#14b8a6',
    title: '보안 데이터 관리',
    desc: '기업 민감 정보는 AES-256 암호화 저장되고, 철저한 접근 제어로 보호됩니다.',
    bullets: ['SOC 2 Type II 준수', '역할 기반 접근 제어', '감사 로그 제공'],
  },
];

const TIERS = [
  {
    key: 'tier1', label: 'Tier 1', sublabel: '핵심 시장', color: '#2563eb',
    desc: '미국·중국·EU·한국 등 핵심 10개국 집중 모니터링',
    features: ['핵심 10개국 모니터링', '일일 요약 리포트', '리스크 경보 알림', '주요 산업 2개 분석', 'PDF 월 3회'],
  },
  {
    key: 'tier2', label: 'Tier 2', sublabel: '핵심 + 인접', color: '#10b981', recommended: true,
    desc: 'Tier 1 + 동남아·중동·인도 포함 20개국 모니터링',
    features: ['20개국 모니터링', '주간·월간 심층 리포트', '산업별 분석 5개', '맞춤 정책 제안', 'PDF 무제한', '이메일 알림'],
  },
  {
    key: 'tier3', label: 'Tier 3', sublabel: '글로벌 전체', color: '#f59e0b',
    desc: '전 세계 100개국+ 통합 모니터링 & 전담 분석팀',
    features: ['100개국+ 모니터링', '실시간 알림 (5분 간격)', '전담 분석팀 지원', 'API 연동', '무제한 리포트', '일괄 다운로드'],
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: '회원가입', desc: '이메일로 30초 안에 가입, 원하는 Tier를 선택하세요.' },
  { step: '02', title: '대시보드 확인', desc: '즉시 글로벌 무역 리스크 지수와 최신 뉴스를 확인합니다.' },
  { step: '03', title: '알림 설정', desc: '관심 지역·산업을 지정해 중요 이슈를 놓치지 마세요.' },
  { step: '04', title: '리포트 활용', desc: 'AI가 생성한 리포트로 무역 전략을 스마트하게 수립하세요.' },
];

export default function LandingPage() {
  const { isDarkMode } = useDarkMode();
  const { user } = useAuthStore();
  const router = useRouter();
  const featuresRef = useRef(null);

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen transition-theme" style={{ backgroundColor: 'var(--gw-bg)' }}>

      {/* ── 네비바 ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 border-b backdrop-blur-sm"
        style={{
          backgroundColor: isDarkMode ? 'rgba(17,24,39,0.92)' : 'rgba(255,255,255,0.92)',
          borderColor: 'var(--gw-border)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--gw-primary)' }}
          >
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold" style={{ color: 'var(--gw-text-primary)' }}>
            GlobalWatch
          </span>
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

      {/* ── 히어로 섹션 ── */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-6"
            style={{ backgroundColor: 'var(--gw-sidebar-active)', color: 'var(--gw-primary)' }}
          >
            <Zap className="w-3 h-3" /> AI 기반 무역 인텔리전스 플랫폼
          </span>

          <h1
            className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight"
            style={{ color: 'var(--gw-text-primary)' }}
          >
            글로벌 무역 시장 인텔리전스의<br />
            <span style={{ color: 'var(--gw-primary)' }}>새로운 표준</span>
          </h1>

          <p className="text-base mb-3 leading-relaxed" style={{ color: 'var(--gw-text-secondary)' }}>
            AI 기반 분석으로 국제 정세를 실시간으로 파악하고<br className="hidden md:block" />
            당신의 무역 정책을 더 스마트하게 만드세요.
          </p>
          <p className="text-sm mb-8" style={{ color: 'var(--gw-text-secondary)' }}>
            100개국 이상의 무역 뉴스·정책·지표를 매일 분석하는 전문 플랫폼
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            >
              시작하기 <ChevronRight className="w-4 h-4" />
            </Link>
            <button
              onClick={scrollToFeatures}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium border transition-all hover:shadow-md"
              style={{
                backgroundColor: 'var(--gw-surface)',
                borderColor: 'var(--gw-border)',
                color: 'var(--gw-text-primary)',
              }}
            >
              더 알아보기 <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 신뢰 지표 ── */}
      <section
        className="py-10 px-6 border-y"
        style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label}>
              <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--gw-primary)' }} />
              <p className="text-2xl font-extrabold mb-0.5" style={{ color: 'var(--gw-text-primary)' }}>
                {value}
              </p>
              <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 주요 기능 ── */}
      <section ref={featuresRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{ color: 'var(--gw-primary)' }}>
            ✨ 주요 기능
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: 'var(--gw-text-primary)' }}>
            무역 전문가를 위한 모든 것
          </h2>
          <p className="text-sm text-center mb-12" style={{ color: 'var(--gw-text-secondary)' }}>
            실시간 국제정세 모니터링부터 AI 기반 정책 제안까지
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, color, title, desc, bullets }) => (
              <div
                key={title}
                className="p-5 rounded-2xl border transition-all hover:shadow-lg group"
                style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
              >
                <div
                  className="p-2.5 rounded-xl w-fit mb-3"
                  style={{ backgroundColor: color + '18' }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: 'var(--gw-text-primary)' }}>
                  {title}
                </h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--gw-text-secondary)' }}>
                  {desc}
                </p>
                <ul className="space-y-1">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color }} />
                      <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 이용 방법 ── */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: 'var(--gw-surface)' }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{ color: 'var(--gw-primary)' }}>
            How It Works
          </p>
          <h2 className="text-2xl font-bold text-center mb-12" style={{ color: 'var(--gw-text-primary)' }}>
            4단계로 시작하세요
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-lg font-extrabold text-white"
                  style={{ backgroundColor: 'var(--gw-primary)' }}
                >
                  {step}
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

      {/* ── Tier 플랜 ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-center mb-2 uppercase tracking-widest" style={{ color: 'var(--gw-primary)' }}>
            💰 가격 플랜
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: 'var(--gw-text-primary)' }}>
            필요에 맞는 플랜을 선택하세요
          </h2>
          <p className="text-sm text-center mb-12" style={{ color: 'var(--gw-text-secondary)' }}>
            모든 플랜에 무료 체험 기간이 포함됩니다
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TIERS.map((tier) => (
              <div
                key={tier.key}
                className="relative p-6 rounded-2xl border transition-all hover:shadow-xl"
                style={{
                  backgroundColor: tier.recommended ? tier.color + '08' : 'var(--gw-surface)',
                  borderColor: tier.recommended ? tier.color : 'var(--gw-border)',
                  transform: tier.recommended ? 'scale(1.02)' : undefined,
                }}
              >
                {tier.recommended && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                    style={{ backgroundColor: tier.color }}
                  >
                    ⭐ 추천
                  </span>
                )}

                <div className="mb-5">
                  <p className="text-2xl font-extrabold mb-0.5" style={{ color: tier.color }}>
                    {tier.label}
                  </p>
                  <p className="text-sm font-semibold mb-2" style={{ color: 'var(--gw-text-primary)' }}>
                    {tier.sublabel}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--gw-text-secondary)' }}>
                    {tier.desc}
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                      <span className="text-xs" style={{ color: 'var(--gw-text-primary)' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/signup?tier=${tier.key}`}
                  className="block w-full py-3 text-center text-sm font-semibold rounded-xl transition-all hover:opacity-90 hover:shadow-md"
                  style={{
                    backgroundColor: tier.recommended ? tier.color : 'transparent',
                    color: tier.recommended ? '#fff' : tier.color,
                    border: `1.5px solid ${tier.color}`,
                  }}
                >
                  {tier.label}으로 시작
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: 'var(--gw-primary)' }}
      >
        <div className="max-w-xl mx-auto">
          <p className="text-white/70 text-sm font-semibold mb-3 uppercase tracking-widest">
            지금 바로 시작하세요
          </p>
          <h2 className="text-3xl font-extrabold text-white mb-4">
            무역 인텔리전스의 새로운 기준
          </h2>
          <p className="text-white/80 text-sm mb-8 leading-relaxed">
            회원가입 후 즉시 대시보드에 접근할 수 있습니다.<br />
            신용카드 없이 무료로 체험해보세요.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:shadow-xl hover:scale-[1.02]"
            style={{ backgroundColor: '#fff', color: 'var(--gw-primary)' }}
          >
            무료 체험 시작 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer
        className="py-10 px-6 border-t"
        style={{ borderColor: 'var(--gw-border)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--gw-primary)' }}
              >
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--gw-text-primary)' }}>
                GlobalWatch
              </span>
            </div>
            <div className="flex items-center gap-5 text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
              <Link href="/login" className="hover:opacity-70 transition-opacity">로그인</Link>
              <Link href="/signup" className="hover:opacity-70 transition-opacity">회원가입</Link>
              <Link href="/help" className="hover:opacity-70 transition-opacity">도움말</Link>
              <a href="mailto:support@globalwatch.com" className="hover:opacity-70 transition-opacity">
                문의
              </a>
            </div>
          </div>
          <div className="border-t mt-6 pt-6 text-center" style={{ borderColor: 'var(--gw-border)' }}>
            <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
              © 2026 GlobalWatch. 무역 인텔리전스 플랫폼 · All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
