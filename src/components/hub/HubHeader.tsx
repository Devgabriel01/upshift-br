"use client";

import { useSession, signOut } from "next-auth/react";
import { Bell, LogOut } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function HubHeader({ user }: { user: any }) {
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    fetch("/api/hub/notifications?unread=true")
      .then((r) => r.json())
      .then((d) => setNotifCount(d.unread || 0))
      .catch(() => {});
  }, []);

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-6">
      <div />

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Link
          href="/hub/notifications"
          className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
        >
          <Bell className="w-5 h-5" />
          {notifCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 rounded-full text-[10px] font-bold flex items-center justify-center">
              {notifCount}
            </span>
          )}
        </Link>

        {/* User Menu */}
        <div className="relative group">
          <button className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <span className="text-sm text-gray-300 max-w-[120px] truncate">
              {user?.name?.split(" ")[0]}
            </span>
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a24] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <div className="p-3 border-b border-white/5">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
