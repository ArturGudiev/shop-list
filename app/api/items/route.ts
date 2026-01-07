import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized - Please sign in" }, { status: 401 });
    }
    
    const userId = Number(session.user.id); // Ensure it's a number
    const items = await prisma.item.findMany({
      where: {
        userId: userId
      }
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ 
      error: "Failed to fetch items",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
