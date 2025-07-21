import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function GET() {
  return NextResponse.json({ message: 'Use POST to add a portfolio item. Send { name, description, imageUrl }.' });
}


export async function POST(request: NextRequest) {
  try {
    const { name, description, imageUrl } = await request.json();
    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description required.' }, { status: 400 });
    }
    const portfolio = await prisma.portfolio.create({
      data: { title: name, description, imageUrl },
    });
    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error) {
    console.error('Portfolio POST error:', error);
    return NextResponse.json({ error: (error as Error)?.message || 'Internal server error', details: error }, { status: 500 });
  }
} 