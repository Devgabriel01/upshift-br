import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

// GET - Get stages for a project
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "projectId required" }, { status: 400 });
  }

  try {
    const stages = await prisma.stage.findMany({
      where: { projectId },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ stages });
  } catch (error) {
    console.error("Error fetching stages:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

// POST - Create/update stages
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { projectId, stages } = body;

  if (!projectId || !stages || !Array.isArray(stages)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    // Delete existing stages and recreate
    await prisma.stage.deleteMany({ where: { projectId } });

    const created = await prisma.stage.createMany({
      data: stages.map((stage: any) => ({
        name: stage.name,
        description: stage.description || null,
        order: stage.order,
        status: stage.status || "PENDING",
        predictedEnd: stage.predictedEnd ? new Date(stage.predictedEnd) : null,
        projectId,
      })),
    });

    return NextResponse.json({ success: true, count: created.count });
  } catch (error) {
    console.error("Error creating stages:", error);
    return NextResponse.json({ error: "Error creating stages" }, { status: 500 });
  }
}
