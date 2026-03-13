'use client';

import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import useDarkMode from '@/hooks/useDarkMode';
import { ChevronDown, ChevronUp, Search, MessageSquare, BookOpen, Zap } from 'lucide-react';

const FAQ = [
  { q: 'GlobalWatch는 어떤 서비스인가요?', a: 'GlobalWatch는 AI 기반 무역 인텔리전스 플랫폼으로, 전 세계 무역 뉴스·정책·지표를 실시간으로 분석하여 무역 담당자에게 리스크 경보, 기회 탐지, 정책 제안을 제공합니다.' },
  { q: 'Tier 1, 2, 3의 차이는 무엇인가요?', a: 'Tier 1은 미국·중국·EU·한국 등 핵심 10개국, Tier 2는 동남아·중동·인도 포함 20개국, Tier 3는 전 세계 100개국 이상을 모니터링합니다. 상위 Tier일수록 더 많은 지역·산업 분석과 심층 리포트가 제공됩니다.' },
  { q: '위험도 지수는 어떻게 계산되나요?', a: '위험도 지수는 뉴스 빈도·정책 변화·경제 지표·지정학적 요소를 종합하여 AI 모델이 0~100 사이의 점수로 산출합니다. 50 이상은 주의, 70 이상은 경보, 90 이상은 위기로 분류됩니다.' },
  { q: '알림은 어떻게 설정하나요?', a: '설정 메뉴 → 알림 설정에서 긴급 알림, 일일 리포트, 뉴스 실시간 알림 등을 개별적으로 on/off 할 수 있습니다. 이메일 및 브라우저 푸시 알림을 지원합니다.' },
  { q: 'PDF 보고서는 어떻게 다운로드하나요?', a: '분석 리포트 페이지에서 [PDF 생성] 버튼을 클릭하면 현재 분석 결과를 PDF로 다운로드할 수 있습니다. 이전 보고서는 보고서 목록에서 PDF 아이콘을 클릭해 다운로드하세요.' },
  { q: '데이터는 얼마나 자주 업데이트되나요?', a: '뉴스 피드는 실시간 크롤링으로 5~15분마다 업데이트됩니다. 지수 분석은 1시간마다, 주간·월간 리포트는 정해진 일정에 자동 생성됩니다.' },
];

const GUIDES = [
  { icon: '🚀', title: '빠른 시작 가이드', desc: '처음 사용하는 분을 위한 5분 완성 튜토리얼', href: '#' },
  { icon: '📊', title: '대시보드 활용법', desc: '주요 지표 해석과 차트 사용법 상세 설명', href: '#' },
  { icon: '🔔', title: '알림 설정 가이드', desc: '맞춤 알림으로 중요 이슈를 놓치지 않는 방법', href: '#' },
  { icon: '📁', title: '리포트 생성 가이드', desc: 'PDF·Excel 보고서 생성 및 공유 방법', href: '#' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: 'var(--gw-border)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left transition-opacity hover:opacity-70"
      >
        <span className="text-sm font-medium pr-4" style={{ color: 'var(--gw-text-primary)' }}>
          {q}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gw-text-secondary)' }} />
          : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gw-text-secondary)' }} />}
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed" style={{ color: 'var(--gw-text-secondary)' }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function HelpPage() {
  useDarkMode();
  const [search, setSearch] = useState('');

  const filteredFAQ = FAQ.filter(
    (f) => f.q.includes(search) || f.a.includes(search)
  );

  return (
    <MainLayout>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            도움말
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            GlobalWatch 사용법과 자주 묻는 질문을 확인하세요
          </p>
        </div>

        {/* 검색 */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl border mb-6"
          style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
        >
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gw-text-secondary)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="질문 검색..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--gw-text-primary)' }}
          />
        </div>

        {/* 가이드 링크 */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--gw-text-secondary)' }}>
            <BookOpen className="w-4 h-4" /> 사용 가이드
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GUIDES.map((g) => (
              <a
                key={g.title}
                href={g.href}
                className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md"
                style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
              >
                <span className="text-xl">{g.icon}</span>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--gw-text-primary)' }}>
                    {g.title}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
                    {g.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--gw-text-secondary)' }}>
            <Zap className="w-4 h-4" /> 자주 묻는 질문
          </h2>
          <div
            className="rounded-2xl border px-5"
            style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
          >
            {filteredFAQ.length > 0
              ? filteredFAQ.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)
              : (
                <p className="py-6 text-sm text-center" style={{ color: 'var(--gw-text-secondary)' }}>
                  검색 결과가 없습니다
                </p>
              )}
          </div>
        </section>

        {/* 문의 */}
        <section>
          <div
            className="p-5 rounded-2xl border text-center"
            style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
          >
            <MessageSquare className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--gw-primary)' }} />
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
              더 궁금한 점이 있으신가요?
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--gw-text-secondary)' }}>
              support@globalwatch.io 또는 채팅 상담으로 문의하세요
            </p>
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--gw-primary)' }}
              onClick={() => window.open('mailto:support@globalwatch.io')}
            >
              이메일 문의하기
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
