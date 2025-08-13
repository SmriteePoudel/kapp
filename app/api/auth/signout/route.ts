import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log("Signout request received");
    await clearAuthCookie();
    console.log("Auth cookie cleared successfully");
    return NextResponse.json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 });
  }
}