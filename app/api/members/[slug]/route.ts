import { NextRequest, NextResponse } from 'next/server';
import { familyMembers } from '@/data/family';
import prisma from '@/lib/prisma';
import { getAuthToken, verifyToken } from '@/lib/auth';

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
          email: Array.isArray(originalMember.email) ? originalMember.email : [originalMember.email].filter(Boolean),
          phone: Array.isArray(originalMember.phone) ? originalMember.phone : [originalMember.phone].filter(Boolean),
          address: Array.isArray(originalMember.address) ? originalMember.address : [originalMember.address].filter(Boolean),
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
    
    console.log('Preparing to update member in database with payload:', updatePayload);
    updatePayload.updatedAt = new Date().toISOString();
    if (updateData.createdAt) {
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
      education: updatedMemberWithRelations?.Education.map(edu => ({
        title: edu.title,
        startYear: edu.startYear,
        endYear: edu.endYear
      })) || [],
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
        
        const existingMember = await prisma.member.findFirst({
          where: { userId: Number(session.user.id) },
          include: {
            Achievement: true,
            Education: true,
          },
        });

        if (existingMember) {
          
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
            
            const member = {
              ...updatedMember,
              image: updatedMember.image || '/images/oldman.webp',
              education: updatedMember.Education.map(edu => ({
                title: edu.title,
                startYear: edu.startYear,
                endYear: edu.endYear
              })),
              achievements: updatedMember.Achievement.map(ach => ({ 
                title: ach.title, 
                year: ach.date ? new Date(ach.date).getFullYear() : undefined 
              })),
              career: updatedMember.career || [],
              skills: updatedMember.skills || [],
              languages: updatedMember.languages || [],
              hobbies: updatedMember.hobbies || [],
              personality: updatedMember.personality || [],
              birthdate: updatedMember.fullBio || "",
            };

            return NextResponse.json({
              success: true,
              data: member
            });
          } else {
            resolvedSlug = existingMember.slug;
          }
        } else {
          
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

          const member = {
            ...newMember,
            image: newMember.image || '/images/oldman.webp',
            education: newMember.Education.map(edu => ({
              title: edu.title,
              startYear: edu.startYear,
              endYear: edu.endYear
            })),
            achievements: newMember.Achievement.map(ach => ({ 
              title: ach.title, 
              year: ach.date ? new Date(ach.date).getFullYear() : undefined 
            })),
            career: newMember.career || [],
            skills: newMember.skills || [],
            languages: newMember.languages || [],
            hobbies: newMember.hobbies || [],
            personality: newMember.personality || [],
            birthdate: newMember.fullBio || "",
          };

          return NextResponse.json({
            success: true,
            data: member
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
      
      const member = {
        ...dbMember,
        image: dbMember.image || '/images/oldman.webp',
        education: (dbMember.Education || []).map(edu => ({
          title: edu.title || '',
          startYear: edu.startYear,
          endYear: edu.endYear
        })),
        achievements: (dbMember.Achievement || []).map(ach => ({ 
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

      console.log('Returning member data successfully');

      return NextResponse.json({
        success: true,
        data: member
      });
    }

    console.log('Member not found in database, checking in-memory data for slug:', resolvedSlug);
    const member = familyMembers.find(m => m.slug === resolvedSlug);

    if (!member) {
      console.log('Member not found for slug:', resolvedSlug);
      return NextResponse.json(
        { error: `Member not found with slug: ${resolvedSlug}` },
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
  console.log('Session payload:', payload);
  return {
    user: {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      slug: member?.slug || null,
    },
  };
}