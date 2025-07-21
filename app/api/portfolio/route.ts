import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  console.log('GET /api/portfolio called');
  try {
    const portfolios = await prisma.portfolio.findMany();
    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, email, phone } = body;

    if (!title || !description) {
      return NextResponse.json({ 
        error: 'Title and description are required.' 
      }, { 
        status: 400 
      });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        imageUrl: imageUrl || '',
        email: email || '',
        phone: phone || ''
      },
    });

    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to create portfolio.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, imageUrl, email, phone } = body;

    if (!id || !title || !description) {
      return NextResponse.json({ error: 'ID, title and description are required.' }, { status: 400 });
    }

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: { title, description, imageUrl, email, phone },
    });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update portfolio.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }

    await prisma.portfolio.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete portfolio.' }, { status: 500 });
  }
}
