import MainLayout from '@/components/Layout/MainLayout';

export const metadata = {
  title: '분석 리포트 | GlobalWatch',
};

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            분석 리포트
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            AI 기반 무역 시장 심층 분석 보고서
          </p>
        </div>

        {/* 리포트 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: '📊',
              title: '2024년 Q1 무역 수지 분석',
              description: '주요 교역국별 수출입 동향 및 무역 수지 변화 심층 분석',
              date: '2024.04.01',
              type: '분기 리포트',
              color: 'var(--gw-primary)',
            },
            {
              icon: '🌏',
              title: '아세안 시장 진출 기회 분석',
              description: 'RCEP 발효 이후 동남아 시장 기회 요인 및 리스크 평가',
              date: '2024.03.28',
              type: '지역 분석',
              color: 'var(--gw-secondary)',
            },
            {
              icon: '⚡',
              title: '글로벌 공급망 리스크 지도',
              description: '핵심 원자재 수급 불안 지역 및 대체 공급선 분석',
              date: '2024.03.25',
              type: '리스크 분석',
              color: 'var(--gw-danger)',
            },
            {
              icon: '💹',
              title: '환율 변동과 수출 경쟁력',
              description: '주요 통화 환율 변동이 한국 수출 경쟁력에 미치는 영향',
              date: '2024.03.20',
              type: '금융 분석',
              color: 'var(--gw-accent)',
            },
          ].map((report, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border transition-theme cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: 'var(--gw-surface)',
                borderColor: 'var(--gw-border)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${report.color}20` }}
                >
                  {report.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${report.color}20`, color: report.color }}
                    >
                      {report.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
                    {report.title}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: 'var(--gw-text-secondary)' }}>
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                      {report.date}
                    </span>
                    <button
                      className="text-xs font-medium transition-colors hover:opacity-70"
                      style={{ color: report.color }}
                    >
                      자세히 보기 →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
