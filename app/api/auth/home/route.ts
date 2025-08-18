import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getAuthToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    
    return NextResponse.json({
      user: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      },
    });
  } catch (error) {
    console.error("Auth check failed:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
