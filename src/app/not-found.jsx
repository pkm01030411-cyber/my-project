'use client';

import Link from 'next/link';
import { Globe, Home, ArrowLeft } from 'lucide-react';
import useDarkMode from '@/hooks/useDarkMode';

export default function NotFound() {
  useDarkMode();
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 transition-theme"
      style={{ backgroundColor: 'var(--gw-bg)' }}
    >
      <div className="text-center max-w-sm">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          style={{ backgroundColor: 'var(--gw-primary)' }}
        >
          <Globe className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-6xl font-black mb-2" style={{ color: 'var(--gw-primary)' }}>404</h1>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--gw-text-primary)' }}>
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--gw-text-secondary)' }}>
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--gw-primary)' }}
          >
            <Home className="w-4 h-4" /> 대시보드로
          </Link>
          <button
            onClick={() => history.back()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'var(--gw-surface)',
              borderColor: 'var(--gw-border)',
              color: 'var(--gw-text-primary)',
            }}
          >
            <ArrowLeft className="w-4 h-4" /> 이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
}
