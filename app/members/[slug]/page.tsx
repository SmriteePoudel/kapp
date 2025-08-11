

import { NextRequest, NextResponse } from 'next/server';
import { familyMembers } from '@/data/family';
import type { Member } from '@/types/member';

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

    
    console.log('Searching for member with slug:', slug);
    console.log('Available family members:', familyMembers.map(m => ({ slug: m.slug, name: m.name })));
    
    const memberIndex = familyMembers.findIndex(m => m.slug === slug);
    
    if (memberIndex === -1) {
      console.error('Member not found with slug:', slug);
      return NextResponse.json(
        { error: `Member not found with slug: ${slug}` },
        { status: 404 }
      );
    }

    console.log('Found member at index:', memberIndex);

    
    const originalMember = familyMembers[memberIndex];
    console.log('Original member:', originalMember);

    
    const updatedMember = {
      ...originalMember,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    console.log('Updated member data:', updatedMember);

    
    try {
      familyMembers[memberIndex] = updatedMember;
      console.log('Member updated successfully in array');
    } catch (updateError) {
      console.error('Error updating member in array:', updateError);
      return NextResponse.json(
        { error: 'Failed to update member data' },
        { status: 500 }
      );
    }

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

    const member = familyMembers.find(m => m.slug === slug);

    if (!member) {
      console.log('Member not found for slug:', slug);
      return NextResponse.json(
        { error: `Member not found with slug: ${slug}` },
        { status: 404 }
      );
    }

    console.log('Member found:', member.name);

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