import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const body = await req.json();

  try {
   
    const updatedMember = await prisma.member.update({
      where: { slug },
      data: {
        name: body.name,
        image: body.image,
        role: body.role,
        relationship: body.relationship,
        spouseName: body.spouseName,
        children: body.children,
        fullBio: body.fullBio,
        email: body.email,
        phone: body.phone,
        address: body.address,
        career: body.career,
        skills: body.skills,
        languages: body.languages,
        hobbies: body.hobbies,
        personality: body.personality,
        
        education: {
          deleteMany: {},
          create: body.education?.map((edu: any) => ({
            title: edu.title,
            year: edu.year,
          })) || [],
        },
        achievements: {
          deleteMany: {},
          create: body.achievements?.map((ach: any) => ({
            title: ach.title,
            year: ach.year,
          })) || [],
        },
      },
      include: {
        education: true,
        achievements: true,
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}
