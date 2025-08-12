import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { familyMembers } from '@/data/family';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    
    const member = familyMembers.find(m => m.email?.toLowerCase() === email.toLowerCase());
    const slug = member ? member.slug : null;

    return NextResponse.json({
      message: 'Login successful',
      user: {
        email: user.email,
        name: user.name,
        slug: slug
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}