"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Link from "next/link";

export function AdminHeader({ user }: { user: any }) {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-6">
      <h2 className="font-semibold">Painel Administrativo</h2>

      <div className="flex items-center gap-4">
        <Link
          href="/hub/dashboard"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Ver como Cliente
        </Link>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
          <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </span>
          </div>
          <span className="text-sm text-gray-300">{user?.name}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="p-2 rounded-lg hover:bg-red-500/5 transition-colors text-gray-400 hover:text-red-400"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
