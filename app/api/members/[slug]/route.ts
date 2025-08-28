import { NextRequest, NextResponse } from 'next/server';
import { familyMembers } from '@/data/family';
import prisma from '@/lib/prisma';
import { getAuthToken, verifyToken } from '@/lib/auth';


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

  let member = null;

  try {
    const userId = isNaN(Number(payload.id)) ? null : Number(payload.id);

    if (userId) {
      
      const userExists = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (userExists) {
        member = await prisma.member.findFirst({
          where: { userId },
        });
      }
    }
  } catch (err) {
    console.error("Error fetching member in getServerSession:", err);
  }

  console.log('Member found for userId', payload.id, ':', member);
  return {
    user: {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      slug: member?.slug || null,
    },
  };
}


async function resolveSlug(slug: string, request: NextRequest) {
  if (slug !== 'me') return slug;
  
  const session = await getServerSession(request);
  if (!session?.user) {
    throw new Error('Not authenticated');
  }
  if (!session.user.slug) {
    throw new Error('User profile not found. Please create your profile first.');
  }
  
  return session.user.slug;
}


async function generateUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (await prisma.member.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}


function formatMemberData(dbMember: any) {
  return {
    ...dbMember,
    image: dbMember.image || '/images/oldman.webp',
    education: (dbMember.Education || []).map((edu: any) => ({
      title: edu.title || '',
      startYear: edu.startYear,
      endYear: edu.endYear
    })),
    achievements: (dbMember.Achievement || []).map((ach: any) => ({ 
      title: ach.title || '', 
      year: ach.date ? new Date(ach.date).getFullYear() : undefined 
    })),
    career: Array.isArray(dbMember.career) ? dbMember.career : [],
    skills: Array.isArray(dbMember.skills) ? dbMember.skills : [],
    languages: Array.isArray(dbMember.languages) ? dbMember.languages : [],
    hobbies: Array.isArray(dbMember.hobbies) ? dbMember.hobbies : [],
    personality: Array.isArray(dbMember.personality) ? dbMember.personality : [],
    birthdate: dbMember.fullBio || "",
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    console.log('GET request received for slug:', slug);

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    let resolvedSlug: string;
    
    
    if (slug === 'me') {
      const session = await getServerSession(request);
      if (!session?.user) {
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 }
        );
      }
      
      if (!session.user.slug) {
        console.log('User has no slug, looking for existing member by userId');
        
        const existingMember = await prisma.member.findFirst({
          where: { userId: Number(session.user.id) },
          include: {
            Achievement: true,
            Education: true,
          },
        });

        if (existingMember) {
          console.log('Found existing member without slug, updating...');
          
          if (!existingMember.slug) {
            const baseSlug = `user-${session.user.id}`;
            const uniqueSlug = await generateUniqueSlug(baseSlug);
            
            const updatedMember = await prisma.member.update({
              where: { id: existingMember.id },
              data: { slug: uniqueSlug },
              include: {
                Achievement: true,
                Education: true,
              },
            });
            
            return NextResponse.json({
              success: true,
              data: formatMemberData(updatedMember)
            });
          } else {
            resolvedSlug = existingMember.slug;
          }
        } else {
          console.log('No existing member found, creating new one...');
          
          const baseSlug = `user-${session.user.id}`;
          const uniqueSlug = await generateUniqueSlug(baseSlug);
          
          const userId = Number(session.user.id);
          
          
          const userExists = await prisma.user.findUnique({
            where: { id: userId }
          });

          const newMember = await prisma.member.create({
            data: {
              slug: uniqueSlug,
              userId: userExists ? userId : null,
              name: session.user.name || 'New User',
              image: '/images/welcome-avatar.png',
              role: 'Member',
              relationship: 'Family Member',
              fullBio: '',
              email: session.user.email ? [session.user.email] : [],
              phone: [],
              address: [],
              career: [],
              skills: [],
              languages: [],
              hobbies: [],
              personality: [],
              achievements: [],
            },
            include: {
              Achievement: true,
              Education: true,
            },
          });

          return NextResponse.json({
            success: true,
            data: formatMemberData(newMember)
          });
        }
      } else {
        resolvedSlug = session.user.slug;
      }
    } else {
      resolvedSlug = slug;
    }

    console.log('Looking for member with resolved slug:', resolvedSlug);
    
    
    const dbMember = await prisma.member.findUnique({
      where: { slug: resolvedSlug },
      include: {
        Achievement: true,
        Education: true,
      },
    });

    if (dbMember) {
      console.log('Member found in database:', dbMember.name);
      return NextResponse.json({
        success: true,
        data: formatMemberData(dbMember)
      });
    }

    
    console.log('Member not found in database, checking in-memory data for slug:', resolvedSlug);
    const inMemoryMember = familyMembers.find(m => m.slug === resolvedSlug);

    if (inMemoryMember) {
      console.log('Member found in in-memory data:', inMemoryMember.name);
      return NextResponse.json({
        success: true,
        data: inMemoryMember
      });
    }

    
    console.log('Member not found for slug:', resolvedSlug);
    return NextResponse.json(
      { error: `Member not found with slug: ${resolvedSlug}` },
      { status: 404 }
    );

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
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

    
    let resolvedSlug: string;
    try {
      resolvedSlug = await resolveSlug(slug, request);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Authentication error' },
        { status: 401 }
      );
    }

    
    let dbMember = await prisma.member.findUnique({
      where: { slug: resolvedSlug },
    });

    
    if (!dbMember) {
      console.log('Member not found in database, checking in-memory data for slug:', resolvedSlug);
      const inMemoryMember = familyMembers.find(m => m.slug === resolvedSlug);
      
      if (!inMemoryMember) {
        console.error('Member not found with slug:', resolvedSlug);
        return NextResponse.json(
          { error: `Member not found with slug: ${resolvedSlug}` },
          { status: 404 }
        );
      }

      console.log('Found member in in-memory data, creating in database');
      
      
      
      dbMember = await prisma.member.create({
        data: {
          slug: inMemoryMember.slug,
          name: inMemoryMember.name,
          image: inMemoryMember.image,
          role: inMemoryMember.role,
          relationship: inMemoryMember.relationship,
          fullBio: inMemoryMember.fullBio,
          email: Array.isArray(inMemoryMember.email) ? inMemoryMember.email : [inMemoryMember.email].filter(Boolean),
          phone: Array.isArray(inMemoryMember.phone) ? inMemoryMember.phone : [inMemoryMember.phone].filter(Boolean),
          address: Array.isArray(inMemoryMember.address) ? inMemoryMember.address : [inMemoryMember.address].filter(Boolean),
          career: inMemoryMember.career || [],
          skills: inMemoryMember.skills || [],
          languages: inMemoryMember.languages || [],
          hobbies: inMemoryMember.hobbies || [],
          personality: [],
          achievements: inMemoryMember.achievements || [],
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
      updatedAt: new Date(),
    };

    
    if (updateData.education && Array.isArray(updateData.education)) {
      await prisma.education.deleteMany({
        where: { memberId: dbMember.id },
      });
      
      const educationData = updateData.education.map((edu: any) => ({
        title: typeof edu === 'string' ? edu : edu.title,
        startYear: typeof edu === 'object' && edu.startYear ? Number(edu.startYear) : null,
        endYear: typeof edu === 'object' && edu.endYear ? Number(edu.endYear) : null,
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

    
    console.log('Preparing to update member in database');
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

    if (!updatedMemberWithRelations) {
      throw new Error('Failed to fetch updated member');
    }

    return NextResponse.json({
      success: true,
      data: formatMemberData(updatedMemberWithRelations),
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