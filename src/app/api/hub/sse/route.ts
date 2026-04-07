import { NextResponse } from "next/server";

const clients = new Map<string, ReadableStream>();

// Simple SSE endpoint for real-time notifications
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      controller.enqueue(`data: {"type":"connected"}\n\n`);

      // Keep connection alive with heartbeat every 30s
      const heartbeat = setInterval(() => {
        controller.enqueue(`: heartbeat\n\n`);
      }, 30000);

      return () => {
        clearInterval(heartbeat);
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

// Helper function to broadcast events (call this from other API routes)
export function broadcastEvent(event: string, data: object) {
  // For a production system, you'd use Redis Pub/Sub or similar
  // For now, this is a placeholder for future expansion
  console.log(`[SSE] ${event}:`, data);
}
