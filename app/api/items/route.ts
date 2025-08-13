import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.item.findMany();
  return NextResponse.json(items);
}

// export async function POST(req: Request) {
//   const { text } = await req.json();
//   if (!text || typeof text !== "string") {
//     return NextResponse.json({ error: "Invalid text" }, { status: 400 });
//   }
//   const note = await prisma.note.create({ data: { text } });
//   return NextResponse.json(note, { status: 201 });
// }