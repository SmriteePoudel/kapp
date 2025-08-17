import { NextRequest, NextResponse } from 'next/server';
import { familyMembers } from '@/data/family';
import prisma from '@/lib/prisma';
import { getAuthToken, verifyToken } from '@/lib/auth';

async function resolveSlug(slug:string,request:NextRequest){
  if (slug !== 'me')return slug;
  const session = await getServerSession(request);
  if (!session?.user?.slug){
    throw new Error('Not authenticated');
  }
  return session.user.slug;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;
    
    console.log('PUT request received for slug:', slug);
    
    
    let updateData;
    try {
      updateData = await request.json();
      console.log('Update data received:', updateData);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    
    if (!slug) {
      console.error('No slug provided');
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    
    const resolvedSlug = await resolveSlug(slug, request);

    
    let dbMember = await prisma.member.findUnique({
      where: { slug: resolvedSlug },
    });

    
    if (!dbMember) {
      console.log('Member not found in database, checking in-memory data for slug:', slug);
      const memberIndex = familyMembers.findIndex(m => m.slug === slug);
      
      if (memberIndex === -1) {
        console.error('Member not found with slug:', slug);
        return NextResponse.json(
          { error: `Member not found with slug: ${slug}` },
          { status: 404 }
        );
      }

      console.log('Found member in in-memory data at index:', memberIndex);
      const originalMember = familyMembers[memberIndex];
      
      
      dbMember = await prisma.member.create({
        data: {
          slug: originalMember.slug,
          name: originalMember.name,
          image: originalMember.image,
          role: originalMember.role,
          relationship: originalMember.relationship,
          fullBio: originalMember.fullBio,
          email: originalMember.email,
          phone: originalMember.phone,
          address: originalMember.address,
          career: originalMember.career,
          skills: originalMember.skills,
          languages: originalMember.languages,
          hobbies: originalMember.hobbies,
          personality: [],
          achievements: originalMember.achievements || [],
        },
      });
      
      console.log('Member created in database:', dbMember.name);
    }

    console.log('Found member in database:', dbMember.name);

    
    const updatePayload: any = {
      name: updateData.name || dbMember.name,
      image: updateData.image || dbMember.image,
      role: updateData.role || dbMember.role,
      relationship: updateData.relationship || dbMember.relationship,
      fullBio: updateData.fullBio !== undefined ? updateData.fullBio : dbMember.fullBio,
      email: updateData.email || dbMember.email,
      phone: updateData.phone || dbMember.phone,
      address: updateData.address || dbMember.address,
      career: updateData.career || dbMember.career,
      skills: updateData.skills || dbMember.skills,
      languages: updateData.languages || dbMember.languages,
      hobbies: updateData.hobbies || dbMember.hobbies,
      personality: updateData.personality || dbMember.personality,
      achievements: updateData.achievements ? updateData.achievements.map((ach: any) =>
        typeof ach === 'string' ? ach : ach.title || ''
      ) : dbMember.achievements,
    };

    
    if (updateData.education && Array.isArray(updateData.education)) {
      
      await prisma.education.deleteMany({
        where: { memberId: dbMember.id },
      });
      
      
      const educationData = updateData.education.map((edu: any) => ({
        title: typeof edu === 'string' ? edu : edu.title,
        startYear: typeof edu === 'object' && edu.year ? Number(edu.year) : 0,
        memberId: dbMember.id,
      })).filter((edu: any) => edu.title);
      
      if (educationData.length > 0) {
        await prisma.education.createMany({
          data: educationData,
        });
      }
    }

    if (updateData.achievements && Array.isArray(updateData.achievements)) {
      
      await prisma.achievement.deleteMany({
        where: { memberId: dbMember.id },
      });
      
      
      const achievementData = updateData.achievements.map((ach: any) => ({
        title: typeof ach === 'string' ? ach : ach.title,
        date: typeof ach === 'object' && ach.year ? new Date(ach.year, 0, 1) : new Date(),
        memberId: dbMember.id,
      })).filter((ach: any) => ach.title);
      
      if (achievementData.length > 0) {
        await prisma.achievement.createMany({
          data: achievementData,
        });
      }
    }
    console.log('Preparing to update member in database with payload:',updatePayload);
    updatePayload.updatedAt = new Date().toISOString();
    if (updateData.createdAt){
      updatePayload.createdAt = updateData.createdAt;
    }
    if (updateData.id) {
      updatePayload.id = updateData.id;

      console.log('Using provided ID for update:', updateData.id);
    }

    
    const updatedDbMember = await prisma.member.update({
      where: { id: dbMember.id },
      data: updatePayload,
    });

    console.log('Member updated successfully in database');

    
    const memberIndex = familyMembers.findIndex(m => m.slug === slug);
    if (memberIndex !== -1) {
      familyMembers[memberIndex] = {
        ...familyMembers[memberIndex],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      console.log('Member updated successfully in in-memory array');
    }

    
    const updatedMemberWithRelations = await prisma.member.findUnique({
      where: { id: updatedDbMember.id },
      include: {
        Achievement: true,
        Education: true,
      },
    });

    
    const updatedMember = {
      ...updatedMemberWithRelations,
      image: updatedMemberWithRelations?.image || '/images/oldman.webp',
      education: updatedMemberWithRelations?.Education.map(edu => ({ title: edu.title, year: edu.startYear })) || [],
      achievements: updatedMemberWithRelations?.Achievement.map(ach => ({ title: ach.title, year: ach.date ? new Date(ach.date).getFullYear() : undefined })) || [],
      career: updatedMemberWithRelations?.career || [],
      skills: updatedMemberWithRelations?.skills || [],
      languages: updatedMemberWithRelations?.languages || [],
      hobbies: updatedMemberWithRelations?.hobbies || [],
      personality: updatedMemberWithRelations?.personality || [],
    };

    return NextResponse.json({
      success: true,
      data: updatedMember,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Unexpected error in PUT /api/members/[slug]:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;
    console.log('GET request received for slug:', slug);

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    
    const resolvedSlug = await resolveSlug(slug, request);

    
    const dbMember = await prisma.member.findUnique({
      where: { slug: resolvedSlug },
      include: {
        Achievement: true,
        Education: true,
      },
    });

    if (dbMember) {
      
      const member = {
        ...dbMember,
        image: dbMember.image || '/images/oldman.webp',
        education: dbMember.Education.map(edu => ({ title: edu.title, year: edu.startYear })),
        achievements: dbMember.Achievement.map(ach => ({ title: ach.title, year: ach.date ? new Date(ach.date).getFullYear() : undefined })),
        career: dbMember.career || [],
        skills: dbMember.skills || [],
        languages: dbMember.languages || [],
        hobbies: dbMember.hobbies || [],
        personality: dbMember.personality || [],
        birthdate: dbMember.fullBio || "",
      };

      console.log('Member found in database:', member.name);

      return NextResponse.json({
        success: true,
        data: member
      });
    }

    
    console.log('Member not found in database, checking in-memory data for slug:', slug);
    const member = familyMembers.find(m => m.slug === slug);

    if (!member) {
      console.log('Member not found for slug:', slug);
      return NextResponse.json(
        { error: `Member not found with slug: ${slug}` },
        { status: 404 }
      );
    }

    console.log('Member found in in-memory data:', member.name);

    return NextResponse.json({
      success: true,
      data: member
    });

  } catch (error) {
    console.error('Error in GET /api/members/[slug]:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function getServerSession(request: NextRequest) {
  const token = getAuthToken(request);
  if (!token) {
    console.log('No token found in request');
    return null;
  }
  
  const payload = verifyToken(token);
  if (!payload) {
    console.log('Invalid token');
    return null;
  }
  
  console.log('Token payload:', payload);
  
  
  const member = await prisma.member.findFirst({
    where: {
      userId: parseInt(payload.id, 10)
    }
  });
  
  console.log('Member found for userId', payload.id, ':', member);
  
  return {
    user: {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      slug: member?.slug
    }
  };
}
