'use client';

import { useState, useMemo } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import useDarkMode from '@/hooks/useDarkMode';
import {
  Search, ChevronDown, ChevronUp, MessageSquare,
  BookOpen, Zap, HelpCircle, X,
} from 'lucide-react';

const FAQ = [
  {
    category: '서비스',
    q: 'GlobalWatch는 어떤 서비스인가요?',
    a: 'GlobalWatch는 AI 기반 무역 인텔리전스 플랫폼으로, 전 세계 무역 뉴스·정책·지표를 실시간으로 분석하여 무역 담당자에게 리스크 경보, 기회 탐지, 정책 제안을 제공합니다.',
  },
  {
    category: '플랜',
    q: 'Tier 1, 2, 3의 차이는 무엇인가요?',
    a: 'Tier 1은 미국·중국·EU·한국 등 핵심 10개국을 모니터링합니다. Tier 2는 동남아·중동·인도를 포함한 20개국으로 확장되며 주간 심층 리포트가 제공됩니다. Tier 3는 전 세계 100개국 이상을 실시간으로 모니터링하며 전담 분석팀 지원과 API 연동이 가능합니다.',
  },
  {
    category: '데이터',
    q: '데이터는 얼마나 자주 업데이트되나요?',
    a: '뉴스 피드는 실시간 크롤링으로 5~15분마다 업데이트됩니다. 위험 지수는 매일 오전 9시 정기 업데이트되며, 주간·월간 리포트는 정해진 일정에 자동 생성됩니다. Tier 3 구독자는 5분 간격 실시간 알림을 받을 수 있습니다.',
  },
  {
    category: '데이터',
    q: 'CSV / Excel 다운로드는 어떻게 하나요?',
    a: '분석 리포트 페이지에서 [Excel 다운로드] 버튼을 클릭하면 현재 데이터를 CSV 형식으로 받을 수 있습니다. Tier 2 이상 구독자부터 이용 가능하며, Tier 3는 일괄 다운로드를 지원합니다.',
  },
  {
    category: '기능',
    q: '위험도 지수는 어떻게 계산되나요?',
    a: '위험도 지수는 뉴스 빈도·정책 변화·경제 지표·지정학적 요소를 종합하여 AI 모델이 0~100 사이의 점수로 산출합니다. 50 이상은 주의, 70 이상은 경보, 90 이상은 위기로 분류됩니다.',
  },
  {
    category: '기능',
    q: '알림은 어떻게 설정하나요?',
    a: '설정 메뉴 → 알림 설정에서 긴급 알림, 일일 리포트, 뉴스 실시간 알림 등을 개별 on/off 할 수 있습니다. 이메일 및 브라우저 푸시 알림을 지원하며, 특정 국가·산업을 지정해 맞춤 알림을 받을 수 있습니다.',
  },
  {
    category: '기능',
    q: 'PDF 보고서는 어떻게 다운로드하나요?',
    a: '분석 리포트 페이지에서 [PDF 생성] 버튼을 클릭하면 현재 분석 결과를 PDF로 다운로드할 수 있습니다. 이전 보고서는 보고서 목록에서 PDF 아이콘을 클릭해 다운로드하세요. Tier 1은 월 3회, Tier 2는 무제한, Tier 3는 자동 이메일 발송이 가능합니다.',
  },
  {
    category: '계정',
    q: '비밀번호를 잊어버렸어요. 어떻게 하나요?',
    a: '로그인 페이지 하단의 [비밀번호 찾기] 링크를 클릭하면 가입 이메일로 재설정 링크가 발송됩니다. 메일이 오지 않는 경우 스팸함을 확인하거나 support@globalwatch.com으로 문의해 주세요.',
  },
];

const GUIDES = [
  { icon: '🚀', title: '빠른 시작 가이드', desc: '처음 사용하는 분을 위한 5분 완성 튜토리얼' },
  { icon: '📊', title: '대시보드 활용법', desc: '주요 지표 해석과 차트 사용법 상세 설명' },
  { icon: '🔔', title: '알림 설정 가이드', desc: '맞춤 알림으로 중요 이슈를 놓치지 않는 방법' },
  { icon: '📁', title: '리포트 생성 가이드', desc: 'PDF·Excel 보고서 생성 및 공유 방법' },
];

const CATEGORIES = ['전체', '서비스', '플랜', '데이터', '기능', '계정'];

function FAQItem({ q, a, highlight }) {
  const [open, setOpen] = useState(false);

  const highlightText = (text) => {
    if (!highlight) return text;
    const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark
          style={{ backgroundColor: 'var(--gw-primary)', color: '#fff', borderRadius: '2px', padding: '0 1px' }}
        >
          {text.slice(idx, idx + highlight.length)}
        </mark>
        {text.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <div className="border-b last:border-b-0" style={{ borderColor: 'var(--gw-border)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between py-4 text-left gap-3 transition-opacity hover:opacity-70"
      >
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <HelpCircle
            className="w-4 h-4 flex-shrink-0 mt-0.5"
            style={{ color: open ? 'var(--gw-primary)' : 'var(--gw-text-secondary)' }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: open ? 'var(--gw-primary)' : 'var(--gw-text-primary)' }}
          >
            {highlightText(q)}
          </span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--gw-text-secondary)' }} />
          : <ChevronDown className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--gw-text-secondary)' }} />}
      </button>
      {open && (
        <div
          className="pb-4 pl-6 pr-2 text-sm leading-relaxed"
          style={{ color: 'var(--gw-text-secondary)' }}
        >
          {highlightText(a)}
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  useDarkMode();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');

  const filtered = useMemo(() => {
    return FAQ.filter((f) => {
      const matchCat = category === '전체' || f.category === category;
      const matchSearch =
        !search ||
        f.q.toLowerCase().includes(search.toLowerCase()) ||
        f.a.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <MainLayout>
      <div className="max-w-2xl space-y-6">
        {/* 헤더 */}
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            도움말 &amp; FAQ
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            GlobalWatch 사용법과 자주 묻는 질문을 확인하세요
          </p>
        </div>

        {/* 검색 */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border"
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
          {search && (
            <button onClick={() => setSearch('')} className="transition-opacity hover:opacity-70">
              <X className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
            </button>
          )}
        </div>

        {/* 사용 가이드 */}
        <section>
          <h2
            className="flex items-center gap-2 text-sm font-semibold mb-3"
            style={{ color: 'var(--gw-text-secondary)' }}
          >
            <BookOpen className="w-4 h-4" /> 사용 가이드
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GUIDES.map((g) => (
              <div
                key={g.title}
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
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: 'var(--gw-text-secondary)' }}
            >
              <Zap className="w-4 h-4" /> 자주 묻는 질문
            </h2>
            <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>
              {filtered.length}개
            </span>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                style={
                  category === c
                    ? { backgroundColor: 'var(--gw-primary)', color: '#fff' }
                    : {
                        backgroundColor: 'var(--gw-surface)',
                        color: 'var(--gw-text-secondary)',
                        border: '1px solid var(--gw-border)',
                      }
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div
            className="rounded-2xl border px-5"
            style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
          >
            {filtered.length > 0 ? (
              filtered.map((f, i) => (
                <FAQItem key={i} q={f.q} a={f.a} highlight={search} />
              ))
            ) : (
              <div className="py-10 text-center">
                <HelpCircle className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--gw-text-secondary)' }} />
                <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
                  "{search}" 에 대한 검색 결과가 없습니다
                </p>
                <button
                  onClick={() => { setSearch(''); setCategory('전체'); }}
                  className="mt-3 text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: 'var(--gw-primary)' }}
                >
                  전체 FAQ 보기
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 문의 */}
        <section>
          <div
            className="p-6 rounded-2xl border text-center transition-theme"
            style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
          >
            <MessageSquare className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--gw-primary)' }} />
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
              더 궁금한 점이 있으신가요?
            </h3>
            <p className="text-xs mb-1" style={{ color: 'var(--gw-text-secondary)' }}>
              기타 문의 사항은 이메일로 연락 주세요
            </p>
            <p className="text-sm font-medium mb-4" style={{ color: 'var(--gw-primary)' }}>
              support@globalwatch.com
            </p>
            <button
              onClick={() => window.open('mailto:support@globalwatch.com')}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--gw-primary)' }}
            >
              이메일로 문의
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
