import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { setAuthCookie } from '@/lib/auth';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // First check if user exists without including the role field
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        Member: {
          select: {
            id: true,
            slug: true
          }
        }
      }
    });
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }
    
    let member = null;
    if (!user.Member || user.Member.length === 0) {
      const slug = generateSlug(user.name || email.split('@')[0]);
      
      const memberData = {
        slug: slug,
        name: user.name || email.split('@')[0],
        email: [user.email],
        image: '/images/family1.png',
        role: 'Family Member',
        relationship: 'User',
        fullBio: `Member profile for ${user.name || email.split('@')[0]}`,
        personality: [],
        achievements: [],
        userId: user.id
      };
      
      let uniqueSlug = slug;
      let counter = 1;
      while (await prisma.member.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }
      
      member = await prisma.member.create({
        data: {
          ...memberData,
          slug: uniqueSlug,
        }
      });
    } else {
      member = user.Member[0];
    }
    
    const payload: any = {
      id: user.id.toString(),
      email: user.email,
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
        slug: member.slug
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}