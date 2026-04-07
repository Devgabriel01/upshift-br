"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useSession } from "next-auth/react";

interface SSEContextType {
  unreadNotifications: number;
  refresh: () => void;
}

const SSEContext = createContext<SSEContextType>({
  unreadNotifications: 0,
  refresh: () => {},
});

export function SSEProvider({ children }: { children: ReactNode }) {
  const eventSource = useRef<EventSource | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { status } = useSession();

  const refresh = () => {
    fetch("/api/hub/notifications?unread=true")
      .then((r) => r.json())
      .then((d) => setUnreadNotifications(d.unread || 0))
      .catch(() => {});
  };

  useEffect(() => {
    if (status !== "authenticated") return;

    refresh();
    eventSource.current = new EventSource("/api/hub/sse");

    eventSource.current.addEventListener("notification", () => refresh());

    const pollInterval = setInterval(refresh, 30000);

    return () => {
      eventSource.current?.close();
      clearInterval(pollInterval);
    };
  }, [status]);

  return (
    <SSEContext.Provider value={{ unreadNotifications, refresh }}>
      {children}
    </SSEContext.Provider>
  );
}

export function useSSE() {
  return useContext(SSEContext);
}
