import Navbar from "@/components/Navbar";
import { mockAlerts } from "@/lib/mock-data";

export const metadata = {
  title: "Map View — GlobalWatch",
};

// Approximate coordinates for display purposes
const alertCoordinates: Record<string, { x: number; y: number }> = {
  "1": { x: 78, y: 28 },  // Japan
  "2": { x: 24, y: 35 },  // Gulf of Mexico
  "3": { x: 16, y: 33 },  // California
  "4": { x: 67, y: 37 },  // New Delhi
  "5": { x: 50, y: 22 },  // Germany
  "6": { x: 47, y: 14 },  // Iceland
  "7": { x: 57, y: 27 },  // Istanbul
  "8": { x: 52, y: 55 },  // Sub-Saharan Africa
};

const severityDot: Record<string, string> = {
  critical: "bg-red-500 shadow-red-500/50",
  high: "bg-orange-500 shadow-orange-500/50",
  medium: "bg-yellow-500 shadow-yellow-500/50",
  low: "bg-blue-500 shadow-blue-500/50",
};

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Interactive Map</h1>
              <p className="text-sm text-gray-400 mt-1">
                Geographic distribution of active incidents
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              {["critical", "high", "medium", "low"].map((sev) => (
                <div key={sev} className="flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      sev === "critical"
                        ? "bg-red-500"
                        : sev === "high"
                          ? "bg-orange-500"
                          : sev === "medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                    }`}
                  />
                  <span className="text-gray-400 capitalize">{sev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Container */}
          <div className="relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            {/* Stylized world map background using SVG grid lines */}
            <div className="relative w-full" style={{ paddingBottom: "50%" }}>
              <div className="absolute inset-0 bg-gray-900">
                {/* Grid lines */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-10"
                  viewBox="0 0 100 50"
                  preserveAspectRatio="none"
                >
                  {/* Latitude lines */}
                  {[10, 20, 30, 40].map((y) => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#4b5563" strokeWidth="0.2" />
                  ))}
                  {/* Longitude lines */}
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="50" stroke="#4b5563" strokeWidth="0.2" />
                  ))}
                  {/* Equator */}
                  <line x1="0" y1="25" x2="100" y2="25" stroke="#374151" strokeWidth="0.4" />
                </svg>

                {/* Continent outlines (simplified decorative shapes) */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 100 50"
                  preserveAspectRatio="none"
                >
                  {/* North America */}
                  <path d="M 8 12 L 28 12 L 30 25 L 22 32 L 15 30 L 10 22 Z" fill="#374151" />
                  {/* South America */}
                  <path d="M 22 33 L 30 33 L 32 48 L 24 48 Z" fill="#374151" />
                  {/* Europe */}
                  <path d="M 44 10 L 58 10 L 58 22 L 50 24 L 44 20 Z" fill="#374151" />
                  {/* Africa */}
                  <path d="M 47 25 L 58 25 L 57 46 L 49 46 Z" fill="#374151" />
                  {/* Asia */}
                  <path d="M 58 8 L 90 8 L 88 28 L 72 30 L 58 28 Z" fill="#374151" />
                  {/* Australia */}
                  <path d="M 78 35 L 90 35 L 90 45 L 78 45 Z" fill="#374151" />
                </svg>

                {/* Alert dots */}
                {mockAlerts.map((alert) => {
                  const coords = alertCoordinates[alert.id];
                  if (!coords) return null;
                  return (
                    <div
                      key={alert.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                    >
                      <div
                        className={`w-3 h-3 rounded-full shadow-lg ${severityDot[alert.severity]} ${
                          alert.status === "active" ? "animate-pulse" : ""
                        }`}
                      />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-800 border border-gray-700 rounded-lg p-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <p className="font-semibold truncate">{alert.title}</p>
                        <p className="text-gray-400 mt-0.5">{alert.location}</p>
                        <p className="text-gray-500 mt-0.5 capitalize">
                          {alert.severity} · {alert.status}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Alert list below map */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {mockAlerts
              .filter((a) => a.status === "active")
              .map((alert) => (
                <div
                  key={alert.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-3 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        alert.severity === "critical"
                          ? "bg-red-500"
                          : alert.severity === "high"
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    <span className="text-xs font-medium text-white truncate">
                      {alert.location}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{alert.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{alert.timestamp}</p>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
