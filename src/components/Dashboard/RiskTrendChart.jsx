'use client';

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine,
} from 'recharts';

const METRICS = [
  { key: 'risk',        label: '위험도',  color: '#dc2626', active: true },
  { key: 'opportunity', label: '기회도',  color: '#10b981', active: true },
  { key: 'relevance',   label: '중요도',  color: '#6366f1', active: false },
];

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
      <p className="font-semibold mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {METRICS.find((m) => m.key === p.dataKey)?.label}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function RiskTrendChart({ data }) {
  const colors = useChartColors();
  const [activeMetrics, setActiveMetrics] = useState(
    METRICS.filter((m) => m.active).map((m) => m.key)
  );

  const toggleMetric = (key) => {
    setActiveMetrics((prev) =>
      prev.includes(key)
        ? prev.length > 1 ? prev.filter((k) => k !== key) : prev
        : [...prev, key]
    );
  };

  if (!data?.length) return null;

  return (
    <div
      className="p-5 rounded-2xl border transition-theme"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--gw-text-primary)' }}>
            7일 지수 추이
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>
            최근 7일 위험도·기회도·중요도 변화
          </p>
        </div>
        {/* 메트릭 토글 */}
        <div className="flex gap-2">
          {METRICS.map((m) => {
            const on = activeMetrics.includes(m.key);
            return (
              <button
                key={m.key}
                onClick={() => toggleMetric(m.key)}
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border transition-all"
                style={{
                  borderColor: on ? m.color : 'var(--gw-border)',
                  backgroundColor: on ? m.color + '18' : 'transparent',
                  color: on ? m.color : 'var(--gw-text-secondary)',
                  fontWeight: on ? 600 : 400,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: on ? m.color : 'var(--gw-border)' }}
                />
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 라인 차트 */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis
            dataKey="date"
            tick={{ fill: colors.text, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[20, 90]}
            tick={{ fill: colors.text, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* 위험 임계선 */}
          <ReferenceLine y={50} stroke="#dc2626" strokeDasharray="4 4" strokeOpacity={0.4} />

          {METRICS.map((m) =>
            activeMetrics.includes(m.key) ? (
              <Line
                key={m.key}
                type="monotone"
                dataKey={m.key}
                stroke={m.color}
                strokeWidth={2.5}
                dot={{ fill: m.color, r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs mt-2" style={{ color: 'var(--gw-text-secondary)' }}>
        <span style={{ color: '#dc2626' }}>—</span> 점선: 위험 임계값(50)
      </p>
    </div>
  );
}
