import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export async function GET() {
  try {
    
    return NextResponse.json({
      id: "123",
      name: "Test User",
      email: "test@example.com",
      avatar: "/uploads/default.png",
    });
  } catch (err) {
    console.error(" Error in /api/profile:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
