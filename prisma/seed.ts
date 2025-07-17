import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@someone.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles: ['ADMIN'],
        name: 'Admin',
      },
    });
    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }

  
  const permissions = [
    { name: 'roles.create', description: 'Can create roles' },
    { name: 'roles.delete', description: 'Can delete roles' },
    { name: 'users.create', description: 'Can create users' },
    { name: 'users.delete', description: 'Can delete users' },
    { name: 'permissions.manage', description: 'Can manage permissions' },
  ];

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: {},
      create: perm,
    });
  }

  
  const allPermissions = await prisma.permission.findMany();
  await prisma.userRole.upsert({
    where: { name: 'Admin' },
    update: {
      permissions: {
        set: allPermissions.map((p: { id: number }) => ({ id: p.id })),
      },
    },
    create: {
      name: 'Admin',
      description: 'Administrator role',
      permissions: {
        connect: allPermissions.map((p: { id: number }) => ({ id: p.id })),
      },
    },
  });

  console.log('Seeded permissions and admin role.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 