import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { setAuthCookie } from "@/lib/auth";


function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      );
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    
    const baseSlug = generateSlug(name);
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await prisma.member.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    
    const newMember = await prisma.member.create({
      data: {
        slug: uniqueSlug,
        name,
        email: [email], 
        image: "/images/family1.png",
        fullBio: `Member profile for ${name}`,
        personality: [], 
        achievements: [],
        userId: newUser.id,
      },
    });

    
    const payload = {
      id: newUser.id.toString(),
      email: newUser.email,
      name: newUser.name ?? undefined,
    };

    
    await setAuthCookie(payload);

    
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          email: newUser.email,
          name: newUser.name,
          slug: newMember.slug,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message || error },
      { status: 500 }
    );
  }
}


export async function GET() {
  return NextResponse.json(
    { message: "GET method not allowed for registration" },
    { status: 405 }
  );
}



