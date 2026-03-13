'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/Layout/MainLayout';
import useDarkMode from '@/hooks/useDarkMode';
import { allNews, getImpactColor, getImpactLabel } from '@/data/mockData';
import { Search, ExternalLink, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const REGIONS = [
  { code: 'ALL', label: '전체 지역' },
  { code: 'US',  label: '🇺🇸 미국' },
  { code: 'CN',  label: '🇨🇳 중국' },
  { code: 'EU',  label: '🇪🇺 EU' },
  { code: 'KR',  label: '🇰🇷 한국' },
  { code: 'JP',  label: '🇯🇵 일본' },
  { code: 'IN',  label: '🇮🇳 인도' },
  { code: 'VN',  label: '🇻🇳 베트남' },
];

const INDUSTRIES = [
  { code: 'ALL',           label: '전체 산업' },
  { code: 'semiconductor', label: '반도체' },
  { code: 'automotive',    label: '자동차' },
  { code: 'chemical',      label: '화학' },
  { code: 'textile',       label: '섬유' },
  { code: 'finance',       label: '금융' },
  { code: 'energy',        label: '에너지' },
];

const IMPACTS = [
  { code: 'ALL',    label: '전체 영향도' },
  { code: 'high',   label: '🔴 높음' },
  { code: 'medium', label: '🟡 중간' },
  { code: 'low',    label: '🟢 낮음' },
];

const SORTS = [
  { code: 'latest',   label: '최신순' },
  { code: 'impact',   label: '중요도순' },
];

// ─── 필터 탭 ────────────────────────────────────────────────
function FilterTab({ options, value, onChange }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
      {options.map((opt) => {
        const active = value === opt.code;
        return (
          <button
            key={opt.code}
            onClick={() => onChange(opt.code)}
            className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all"
            style={{
              backgroundColor: active ? 'var(--gw-primary)' : 'var(--gw-surface)',
              color: active ? '#fff' : 'var(--gw-text-secondary)',
              border: `1px solid ${active ? 'var(--gw-primary)' : 'var(--gw-border)'}`,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── 뉴스 카드 ──────────────────────────────────────────────
function NewsItemCard({ item }) {
  const router = useRouter();
  const impactColor = getImpactColor(item.impact);
  const impactLabel = getImpactLabel(item.impact);

  return (
    <article
      onClick={() => router.push(`/news?id=${item.id}`)}
      className="p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md hover:scale-[1.005]"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      <div className="flex items-start gap-3">
        {/* 영향도 컬러 바 */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: impactColor }} />
        </div>

        <div className="flex-1 min-w-0">
          {/* 태그 줄 */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <span className="text-xs font-medium" style={{ color: 'var(--gw-text-secondary)' }}>
              {item.flag} {item.region}
            </span>
            <span style={{ color: 'var(--gw-border)' }}>·</span>
            <span
              className="text-xs px-1.5 py-0.5 rounded font-semibold"
              style={{ backgroundColor: impactColor + '18', color: impactColor }}
            >
              {impactLabel}
            </span>
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ backgroundColor: 'var(--gw-sidebar-active)', color: 'var(--gw-primary)' }}
            >
              {item.industry}
            </span>
          </div>

          {/* 제목 */}
          <h3
            className="text-sm font-semibold mb-1.5 leading-snug"
            style={{ color: 'var(--gw-text-primary)' }}
          >
            {item.title}
          </h3>

          {/* 요약 */}
          <p
            className="text-xs leading-relaxed mb-2 line-clamp-2"
            style={{ color: 'var(--gw-text-secondary)' }}
          >
            {item.summary}
          </p>

          {/* 하단: 출처 + 시간 + 자세히 */}
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
              {item.source} · {item.time}
            </span>
            <span
              className="flex items-center gap-1 text-xs font-medium"
              style={{ color: 'var(--gw-primary)' }}
            >
              원문 보기 <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── 페이지네이션 ────────────────────────────────────────────
function Pagination({ page, total, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg transition-opacity hover:opacity-70 disabled:opacity-30"
        style={{ backgroundColor: 'var(--gw-surface)', border: '1px solid var(--gw-border)' }}
      >
        <ChevronLeft className="w-4 h-4" style={{ color: 'var(--gw-text-primary)' }} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
          style={{
            backgroundColor: p === page ? 'var(--gw-primary)' : 'var(--gw-surface)',
            color: p === page ? '#fff' : 'var(--gw-text-secondary)',
            border: `1px solid ${p === page ? 'var(--gw-primary)' : 'var(--gw-border)'}`,
          }}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-lg transition-opacity hover:opacity-70 disabled:opacity-30"
        style={{ backgroundColor: 'var(--gw-surface)', border: '1px solid var(--gw-border)' }}
      >
        <ChevronRight className="w-4 h-4" style={{ color: 'var(--gw-text-primary)' }} />
      </button>
    </div>
  );
}

// ─── 메인 페이지 ────────────────────────────────────────────
export default function NewsPage() {
  useDarkMode();

  const [search, setSearch]       = useState('');
  const [region, setRegion]       = useState('ALL');
  const [industry, setIndustry]   = useState('ALL');
  const [impact, setImpact]       = useState('ALL');
  const [sort, setSort]           = useState('latest');
  const [page, setPage]           = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...allNews];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (n) => n.title.toLowerCase().includes(q) || n.source.toLowerCase().includes(q)
      );
    }
    if (region !== 'ALL')   list = list.filter((n) => n.regionCode === region);
    if (industry !== 'ALL') list = list.filter((n) => n.industryCode === industry);
    if (impact !== 'ALL')   list = list.filter((n) => n.impact === impact);

    if (sort === 'impact') {
      const order = { high: 0, medium: 1, low: 2 };
      list.sort((a, b) => (order[a.impact] ?? 3) - (order[b.impact] ?? 3));
    }

    return list;
  }, [search, region, industry, impact, sort]);

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const resetPage = () => setPage(1);

  const hasActiveFilter = region !== 'ALL' || industry !== 'ALL' || impact !== 'ALL';

  const clearFilters = () => {
    setRegion('ALL');
    setIndustry('ALL');
    setImpact('ALL');
    setSearch('');
    setPage(1);
  };

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="mb-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
              뉴스 피드
            </h1>
            <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
              국제 무역 관련 최신 뉴스를 실시간으로 확인하세요
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
              {filtered.length}개 결과
            </span>
            {hasActiveFilter && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-opacity hover:opacity-70"
                style={{ backgroundColor: 'var(--gw-danger)' + '18', color: 'var(--gw-danger)' }}
              >
                <X className="w-3 h-3" /> 필터 초기화
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 검색 + 정렬 */}
      <div className="flex gap-2 mb-4">
        <div
          className="flex flex-1 items-center gap-2 px-3 py-2 rounded-xl border"
          style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
        >
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gw-text-secondary)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); resetPage(); }}
            placeholder="제목, 출처 검색..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--gw-text-primary)' }}
          />
          {search && (
            <button onClick={() => { setSearch(''); resetPage(); }}>
              <X className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
            </button>
          )}
        </div>

        {/* 정렬 */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 rounded-xl border text-sm outline-none"
          style={{
            backgroundColor: 'var(--gw-surface)',
            borderColor: 'var(--gw-border)',
            color: 'var(--gw-text-primary)',
          }}
        >
          {SORTS.map((s) => <option key={s.code} value={s.code}>{s.label}</option>)}
        </select>

        {/* 모바일 필터 토글 */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden p-2 rounded-xl border relative"
          style={{
            backgroundColor: showFilters ? 'var(--gw-primary)' : 'var(--gw-surface)',
            borderColor: showFilters ? 'var(--gw-primary)' : 'var(--gw-border)',
          }}
        >
          <SlidersHorizontal
            className="w-4 h-4"
            style={{ color: showFilters ? '#fff' : 'var(--gw-text-secondary)' }}
          />
          {hasActiveFilter && (
            <span
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            />
          )}
        </button>
      </div>

      {/* 필터 패널 */}
      <div className={`space-y-3 mb-5 ${showFilters ? 'block' : 'hidden md:block'}`}>
        <FilterTab options={REGIONS}    value={region}   onChange={(v) => { setRegion(v);   resetPage(); }} />
        <FilterTab options={INDUSTRIES} value={industry} onChange={(v) => { setIndustry(v); resetPage(); }} />
        <FilterTab options={IMPACTS}    value={impact}   onChange={(v) => { setImpact(v);   resetPage(); }} />
      </div>

      {/* 뉴스 리스트 */}
      {paginated.length > 0 ? (
        <div className="space-y-3">
          {paginated.map((item) => (
            <NewsItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-4xl mb-3">🔍</span>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            검색 결과가 없습니다
          </p>
          <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
            다른 필터나 검색어를 시도해보세요
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--gw-primary)' }}
          >
            필터 초기화
          </button>
        </div>
      )}

      {/* 페이지네이션 */}
      <Pagination
        page={page}
        total={filtered.length}
        perPage={ITEMS_PER_PAGE}
        onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />
    </MainLayout>
  );
}
