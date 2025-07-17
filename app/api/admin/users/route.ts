import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, roles } = await request.json();
    if (!name || !email || !roles || !Array.isArray(roles) || roles.length === 0) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    
    const password = await bcrypt.hash('changeme123', 10);
    const user = await prisma.user.create({
      data: { name, email, roles, password },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === 'object' && error && 'code' in error && (error as any).code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to add user.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, roles: true }
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
  }
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
  }
  try {
    const { name, email, roles } = await request.json();
    if (!name || !email || !roles || !Array.isArray(roles) || roles.length === 0) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, roles },
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user.' }, { status: 500 });
  }
} 