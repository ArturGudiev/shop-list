import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, place } = await req.json();
  if (!name || typeof name !== "string" || !place || typeof place !== "string") {
    return NextResponse.json({ error: "Invalid text" }, { status: 400 });
  }
  const item = await prisma.item.create({ data: { name, place } });
  
  return NextResponse.json(item, { status: 200 });
}