import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

// GET - List conversation summaries
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.has("list")) {
    // Get conversation summaries
    try {
      const messages = await prisma.message.findMany({
        include: {
          sender: { select: { id: true, name: true, email: true, role: true } },
          receiver: { select: { id: true, name: true, email: true } },
          project: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 200,
      });

      // Group by project
      const convMap = new Map();
      for (const msg of messages) {
        const key = msg.projectId;
        if (!convMap.has(key)) {
          const client = msg.sender.role === "CLIENT" ? msg.sender : msg.receiver;
          convMap.set(key, {
            id: key,
            name: client?.name || "Cliente",
            email: client?.email || "",
            projectId: msg.projectId,
            projectName: msg.project?.name || "",
            lastMessage: msg.content,
            lastMessageAt: msg.createdAt,
            unread: 0,
          });
        }
        if (!msg.isRead && msg.sender.role === "CLIENT") {
          convMap.get(key).unread++;
        }
      }

      const conversations = [...convMap.values()].sort(
        (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
      );

      return NextResponse.json({ conversations });
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return NextResponse.json({ conversations: [] });
    }
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
