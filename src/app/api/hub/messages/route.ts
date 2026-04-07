import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

// GET - Messages for a project
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const userId = (session.user as any).id;

  if (!projectId) {
    return NextResponse.json({ error: "projectId required" }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { projectId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: { select: { id: true, name: true, role: true } },
        receiver: { select: { id: true, name: true } },
        file: { select: { id: true, fileName: true, originalName: true, mimeType: true, size: true, path: true } },
      },
    });

    const messagesWithMine = messages.map((msg) => ({
      ...msg,
      isMine: msg.senderId === userId,
    }));

    return NextResponse.json(messagesWithMine);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Erro ao carregar mensagens." }, { status: 500 });
  }
}

// POST - Send a message
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { projectId, content, receiverId } = body;
  const senderId = (session.user as any).id;
  const userRole = (session.user as any).role;

  if (!content || !projectId) {
    return NextResponse.json({ error: "Conteúdo e projeto são obrigatórios." }, { status: 400 });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { client: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Projeto não encontrado." }, { status: 404 });
    }

    // Determine receiver: if client sends, go to first team member or admin; if admin sends, go to client
    const targetReceiverId = receiverId || (userRole === "ADMIN" ? project.clientId : senderId);

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        receiverId: targetReceiverId,
        projectId,
      },
      include: {
        sender: { select: { id: true, name: true, role: true } },
      },
    });

    // Create notification for receiver
    await prisma.notification.create({
      data: {
        title: "Nova Mensagem",
        message: `${session.user?.name} enviou uma mensagem sobre ${project.name}`,
        type: "NEW_MESSAGE",
        user: { connect: { id: targetReceiverId } },
        project: { connect: { id: projectId } },
      },
    });

    return NextResponse.json({ ...message, isMine: true }, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Erro ao enviar mensagem." }, { status: 500 });
  }
}
