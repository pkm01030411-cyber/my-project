'use client';

import { useMemo } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import useAuthStore from '@/store/useAuthStore';
import RiskIndicator from '@/components/Dashboard/RiskIndicator';
import OpportunityIndicator from '@/components/Dashboard/OpportunityIndicator';
import RelevanceIndicator from '@/components/Dashboard/RelevanceIndicator';
import TrendIndicator from '@/components/Dashboard/TrendIndicator';
import RegionChart from '@/components/Dashboard/RegionChart';
import IndustryChart from '@/components/Dashboard/IndustryChart';
import RiskTrendChart from '@/components/Dashboard/RiskTrendChart';
import NewsCard from '@/components/Dashboard/NewsCard';
import {
  mockScores,
  regionDataByTier,
  industryDataByTier,
  riskTrendData,
  recentNews,
  summaryStats,
  normalizeTier,
} from '@/data/mockData';

// ─── 요약 통계 카드 ──────────────────────────────────────────
function SummaryStatCard({ label, value, change, positive }) {
  return (
    <div
      className="p-4 rounded-xl border transition-all hover:shadow-md"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      <p className="text-xs mb-1" style={{ color: 'var(--gw-text-secondary)' }}>
        {label}
      </p>
      <p className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
        {value.toLocaleString()}
      </p>
      <p
        className="text-xs font-medium"
        style={{ color: positive ? '#10b981' : '#dc2626' }}
      >
        {change} 이번 주
      </p>
    </div>
  );
}

// ─── 페이지 헤더 ─────────────────────────────────────────────
function DashboardHeader({ user, tier, stats }) {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });

  const tierLabel = { tier1: 'Tier 1', tier2: 'Tier 2', tier3: 'Tier 3' }[tier];

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            대시보드
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            {today} · 글로벌 무역 시장 현황
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold"
          style={{
            borderColor: 'var(--gw-primary)',
            backgroundColor: 'var(--gw-sidebar-active)',
            color: 'var(--gw-primary)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {tierLabel} 모니터링 중
        </div>
      </div>

      {/* 요약 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
        <SummaryStatCard label="모니터링 국가" value={stats.monitoringCountries} change={'+2'} positive={true} />
        <SummaryStatCard label="오늘의 뉴스" value={stats.todayNews} change={'+23'} positive={true} />
        <SummaryStatCard label="리스크 경보" value={stats.riskAlerts} change={'+1'} positive={false} />
        <SummaryStatCard label="정책 업데이트" value={stats.policyUpdates} change={'+4'} positive={true} />
      </div>
    </div>
  );
}

// ─── 메인 페이지 ─────────────────────────────────────────────
export default function DashboardPage() {
  const { user } = useAuthStore();
  const tier = normalizeTier(user?.user_metadata?.tier_level);

  const regionData = useMemo(() => regionDataByTier[tier] ?? regionDataByTier.tier1, [tier]);
  const industryData = useMemo(() => industryDataByTier[tier] ?? industryDataByTier.tier1, [tier]);
  const stats = summaryStats[tier] ?? summaryStats.tier1;

  // Tier에 따라 뉴스 필터링
  const filteredNews = useMemo(() => {
    if (tier === 'tier3') return recentNews;
    if (tier === 'tier2') return recentNews.filter((n) => n.tier !== 'tier3');
    return recentNews.filter((n) => n.tier === 'tier1');
  }, [tier]);

  return (
    <MainLayout>
      {/* 페이지 헤더 + 요약 통계 */}
      <DashboardHeader user={user} tier={tier} stats={stats} />

      {/* ── 섹션 1: 주요 지표 카드 4개 ── */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--gw-text-secondary)' }}>
          오늘의 주요 지표
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <RiskIndicator data={mockScores.riskScore} />
          <OpportunityIndicator data={mockScores.opportunityScore} />
          <RelevanceIndicator data={mockScores.relevanceScore} />
          <TrendIndicator data={mockScores.trendIndicator} />
        </div>
      </section>

      {/* ── 섹션 2: 지역 + 산업 차트 ── */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--gw-text-secondary)' }}>
          시장 분석
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RegionChart data={regionData} />
          <IndustryChart data={industryData} />
        </div>
      </section>

      {/* ── 섹션 3: 7일 추이 차트 ── */}
      <section className="mb-6">
        <RiskTrendChart data={riskTrendData} />
      </section>

      {/* ── 섹션 4: 최근 뉴스 ── */}
      <section>
        <NewsCard items={filteredNews} limit={tier === 'tier1' ? 3 : 5} />
      </section>
    </MainLayout>
  );
}
