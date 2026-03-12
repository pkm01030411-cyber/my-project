import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import AlertItem from "@/components/AlertItem";
import { mockAlerts, mockRegions } from "@/lib/mock-data";

export const metadata = {
  title: "Dashboard — GlobalWatch",
};

export default function DashboardPage() {
  const categories = [
    { name: "Geological", count: 3, color: "bg-orange-500" },
    { name: "Meteorological", count: 2, color: "bg-blue-500" },
    { name: "Environmental", count: 3, color: "bg-green-500" },
    { name: "Humanitarian", count: 0, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="pt-16 max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Monitoring Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Aggregated view of all tracked global events
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Events"
            value={mockAlerts.length}
            change="All time"
            changeType="neutral"
            color="blue"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <StatCard
            title="Monitoring"
            value={mockAlerts.filter((a) => a.status === "monitoring").length}
            changeType="neutral"
            color="yellow"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
          />
          <StatCard
            title="Resolved"
            value={mockAlerts.filter((a) => a.status === "resolved").length}
            changeType="positive"
            color="green"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
          />
          <StatCard
            title="Avg Response Time"
            value="4.2m"
            change="-0.8m"
            changeType="positive"
            color="purple"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* All Alerts */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-base font-semibold text-white">All Events</h2>
            {mockAlerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Breakdown */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">By Category</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cat.color}`} />
                    <span className="text-sm text-gray-300 flex-1">{cat.name}</span>
                    <span className="text-sm font-semibold text-white">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Region breakdown */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">By Region</h3>
              <div className="space-y-3">
                {mockRegions.map((region) => (
                  <div key={region.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">{region.name}</span>
                      <span className="text-white font-medium">{region.incidents}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${(region.incidents / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
