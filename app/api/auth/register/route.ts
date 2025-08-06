import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { error } from "console";

const prisma= new PrismaClient();

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
     return NextResponse.json({ 'message': 'User registered successfully', user: { email: newUser.email } }, { status: 201 });
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