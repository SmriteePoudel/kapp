import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const VALID_ROLES = ['ADMIN', 'USER'];

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
    
    let name = typeof body.name === 'string' && body.name.trim() !== '' ? body.name.trim() : `User_${Date.now()}`;
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    let rolesArray: string[] = [];
    if (Array.isArray(body.roles) && body.roles.length > 0) {
      rolesArray = body.roles
        .filter((r: any) => typeof r === 'string' && r.trim() !== '')
        .map((r: string) => r.trim().toUpperCase())
        .filter((r: string) => VALID_ROLES.includes(r));
    } else if (typeof body.role === 'string' && body.role.trim() !== '') {
      const role = body.role.trim().toUpperCase();
      if (VALID_ROLES.includes(role)) {
        rolesArray = [role];
      }
    }
    if (!email) {
      return NextResponse.json({ error: 'Email is required and must be a string.' }, { status: 400 });
    }
    if (rolesArray.length === 0) {
      
      rolesArray = ['USER'];
    }
 
    const password = typeof body.password === 'string' && body.password.length >= 6 ? body.password : 'changeme123';
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    let user;
    if (existingUser) {
      user = await prisma.user.update({
        where: { email },
        data: {
          name,
          roles: rolesArray as any,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          roles: true,
        },
      });
      return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
    } else {
      user = await prisma.user.create({
        data: {
          name,
          email,
          roles: rolesArray as any,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          roles: true,
        },
      });
      return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create or update user.', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        roles: true,
      },
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users.' }, { status: 500 });
  }
}
