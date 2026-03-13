'use client';

import { useRouter } from 'next/navigation';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { getRiskColor } from '@/data/mockData';

// 다크모드 감지 (CSS 변수 기반)
function useChartColors() {
  if (typeof window === 'undefined') return { text: '#6b7280', grid: '#e5e7eb' };
  const style = getComputedStyle(document.documentElement);
  const isDark = style.getPropertyValue('--gw-bg').trim().startsWith('#1');
  return {
    text: isDark ? '#9ca3af' : '#6b7280',
    grid: isDark ? '#374151' : '#e5e7eb',
  };
}

const CHART_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6', '#06b6d4', '#84cc16'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-lg border shadow-lg text-xs"
      style={{
        backgroundColor: 'var(--gw-surface)',
        borderColor: 'var(--gw-border)',
        color: 'var(--gw-text-primary)',
      }}
    >
      <p className="font-semibold mb-1">{label}</p>
      <p style={{ color: CHART_COLORS[0] }}>위험도: {payload[0]?.value}</p>
    </div>
  );
};

export default function RegionChart({ data }) {
  const router = useRouter();
  const colors = useChartColors();

  if (!data?.length) return null;

  const handleClick = (entry) => {
    if (entry?.activePayload?.[0]?.payload?.code) {
      router.push(`/analytics?region=${entry.activePayload[0].payload.code.toLowerCase()}`);
    }
  };

  return (
    <div
      className="p-5 rounded-2xl border transition-theme"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--gw-text-primary)' }}>
            지역별 위험도 분석
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>
            클릭하면 상세 분석으로 이동
          </p>
        </div>
        <button
          onClick={() => router.push('/analytics?tab=region')}
          className="text-xs font-medium transition-opacity hover:opacity-70"
          style={{ color: 'var(--gw-primary)' }}
        >
          전체 보기 →
        </button>
      </div>

      {/* 바 차트 */}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: colors.text, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: colors.text, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {data.map((entry, i) => (
              <Cell
                key={entry.code ?? i}
                fill={getRiskColor(entry.riskLevel)}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* 범례 */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
        {[
          { level: 'CRITICAL', label: '위험', color: '#dc2626' },
          { level: 'HIGH',     label: '높음', color: '#f59e0b' },
          { level: 'MEDIUM',   label: '보통', color: '#3b82f6' },
          { level: 'LOW',      label: '낮음', color: '#10b981' },
        ].map(({ level, label, color }) => (
          <div key={level} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
