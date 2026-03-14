'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/Layout/MainLayout';
import useDarkMode from '@/hooks/useDarkMode';
import useAuthStore from '@/store/useAuthStore';
import {
  User, Mail, Calendar, BarChart2, FileText, Clock,
  Shield, ChevronRight, ArrowUpCircle, Check, Settings,
  KeyRound,
} from 'lucide-react';

const TIER_CONFIG = {
  tier1: {
    label: 'Tier 1',
    sublabel: '기본',
    desc: '핵심 시장 모니터링',
    color: '#2563eb',
    nextTier: 'Tier 2',
    features: [
      '미국·중국·EU·한국 등 핵심 10개국',
      '일일 요약 리포트',
      '리스크 경보 알림',
      '주요 산업 2개 분석',
    ],
  },
  tier2: {
    label: 'Tier 2',
    sublabel: '중급',
    desc: '핵심 + 인접 시장 모니터링',
    color: '#10b981',
    nextTier: 'Tier 3',
    features: [
      'Tier 1 포함 20개국 모니터링',
      '주간·월간 상세 리포트',
      '산업별 심층 분석 (5개)',
      '맞춤 정책 제안',
      '이메일 알림',
    ],
  },
  tier3: {
    label: 'Tier 3',
    sublabel: '고급',
    desc: '글로벌 전체 모니터링',
    color: '#f59e0b',
    nextTier: null,
    features: [
      '전 세계 100+ 국가 모니터링',
      '실시간 알림 (5분 간격)',
      '전담 분석팀 지원',
      'API 연동 지원',
      '무제한 리포트 생성',
      'Excel·PDF 일괄 다운로드',
    ],
  },
};

const USAGE_STATS = [
  { icon: BarChart2, label: '총 분석', value: '245건', color: '#2563eb' },
  { icon: FileText, label: '저장된 리포트', value: '12개', color: '#10b981' },
  { icon: Clock, label: '마지막 접속', value: '1시간 전', color: '#8b5cf6' },
];

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-xl gap-1"
      style={{ backgroundColor: color + '0f' }}
    >
      <Icon className="w-5 h-5 mb-1" style={{ color }} />
      <span className="text-lg font-bold" style={{ color: 'var(--gw-text-primary)' }}>
        {value}
      </span>
      <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
        {label}
      </span>
    </div>
  );
}

export default function ProfilePage() {
  useDarkMode();
  const router = useRouter();
  const { user } = useAuthStore();
  const [upgradeClicked, setUpgradeClicked] = useState(false);

  const email = user?.email ?? 'john@example.com';
  const initial = email[0].toUpperCase();
  const displayName = user?.user_metadata?.display_name || email.split('@')[0];
  const tierKey = user?.user_metadata?.tier_level ?? 'tier2';
  const tierCfg = TIER_CONFIG[tierKey] ?? TIER_CONFIG.tier2;
  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    : '2024-03-01';

  const handleUpgrade = () => {
    setUpgradeClicked(true);
    setTimeout(() => setUpgradeClicked(false), 1500);
  };

  return (
    <MainLayout>
      <div className="max-w-xl space-y-5">
        {/* 헤더 */}
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            프로필
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            내 계정 정보와 구독 현황을 확인하세요
          </p>
        </div>

        {/* 프로필 카드 */}
        <div
          className="p-6 rounded-2xl border transition-theme"
          style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
        >
          <div className="flex items-center gap-5 mb-5">
            {/* 아바타 */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 shadow"
              style={{ backgroundColor: tierCfg.color }}
            >
              {initial}
            </div>
            {/* 기본 정보 */}
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold truncate" style={{ color: 'var(--gw-text-primary)' }}>
                {displayName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--gw-text-secondary)' }} />
                <p className="text-sm truncate" style={{ color: 'var(--gw-text-secondary)' }}>{email}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: tierCfg.color + '18', color: tierCfg.color }}
                >
                  <Shield className="w-3 h-3" />
                  {tierCfg.label} · {tierCfg.sublabel}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" style={{ color: 'var(--gw-text-secondary)' }} />
                  <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                    가입일 {joinDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/settings')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-sm font-medium transition-all hover:shadow-md"
              style={{
                backgroundColor: 'var(--gw-bg)',
                borderColor: 'var(--gw-border)',
                color: 'var(--gw-text-primary)',
              }}
            >
              <Settings className="w-4 h-4" />
              프로필 수정
            </button>
            <button
              onClick={() => router.push('/settings')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-sm font-medium transition-all hover:shadow-md"
              style={{
                backgroundColor: 'var(--gw-bg)',
                borderColor: 'var(--gw-border)',
                color: 'var(--gw-text-primary)',
              }}
            >
              <KeyRound className="w-4 h-4" />
              비밀번호 변경
            </button>
          </div>
        </div>

        {/* 사용 통계 */}
        <div
          className="p-5 rounded-2xl border transition-theme"
          style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
        >
          <h2 className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: 'var(--gw-text-primary)' }}>
            <BarChart2 className="w-4 h-4" style={{ color: 'var(--gw-primary)' }} />
            사용 통계
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {USAGE_STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* 현재 Tier */}
        <div
          className="p-5 rounded-2xl border transition-theme"
          style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--gw-text-primary)' }}>
              <Shield className="w-4 h-4" style={{ color: tierCfg.color }} />
              현재 Tier
            </h2>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: tierCfg.color + '18', color: tierCfg.color }}
            >
              {tierCfg.label}
            </span>
          </div>

          {/* Tier 설명 */}
          <div
            className="p-3 rounded-xl mb-4"
            style={{ backgroundColor: tierCfg.color + '0c', borderLeft: `3px solid ${tierCfg.color}` }}
          >
            <p className="text-sm font-medium" style={{ color: tierCfg.color }}>
              {tierCfg.label} ({tierCfg.sublabel})
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>
              {tierCfg.desc}
            </p>
          </div>

          {/* 기능 목록 */}
          <ul className="space-y-2 mb-5">
            {tierCfg.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tierCfg.color }} />
                <span className="text-sm" style={{ color: 'var(--gw-text-primary)' }}>{f}</span>
              </li>
            ))}
          </ul>

          {/* 버튼 */}
          <div className="flex gap-2">
            {tierCfg.nextTier ? (
              <button
                onClick={handleUpgrade}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
                style={{ backgroundColor: upgradeClicked ? '#10b981' : tierCfg.color }}
              >
                {upgradeClicked ? (
                  <><Check className="w-4 h-4" /> 문의 완료</>
                ) : (
                  <><ArrowUpCircle className="w-4 h-4" /> {tierCfg.nextTier} 업그레이드</>
                )}
              </button>
            ) : (
              <div
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: tierCfg.color + '18', color: tierCfg.color }}
              >
                <Check className="w-4 h-4" /> 최고 등급 이용 중
              </div>
            )}
            <button
              onClick={() => router.push('/help')}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all hover:shadow-md"
              style={{
                backgroundColor: 'var(--gw-bg)',
                borderColor: 'var(--gw-border)',
                color: 'var(--gw-text-primary)',
              }}
            >
              상세 정보
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
