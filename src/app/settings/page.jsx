import MainLayout from '@/components/Layout/MainLayout';

export const metadata = {
  title: '설정 | GlobalWatch',
};

export default function SettingsPage() {
  return (
    <MainLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            설정
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            앱 환경 설정 및 알림을 관리하세요
          </p>
        </div>

        <div className="space-y-4 max-w-2xl">
          {[
            {
              section: '알림 설정',
              items: [
                { label: '긴급 알림', desc: '위험도 높은 이슈 발생 시 즉시 알림', on: true },
                { label: '일일 리포트', desc: '매일 오전 8시 요약 리포트 발송', on: true },
                { label: '뉴스 업데이트', desc: '새 뉴스 등록 시 알림', on: false },
              ],
            },
            {
              section: '관심 지역',
              items: [
                { label: '북미 (미국, 캐나다)', desc: 'Tier 1 주요 교역국', on: true },
                { label: 'EU (유럽 연합)', desc: 'Tier 1 주요 교역국', on: true },
                { label: '동남아시아', desc: 'ASEAN 10개국', on: false },
              ],
            },
          ].map((group) => (
            <div
              key={group.section}
              className="p-5 rounded-xl border transition-theme"
              style={{
                backgroundColor: 'var(--gw-surface)',
                borderColor: 'var(--gw-border)',
              }}
            >
              <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--gw-text-primary)' }}>
                {group.section}
              </h2>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>
                        {item.label}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                        {item.desc}
                      </p>
                    </div>
                    {/* 토글 스위치 */}
                    <div
                      className="relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-300"
                      style={{ backgroundColor: item.on ? 'var(--gw-primary)' : 'var(--gw-border)' }}
                    >
                      <div
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300"
                        style={{ transform: item.on ? 'translateX(22px)' : 'translateX(4px)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
