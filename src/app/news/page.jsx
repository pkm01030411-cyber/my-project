import MainLayout from '@/components/Layout/MainLayout';

export const metadata = {
  title: '뉴스 피드 | GlobalWatch',
};

export default function NewsPage() {
  return (
    <MainLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            뉴스 피드
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            국제 무역 관련 최신 뉴스를 실시간으로 확인하세요
          </p>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {['전체', 'Tier 1', 'Tier 2', 'Tier 3', '관세', '환율', '물류'].map((filter, i) => (
            <button
              key={filter}
              className="px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0"
              style={{
                backgroundColor: i === 0 ? 'var(--gw-primary)' : 'var(--gw-surface)',
                color: i === 0 ? '#ffffff' : 'var(--gw-text-secondary)',
                border: `1px solid ${i === 0 ? 'var(--gw-primary)' : 'var(--gw-border)'}`,
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 뉴스 카드 리스트 */}
        <div className="space-y-3">
          {[
            {
              flag: '🇺🇸',
              country: '미국',
              tier: 'Tier 1',
              title: '미 연준, 금리 동결 결정 — 달러 강세로 수출 경쟁력 영향',
              summary: '미국 연방준비제도이사회가 기준금리를 5.25-5.5%로 동결했습니다.',
              time: '30분 전',
              category: '금융',
              risk: 'medium',
            },
            {
              flag: '🇨🇳',
              country: '중국',
              tier: 'Tier 1',
              title: '중국 제조업 PMI 50.1 기록 — 경기 회복세 신호',
              summary: '중국의 4월 제조업 구매관리자지수(PMI)가 50.1을 기록하며 확장세를 유지했습니다.',
              time: '1시간 전',
              category: '경제',
              risk: 'low',
            },
            {
              flag: '🇩🇪',
              country: '독일',
              tier: 'Tier 1',
              title: 'EU-독일 반도체 지원법 통과 — 공급망 재편 가속화',
              summary: '유럽연합이 430억 유로 규모의 반도체 지원 패키지를 최종 승인했습니다.',
              time: '3시간 전',
              category: '기술',
              risk: 'low',
            },
            {
              flag: '🇮🇳',
              country: '인도',
              tier: 'Tier 2',
              title: '인도, 한국산 철강 반덤핑 조사 착수',
              summary: '인도 상무부가 한국산 냉연강판에 대한 반덤핑 조사를 개시했습니다.',
              time: '5시간 전',
              category: '무역',
              risk: 'high',
            },
          ].map((news, i) => (
            <article
              key={i}
              className="p-4 rounded-xl border transition-theme cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: 'var(--gw-surface)',
                borderColor: 'var(--gw-border)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 mt-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor:
                      news.risk === 'high'
                        ? 'var(--gw-danger)'
                        : news.risk === 'medium'
                          ? 'var(--gw-accent)'
                          : 'var(--gw-secondary)',
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-sm">{news.flag} {news.country}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: 'var(--gw-sidebar-active)',
                        color: 'var(--gw-primary)',
                      }}
                    >
                      {news.tier}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'var(--gw-border)',
                        color: 'var(--gw-text-secondary)',
                      }}
                    >
                      {news.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
                    {news.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                    {news.summary}
                  </p>
                  <p className="text-xs mt-2" style={{ color: 'var(--gw-text-secondary)' }}>
                    {news.time}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
