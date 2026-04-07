"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  MessageSquare,
  CheckCircle,
  Wrench,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  project: { id: string; name: string } | null;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const res = await fetch("/api/hub/notifications");
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id: string) {
    await fetch("/api/hub/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId: id }),
    });
    fetchNotifications();
  }

  async function markAllAsRead() {
    await fetch("/api/hub/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAllRead: true }),
    });
    fetchNotifications();
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filtered = filter === "unread" ? notifications.filter((n) => !n.isRead) : notifications;

  const iconMap: Record<string, any> = {
    STATUS_CHANGE: AlertTriangle,
    NEW_MESSAGE: MessageSquare,
    MAINTENANCE: Wrench,
    PROJECT_COMPLETED: CheckCircle,
    STAGE_COMPLETED: Calendar,
    GENERAL: Bell,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Bell className="w-6 h-6 text-orange-400" />
            Notificações
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {unreadCount} não lida{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            filter === "all"
              ? "bg-orange-500/10 text-orange-400 border border-orange-500/30"
              : "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10"
          }`}
        >
          Todas ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            filter === "unread"
              ? "bg-orange-500/10 text-orange-400 border border-orange-500/30"
              : "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10"
          }`}
        >
          Não Lidas ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhuma notificação.</p>
          </div>
        ) : (
          filtered.map((notification) => {
            const Icon = iconMap[notification.type] || Bell;
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  notification.isRead
                    ? "bg-[#111118] border-white/5"
                    : "bg-[#111118]/80 border-orange-500/20 hover:border-orange-500/40"
                }`}
                onClick={() => !notification.isRead && markAsRead(notification.id)}
              >
                <div className={`p-2 rounded-lg ${
                  notification.isRead ? "bg-white/5 text-gray-500" : "bg-orange-500/10 text-orange-400"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">{notification.title}</h3>
                    {!notification.isRead && (
                      <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-0.5">{notification.message}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-gray-500">{formatDateTime(notification.createdAt)}</span>
                    {notification.project && (
                      <a
                        href={`/hub/projects/${notification.project.id}`}
                        className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        {notification.project.name}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}

// formatDateTime is now imported from @/lib/utils
