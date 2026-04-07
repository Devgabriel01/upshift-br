"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Bell,
  MessageSquare,
  ArrowLeft,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/hub/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/hub/notifications", label: "Notificações", icon: Bell },
];

export function HubSidebar({ role }: { role: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#111118]/95 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">U</span>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight">UPSHIFT</span>
            <span className="text-orange-400 font-bold">BR</span>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Client Hub</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-orange-500/10 border border-orange-500/20 rounded-lg"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <item.icon
                className={`w-4 h-4 relative z-10 transition-colors ${
                  isActive
                    ? "text-orange-400"
                    : "text-gray-400 group-hover:text-white"
                }`}
              />
              <span
                className={`relative z-10 transition-colors ${
                  isActive
                    ? "text-orange-400 font-medium"
                    : "text-gray-400 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Admin link */}
        {role === "ADMIN" && (
          <div className="pt-4 mt-4 border-t border-white/5">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest px-3 mb-2">
              Administração
            </p>
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-orange-400 hover:bg-orange-500/5 transition-all group"
            >
              <Shield className="w-4 h-4" />
              <span className="transition-colors">Painel Admin</span>
            </Link>
          </div>
        )}
      </nav>

      {/* Back to site */}
      <div className="p-4 border-t border-white/5">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao site
        </Link>
      </div>
    </aside>
  );
}
