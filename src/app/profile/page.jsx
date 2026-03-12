import MainLayout from '@/components/Layout/MainLayout';

export const metadata = {
  title: '프로필 | GlobalWatch',
};

export default function ProfilePage() {
  return (
    <MainLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            프로필
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            계정 정보를 확인하고 수정하세요
          </p>
        </div>

        <div className="max-w-xl space-y-4">
          {/* 프로필 카드 */}
          <div
            className="p-6 rounded-xl border text-center transition-theme"
            style={{
              backgroundColor: 'var(--gw-surface)',
              borderColor: 'var(--gw-border)',
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            >
              U
            </div>
            <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
              사용자 이름
            </h2>
            <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
              user@globalwatch.io
            </p>
            <div
              className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: 'var(--gw-sidebar-active)',
                color: 'var(--gw-primary)',
              }}
            >
              ✓ 무역 담당자 플랜
            </div>
          </div>

          {/* 정보 카드 */}
          <div
            className="p-5 rounded-xl border transition-theme"
            style={{
              backgroundColor: 'var(--gw-surface)',
              borderColor: 'var(--gw-border)',
            }}
          >
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--gw-text-primary)' }}>
              기본 정보
            </h3>
            <div className="space-y-3">
              {[
                { label: '이름', value: '홍길동' },
                { label: '이메일', value: 'user@globalwatch.io' },
                { label: '소속', value: '(주)글로벌트레이드' },
                { label: '직책', value: '무역팀장' },
              ].map((field) => (
                <div
                  key={field.label}
                  className="flex items-center justify-between py-2 border-b"
                  style={{ borderColor: 'var(--gw-border)' }}
                >
                  <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                    {field.label}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="mt-4 w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            >
              정보 수정
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
