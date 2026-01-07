import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { ids } = await req.json();
    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid ids" }, { status: 400 });
    }
    
    const userId = Number(session.user.id); // Ensure it's a number
    // Only delete items that belong to the current user
    const result = await prisma.item.deleteMany({ 
      where: { 
        id: { in: ids },
        userId: userId
      } 
    });
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error deleting items:', error);
    return NextResponse.json({ error: "Failed to delete items" }, { status: 500 });
  }
}