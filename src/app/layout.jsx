import '@/styles/globals.css';

export const metadata = {
  title: 'GlobalWatch — 글로벌 무역 시장 인텔리전스',
  description: '무역 담당자를 위한 국제정세 분석 대시보드. 실시간 뉴스, 리포트, 정책 제안을 한 곳에서.',
  keywords: ['무역', '국제정세', '분석', 'GlobalWatch', '수출입', '정책'],
  openGraph: {
    title: 'GlobalWatch',
    description: '글로벌 무역 시장 인텔리전스 플랫폼',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/*
          다크모드 깜빡임(FOUC) 방지 스크립트
          - localStorage의 'theme' 값을 읽어 즉시 .dark 클래스 적용
          - React hydration 전에 실행됨
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
