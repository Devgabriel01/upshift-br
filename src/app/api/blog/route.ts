import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Props) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const body = await request.json();
  const post = await prisma.blogPost.update({ where: { id }, data: body });
  return NextResponse.json(post);
}

export async function DELETE(_: NextRequest, { params }: Props) {
  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}