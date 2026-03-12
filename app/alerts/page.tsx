import Navbar from "@/components/Navbar";
import AlertItem from "@/components/AlertItem";
import { mockAlerts } from "@/lib/mock-data";
import type { AlertSeverity } from "@/components/AlertItem";

export const metadata = {
  title: "Alerts — GlobalWatch",
};

const severities: { value: AlertSeverity | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function AlertsPage() {
  const grouped = {
    critical: mockAlerts.filter((a) => a.severity === "critical"),
    high: mockAlerts.filter((a) => a.severity === "high"),
    medium: mockAlerts.filter((a) => a.severity === "medium"),
    low: mockAlerts.filter((a) => a.severity === "low"),
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="pt-16 max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Alert Center</h1>
            <p className="text-sm text-gray-400 mt-1">
              {mockAlerts.length} total alerts &mdash;{" "}
              {mockAlerts.filter((a) => a.status === "active").length} active
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Auto-refreshing
            </div>
          </div>
        </div>

        {/* Severity filter pills (static, for visual) */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {severities.map((s) => (
            <button
              key={s.value}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                s.value === "all"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500"
              }`}
            >
              {s.label}
              {s.value !== "all" && (
                <span className="ml-1.5 text-gray-500">
                  ({grouped[s.value as AlertSeverity]?.length ?? 0})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Critical */}
        {grouped.critical.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Critical ({grouped.critical.length})
            </h2>
            <div className="space-y-3">
              {grouped.critical.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </section>
        )}

        {/* High */}
        {grouped.high.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              High ({grouped.high.length})
            </h2>
            <div className="space-y-3">
              {grouped.high.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </section>
        )}

        {/* Medium */}
        {grouped.medium.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              Medium ({grouped.medium.length})
            </h2>
            <div className="space-y-3">
              {grouped.medium.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </section>
        )}

        {/* Low */}
        {grouped.low.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Low ({grouped.low.length})
            </h2>
            <div className="space-y-3">
              {grouped.low.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
