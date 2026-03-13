'use client';

import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import useDarkMode from '@/hooks/useDarkMode';
import { Bell, Globe, Palette, Shield, ChevronRight, Check } from 'lucide-react';

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
      style={{ backgroundColor: on ? 'var(--gw-primary)' : 'var(--gw-border)' }}
    >
      <div
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300"
        style={{ transform: on ? 'translateX(22px)' : 'translateX(4px)' }}
      />
    </button>
  );
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div
      className="rounded-2xl border overflow-hidden transition-theme"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3.5 border-b"
        style={{ borderColor: 'var(--gw-border)' }}
      >
        <Icon className="w-4 h-4" style={{ color: 'var(--gw-primary)' }} />
        <h2 className="text-sm font-semibold" style={{ color: 'var(--gw-text-primary)' }}>
          {title}
        </h2>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function ToggleRow({ label, desc, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>{desc}</p>}
      </div>
      <Toggle on={value} onChange={onChange} />
    </div>
  );
}

function SelectRow({ label, desc, options, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>{desc}</p>}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm px-2 py-1 rounded-lg border outline-none"
        style={{
          backgroundColor: 'var(--gw-bg)',
          borderColor: 'var(--gw-border)',
          color: 'var(--gw-text-primary)',
        }}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [notifs, setNotifs] = useState({
    urgent: true, daily: true, news: false, weekly: true,
  });
  const [regions, setRegions] = useState({
    US: true, CN: true, EU: true, KR: true, VN: false, IN: false,
  });
  const [language, setLanguage]   = useState('ko');
  const [timezone, setTimezone]   = useState('Asia/Seoul');
  const [dataRetention, setRetention] = useState('90');

  const toggle = (state, setState, key) => setState({ ...state, [key]: !state[key] });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            설정
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            앱 환경 설정 및 알림을 관리하세요
          </p>
        </div>

        <div className="space-y-4">
          {/* 알림 설정 */}
          <SectionCard icon={Bell} title="알림 설정">
            <ToggleRow
              label="긴급 알림"
              desc="위험도 높은 이슈 발생 시 즉시 알림"
              value={notifs.urgent}
              onChange={(v) => setNotifs({ ...notifs, urgent: v })}
            />
            <ToggleRow
              label="일일 리포트"
              desc="매일 오전 8시 요약 리포트 발송"
              value={notifs.daily}
              onChange={(v) => setNotifs({ ...notifs, daily: v })}
            />
            <ToggleRow
              label="주간 분석 보고서"
              desc="매주 월요일 오전 주간 분석 리포트"
              value={notifs.weekly}
              onChange={(v) => setNotifs({ ...notifs, weekly: v })}
            />
            <ToggleRow
              label="뉴스 실시간 알림"
              desc="새 뉴스 등록 시 푸시 알림"
              value={notifs.news}
              onChange={(v) => setNotifs({ ...notifs, news: v })}
            />
          </SectionCard>

          {/* 관심 지역 */}
          <SectionCard icon={Globe} title="관심 지역 (모니터링 대상)">
            {[
              { code: 'US', label: '🇺🇸 미국', desc: 'Tier 1 핵심 교역국' },
              { code: 'CN', label: '🇨🇳 중국', desc: 'Tier 1 핵심 교역국' },
              { code: 'EU', label: '🇪🇺 유럽연합', desc: 'Tier 1 핵심 교역국' },
              { code: 'KR', label: '🇰🇷 한국', desc: 'Tier 1 핵심 교역국' },
              { code: 'VN', label: '🇻🇳 베트남', desc: 'Tier 2 인접 시장' },
              { code: 'IN', label: '🇮🇳 인도', desc: 'Tier 2 인접 시장' },
            ].map(({ code, label, desc }) => (
              <ToggleRow
                key={code}
                label={label}
                desc={desc}
                value={regions[code] ?? false}
                onChange={() => toggle(regions, setRegions, code)}
              />
            ))}
          </SectionCard>

          {/* 표시 설정 */}
          <SectionCard icon={Palette} title="표시 설정">
            <ToggleRow
              label="다크 모드"
              desc="어두운 화면으로 눈의 피로를 줄입니다"
              value={isDarkMode}
              onChange={toggleDarkMode}
            />
            <SelectRow
              label="언어"
              options={[
                { value: 'ko', label: '한국어' },
                { value: 'en', label: 'English' },
              ]}
              value={language}
              onChange={setLanguage}
            />
            <SelectRow
              label="시간대"
              options={[
                { value: 'Asia/Seoul', label: 'Asia/Seoul (UTC+9)' },
                { value: 'UTC', label: 'UTC' },
                { value: 'America/New_York', label: 'America/New_York' },
              ]}
              value={timezone}
              onChange={setTimezone}
            />
          </SectionCard>

          {/* 데이터 & 개인정보 */}
          <SectionCard icon={Shield} title="데이터 및 개인정보">
            <SelectRow
              label="데이터 보관 기간"
              desc="뉴스 및 분석 이력 보관 기간"
              options={[
                { value: '30',  label: '30일' },
                { value: '90',  label: '90일' },
                { value: '180', label: '180일' },
                { value: '365', label: '1년' },
              ]}
              value={dataRetention}
              onChange={setRetention}
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>
                  개인정보 처리방침
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>
                  최종 업데이트: 2026년 1월 1일
                </p>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
            </div>
          </SectionCard>

          {/* 저장 버튼 */}
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: saved ? '#10b981' : 'var(--gw-primary)' }}
          >
            {saved ? (
              <><Check className="w-4 h-4" /> 저장됨</>
            ) : '설정 저장'}
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
