import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { ids } = await req.json();
  if (!ids || !Array.isArray(ids)) {
    return NextResponse.json({ error: "Invalid ids" }, { status: 400 });
  }
  const result = await prisma.item.deleteMany({ where: { id: { in: ids} } });
  
  return NextResponse.json(result, { status: 200 });
}