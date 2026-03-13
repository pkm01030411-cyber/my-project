'use client';

import { useRouter } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { getImpactColor, getImpactLabel } from '@/data/mockData';

/**
 * NewsCard - 개별 뉴스 항목
 */
function NewsItem({ item, isLast }) {
  const router = useRouter();
  const impactColor = getImpactColor(item.impact);
  const impactLabel = getImpactLabel(item.impact);

  return (
    <div
      onClick={() => router.push(`/news?id=${item.id}`)}
      className={[
        'flex items-start gap-3 py-3.5 cursor-pointer transition-all hover:opacity-80',
        !isLast ? 'border-b' : '',
      ].join(' ')}
      style={{ borderColor: 'var(--gw-border)' }}
    >
      {/* 영향도 색 점 */}
      <div
        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
        style={{ backgroundColor: impactColor }}
      />

      <div className="flex-1 min-w-0">
        {/* 메타 태그들 */}
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
            {item.flag} {item.region}
          </span>
          <span style={{ color: 'var(--gw-border)' }}>·</span>
          <span
            className="text-xs px-1.5 py-0.5 rounded font-medium"
            style={{
              backgroundColor: impactColor + '18',
              color: impactColor,
            }}
          >
            {impactLabel}
          </span>
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: 'var(--gw-sidebar-active)',
              color: 'var(--gw-primary)',
            }}
          >
            {item.industry}
          </span>
        </div>

        {/* 제목 */}
        <p
          className="text-sm font-medium leading-snug mb-1 line-clamp-2"
          style={{ color: 'var(--gw-text-primary)' }}
        >
          {item.title}
        </p>

        {/* 출처 + 시간 */}
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
            {item.source} · {item.time}
          </span>
          <span
            className="flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--gw-primary)' }}
          >
            자세히 <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * NewsCard - 뉴스 목록 컨테이너
 */
export default function NewsCard({ items = [], limit, href }) {
  const router = useRouter();
  const displayItems = limit ? items.slice(0, limit) : items;

  return (
    <div
      className="p-5 rounded-2xl border transition-theme"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--gw-text-primary)' }}>
            최근 핵심 뉴스
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>
            오늘 주요 무역 이슈
          </p>
        </div>
        <button
          onClick={() => router.push(href ?? '/news')}
          className="text-xs font-medium transition-opacity hover:opacity-70"
          style={{ color: 'var(--gw-primary)' }}
        >
          전체 보기 →
        </button>
      </div>

      {/* 뉴스 리스트 */}
      <div>
        {displayItems.map((item, i) => (
          <NewsItem
            key={item.id}
            item={item}
            isLast={i === displayItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
