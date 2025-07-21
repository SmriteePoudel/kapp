import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';


export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (err) {
      console.error('Invalid JSON payload:', err);
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    console.log('Incoming permission body:', body);

    const { name, description } = body;
    const safeName = typeof name === 'string' ? name.trim() : '';

    if (!safeName) {
      return NextResponse.json({
        error: 'Permission name is required and must be a string. Received: ' + JSON.stringify(name),
        debug: {
          body,
          typeOfName: typeof name,
          valueOfName: name
        }
      }, { status: 400 });
    }

    const permission = await prisma.permission.create({
      data: {
        name: safeName,
        description: typeof description === 'string' ? description.trim() : ''
      },
    });

    return NextResponse.json({ permission }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error in POST /api/admin/permissions:', error);
    if (typeof error === 'object' && error && 'code' in error && (error as any).code === 'P2002') {
      return NextResponse.json({ error: 'Permission name already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to add permission.' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const permissions = await prisma.permission.findMany();
    return NextResponse.json({ permissions });
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch permissions.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Permission ID is required.' }, { status: 400 });
  }
  try {
    await prisma.permission.delete({
      where: { id: Number(id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete permission.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Permission ID is required.' }, { status: 400 });
  }
  try {
    const { name, description } = await request.json();
    if (!name || !description) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    const permission = await prisma.permission.update({
      where: { id: Number(id) },
      data: { name, description },
    });
    return NextResponse.json({ permission });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update permission.' }, { status: 500 });
  }
} 