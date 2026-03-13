'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/Layout/MainLayout';
import useDarkMode from '@/hooks/useDarkMode';
import useAuthStore from '@/store/useAuthStore';
import { User, Mail, Building2, Shield, LogOut, ChevronRight, Check, AlertCircle } from 'lucide-react';

const TIER_CONFIG = {
  tier1: {
    label: 'Tier 1',
    desc: '핵심 시장 모니터링 (미국·중국·EU·한국)',
    color: '#2563eb',
    features: ['10대 핵심 교역국 모니터링', '일일 리포트', '리스크 알림'],
  },
  tier2: {
    label: 'Tier 2',
    desc: '핵심 + 인접 시장 (20개국)',
    color: '#10b981',
    features: ['Tier 1 포함 20개국', '주간 상세 분석', '산업별 심층 리포트', '맞춤 정책 제안'],
  },
  tier3: {
    label: 'Tier 3',
    desc: '글로벌 모니터링 (100개국+)',
    color: '#f59e0b',
    features: ['전 세계 100+ 국가', '실시간 알림', '전담 분석팀 지원', 'API 연동'],
  },
};

function InfoRow({ label, value, icon: Icon }) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b"
      style={{ borderColor: 'var(--gw-border)' }}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
        <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>{label}</span>
      </div>
      <span className="text-sm font-medium" style={{ color: 'var(--gw-text-primary)' }}>{value}</span>
    </div>
  );
}

export default function ProfilePage() {
  useDarkMode();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [editing, setEditing]     = useState(false);
  const [saveDone, setSaveDone]   = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [company, setCompany]     = useState('');

  const email = user?.email ?? 'user@globalwatch.io';
  const initial = email[0].toUpperCase();
  const tierKey = user?.user_metadata?.tier_level ?? 'tier1';
  const tierCfg = TIER_CONFIG[tierKey] ?? TIER_CONFIG.tier1;

  const handleSave = () => {
    setSaveDone(true);
    setEditing(false);
    setTimeout(() => setSaveDone(false), 2000);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <MainLayout>
      <div className="max-w-xl">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
            프로필
          </h1>
          <p className="text-sm" style={{ color: 'var(--gw-text-secondary)' }}>
            계정 정보를 확인하고 수정하세요
          </p>
        </div>

        <div className="space-y-4">
          {/* 프로필 카드 */}
          <div
            className="p-6 rounded-2xl border text-center transition-theme"
            style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4 shadow-lg"
              style={{ backgroundColor: tierCfg.color }}
            >
              {initial}
            </div>
            <p className="text-base font-semibold mb-1" style={{ color: 'var(--gw-text-primary)' }}>
              {displayName || email.split('@')[0]}
            </p>
            <p className="text-sm mb-3" style={{ color: 'var(--gw-text-secondary)' }}>
              {email}
            </p>
            <span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: tierCfg.color + '18', color: tierCfg.color }}
            >
              <Shield className="w-3 h-3" /> {tierCfg.label} · {tierCfg.desc}
            </span>
          </div>

          {/* 기본 정보 */}
          <div
            className="p-5 rounded-2xl border transition-theme"
            style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--gw-text-primary)' }}>
                기본 정보
              </h3>
              <button
                onClick={() => setEditing(!editing)}
                className="text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: 'var(--gw-primary)' }}
              >
                {editing ? '취소' : '수정'}
              </button>
            </div>

            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs mb-1" style={{ color: 'var(--gw-text-secondary)' }}>표시 이름</label>
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={email.split('@')[0]}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{
                      backgroundColor: 'var(--gw-bg)',
                      borderColor: 'var(--gw-border)',
                      color: 'var(--gw-text-primary)',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: 'var(--gw-text-secondary)' }}>회사명</label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="회사명 입력"
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{
                      backgroundColor: 'var(--gw-bg)',
                      borderColor: 'var(--gw-border)',
                      color: 'var(--gw-text-primary)',
                    }}
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="w-full py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--gw-primary)' }}
                >
                  저장
                </button>
              </div>
            ) : (
              <div>
                <InfoRow label="이메일" value={email} icon={Mail} />
                <InfoRow label="표시 이름" value={displayName || email.split('@')[0]} icon={User} />
                <InfoRow label="회사명" value={company || '미설정'} icon={Building2} />
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" style={{ color: 'var(--gw-text-secondary)' }} />
                    <span className="text-xs" style={{ color: 'var(--gw-text-secondary)' }}>구독 플랜</span>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: tierCfg.color }}>
                    {tierCfg.label}
                  </span>
                </div>
              </div>
            )}

            {saveDone && (
              <div className="flex items-center gap-2 mt-3 p-2.5 rounded-lg"
                style={{ backgroundColor: 'rgba(16,185,129,0.08)' }}>
                <Check className="w-4 h-4" style={{ color: '#10b981' }} />
                <span className="text-xs font-medium" style={{ color: '#10b981' }}>저장되었습니다</span>
              </div>
            )}
          </div>

          {/* 플랜 기능 */}
          <div
            className="p-5 rounded-2xl border transition-theme"
            style={{ backgroundColor: 'var(--gw-surface)', borderColor: 'var(--gw-border)' }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--gw-text-primary)' }}>
              현재 플랜 기능
            </h3>
            <ul className="space-y-2">
              {tierCfg.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" style={{ color: tierCfg.color }} />
                  <span className="text-sm" style={{ color: 'var(--gw-text-primary)' }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 로그아웃 */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all hover:shadow-md"
            style={{
              backgroundColor: 'var(--gw-surface)',
              borderColor: 'rgba(220,38,38,0.3)',
              color: '#dc2626',
            }}
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
