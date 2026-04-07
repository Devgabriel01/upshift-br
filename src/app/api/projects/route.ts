import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

// GET - List projects for current user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userRole = (session.user as any).role;
  const userId = (session.user as any).id;

  try {
    let projects;

    if (userRole === "ADMIN") {
      projects = await prisma.project.findMany({
        include: {
          client: { select: { id: true, name: true, email: true } },
          stages: { orderBy: { order: "asc" } },
          _count: { select: { updates: true, messages: true, files: true } },
        },
        orderBy: { updatedAt: "desc" },
      });
    } else {
      projects = await prisma.project.findMany({
        where: { clientId: userId },
        include: {
          stages: { orderBy: { order: "asc" } },
          _count: { select: { updates: true, messages: true, files: true } },
        },
        orderBy: { updatedAt: "desc" },
      });
    }

    const recentUpdates = await prisma.update.findMany({
      where: userRole === "ADMIN" ? {} : { project: { clientId: userId } },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        author: { select: { name: true } },
        project: { select: { name: true } },
      },
    });

    return NextResponse.json({ projects, recentUpdates });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Error fetching projects" }, { status: 500 });
  }
}

// POST - Create a new project (admin only)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if ((session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { name, type, description, clientId, teamMemberIds, estimatedEnd, priority, notes } = body;

  if (!name || !clientId) {
    return NextResponse.json({ error: "Nome e cliente são obrigatórios." }, { status: 400 });
  }

  try {
    const project = await prisma.project.create({
      data: {
        name,
        type: type || "SITE",
        description,
        estimatedEnd: estimatedEnd ? new Date(estimatedEnd) : null,
        priority: priority || "MEDIA",
        notes,
        client: { connect: { id: clientId } },
        ...(teamMemberIds && teamMemberIds.length > 0
          ? { teamMembers: { connect: teamMemberIds.map((id: string) => ({ id })) } }
          : {}),
      },
      include: {
        client: { select: { name: true, email: true } },
        teamMembers: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Erro ao criar projeto." }, { status: 500 });
  }
}
