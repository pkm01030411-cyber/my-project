import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900 border-b border-gray-800 flex items-center px-6">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            GlobalWatch
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1 ml-8">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/dashboard"
            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/alerts"
            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            Alerts
          </Link>
          <Link
            href="/map"
            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            Map View
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live
        </div>
        <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-600 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-medium text-white">
          GW
        </div>
      </div>
    </header>
  );
}
