'use client';

import { useState, useMemo } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import useDarkMode from '@/hooks/useDarkMode';
import { recommendations } from '@/data/mockData';
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';

const PRIORITY_CONFIG = {
  critical: { label: '즉시 대응', bg: 'rgba(220,38,38,0.08)', text: '#dc2626', border: 'rgba(220,38,38,0.3)' },
  high:     { label: '긴급',      bg: 'rgba(245,158,11,0.08)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  medium:   { label: '중요',      bg: 'rgba(99,102,241,0.08)', text: '#6366f1', border: 'rgba(99,102,241,0.3)' },
  low:      { label: '권장',      bg: 'rgba(16,185,129,0.08)', text: '#10b981', border: 'rgba(16,185,129,0.3)' },
};

function RecommendationCard({ rec }) {
  const [expanded, setExpanded] = useState(rec.priority === 'critical');
  const [checked, setChecked] = useState([]);
  const cfg = PRIORITY_CONFIG[rec.priority] ?? PRIORITY_CONFIG.low;

  const toggleCheck = (i) =>
    setChecked((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const progress = rec.actions.length > 0
    ? Math.round((checked.length / rec.actions.length) * 100)
    : 0;

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-theme"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      {/* 좌측 컬러 바 */}
      <div className="flex">
        <div className="w-1 flex-shrink-0" style={{ backgroundColor: cfg.text }} />
        <div className="flex-1 p-5">
          {/* 헤더 */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{rec.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full border"
                    style={{ color: cfg.text, backgroundColor: cfg.bg, borderColor: cfg.border }}
                  >
                    {cfg.label}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                    {rec.flag} {rec.region} · 기한: {rec.deadline}
                  </span>
                </div>
                <h3 className="text-base font-semibold" style={{ color: 'var(--gw-text-primary)' }}>
                  {rec.title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-shrink-0 p-1 rounded-lg transition-opacity hover:opacity-70"
            >
              {expanded
                ? <ChevronUp className="w-5 h-5" style={{ color: 'var(--gw-text-secondary)' }} />
                : <ChevronDown className="w-5 h-5" style={{ color: 'var(--gw-text-secondary)' }} />}
            </button>
          </div>

          {/* 진행도 바 */}
          {checked.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                  진행도
                </span>
                <span className="text-xs font-semibold" style={{ color: cfg.text }}>
                  {progress}%
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--gw-border)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, backgroundColor: cfg.text }}
                />
              </div>
            </div>
          )}

          {/* 펼쳐진 내용 */}
          {expanded && (
            <div className="mt-4">
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--gw-text-secondary)' }}>
                {rec.description ?? rec.summary}
              </p>

              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--gw-text-primary)' }}>
                실행 계획
              </p>
              <ul className="space-y-2">
                {rec.actions.map((action, i) => {
                  const done = checked.includes(i);
                  return (
                    <li
                      key={i}
                      onClick={() => toggleCheck(i)}
                      className="flex items-start gap-2.5 cursor-pointer group"
                    >
                      {done
                        ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10b981' }} />
                        : <Circle className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:opacity-70" style={{ color: 'var(--gw-border)' }} />
                      }
                      <span
                        className="text-sm transition-all"
                        style={{
                          color: done ? '#10b981' : 'var(--gw-text-primary)',
                          textDecoration: done ? 'line-through' : 'none',
                          opacity: done ? 0.7 : 1,
                        }}
                      >
                        {action}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecommendationPage() {
  useDarkMode();

  const [priorityFilter, setPriorityFilter] = useState('all');

  const filtered = useMemo(() => {
    if (priorityFilter === 'all') return recommendations;
    return recommendations.filter((r) => r.priority === priorityFilter);
  }, [priorityFilter]);

  const criticalCount = recommendations.filter((r) => r.priority === 'critical').length;
  const highCount     = recommendations.filter((r) => r.priority === 'high').length;

  return (
    <MainLayout>
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
          정책 제안
        </h1>
        <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
          AI가 분석한 맞춤형 무역 전략 및 실행 계획
        </p>

        {/* 요약 배너 */}
        {(criticalCount > 0 || highCount > 0) && (
          <div
            className="mt-4 flex items-center gap-3 p-3 rounded-xl border"
            style={{ backgroundColor: 'rgba(220,38,38,0.06)', borderColor: 'rgba(220,38,38,0.2)' }}
          >
            <span className="text-lg">🚨</span>
            <p className="text-sm" style={{ color: 'var(--gw-text-primary)' }}>
              <strong style={{ color: '#dc2626' }}>즉시 대응 {criticalCount}건</strong>,{' '}
              <strong style={{ color: '#f59e0b' }}>긴급 {highCount}건</strong>이 있습니다.
              빠른 검토가 필요합니다.
            </p>
          </div>
        )}
      </div>

      {/* 필터 */}
      <div className="flex gap-1.5 mb-5 overflow-x-auto pb-0.5">
        {[
          { code: 'all',      label: `전체 (${recommendations.length})` },
          { code: 'critical', label: '즉시 대응' },
          { code: 'high',     label: '긴급' },
          { code: 'medium',   label: '중요' },
          { code: 'low',      label: '권장' },
        ].map((f) => {
          const cfg = PRIORITY_CONFIG[f.code] ?? { text: 'var(--gw-primary)', bg: 'var(--gw-sidebar-active)' };
          const active = priorityFilter === f.code;
          return (
            <button
              key={f.code}
              onClick={() => setPriorityFilter(f.code)}
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all"
              style={{
                backgroundColor: active ? (f.code === 'all' ? 'var(--gw-primary)' : cfg.bg) : 'var(--gw-surface)',
                color: active ? (f.code === 'all' ? '#fff' : cfg.text) : 'var(--gw-text-secondary)',
                border: `1px solid ${active ? (f.code === 'all' ? 'var(--gw-primary)' : cfg.border ?? cfg.text) : 'var(--gw-border)'}`,
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* 제안 카드 목록 */}
      <div className="space-y-4">
        {filtered.map((rec) => (
          <RecommendationCard key={rec.id} rec={rec} />
        ))}
      </div>
    </MainLayout>
  );
}
