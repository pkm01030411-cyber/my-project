import Link from "next/link";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import AlertItem from "@/components/AlertItem";
import { mockAlerts, mockRegions } from "@/lib/mock-data";

export default function Home() {
  const activeAlerts = mockAlerts.filter((a) => a.status === "active");
  const criticalAlerts = mockAlerts.filter((a) => a.severity === "critical");

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <main className="pt-16">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-900/40 via-gray-900 to-gray-900 border-b border-gray-800 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Live Monitoring Active
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Global Incident Overview
            </h1>
            <p className="text-gray-400 text-sm max-w-xl">
              Real-time monitoring of geological, meteorological, environmental,
              and humanitarian events across the globe.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Active Incidents"
              value={activeAlerts.length}
              change="+2 today"
              changeType="negative"
              color="red"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
            />
            <StatCard
              title="Critical Alerts"
              value={criticalAlerts.length}
              change="+1 today"
              changeType="negative"
              color="red"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
            />
            <StatCard
              title="Regions Monitored"
              value={mockRegions.length}
              changeType="neutral"
              color="blue"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              }
            />
            <StatCard
              title="Events Resolved (24h)"
              value={3}
              change="+3 today"
              changeType="positive"
              color="green"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Alerts */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">
                  Recent Alerts
                </h2>
                <Link
                  href="/alerts"
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View all →
                </Link>
              </div>
              <div className="space-y-3">
                {mockAlerts.slice(0, 5).map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            {/* Regions Panel */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">
                  Incidents by Region
                </h2>
              </div>
              <div className="space-y-2">
                {mockRegions.map((region) => (
                  <div
                    key={region.name}
                    className="flex items-center justify-between p-3 bg-gray-900 border border-gray-800 rounded-xl"
                  >
                    <span className="text-sm text-gray-300">{region.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {region.incidents}
                      </span>
                      <span
                        className={`text-xs ${
                          region.trend === "up"
                            ? "text-red-400"
                            : region.trend === "down"
                              ? "text-green-400"
                              : "text-gray-400"
                        }`}
                      >
                        {region.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/20 rounded-xl">
                <h3 className="text-sm font-semibold text-blue-300 mb-2">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                  >
                    → Full Dashboard
                  </Link>
                  <Link
                    href="/alerts"
                    className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                  >
                    → Alert Center
                  </Link>
                  <Link
                    href="/map"
                    className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                  >
                    → Interactive Map
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
