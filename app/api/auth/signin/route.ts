import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { familyMembers } from '@/data/family';
import { setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        Member: true
      }
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    
    let slug = null;
    if (user.Member && user.Member.length > 0) {
      slug = user.Member[0].slug;
    } else {
      
      const member = familyMembers.find(m => m.email?.toLowerCase() === email.toLowerCase());
      slug = member ? member.slug : null;
    }

    
    const payload: any = {
      id: user.id.toString(),
      email: user.email,
      roles: user.roles as string[]
    };
    
    
    if (user.name) {
      payload.name = user.name;
    }
    
    await setAuthCookie(payload);

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