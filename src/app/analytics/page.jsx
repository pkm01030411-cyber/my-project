'use client';

import { useState, useMemo } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import useDarkMode from '@/hooks/useDarkMode';
import {
  analyticsReports,
  trendDataByPeriod,
  regionDataByTier,
  industryDataByTier,
  mockScores,
  normalizeTier,
} from '@/data/mockData';
import useAuthStore from '@/store/useAuthStore';
import RiskTrendChart from '@/components/Dashboard/RiskTrendChart';
import RegionChart from '@/components/Dashboard/RegionChart';
import IndustryChart from '@/components/Dashboard/IndustryChart';
import {
  TrendingUp, TrendingDown, Minus,
  FileText, Download, FileSpreadsheet,
  Calendar, ChevronRight,
} from 'lucide-react';

const PERIODS = [
  { code: '7d',  label: '7일' },
  { code: '1m',  label: '1개월' },
  { code: '3m',  label: '3개월' },
];

// ─── 트렌드 요약 카드 ───────────────────────────────────────
function TrendSummaryCard({ label, value, change, trend, color }) {
  const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const changeColor = trend === 'up' ? '#dc2626' : trend === 'down' ? '#10b981' : '#6b7280';

  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl border transition-theme"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      <div className="p-2 rounded-lg" style={{ backgroundColor: color + '18' }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-xs mb-0.5" style={{ color: 'var(--gw-text-secondary)' }}>{label}</p>
        <p className="text-xl font-bold" style={{ color }}>{value}</p>
        <p className="text-xs font-medium" style={{ color: changeColor }}>
          {change > 0 ? '+' : ''}{change}% 전 기간 대비
        </p>
      </div>
    </div>
  );
}

// ─── 보고서 카드 ─────────────────────────────────────────────
function ReportCard({ report }) {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: 'var(--gw-sidebar-active)' }}>
        <FileText className="w-5 h-5" style={{ color: 'var(--gw-primary)' }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className="text-xs px-2 py-0.5 rounded font-medium"
            style={{ backgroundColor: 'var(--gw-sidebar-active)', color: 'var(--gw-primary)' }}
          >
            {report.typeLabel}
          </span>
          <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
            {report.period}
          </span>
        </div>
        <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
          {report.title}
        </h3>
        <p className="text-xs mb-2 line-clamp-2" style={{ color: 'var(--gw-text-secondary)' }}>
          {report.summary}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ backgroundColor: report.highlightColor + '18', color: report.highlightColor }}
          >
            {report.highlight}
          </span>
          <button
            className="flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--gw-primary)' }}
            onClick={(e) => { e.stopPropagation(); alert('PDF 준비 중입니다.'); }}
          >
            <Download className="w-3 h-3" /> PDF
          </button>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: 'var(--gw-text-secondary)' }} />
    </div>
  );
}

// ─── 메인 페이지 ─────────────────────────────────────────────
export default function AnalyticsPage() {
  useDarkMode();

  const { user } = useAuthStore();
  const tier = normalizeTier(user?.user_metadata?.tier_level);

  const [period, setPeriod] = useState('7d');
  const [reportFilter, setReportFilter] = useState('all');

  const trendData = useMemo(() => trendDataByPeriod[period] ?? trendDataByPeriod['7d'], [period]);
  const regionData = useMemo(() => regionDataByTier[tier] ?? regionDataByTier.tier1, [tier]);
  const industryData = useMemo(() => industryDataByTier[tier] ?? industryDataByTier.tier1, [tier]);

  const filteredReports = useMemo(() => {
    if (reportFilter === 'all') return analyticsReports;
    return analyticsReports.filter((r) => r.type === reportFilter);
  }, [reportFilter]);

  // 기간별 변화율 계산 (간단한 mock)
  const periodStats = {
    '7d': { risk: { v: 35, c: 2.5 }, opp: { v: 72, c: -1.2 }, rel: { v: 48, c: 0.8 } },
    '1m': { risk: { v: 35, c: 7.2 }, opp: { v: 72, c: -6.3 }, rel: { v: 48, c: 3.1 } },
    '3m': { risk: { v: 35, c: 13.4 }, opp: { v: 72, c: -10.1 }, rel: { v: 48, c: 6.2 } },
  };
  const ps = periodStats[period];

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
              분석 리포트
            </h1>
            <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
              AI 기반 무역 시장 심층 분석 보고서
            </p>
          </div>
          {/* 다운로드 버튼들 */}
          <div className="flex gap-2">
            <button
              onClick={() => alert('PDF 생성 기능은 준비 중입니다.')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all hover:shadow-md"
              style={{
                backgroundColor: 'var(--gw-surface)',
                borderColor: 'var(--gw-border)',
                color: 'var(--gw-text-primary)',
              }}
            >
              <FileText className="w-4 h-4" style={{ color: '#dc2626' }} />
              PDF 생성
            </button>
            <button
              onClick={() => alert('Excel 다운로드 기능은 준비 중입니다.')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all hover:shadow-md"
              style={{
                backgroundColor: 'var(--gw-surface)',
                borderColor: 'var(--gw-border)',
                color: 'var(--gw-text-primary)',
              }}
            >
              <FileSpreadsheet className="w-4 h-4" style={{ color: '#10b981' }} />
              Excel 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* 기간 선택 */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>분석 기간</span>
          <div className="flex gap-1.5 ml-2">
            {PERIODS.map((p) => (
              <button
                key={p.code}
                onClick={() => setPeriod(p.code)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: period === p.code ? 'var(--gw-primary)' : 'var(--gw-surface)',
                  color: period === p.code ? '#fff' : 'var(--gw-text-secondary)',
                  border: `1px solid ${period === p.code ? 'var(--gw-primary)' : 'var(--gw-border)'}`,
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 주요 트렌드 요약 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <TrendSummaryCard
            label="위험도"
            value={ps.risk.v}
            change={ps.risk.c}
            trend={ps.risk.c > 0 ? 'up' : 'down'}
            color="#dc2626"
          />
          <TrendSummaryCard
            label="기회도"
            value={ps.opp.v}
            change={ps.opp.c}
            trend={ps.opp.c > 0 ? 'up' : 'down'}
            color="#10b981"
          />
          <TrendSummaryCard
            label="중요도"
            value={ps.rel.v}
            change={ps.rel.c}
            trend={ps.rel.c > 0 ? 'up' : 'stable'}
            color="#6366f1"
          />
        </div>
      </section>

      {/* 추이 차트 */}
      <section className="mb-6">
        <RiskTrendChart data={trendData} />
      </section>

      {/* 지역 + 산업 차트 */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--gw-text-secondary)' }}>
          지역 · 산업별 상세 분석
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RegionChart data={regionData} />
          <IndustryChart data={industryData} />
        </div>
      </section>

      {/* 이전 보고서 목록 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--gw-text-secondary)' }}>
            이전 보고서
          </h2>
          <div className="flex gap-1.5">
            {[
              { code: 'all',     label: '전체' },
              { code: 'weekly',  label: '주간' },
              { code: 'monthly', label: '월간' },
            ].map((f) => (
              <button
                key={f.code}
                onClick={() => setReportFilter(f.code)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                style={{
                  backgroundColor: reportFilter === f.code ? 'var(--gw-primary)' : 'var(--gw-surface)',
                  color: reportFilter === f.code ? '#fff' : 'var(--gw-text-secondary)',
                  border: `1px solid ${reportFilter === f.code ? 'var(--gw-primary)' : 'var(--gw-border)'}`,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {filteredReports.map((r) => (
            <ReportCard key={r.id} report={r} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
