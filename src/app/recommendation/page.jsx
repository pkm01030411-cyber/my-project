import MainLayout from '@/components/Layout/MainLayout';

export const metadata = {
  title: '정책 제안 | GlobalWatch',
};

export default function RecommendationPage() {
  return (
    <MainLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            정책 제안
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            AI가 분석한 맞춤형 무역 전략 및 정책 제안
          </p>
        </div>

        {/* 제안 카드 */}
        <div className="space-y-4">
          {[
            {
              priority: 'high',
              priorityLabel: '긴급',
              icon: '🚨',
              title: '인도 반덤핑 조사 대응 전략',
              description: '인도의 한국산 철강 반덤핑 조사에 대한 즉각적인 법적 대응 및 수출 다변화 방안을 수립하세요.',
              actions: ['변호인단 구성 및 조사 대응팀 운영', '베트남, 인도네시아 대체 수출 루트 확보', '가격 경쟁력 분석 및 원가 구조 재검토'],
              deadline: '2024.05.15 까지',
            },
            {
              priority: 'medium',
              priorityLabel: '중요',
              icon: '💡',
              title: 'CBAM 대응을 위한 탄소 저감 전략',
              description: 'EU 탄소국경조정제도 시행에 대비하여 생산 공정의 탄소 배출량 감축 계획을 수립하세요.',
              actions: ['제품별 탄소 발자국 측정 및 인증 취득', '재생에너지 전환 투자 계획 수립', 'EU 파트너사와 협력 확대'],
              deadline: '2024.06.30 까지',
            },
            {
              priority: 'low',
              priorityLabel: '권장',
              icon: '🌱',
              title: '아세안 신규 시장 진출 기회 포착',
              description: 'RCEP 발효 이후 관세 혜택을 활용하여 베트남, 인도네시아 시장 진출을 검토하세요.',
              actions: ['현지 유통 파트너 발굴 및 MOU 체결', '현지 소비자 트렌드 분석 리서치', 'KOTRA 해외 무역관 협력 활용'],
              deadline: '2024.08.31 까지',
            },
          ].map((rec, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border transition-theme"
              style={{
                backgroundColor: 'var(--gw-surface)',
                borderColor: 'var(--gw-border)',
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">{rec.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        backgroundColor:
                          rec.priority === 'high'
                            ? '#fef2f2'
                            : rec.priority === 'medium'
                              ? '#fffbeb'
                              : '#f0fdf4',
                        color:
                          rec.priority === 'high'
                            ? 'var(--gw-danger)'
                            : rec.priority === 'medium'
                              ? 'var(--gw-accent)'
                              : 'var(--gw-secondary)',
                      }}
                    >
                      {rec.priorityLabel}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                      {rec.deadline}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
                    {rec.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
                    {rec.description}
                  </p>
                </div>
              </div>

              {/* 액션 아이템 */}
              <ul className="space-y-2">
                {rec.actions.map((action, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: 'var(--gw-sidebar-active)',
                        color: 'var(--gw-primary)',
                      }}
                    >
                      {j + 1}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--gw-text-primary)' }}>
                      {action}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
