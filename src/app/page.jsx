import { redirect } from 'next/navigation';

/**
 * 루트 페이지 - /dashboard로 리다이렉트
 */
export default function RootPage() {
  redirect('/dashboard');
}
