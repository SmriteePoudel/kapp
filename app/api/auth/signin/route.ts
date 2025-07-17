import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true, password: true, roles: true } });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    if (!user.roles || !user.roles.includes('ADMIN')) {
      return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
    }

    
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        roles: user.roles,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

   
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
      },
      token, 
    });

    response.cookies.set('admin-auth', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, 
    });

    return response;
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
