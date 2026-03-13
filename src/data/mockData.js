/**
 * GlobalWatch Mock 데이터
 *
 * Tier별로 다른 데이터 제공
 * - tier1: 핵심 시장 (미국, 중국, EU, 한국)
 * - tier2: 핵심 + 인접 시장
 * - tier3: 글로벌 전체
 */

// ─── 주요 지표 ───────────────────────────────────────────────

export const mockScores = {
  riskScore: {
    value: 35,
    level: 'MEDIUM', // LOW | MEDIUM | HIGH | CRITICAL
    change: 2.5,
    trend: 'up',
  },
  opportunityScore: {
    value: 72,
    level: 'HIGH',
    change: -1.2,
    trend: 'down',
  },
  relevanceScore: {
    value: 48,
    level: 'MEDIUM',
    change: 0.8,
    trend: 'stable',
  },
  trendIndicator: {
    value: 8,
    trend: 'up',
    description: '이번 주 활동 증가',
  },
};

// ─── 지역별 데이터 (Tier별) ───────────────────────────────────

export const regionDataByTier = {
  tier1: [
    { name: '미국', nameEn: 'United States', code: 'US', value: 28, flag: '🇺🇸', riskLevel: 'HIGH' },
    { name: '중국', nameEn: 'China', code: 'CN', value: 45, flag: '🇨🇳', riskLevel: 'CRITICAL' },
    { name: 'EU', nameEn: 'European Union', code: 'EU', value: 32, flag: '🇪🇺', riskLevel: 'MEDIUM' },
    { name: '한국', nameEn: 'South Korea', code: 'KR', value: 18, flag: '🇰🇷', riskLevel: 'LOW' },
  ],
  tier2: [
    { name: '미국', nameEn: 'United States', code: 'US', value: 28, flag: '🇺🇸', riskLevel: 'HIGH' },
    { name: '중국', nameEn: 'China', code: 'CN', value: 45, flag: '🇨🇳', riskLevel: 'CRITICAL' },
    { name: 'EU', nameEn: 'European Union', code: 'EU', value: 32, flag: '🇪🇺', riskLevel: 'MEDIUM' },
    { name: '한국', nameEn: 'South Korea', code: 'KR', value: 18, flag: '🇰🇷', riskLevel: 'LOW' },
    { name: '베트남', nameEn: 'Vietnam', code: 'VN', value: 22, flag: '🇻🇳', riskLevel: 'MEDIUM' },
    { name: '인도', nameEn: 'India', code: 'IN', value: 19, flag: '🇮🇳', riskLevel: 'MEDIUM' },
    { name: '중동', nameEn: 'Middle East', code: 'ME', value: 15, flag: '🌍', riskLevel: 'HIGH' },
    { name: '기타', nameEn: 'Others', code: 'OT', value: 12, flag: '🌐', riskLevel: 'LOW' },
  ],
  tier3: [
    { name: '미국', nameEn: 'United States', code: 'US', value: 28, flag: '🇺🇸', riskLevel: 'HIGH' },
    { name: '중국', nameEn: 'China', code: 'CN', value: 45, flag: '🇨🇳', riskLevel: 'CRITICAL' },
    { name: 'EU', nameEn: 'European Union', code: 'EU', value: 32, flag: '🇪🇺', riskLevel: 'MEDIUM' },
    { name: '한국', nameEn: 'South Korea', code: 'KR', value: 18, flag: '🇰🇷', riskLevel: 'LOW' },
    { name: '베트남', nameEn: 'Vietnam', code: 'VN', value: 22, flag: '🇻🇳', riskLevel: 'MEDIUM' },
    { name: '인도', nameEn: 'India', code: 'IN', value: 19, flag: '🇮🇳', riskLevel: 'MEDIUM' },
    { name: '중동', nameEn: 'Middle East', code: 'ME', value: 15, flag: '🌍', riskLevel: 'HIGH' },
    { name: '남미', nameEn: 'Latin America', code: 'LA', value: 14, flag: '🌎', riskLevel: 'MEDIUM' },
    { name: '아프리카', nameEn: 'Africa', code: 'AF', value: 9, flag: '🌍', riskLevel: 'HIGH' },
    { name: '기타', nameEn: 'Others', code: 'OT', value: 12, flag: '🌐', riskLevel: 'LOW' },
  ],
};

// ─── 산업별 데이터 (Tier별) ─────────────────────────────────

export const industryDataByTier = {
  tier1: [
    { name: '반도체', nameEn: 'Semiconductor', value: 65, change: 8.2, trend: 'up' },
    { name: '자동차', nameEn: 'Automotive', value: 52, change: -2.1, trend: 'down' },
  ],
  tier2: [
    { name: '반도체', nameEn: 'Semiconductor', value: 65, change: 8.2, trend: 'up' },
    { name: '화학', nameEn: 'Chemical', value: 48, change: 3.4, trend: 'up' },
    { name: '자동차', nameEn: 'Automotive', value: 52, change: -2.1, trend: 'down' },
    { name: '섬유', nameEn: 'Textile', value: 28, change: -5.3, trend: 'down' },
    { name: '기타', nameEn: 'Others', value: 15, change: 1.2, trend: 'stable' },
  ],
  tier3: [
    { name: '반도체', nameEn: 'Semiconductor', value: 65, change: 8.2, trend: 'up' },
    { name: '화학', nameEn: 'Chemical', value: 48, change: 3.4, trend: 'up' },
    { name: '자동차', nameEn: 'Automotive', value: 52, change: -2.1, trend: 'down' },
    { name: '섬유', nameEn: 'Textile', value: 28, change: -5.3, trend: 'down' },
    { name: '철강', nameEn: 'Steel', value: 38, change: 1.8, trend: 'stable' },
    { name: '바이오', nameEn: 'Biotech', value: 44, change: 12.4, trend: 'up' },
    { name: '기타', nameEn: 'Others', value: 15, change: 1.2, trend: 'stable' },
  ],
};

// ─── 7일 위험도 추이 ─────────────────────────────────────────

export const riskTrendData = [
  { date: '3/5', risk: 32, opportunity: 74, relevance: 45 },
  { date: '3/6', risk: 33, opportunity: 73, relevance: 46 },
  { date: '3/7', risk: 31, opportunity: 75, relevance: 44 },
  { date: '3/8', risk: 34, opportunity: 71, relevance: 47 },
  { date: '3/9', risk: 35, opportunity: 72, relevance: 48 },
  { date: '3/10', risk: 34, opportunity: 73, relevance: 47 },
  { date: '3/11', risk: 35, opportunity: 72, relevance: 48 },
];

// ─── 최근 뉴스 ───────────────────────────────────────────────

export const recentNews = [
  {
    id: 1,
    title: '미국, 중국산 반도체에 수입관세 25% 인상 결정',
    summary: '미국 상무부가 중국산 반도체 제품에 대한 수입관세를 기존 대비 25% 인상하기로 결정했다.',
    source: 'Reuters',
    time: '2시간 전',
    impact: 'high',
    region: '미국',
    regionCode: 'US',
    industry: '반도체',
    industryCode: 'semiconductor',
    tier: 'tier1',
    flag: '🇺🇸',
  },
  {
    id: 2,
    title: 'EU, 새로운 탄소국경조정제도(CBAM) 세부규정 발표',
    summary: '유럽연합이 탄소국경조정제도의 세부 시행 규정을 발표, 2026년부터 철강·알루미늄 등에 전면 적용 예정.',
    source: 'Bloomberg',
    time: '5시간 전',
    impact: 'medium',
    region: 'EU',
    regionCode: 'EU',
    industry: '화학',
    industryCode: 'chemical',
    tier: 'tier1',
    flag: '🇪🇺',
  },
  {
    id: 3,
    title: '한-미 FTA 갱신 협상 3월 내 타결 목표',
    summary: '한국과 미국의 FTA 갱신 협상이 순조롭게 진행 중이며, 양국은 이번 달 내 타결을 목표로 하고 있다.',
    source: '연합뉴스',
    time: '1일 전',
    impact: 'medium',
    region: '한국',
    regionCode: 'KR',
    industry: '자동차',
    industryCode: 'automotive',
    tier: 'tier1',
    flag: '🇰🇷',
  },
  {
    id: 4,
    title: '베트남 제조업 FDI 유치 역대 최고 기록 전망',
    summary: '베트남 정부가 발표한 외국인직접투자(FDI) 유치 실적이 1분기 기준 역대 최고를 기록할 것으로 전망된다.',
    source: 'VietnamNews',
    time: '1일 전',
    impact: 'low',
    region: '베트남',
    regionCode: 'VN',
    industry: '섬유',
    industryCode: 'textile',
    tier: 'tier2',
    flag: '🇻🇳',
  },
  {
    id: 5,
    title: '인도 반도체 자립화 정책, 삼성·TSMC 투자 유치 가시화',
    summary: '인도 정부의 반도체 생산 자립화 정책이 가시적 성과를 보이며, 삼성전자와 TSMC의 현지 공장 투자가 구체화되고 있다.',
    source: 'Economic Times',
    time: '2일 전',
    impact: 'high',
    region: '인도',
    regionCode: 'IN',
    industry: '반도체',
    industryCode: 'semiconductor',
    tier: 'tier2',
    flag: '🇮🇳',
  },
];

// ─── 통계 요약 ───────────────────────────────────────────────

export const summaryStats = {
  tier1: {
    monitoringCountries: 4,
    todayNews: 38,
    riskAlerts: 3,
    policyUpdates: 5,
  },
  tier2: {
    monitoringCountries: 20,
    todayNews: 86,
    riskAlerts: 7,
    policyUpdates: 12,
  },
  tier3: {
    monitoringCountries: 100,
    todayNews: 127,
    riskAlerts: 12,
    policyUpdates: 21,
  },
};

// ─── 편의 함수 ────────────────────────────────────────────────

/** Tier 문자열을 tier1/tier2/tier3 키로 정규화 */
export function normalizeTier(tierLevel) {
  if (!tierLevel) return 'tier1';
  const t = String(tierLevel).toLowerCase();
  if (t === 'tier3' || t === '3') return 'tier3';
  if (t === 'tier2' || t === '2') return 'tier2';
  return 'tier1';
}

/** 위험도 레벨 → 색상 */
export function getRiskColor(level) {
  switch (level) {
    case 'CRITICAL': return '#dc2626';
    case 'HIGH':     return '#f59e0b';
    case 'MEDIUM':   return '#3b82f6';
    case 'LOW':      return '#10b981';
    default:         return '#6b7280';
  }
}

/** 영향도 레벨 → 한국어 레이블 */
export function getImpactLabel(impact) {
  return { high: '높음', medium: '중간', low: '낮음' }[impact] ?? impact;
}

/** 영향도 레벨 → 색상 */
export function getImpactColor(impact) {
  return { high: '#dc2626', medium: '#f59e0b', low: '#10b981' }[impact] ?? '#6b7280';
}
