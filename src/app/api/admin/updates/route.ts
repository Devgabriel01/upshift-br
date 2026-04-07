import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

// GET - Get updates for admin
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updates = await prisma.update.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        project: { select: { id: true, name: true } },
        author: { select: { name: true } },
      },
      take: 50,
    });
    return NextResponse.json({ updates });
  } catch (error) {
    console.error("Error fetching updates:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

// POST - Create an update
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { projectId, title, content } = body;

  if (!projectId || !title || !content) {
    return NextResponse.json(
      { error: "projectId, title e content são obrigatórios." },
      { status: 400 }
    );
  }

  try {
    const authorId = (session.user as any).id;

    const update = await prisma.update.create({
      data: {
        projectId,
        title,
        content,
        authorId,
      },
    });

    // Create notification for the client
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (project) {
      await prisma.notification.create({
        data: {
          title: "Nova Atualização",
          message: title,
          type: "GENERAL",
          userId: project.clientId,
          projectId,
        },
      });
    }

    return NextResponse.json(update, { status: 201 });
  } catch (error) {
    console.error("Error creating update:", error);
    return NextResponse.json({ error: "Erro ao criar atualização." }, { status: 500 });
  }
}
