'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Globe, RotateCcw, Home } from 'lucide-react';
import useDarkMode from '@/hooks/useDarkMode';

export default function Error({ error, reset }) {
  useDarkMode();
  useEffect(() => {
    console.error('[GlobalWatch] 오류 발생:', error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 transition-theme"
      style={{ backgroundColor: 'var(--gw-bg)' }}
    >
      <div className="text-center max-w-sm">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          style={{ backgroundColor: '#dc2626' }}
        >
          <Globe className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-6xl font-black mb-2" style={{ color: '#dc2626' }}>500</h1>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--gw-text-primary)' }}>
          서버 오류가 발생했습니다
        </h2>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--gw-text-secondary)' }}>
          일시적인 오류입니다. 잠시 후 다시 시도하거나 대시보드로 돌아가세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#dc2626' }}
          >
            <RotateCcw className="w-4 h-4" /> 다시 시도
          </button>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'var(--gw-surface)',
              borderColor: 'var(--gw-border)',
              color: 'var(--gw-text-primary)',
            }}
          >
            <Home className="w-4 h-4" /> 대시보드로
          </Link>
        </div>
      </div>
    </div>
  );
}
