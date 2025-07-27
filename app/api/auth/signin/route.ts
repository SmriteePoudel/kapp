import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        firstname: true,
        lastname: true,
      },
    });

    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    
    if (!['ADMIN', 'USER'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid user role.' },
        { status: 403 }
      );
    }

    
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is missing in environment variables.');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

   
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstname: user.firstname || null,
      lastname: user.lastname || null,
      fullName: [user.firstname, user.lastname].filter(Boolean).join(' ') || null,
    };

    
    const response = NextResponse.json({
      success: true,
      user: userData,
      token,
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    console.log(`✅ ${user.role} logged in: ${user.email}`);
    return response;

  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}


export async function GET() {
  return NextResponse.json({ message: 'Auth endpoint is healthy' });
}
