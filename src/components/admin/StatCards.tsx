import { type LucideIcon, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: "orange" | "blue" | "green" | "red" | "purple" | "yellow" | "indigo" | "emerald";
  href?: string;
  change?: { value: number; label: string };
}

const colorMap = {
  orange: { bg: "from-orange-500/20 to-orange-600/5", border: "border-orange-500/30", icon: "text-orange-400", change: "text-orange-400" },
  blue: { bg: "from-blue-500/20 to-blue-600/5", border: "border-blue-500/30", icon: "text-blue-400", change: "text-blue-400" },
  green: { bg: "from-green-500/20 to-green-600/5", border: "border-green-500/30", icon: "text-green-400", change: "text-green-400" },
  red: { bg: "from-red-500/20 to-red-600/5", border: "border-red-500/30", icon: "text-red-400", change: "text-red-400" },
  purple: { bg: "from-purple-500/20 to-purple-600/5", border: "border-purple-500/30", icon: "text-purple-400", change: "text-purple-400" },
  yellow: { bg: "from-yellow-500/20 to-yellow-600/5", border: "border-yellow-500/30", icon: "text-yellow-400", change: "text-yellow-400" },
  indigo: { bg: "from-indigo-500/20 to-indigo-600/5", border: "border-indigo-500/30", icon: "text-indigo-400", change: "text-indigo-400" },
  emerald: { bg: "from-emerald-500/20 to-emerald-600/5", border: "border-emerald-500/30", icon: "text-emerald-400", change: "text-emerald-400" },
};

export function StatCard({ label, value, icon: Icon, color, href, change }: StatCardProps) {
  const c = colorMap[color];
  const content = (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-1">
              <span className={`text-xs ${c.change}`}>{change.value > 0 ? "+" : ""}{change.value}%</span>
              <span className="text-xs text-gray-500">{change.label}</span>
              <ArrowUpRight className="w-3 h-3 text-gray-500" />
            </div>
          )}
        </div>
        <Icon className={`w-8 h-8 ${c.icon}`} />
      </div>
    </>
  );

  const className = `relative overflow-hidden rounded-xl bg-gradient-to-br ${c.bg} border ${c.border} p-6 ${href ? "hover:scale-[1.02] transition-transform cursor-pointer" : ""}`;

  if (href) {
    return <Link href={href} className={className}>{content}</Link>;
  }

  return <div className={className}>{content}</div>;
}
