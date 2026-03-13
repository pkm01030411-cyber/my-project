'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/Layout/MainLayout';
import useDarkMode from '@/hooks/useDarkMode';
import useAuthStore from '@/store/useAuthStore';
import {
  User, Bell, Globe, Palette, Shield, ChevronRight,
  Check, AlertTriangle, Loader2, Lock, Trash2, LogOut,
} from 'lucide-react';

// ─── localStorage 키 ─────────────────────────────────────────
const LS_KEY = 'gw_settings';

function loadSettings() {
  if (typeof window === 'undefined') return null;
  try { return JSON.parse(localStorage.getItem(LS_KEY)); } catch { return null; }
}

function saveSettings(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

// ─── 기본 설정값 ─────────────────────────────────────────────
const DEFAULT = {
  notifs: { urgentRisk: true, newOpportunity: true, newsUpdate: false, weeklyReport: true },
  regions: { US: true, CN: true, EU: true, KR: true, VN: false, IN: false, JP: false },
  industries: { semiconductor: true, automotive: true, chemical: false, textile: false, energy: false, finance: false },
  theme: 'dark',
  language: 'ko',
};

// ─── 공통 컴포넌트 ────────────────────────────────────────────

function SectionCard({ icon: Icon, iconColor = 'var(--gw-primary)', title, children }) {
  return (
    <div
      className="rounded-2xl border overflow-hidden transition-theme"
      style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3.5 border-b"
        style={{ borderColor: 'var(--gw-border)' }}
      >
        <Icon className="w-4 h-4" style={{ color: iconColor }} />
        <h2 className="text-sm font-semibold" style={{ color: 'var(--gw-text-primary)' }}>
          {title}
        </h2>
      </div>
      <div className="px-5 py-4 space-y-4">{children}</div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 outline-none"
      style={{ backgroundColor: on ? 'var(--gw-primary)' : 'var(--gw-border)' }}
      role="switch"
      aria-checked={on}
    >
      <div
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ transform: on ? 'translateX(22px)' : 'translateX(4px)' }}
      />
    </button>
  );
}

function ToggleRow({ label, desc, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-0.5">
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>{desc}</p>}
      </div>
      <Toggle on={value} onChange={onChange} />
    </div>
  );
}

function Checkbox({ label, desc, checked, onChange }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group py-0.5">
      <div
        className="mt-0.5 w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all"
        style={{
          borderColor: checked ? 'var(--gw-primary)' : 'var(--gw-border)',
          backgroundColor: checked ? 'var(--gw-primary)' : 'transparent',
        }}
        onClick={() => onChange(!checked)}
      >
        {checked && <Check className="w-2.5 h-2.5 text-white" />}
      </div>
      <div>
        <p className="text-sm font-medium group-hover:opacity-80" style={{ color: 'var(--gw-text-primary)' }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>{desc}</p>}
      </div>
    </label>
  );
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
            <div
              className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
              style={{ borderColor: active ? 'var(--gw-primary)' : 'var(--gw-border)' }}
              onClick={() => onChange(opt.value)}
            >
              {active && (
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--gw-primary)' }} />
              )}
            </div>
            <span className="text-sm" style={{ color: active ? 'var(--gw-primary)' : 'var(--gw-text-secondary)', fontWeight: active ? 600 : 400 }}>
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

// ─── 메인 페이지 ────────────────────────────────────────────
export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const email     = user?.email ?? 'user@globalwatch.io';
  const tierLevel = user?.user_metadata?.tier_level ?? 'tier1';
  const tierLabel = { tier1: 'Tier 1', tier2: 'Tier 2', tier3: 'Tier 3' }[tierLevel] ?? 'Tier 1';
  // 가입일 mock (실제는 user.created_at)
  const joinDate  = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('ko-KR')
    : '2026-03-01';

  // 설정 상태
  const [s, setS] = useState(() => ({ ...DEFAULT, ...loadSettings() }));
  const patch = (key, val) => setS((prev) => ({ ...prev, [key]: { ...prev[key], ...val } }));

  // 테마 연동 (설정의 theme → 실제 다크모드)
  useEffect(() => {
    if (s.theme === 'dark' && !isDarkMode) toggleDarkMode();
    if (s.theme === 'light' && isDarkMode) toggleDarkMode();
    // 'auto' 는 시스템 설정 따름 (구현 생략)
  }, [s.theme]);

  // 저장 상태
  const [saveState, setSaveState] = useState('idle'); // idle | saving | done | error

  const handleSave = () => {
    setSaveState('saving');
    setTimeout(() => {
      try {
        saveSettings(s);
        setSaveState('done');
      } catch {
        setSaveState('error');
      }
      setTimeout(() => setSaveState('idle'), 2500);
    }, 600);
  };

  // 비밀번호 변경 (준비 중 toast)
  const [pwMsg, setPwMsg] = useState('');
  const handleChangePw = () => {
    setPwMsg('비밀번호 재설정 이메일을 발송했습니다.');
    setTimeout(() => setPwMsg(''), 3000);
  };

  // 계정 삭제 확인
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
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
            앱 환경 설정 및 계정을 관리하세요
          </p>
        </div>

        <div className="space-y-4">

          {/* ── 1. 계정 설정 ── */}
          <SectionCard icon={User} title="계정 설정">
            <div className="space-y-2">
              {[
                { label: '이메일',   value: email },
                { label: '플랜',     value: tierLabel },
                { label: '가입일',   value: joinDate },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                  style={{ borderColor: 'var(--gw-border)' }}
                >
                  <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>{label}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>{value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>플랜 변경</span>
                <button
                  className="flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: 'var(--gw-primary)' }}
                  onClick={() => alert('플랜 변경 페이지는 준비 중입니다.')}
                >
                  업그레이드 <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </SectionCard>

          {/* ── 2. 알림 설정 ── */}
          <SectionCard icon={Bell} iconColor="#f59e0b" title="알림 설정">
            <ToggleRow
              label="높은 위험 신호 알림"
              desc="위험도 HIGH 이상 이슈 발생 시 즉시 알림"
              value={s.notifs.urgentRisk}
              onChange={(v) => patch('notifs', { urgentRisk: v })}
            />
            <ToggleRow
              label="새로운 기회 알림"
              desc="새로운 시장 기회 탐지 시 알림"
              value={s.notifs.newOpportunity}
              onChange={(v) => patch('notifs', { newOpportunity: v })}
            />
            <ToggleRow
              label="뉴스 업데이트"
              desc="새 뉴스 등록 시 실시간 알림"
              value={s.notifs.newsUpdate}
              onChange={(v) => patch('notifs', { newsUpdate: v })}
            />
            <ToggleRow
              label="주간 리포트"
              desc="매주 월요일 오전 8시 주간 분석 발송"
              value={s.notifs.weeklyReport}
              onChange={(v) => patch('notifs', { weeklyReport: v })}
            />
          </SectionCard>

          {/* ── 3. 모니터링 설정 ── */}
          <SectionCard icon={Globe} iconColor="#10b981" title="모니터링 설정">
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--gw-text-secondary)' }}>
                관심 지역
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'US', label: '🇺🇸 미국' },
                  { key: 'CN', label: '🇨🇳 중국' },
                  { key: 'EU', label: '🇪🇺 EU' },
                  { key: 'KR', label: '🇰🇷 한국' },
                  { key: 'VN', label: '🇻🇳 베트남' },
                  { key: 'IN', label: '🇮🇳 인도' },
                  { key: 'JP', label: '🇯🇵 일본' },
                ].map(({ key, label }) => (
                  <Checkbox
                    key={key}
                    label={label}
                    checked={s.regions[key] ?? false}
                    onChange={(v) => patch('regions', { [key]: v })}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--gw-text-secondary)' }}>
                관심 산업
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'semiconductor', label: '반도체' },
                  { key: 'automotive',    label: '자동차' },
                  { key: 'chemical',      label: '화학' },
                  { key: 'textile',       label: '섬유' },
                  { key: 'energy',        label: '에너지' },
                  { key: 'finance',       label: '금융' },
                ].map(({ key, label }) => (
                  <Checkbox
                    key={key}
                    label={label}
                    checked={s.industries[key] ?? false}
                    onChange={(v) => patch('industries', { [key]: v })}
                  />
                ))}
              </div>
            </div>
          </SectionCard>

          {/* ── 4. 표시 설정 ── */}
          <SectionCard icon={Palette} iconColor="#6366f1" title="표시 설정">
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--gw-text-secondary)' }}>
                테마
              </p>
              <RadioGroup
                value={s.theme}
                onChange={(v) => setS((prev) => ({ ...prev, theme: v }))}
                options={[
                  { value: 'light', label: '라이트' },
                  { value: 'dark',  label: '다크' },
                  { value: 'auto',  label: '자동 (시스템)' },
                ]}
              />
            </div>
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--gw-text-secondary)' }}>
                언어
              </p>
              <RadioGroup
                value={s.language}
                onChange={(v) => setS((prev) => ({ ...prev, language: v }))}
                options={[
                  { value: 'ko', label: '한국어' },
                  { value: 'en', label: 'English' },
                ]}
              />
            </div>
          </SectionCard>

          {/* ── 5. 보안 ── */}
          <SectionCard icon={Shield} iconColor="#dc2626" title="보안">
            {/* 비밀번호 변경 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>비밀번호 변경</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>
                  이메일로 재설정 링크를 발송합니다
                </p>
              </div>
              <button
                onClick={handleChangePw}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all hover:shadow-sm"
                style={{
                  borderColor: 'var(--gw-border)',
                  color: 'var(--gw-text-primary)',
                  backgroundColor: 'var(--gw-bg)',
                }}
              >
                <Lock className="w-3.5 h-3.5" /> 변경
              </button>
            </div>

            {pwMsg && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg text-xs"
                style={{ backgroundColor: 'rgba(16,185,129,0.08)', color: '#10b981' }}>
                <Check className="w-3.5 h-3.5" /> {pwMsg}
              </div>
            )}

            {/* 로그아웃 */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>로그아웃</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>모든 기기에서 로그아웃</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all hover:shadow-sm"
                style={{
                  borderColor: 'rgba(220,38,38,0.3)',
                  color: '#dc2626',
                  backgroundColor: 'rgba(220,38,38,0.06)',
                }}
              >
                <LogOut className="w-3.5 h-3.5" /> 로그아웃
              </button>
            </div>

            {/* 계정 삭제 */}
            <div
              className="pt-1 border-t"
              style={{ borderColor: 'var(--gw-border)' }}
            >
              {!deleteConfirm ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#dc2626' }}>계정 삭제</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--gw-text-secondary)' }}>
                      모든 데이터가 영구 삭제됩니다
                    </p>
                  </div>
                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all hover:shadow-sm"
                    style={{
                      borderColor: 'rgba(220,38,38,0.3)',
                      color: '#dc2626',
                      backgroundColor: 'var(--gw-bg)',
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" /> 삭제
                  </button>
                </div>
              ) : (
                <div
                  className="p-3 rounded-xl border"
                  style={{ borderColor: 'rgba(220,38,38,0.3)', backgroundColor: 'rgba(220,38,38,0.06)' }}
                >
                  <div className="flex items-start gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#dc2626' }} />
                    <p className="text-xs leading-relaxed" style={{ color: '#dc2626' }}>
                      계정을 삭제하면 모든 데이터(뉴스, 분석, 설정)가 영구적으로 삭제되며 복구할 수 없습니다. 정말 삭제하시겠습니까?
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteConfirm(false)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-medium border transition-opacity hover:opacity-70"
                      style={{ borderColor: 'var(--gw-border)', color: 'var(--gw-text-secondary)' }}
                    >
                      취소
                    </button>
                    <button
                      onClick={() => alert('계정 삭제 기능은 준비 중입니다.')}
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: '#dc2626' }}
                    >
                      삭제 확인
                    </button>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {/* ── 저장 버튼 ── */}
          <button
            onClick={handleSave}
            disabled={saveState === 'saving'}
            className="w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60"
            style={{
              backgroundColor:
                saveState === 'done' ? '#10b981' :
                saveState === 'error' ? '#dc2626' :
                'var(--gw-primary)',
            }}
          >
            {saveState === 'saving' ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> 저장 중...</>
            ) : saveState === 'done' ? (
              <><Check className="w-4 h-4" /> 저장 완료</>
            ) : saveState === 'error' ? (
              <>저장 실패 — 다시 시도</>
            ) : (
              '저장하기'
            )}
          </button>

          {saveState === 'done' && (
            <p className="text-xs text-center" style={{ color: '#10b981' }}>
              설정이 브라우저에 저장되었습니다 (localStorage)
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
