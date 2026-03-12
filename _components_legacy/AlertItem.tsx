export type AlertSeverity = "critical" | "high" | "medium" | "low";

export interface Alert {
  id: string;
  title: string;
  location: string;
  severity: AlertSeverity;
  timestamp: string;
  category: string;
  status: "active" | "monitoring" | "resolved";
}

const severityConfig: Record<
  AlertSeverity,
  { label: string; dot: string; badge: string }
> = {
  critical: {
    label: "Critical",
    dot: "bg-red-500",
    badge: "bg-red-500/10 text-red-400 border border-red-500/20",
  },
  high: {
    label: "High",
    dot: "bg-orange-500",
    badge: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  },
  medium: {
    label: "Medium",
    dot: "bg-yellow-500",
    badge: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  },
  low: {
    label: "Low",
    dot: "bg-blue-500",
    badge: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
};

const statusConfig: Record<string, string> = {
  active: "text-red-400",
  monitoring: "text-yellow-400",
  resolved: "text-green-400",
};

interface AlertItemProps {
  alert: Alert;
}

export default function AlertItem({ alert }: AlertItemProps) {
  const sev = severityConfig[alert.severity];

  return (
    <div className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${sev.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-white truncate">{alert.title}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${sev.badge}`}>
            {sev.label}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {alert.location}
          </span>
          <span className="text-xs text-gray-500">{alert.category}</span>
          <span className={`text-xs font-medium ${statusConfig[alert.status]} ml-auto`}>
            {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
      </div>
    </div>
  );
}
