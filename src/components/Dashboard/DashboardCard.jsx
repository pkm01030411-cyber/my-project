'use client';

import { useRouter } from 'next/navigation';

/**
 * DashboardCard - 재사용 가능한 지표 카드 껍데기
 *
 * Props:
 *   - href: 클릭 시 이동 경로 (선택)
 *   - className: 추가 클래스
 *   - children: 카드 내용
 */
export default function DashboardCard({ href, onClick, children, className = '' }) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    else if (href) router.push(href);
  };

  const isClickable = !!(href || onClick);

  return (
    <div
      onClick={isClickable ? handleClick : undefined}
      className={[
        'relative p-5 rounded-2xl border transition-all duration-200',
        isClickable ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.99]' : '',
        className,
      ].join(' ')}
      style={{
        backgroundColor: 'var(--gw-surface)',
        borderColor: 'var(--gw-border)',
      }}
    >
      {children}
    </div>
  );
}
