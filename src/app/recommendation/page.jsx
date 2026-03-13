'use client';

import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import useDarkMode from '@/hooks/useDarkMode';
import useAuthStore from '@/store/useAuthStore';
import {
  Target, ChevronDown, ChevronUp, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, ArrowRight, Sparkles, ShieldAlert,
} from 'lucide-react';

// ─── Mock 데이터 ─────────────────────────────────────────────

const AI_RECOMMENDATIONS = [
  {
    id: 1,
    icon: '🇨🇳',
    title: '중국 시장 전략 즉각 재조정',
    type: 'risk',
    riskLevel: '높음',
    riskColor: '#dc2626',
    confidence: 95,
    trend: 'up',
    summary: '미-중 무역 긴장 고조 및 중국의 희토류 수출 쿼터 30% 축소로 반도체·배터리 공급망에 즉각적인 위협이 발생했습니다. 공급망 재편과 리스크 헤징이 시급합니다.',
    analysis: [
      '중국의 희토류 수출 쿼터 축소(30%)는 반도체 제조에 필요한 네오디뮴·란타넘 등 핵심 소재 수급에 직접적인 영향을 줍니다.',
      '미국의 대중 반도체 수출 통제 강화로 인해 한국 기업의 중간 공급망 위치가 압박받고 있습니다.',
      '중국 내 생산 설비를 보유한 한국 기업은 향후 6개월 내 생산 차질 가능성이 35% 상승한 것으로 분석됩니다.',
    ],
    actions: [
      { label: '공급망 다각화', desc: '호주·캐나다 희토류 공급처 발굴, 3~6개월 재고 긴급 확보', priority: 'critical' },
      { label: '베트남·인도 생산 거점 확대', desc: 'RCEP 활용 가능한 베트남·인도 파트너사 MOU 체결', priority: 'high' },
      { label: '리스크 헤징 전략 수립', desc: '원자재 선물 계약 및 통화 헤징 포지션 재검토', priority: 'medium' },
      { label: '법률 검토', desc: '수출 통제 규정 위반 리스크 사전 점검 및 컴플라이언스 강화', priority: 'medium' },
    ],
    region: '중국',
    industry: '반도체',
    deadline: '2026.03.20',
  },
  {
    id: 2,
    icon: '🇪🇺',
    title: 'EU 탄소국경조정제도(CBAM) 선제 대응',
    type: 'risk',
    riskLevel: '중간',
    riskColor: '#f59e0b',
    confidence: 88,
    trend: 'up',
    summary: 'EU CBAM이 2026년 전면 시행됩니다. 한국산 철강·화학 제품의 EU 수출에 추가 비용이 발생하기 전에 탄소 저감 계획과 인증 체계를 미리 구축해야 합니다.',
    analysis: [
      'CBAM 전면 시행 시 탄소집약적 제품(철강, 알루미늄, 시멘트, 비료, 전기)에 탄소 비용이 부과되어 EU 수출 단가가 최대 8~15% 상승할 수 있습니다.',
      '한국의 탄소배출권 가격과 EU ETS 가격 차이가 클수록 추가 납부액이 증가합니다. 현재 한국 탄소가격(KAU)은 EU의 약 30% 수준입니다.',
      'CBAM 면제를 위해 제품의 탄소 발자국 인증(ISO 14067)이 필요하며, 인증 취득에 6~12개월이 소요됩니다.',
    ],
    actions: [
      { label: 'ISO 14067 탄소발자국 인증 취득', desc: '수출 주력 제품 품목별 탄소 발자국 측정 및 제3자 검증 추진', priority: 'high' },
      { label: '재생에너지 전환 투자', desc: '생산 공정 내 재생에너지 비율을 2026년까지 30% 이상으로 확대', priority: 'high' },
      { label: 'EU 파트너사 협력 네트워크 구축', desc: 'EU 수입자와 공동 탄소 저감 계획 수립 및 비용 분담 협의', priority: 'medium' },
    ],
    region: 'EU',
    industry: '화학·철강',
    deadline: '2026.06.30',
  },
  {
    id: 3,
    icon: '🇮🇳',
    title: '인도 반도체 시장 선점 기회',
    type: 'opportunity',
    riskLevel: '낮음',
    riskColor: '#10b981',
    confidence: 82,
    trend: 'up',
    summary: '인도 정부의 반도체 자립화 정책(PLI Scheme)과 삼성·TSMC 투자 확정으로 현지 반도체 소재·장비·부품(OSAT) 공급 기회가 급격히 확대되고 있습니다.',
    analysis: [
      '인도 정부는 반도체 제조 PLI 지원으로 총 100억 달러를 배정했으며, 이미 10개 이상의 글로벌 팹이 투자 검토 중입니다.',
      '인도 현지 반도체 소재·장비 공급망은 초기 단계로, 한국 소재·부품·장비(소부장) 기업에게 퍼스트 무버 이점이 존재합니다.',
      'CEPA(포괄적경제동반자협정)로 한-인도 간 관세 혜택이 있으며, 물류 거점 구축 시 세금 혜택도 제공됩니다.',
    ],
    actions: [
      { label: '인도 반도체 파트너십 발굴', desc: 'KOTRA 뭄바이·뉴델리 무역관 통해 현지 팹·OSAT 기업 접촉', priority: 'high' },
      { label: '현지법인 설립 타당성 검토', desc: '인도 세금 혜택 및 PLI 수혜 요건 충족을 위한 법인 구조 설계', priority: 'medium' },
      { label: 'PLI 지원 신청 준비', desc: '인도 반도체 PLI 2차 라운드 공모에 대비한 서류 사전 준비', priority: 'medium' },
    ],
    region: '인도',
    industry: '반도체',
    deadline: '2026.08.31',
  },
  {
    id: 4,
    icon: '🇺🇸',
    title: '한-미 FTA 갱신 혜택 선제 포지셔닝',
    type: 'opportunity',
    riskLevel: '낮음',
    riskColor: '#10b981',
    confidence: 79,
    trend: 'stable',
    summary: '한-미 FTA 갱신 협상이 3월 내 타결 예상입니다. 새 협정의 관세 혜택 확대 품목을 사전 파악하고, 수출 포트폴리오와 원산지 규정을 미리 정비하면 선점 이익을 누릴 수 있습니다.',
    analysis: [
      '이번 FTA 갱신에서 전기차·배터리·바이오·디지털 서비스 분야의 추가 관세 혜택이 논의되고 있습니다.',
      '미국 IRA(인플레이션 감축법) 보조금과 FTA 원산지 기준이 연계될 가능성이 높아, 원산지 규정 사전 검토가 필수입니다.',
      '타결 후 6개월 이내 발효 예상이므로, 발효 즉시 혜택을 받으려면 사전 준비가 필요합니다.',
    ],
    actions: [
      { label: 'FTA 혜택 품목 사전 목록 작성', desc: '갱신 협정 초안 모니터링 후 수혜 가능 품목 HS 코드 정리', priority: 'high' },
      { label: '원산지 증명 체계 점검', desc: '현재 수출 제품의 원산지 규정 충족 여부 사전 검토 및 보완', priority: 'high' },
      { label: '미국 바이어 사전 마케팅', desc: '타결 전 미국 핵심 바이어 대상 혜택 관련 사전 커뮤니케이션', priority: 'medium' },
    ],
    region: '미국',
    industry: '전기차·배터리',
    deadline: '2026.04.30',
  },
  {
    id: 5,
    icon: '🌏',
    title: 'RCEP 활용 동남아 물류 허브 구축',
    type: 'opportunity',
    riskLevel: '낮음',
    riskColor: '#10b981',
    confidence: 74,
    trend: 'up',
    summary: 'RCEP 발효 이후 한국의 RCEP 특혜 활용 기업이 전년 대비 42% 증가했습니다. 베트남·말레이시아를 중심으로 한 역내 물류 허브 거점을 구축하면 관세 절감 효과와 함께 생산 거점 다변화 효과를 동시에 달성할 수 있습니다.',
    analysis: [
      'RCEP 협정으로 한국산 완성품·중간재가 동남아 10개국에서 평균 5~8%p의 관세 혜택을 받습니다.',
      '베트남은 이미 다수의 한국 제조업 기업이 진출해 있어 물류·공급망 인프라가 갖춰져 있으며, 추가 진출 비용이 상대적으로 낮습니다.',
      '말레이시아는 반도체 후공정(OSAT) 거점으로 부상 중이며, RCEP + CPTPP 이중 혜택을 활용할 수 있습니다.',
    ],
    actions: [
      { label: '베트남 물류 거점 현황 조사', desc: '하노이·호치민·하이퐁 물류 허브 운영 비용 및 인프라 비교', priority: 'medium' },
      { label: 'RCEP 특혜 관세 최적화', desc: '품목별 최적 원산지 경로 설계 및 FTA 활용 컨설팅 의뢰', priority: 'medium' },
      { label: '현지 3PL 파트너 계약', desc: '동남아 주요 물류 기업(DHL·Lazada Logistics 등) 파트너십 검토', priority: 'low' },
    ],
    region: '동남아',
    industry: '물류·제조',
    deadline: '2026.09.30',
  },
];

const RISK_FACTORS = [
  { rank: 1, label: '미-중 무역 긴장 고조',       pct: 40, color: '#dc2626', trend: 'up' },
  { rank: 2, label: '원자재 가격 변동성',           pct: 30, color: '#f59e0b', trend: 'up' },
  { rank: 3, label: 'EU 환경규제 강화',            pct: 15, color: '#6366f1', trend: 'stable' },
  { rank: 4, label: '글로벌 공급망 병목',           pct: 10, color: '#14b8a6', trend: 'down' },
  { rank: 5, label: '환율 변동 리스크',             pct: 5,  color: '#8b5cf6', trend: 'stable' },
];

const PRIORITY_STYLE = {
  critical: { label: '즉시', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
  high:     { label: '우선', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  medium:   { label: '권장', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  low:      { label: '검토', color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
};

// ─── 신뢰도 게이지 ───────────────────────────────────────────
function ConfidenceBar({ value, color }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--gw-border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold tabular-nums" style={{ color }}>
        {value}%
      </span>
    </div>
  );
}

// ─── 위험 요소 바 ────────────────────────────────────────────
function RiskFactorRow({ factor }) {
  const TrendIcon = factor.trend === 'up' ? TrendingUp : factor.trend === 'down' ? TrendingDown : null;
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ backgroundColor: factor.color }}
      >
        {factor.rank}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium truncate" style={{ color: 'var(--gw-text-primary)' }}>
            {factor.label}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            {TrendIcon && <TrendIcon className="w-3 h-3" style={{ color: factor.trend === 'up' ? '#dc2626' : '#10b981' }} />}
            <span className="text-xs font-bold" style={{ color: factor.color }}>
              {factor.pct}%
            </span>
          </div>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--gw-border)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${factor.pct}%`, backgroundColor: factor.color }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── 추천 카드 ───────────────────────────────────────────────
function RecommendationCard({ rec, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const [checkedActions, setCheckedActions] = useState([]);

  const toggleAction = (i) =>
    setCheckedActions((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  const isOpportunity = rec.type === 'opportunity';
  const accentColor   = isOpportunity ? '#10b981' : rec.riskColor;

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      {/* 좌측 컬러 인디케이터 */}
      <div className="flex">
        <div className="w-1 flex-shrink-0" style={{ backgroundColor: accentColor }} />

        <div className="flex-1 p-5">
          {/* ── 헤더 행 ── */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none mt-0.5">{rec.icon}</span>
              <div>
                {/* 메타 배지들 */}
                <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: accentColor + '18',
                      color: accentColor,
                    }}
                  >
                    {isOpportunity ? '🎯 기회' : '⚠️ 위험'}
                  </span>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: rec.riskColor + '40',
                      color: rec.riskColor,
                    }}
                  >
                    위험도 {rec.riskLevel}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                    {rec.region} · {rec.industry}
                  </span>
                </div>

                <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--gw-text-primary)' }}>
                  {rec.title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-shrink-0 p-1.5 rounded-xl transition-all hover:opacity-70"
              style={{ backgroundColor: 'var(--gw-border)' + '40' }}
            >
              {expanded
                ? <ChevronUp className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
                : <ChevronDown className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />}
            </button>
          </div>

          {/* 신뢰도 바 */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>AI 신뢰도</span>
              <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>기한: {rec.deadline}</span>
            </div>
            <ConfidenceBar value={rec.confidence} color={accentColor} />
          </div>

          {/* 요약 (항상 표시) */}
          <p className="text-sm leading-relaxed" style={{ color: 'var(--gw-text-secondary)' }}>
            {rec.summary}
          </p>

          {/* ── 펼쳐진 영역 ── */}
          {expanded && (
            <div className="mt-4 space-y-4">
              {/* 상세 분석 */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gw-text-secondary)' }}>
                  상세 분석
                </p>
                <ul className="space-y-2">
                  {rec.analysis.map((line, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--gw-text-primary)' }}>
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
                      <span className="leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 실행 제안 체크리스트 */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--gw-text-secondary)' }}>
                  실행 제안
                </p>
                <ul className="space-y-2">
                  {rec.actions.map((action, i) => {
                    const done = checkedActions.includes(i);
                    const ps = PRIORITY_STYLE[action.priority] ?? PRIORITY_STYLE.medium;
                    return (
                      <li
                        key={i}
                        onClick={() => toggleAction(i)}
                        className="flex items-start gap-2.5 p-3 rounded-xl cursor-pointer transition-all hover:opacity-80"
                        style={{
                          backgroundColor: done ? '#10b98110' : 'var(--gw-bg)',
                          border: `1px solid ${done ? '#10b98130' : 'var(--gw-border)'}`,
                        }}
                      >
                        {done
                          ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10b981' }} />
                          : <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5" style={{ borderColor: 'var(--gw-border)' }} />}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span
                              className="text-xs font-bold"
                              style={{ color: done ? '#10b981' : 'var(--gw-text-primary)', textDecoration: done ? 'line-through' : 'none' }}
                            >
                              {action.label}
                            </span>
                            <span
                              className="text-xs px-1.5 py-0.5 rounded font-medium"
                              style={{ backgroundColor: ps.bg, color: ps.color }}
                            >
                              {ps.label}
                            </span>
                          </div>
                          <p className="text-xs" style={{ color: 'var(--gw-text-secondary)', textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.6 : 1 }}>
                            {action.desc}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {/* 상세 보기 버튼 (접혀 있을 때) */}
          {!expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="mt-3 flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: accentColor }}
            >
              상세 보기 <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 주요 위험 요소 패널 ─────────────────────────────────────
function RiskFactorPanel() {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? RISK_FACTORS : RISK_FACTORS.slice(0, 3);

  return (
    <div
      className="rounded-2xl border p-5 transition-theme"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" style={{ color: '#dc2626' }} />
          <h3 className="text-sm font-semibold" style={{ color: 'var(--gw-text-primary)' }}>
            주요 위험 요소
          </h3>
        </div>
        <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
          총 영향도 기준
        </span>
      </div>

      <div className="space-y-3.5">
        {items.map((f) => <RiskFactorRow key={f.rank} factor={f} />)}
      </div>

      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-4 w-full py-2 text-xs font-medium rounded-xl border transition-opacity hover:opacity-70"
        style={{
          borderColor: 'var(--gw-border)',
          color: 'var(--gw-text-secondary)',
          backgroundColor: 'var(--gw-bg)',
        }}
      >
        {showAll ? '접기 ▲' : `전체 보기 (${RISK_FACTORS.length}개) ▼`}
      </button>
    </div>
  );
}

// ─── 메인 페이지 ────────────────────────────────────────────
export default function RecommendationPage() {
  useDarkMode();

  const { user } = useAuthStore();
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = AI_RECOMMENDATIONS.filter((r) =>
    typeFilter === 'all' ? true : r.type === typeFilter
  );

  const riskCount = AI_RECOMMENDATIONS.filter((r) => r.type === 'risk').length;
  const oppCount  = AI_RECOMMENDATIONS.filter((r) => r.type === 'opportunity').length;

  return (
    <MainLayout>
      {/* ── 헤더 ── */}
      <div className="mb-6">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
              정책 제안
            </h1>
            <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
              AI가 분석한 맞춤형 무역 전략 및 실행 계획
            </p>
          </div>
          {/* AI 뱃지 */}
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'var(--gw-sidebar-active)', color: 'var(--gw-primary)' }}
          >
            <Sparkles className="w-3.5 h-3.5" /> AI 분석 · 실시간 업데이트
          </span>
        </div>

        {/* 요약 배너 */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div
            className="flex items-center gap-3 p-3 rounded-xl border"
            style={{ backgroundColor: 'rgba(220,38,38,0.06)', borderColor: 'rgba(220,38,38,0.2)' }}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#dc2626' }} />
            <div>
              <p className="text-lg font-bold leading-none" style={{ color: '#dc2626' }}>{riskCount}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>위험 경보</p>
            </div>
          </div>
          <div
            className="flex items-center gap-3 p-3 rounded-xl border"
            style={{ backgroundColor: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}
          >
            <Target className="w-5 h-5 flex-shrink-0" style={{ color: '#10b981' }} />
            <div>
              <p className="text-lg font-bold leading-none" style={{ color: '#10b981' }}>{oppCount}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>기회 포착</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 타입 필터 ── */}
      <div className="flex gap-1.5 mb-5">
        {[
          { code: 'all',         label: `전체 (${AI_RECOMMENDATIONS.length})` },
          { code: 'risk',        label: `⚠️ 위험 대응 (${riskCount})` },
          { code: 'opportunity', label: `🎯 기회 포착 (${oppCount})` },
        ].map((f) => (
          <button
            key={f.code}
            onClick={() => setTypeFilter(f.code)}
            className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
            style={{
              backgroundColor: typeFilter === f.code ? 'var(--gw-primary)' : 'var(--gw-surface)',
              color: typeFilter === f.code ? '#fff' : 'var(--gw-text-secondary)',
              border: `1px solid ${typeFilter === f.code ? 'var(--gw-primary)' : 'var(--gw-border)'}`,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── 추천 카드 목록 ── */}
      <div className="space-y-4 mb-6">
        {filtered.map((rec, i) => (
          <RecommendationCard key={rec.id} rec={rec} index={i} />
        ))}
      </div>

      {/* ── 주요 위험 요소 패널 ── */}
      <RiskFactorPanel />
    </MainLayout>
  );
}
