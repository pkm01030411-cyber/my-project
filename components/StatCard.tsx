interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  color?: "blue" | "red" | "yellow" | "green" | "purple";
}

const colorMap = {
  blue: "bg-blue-500/10 text-blue-400",
  red: "bg-red-500/10 text-red-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
  green: "bg-green-500/10 text-green-400",
  purple: "bg-purple-500/10 text-purple-400",
};

export default function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  color = "blue",
}: StatCardProps) {
  const changeColor =
    changeType === "positive"
      ? "text-green-400"
      : changeType === "negative"
        ? "text-red-400"
        : "text-gray-400";

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-medium ${changeColor}`}>{change}</span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
}
