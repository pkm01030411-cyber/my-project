'use client';

import { useRouter } from 'next/navigation';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList,
} from 'recharts';

// 차트 전용 색상 팔레트
const INDUSTRY_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#14b8a6', '#f97316'];

function useChartColors() {
  if (typeof window === 'undefined') return { text: '#6b7280', grid: '#e5e7eb' };
  const style = getComputedStyle(document.documentElement);
  const isDark = style.getPropertyValue('--gw-bg').trim().startsWith('#1');
  return {
    text: isDark ? '#9ca3af' : '#6b7280',
    grid: isDark ? '#374151' : '#e5e7eb',
  };
}

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
      <p>영향도: <strong>{payload[0]?.value}</strong></p>
      {payload[0]?.payload?.change !== undefined && (
        <p style={{ color: payload[0].payload.change >= 0 ? '#10b981' : '#f59e0b' }}>
          변화: {payload[0].payload.change >= 0 ? '+' : ''}{payload[0].payload.change}%
        </p>
      )}
    </div>
  );
};

export default function IndustryChart({ data }) {
  const router = useRouter();
  const colors = useChartColors();

  if (!data?.length) return null;

  const handleClick = (entry) => {
    if (entry?.activePayload?.[0]?.payload?.nameEn) {
      router.push(`/analytics?industry=${entry.activePayload[0].payload.nameEn.toLowerCase()}`);
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
            산업별 영향도
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>
            클릭하면 산업 상세로 이동
          </p>
        </div>
        <button
          onClick={() => router.push('/analytics?tab=industry')}
          className="text-xs font-medium transition-opacity hover:opacity-70"
          style={{ color: 'var(--gw-primary)' }}
        >
          전체 보기 →
        </button>
      </div>

      {/* 수평 바 차트 */}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 36, left: 0, bottom: 0 }}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: colors.text, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: colors.text, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
            <LabelList
              dataKey="value"
              position="right"
              style={{ fill: colors.text, fontSize: 11, fontWeight: 600 }}
              formatter={(v) => `${v}`}
            />
            {data.map((entry, i) => (
              <Cell
                key={entry.nameEn ?? i}
                fill={INDUSTRY_COLORS[i % INDUSTRY_COLORS.length]}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* 변화율 태그 */}
      <div className="flex flex-wrap gap-2 mt-3">
        {data.slice(0, 4).map((d, i) => (
          <div
            key={d.nameEn ?? i}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: INDUSTRY_COLORS[i % INDUSTRY_COLORS.length] + '18',
              color: INDUSTRY_COLORS[i % INDUSTRY_COLORS.length],
            }}
          >
            {d.name}
            {d.change !== undefined && (
              <span>{d.change >= 0 ? ' ▲' : ' ▼'}{Math.abs(d.change)}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
