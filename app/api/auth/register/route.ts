import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { error } from "console";
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

export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const {name, email,password, status} = body;

    if (!name || !email || !password || !status) {
      return NextResponse.json({error:'All fields are required.'}, {status:400});
    }
    const existingUser = await prisma.user.findUnique({where:{email}});
     if (existingUser){
      return NextResponse.json({error: 'User already exists.'}, {status: 409});
     }
     const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        status
      }
     });
     
     
     const slug = generateSlug(name);
     const memberData = {
       slug: slug,
       name: name,
       email: email,
       image: '/images/family1.png',
       role: 'Family Member',
       relationship: 'User',
       fullBio: `Member profile for ${name}`,
       personality: [],
       achievements: [],
     };
     
     
     let uniqueSlug = slug;
     let counter = 1;
     while (await prisma.member.findUnique({ where: { slug: uniqueSlug } })) {
       uniqueSlug = `${slug}-${counter}`;
       counter++;
     }
     
     const newMember = await prisma.member.create({
       data: {
         ...memberData,
         slug: uniqueSlug,
         userId: newUser.id
       }
     });

     
     const payload: any = {
       id: newUser.id.toString(),
       email: newUser.email,
       roles: ['USER'] 
     };
     
     
     if (newUser.name) {
       payload.name = newUser.name;
     }
     
     await setAuthCookie(payload);

     return NextResponse.json({
       'message': 'User registered successfully',
       user: {
         email: newUser.email,
         name: newUser.name,
         slug: newMember.slug
       }
     }, { status: 201 });
    }
    catch(error:any){
      console.error('Register error:',error.message || error);
      return NextResponse.json({error:'Internal server error',details: error.message || error},
        {status: 500}
      );
  }
}
export async function GET(req: NextRequest) {
  return NextResponse.json ({message: 'GET method not allowed for registration '},{status: 405});
}