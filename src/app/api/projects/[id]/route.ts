import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

// GET - Single project detail
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const userRole = (session.user as any).role;
  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where:
        userRole === "ADMIN"
          ? { id }
          : { id, clientId: userId },
      include: {
        client: { select: { id: true, name: true, email: true } },
        teamMembers: { select: { id: true, name: true, avatar: true } },
        stages: { orderBy: { order: "asc" } },
        updates: {
          orderBy: { createdAt: "desc" },
          include: { author: { select: { name: true } } },
        },
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            sender: { select: { id: true, name: true, role: true } },
            file: { select: { id: true, fileName: true, originalName: true, mimeType: true, size: true, path: true } },
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Projeto não encontrado." }, { status: 404 });
    }

    // Add isMine flag to messages
    const messages = project.messages.map((msg: Record<string, unknown>) => ({
      ...msg,
      isMine: msg.senderId === userId,
    }));

    return NextResponse.json({
      ...project,
      messages,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Erro ao carregar projeto." }, { status: 500 });
  }
}

// PATCH - Update project (admin only)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if ((session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { id } = await params;
  const { name, description, status, progress, priority, notes, estimatedEnd, teamMemberIds, stageIds } = body;

  try {
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (progress !== undefined) updateData.progress = progress;
    if (priority !== undefined) updateData.priority = priority;
    if (notes !== undefined) updateData.notes = notes;
    if (estimatedEnd !== undefined) updateData.estimatedEnd = new Date(estimatedEnd);
    if (teamMemberIds !== undefined) updateData.teamMembers = { set: teamMemberIds.map((id: string) => ({ id })) };

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        client: { select: { name: true, email: true } },
        teamMembers: { select: { id: true, name: true } },
      },
    });

    // Create notification for client on status change
    if (status !== undefined) {
      await prisma.notification.create({
        data: {
          title: "Status Atualizado",
          message: `O projeto ${project.name} agora está com status: ${status}`,
          type: "STATUS_CHANGE",
          user: { connect: { id: project.clientId } },
          project: { connect: { id } },
        },
      });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Erro ao atualizar projeto." }, { status: 500 });
  }
}

// DELETE - Delete project (admin only)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if ((session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Erro ao excluir projeto." }, { status: 500 });
  }
}
