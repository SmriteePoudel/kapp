import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    
    const body = await request.json();
    const schema = z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().min(1, 'Description is required'),
      permissionIds: z.array(z.union([z.string(), z.number()])).optional(),
    });
    const parseResult = schema.safeParse(body);
    if (!parseResult.success) {
      console.error('Validation error:', parseResult.error);
      return NextResponse.json({ error: parseResult.error.issues }, { status: 400 });
    }
    const { name, description, permissionIds } = parseResult.data;

    let connectPermissions: { id: number }[] = [];
    if (Array.isArray(permissionIds) && permissionIds.length > 0) {
      try {
        const permissionIdsArray = permissionIds.map(Number).filter((id) => !isNaN(id));
        const validPermissions = await prisma.permission.findMany({
          where: { id: { in: permissionIdsArray } },
          select: { id: true },
        });
        connectPermissions = validPermissions.map((p: { id: number }) => ({ id: p.id }));
      } catch (permError: any) {
        console.error('Error fetching permissions for role:', JSON.stringify(permError, null, 2));
        return NextResponse.json({ error: permError.message || 'Failed to fetch permissions for role.' }, { status: 500 });
      }
    }

    try {
      
      const userRole = await prisma.userRole.upsert({
        where: { name },
        update: { description },
        create: { name, description },
        include: { permissions: true },
      });

      
      let updatedRole = userRole;
      if (connectPermissions.length > 0) {
        updatedRole = await prisma.userRole.update({
          where: { id: userRole.id },
          data: { permissions: { set: connectPermissions } },
          include: { permissions: true },
        });
      }

      return NextResponse.json({ role: updatedRole, message: 'Role added or updated successfully!' }, { status: 201 });
    } catch (roleError: any) {
      console.error('Error upserting user role:', JSON.stringify(roleError, null, 2));
      return NextResponse.json({ error: roleError.message || 'Failed to add or update role.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('API /api/admin/roles error:', JSON.stringify(error, null, 2));
    return NextResponse.json({ error: error.message || 'Failed to add role.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const roles = await prisma.userRole.findMany({
      include: { permissions: true }
    });
    return NextResponse.json({ roles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch roles.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Role ID is required.' }, { status: 400 });
  }
  try {
    await prisma.userRole.delete({
      where: { id: Number(id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete role.' }, { status: 500 });
  }
} 