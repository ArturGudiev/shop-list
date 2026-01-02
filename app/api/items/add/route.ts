import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, place, category } = await req.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    const item = await prisma.item.create({ 
      data: { 
        name, 
        place: place || null,
        category: category || null
      } 
    });
    
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create item" }, 
      { status: 500 }
    );
  }
}