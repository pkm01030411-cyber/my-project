import MainLayout from '@/components/Layout/MainLayout';

export const metadata = {
  title: '대시보드 | GlobalWatch',
};

export default function DashboardPage() {
  return (
    <MainLayout>
      <div>
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            대시보드
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            글로벌 무역 시장 현황을 한눈에 확인하세요
          </p>
        </div>

        {/* 통계 카드 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: '모니터링 국가', value: '48', change: '+2', positive: true },
            { label: '오늘의 뉴스', value: '127', change: '+23', positive: true },
            { label: '리스크 경보', value: '5', change: '+1', positive: false },
            { label: '정책 업데이트', value: '12', change: '+4', positive: true },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl border transition-theme"
              style={{
                backgroundColor: 'var(--gw-surface)',
                borderColor: 'var(--gw-border)',
              }}
            >
              <p className="text-xs mb-1" style={{ color: 'var(--gw-text-secondary)' }}>
                {stat.label}
              </p>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
                {stat.value}
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: stat.positive ? 'var(--gw-secondary)' : 'var(--gw-danger)' }}
              >
                {stat.change} 이번 주
              </p>
            </div>
          ))}
        </div>

        {/* 주요 뉴스 미리보기 */}
        <div
          className="p-5 rounded-xl border transition-theme"
          style={{
            backgroundColor: 'var(--gw-surface)',
            borderColor: 'var(--gw-border)',
          }}
        >
          <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--gw-text-primary)' }}>
            오늘의 주요 이슈
          </h2>
          <div className="space-y-3">
            {[
              {
                country: '🇺🇸 미국',
                title: '미-중 관세 협상 재개 예정, 무역 불균형 논의 핵심',
                tier: 'Tier 1',
                time: '2시간 전',
                risk: 'high',
              },
              {
                country: '🇪🇺 EU',
                title: 'EU 탄소국경조정제도(CBAM) 시행 현황 및 영향',
                tier: 'Tier 1',
                time: '4시간 전',
                risk: 'medium',
              },
              {
                country: '🇻🇳 베트남',
                title: '베트남 제조업 투자 유치 확대로 수출 다변화 가속',
                tier: 'Tier 2',
                time: '6시간 전',
                risk: 'low',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg border transition-theme"
                style={{ borderColor: 'var(--gw-border)' }}
              >
                <div
                  className="w-2 h-2 mt-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor:
                      item.risk === 'high'
                        ? 'var(--gw-danger)'
                        : item.risk === 'medium'
                          ? 'var(--gw-accent)'
                          : 'var(--gw-secondary)',
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium" style={{ color: 'var(--gw-text-secondary)' }}>
                      {item.country}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-medium"
                      style={{
                        backgroundColor: 'var(--gw-sidebar-active)',
                        color: 'var(--gw-primary)',
                      }}
                    >
                      {item.tier}
                    </span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>
                    {item.title}
                  </p>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: 'var(--gw-text-secondary)' }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
