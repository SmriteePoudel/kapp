import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

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

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    
    const safeName = typeof body.name === 'string'
      ? body.name.trim()
      : (typeof body.role === 'string' ? body.role.trim() : '');
    
    const safeDescription = typeof body.description === 'string'
      ? body.description.trim()
      : '';

    if (!safeName) {
      return NextResponse.json({
        error: 'Role name is required and must be a string. Received: ' + JSON.stringify(body.name || body.role)
      }, { status: 400 });
    }

    const schema = z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().optional(),
      permissionIds: z.array(z.union([z.string(), z.number()])).optional(),
    });

    const parseResult = schema.safeParse({
      ...body,
      name: safeName,
      description: safeDescription
    });

    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.issues }, { status: 400 });
    }

    const { name, description, permissionIds } = parseResult.data;

    
    const finalDescription = typeof description === 'string' ? description : '';

    let connectPermissions: { id: number }[] = [];
    if (Array.isArray(permissionIds) && permissionIds.length > 0) {
      const permissionIdsArray = permissionIds.map(Number).filter((id) => !isNaN(id));
      if (permissionIdsArray.length > 0) {
        const validPermissions = await prisma.permission.findMany({
          where: { id: { in: permissionIdsArray } },
          select: { id: true },
        });
        connectPermissions = validPermissions.map((p) => ({ id: p.id }));
      }
    }

    const userRole = await prisma.userRole.upsert({
      where: { name },
      update: { description: finalDescription },
      create: { name, description: finalDescription },
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
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Failed to add role.' }, { status: 500 });
  }
}
