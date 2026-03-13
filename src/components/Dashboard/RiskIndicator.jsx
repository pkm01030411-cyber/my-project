'use client';

import { ShieldAlert, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import DashboardCard from './DashboardCard';

const LEVEL_CONFIG = {
  CRITICAL: { label: '위험', bg: 'rgba(220,38,38,0.1)', text: '#dc2626', border: 'rgba(220,38,38,0.25)' },
  HIGH:     { label: '높음', bg: 'rgba(245,158,11,0.1)', text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  MEDIUM:   { label: '보통', bg: 'rgba(59,130,246,0.1)', text: '#3b82f6', border: 'rgba(59,130,246,0.25)' },
  LOW:      { label: '낮음', bg: 'rgba(16,185,129,0.1)', text: '#10b981', border: 'rgba(16,185,129,0.25)' },
};

function TrendIcon({ trend, color }) {
  if (trend === 'up') return <TrendingUp className="w-4 h-4" style={{ color }} />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4" style={{ color: '#10b981' }} />;
  return <Minus className="w-4 h-4" style={{ color: '#6b7280' }} />;
}

export default function RiskIndicator({ data, href }) {
  const { value, level, change, trend } = data;
  const cfg = LEVEL_CONFIG[level] ?? LEVEL_CONFIG.MEDIUM;
  const changeColor = trend === 'down' ? '#10b981' : trend === 'up' ? '#dc2626' : '#6b7280';

  return (
    <DashboardCard href={href ?? '/analytics?metric=risk'}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ backgroundColor: cfg.bg }}>
            <ShieldAlert className="w-4 h-4" style={{ color: cfg.text }} />
          </div>
          <span className="text-xs font-medium" style={{ color: 'var(--gw-text-secondary)' }}>
            위험도 지수
          </span>
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full border"
          style={{ color: cfg.text, backgroundColor: cfg.bg, borderColor: cfg.border }}
        >
          {cfg.label}
        </span>
      </div>

      {/* 숫자 */}
      <div className="flex items-end gap-2 mb-3">
        <span className="text-4xl font-bold leading-none" style={{ color: cfg.text }}>
          {value}
        </span>
        <span className="text-sm mb-0.5" style={{ color: 'var(--gw-text-secondary)' }}>/100</span>
      </div>

      {/* 변화율 */}
      <div className="flex items-center gap-1.5">
        <TrendIcon trend={trend} color={changeColor} />
        <span className="text-xs font-medium" style={{ color: changeColor }}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
          전일 대비
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div
        className="mt-3 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--gw-border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: cfg.text }}
        />
      </div>
    </DashboardCard>
  );
}
