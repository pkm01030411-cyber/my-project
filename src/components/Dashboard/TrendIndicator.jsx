'use client';

import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import DashboardCard from './DashboardCard';

export default function TrendIndicator({ data, href }) {
  const { value, trend, description } = data;

  const color = trend === 'up' ? '#10b981' : trend === 'down' ? '#f59e0b' : '#6b7280';
  const bg = trend === 'up' ? 'rgba(16,185,129,0.1)' : trend === 'down' ? 'rgba(245,158,11,0.1)' : 'rgba(107,114,128,0.1)';

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendLabel = trend === 'up' ? '상승 중' : trend === 'down' ? '하강 중' : '안정적';

  return (
    <DashboardCard href={href ?? '/analytics?metric=trend'}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ backgroundColor: bg }}>
            <Activity className="w-4 h-4" style={{ color }} />
          </div>
          <span className="text-xs font-medium" style={{ color: 'var(--gw-text-secondary)' }}>
            트렌드 지수
          </span>
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full border"
          style={{
            color,
            backgroundColor: bg,
            borderColor: color + '40',
          }}
        >
          {trendLabel}
        </span>
      </div>

      {/* 숫자 */}
      <div className="flex items-end gap-2 mb-3">
        <span className="text-4xl font-bold leading-none" style={{ color }}>
          {value > 0 ? '+' : ''}{value}%
        </span>
      </div>

      {/* 설명 */}
      <div className="flex items-center gap-1.5">
        <TrendIcon className="w-4 h-4" style={{ color }} />
        <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
          {description ?? '이번 주 변화'}
        </span>
      </div>

      {/* 미니 바 시각화 (7단계) */}
      <div className="flex items-end gap-0.5 mt-3 h-6">
        {[40, 55, 45, 60, 70, 65, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all duration-300"
            style={{
              height: `${h}%`,
              backgroundColor: i === 6 ? color : bg,
              opacity: 0.6 + i * 0.06,
            }}
          />
        ))}
      </div>
    </DashboardCard>
  );
}
