import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log("Logout request received");
    await clearAuthCookie();
    console.log("Auth cookie cleared successfully");
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: 'Failed to log out' }, { status: 500 });
  }
}
