import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching all family members from the database");

    
    const dbMembers = await prisma.member.findMany({
      include: {
        Achievement: true,
        Education: true,
      },
    });

    
    const transformedMembers = dbMembers.map((dbMember) => ({
      id: dbMember.id + 1000,
      slug: dbMember.slug,
      name: dbMember.name,
      image: dbMember.image || "/images/oldman.webp",
      role: dbMember.role || "Family Member",
      relationship: dbMember.relationship || "Member",
      fullBio: dbMember.fullBio || `Member profile for ${dbMember.name}`,
      email: dbMember.email ? [dbMember.email] : [],
      phone: dbMember.phone ? [dbMember.phone] : [],
      address: dbMember.address ? [dbMember.address] : [],
      education: dbMember.Education.map((edu) => ({
        title: edu.title,
        year: edu.startYear || undefined,
      })),
      career: dbMember.career || [],
      hobbies: dbMember.hobbies || [],
      achievements: dbMember.Achievement.map((ach) => ({
        title: ach.title,
        year: ach.date ? new Date(ach.date).getFullYear() : undefined,
      })),
      favoriteQuote: "",
      personalityTraits: [],
      skills: dbMember.skills || [],
      languages: dbMember.languages || [],
      socialLinks: {},
      generation: 0,
      birthDate: "2000-01-01",
      deathDate: null,
      parentIds: [],
      spouseId: null,
      bio: dbMember.fullBio || `Member profile for ${dbMember.name}`,
      birthdate: "",
      source: "database",
    }));

    return NextResponse.json({
      success: true,
      data: transformedMembers,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch members",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
