import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {

  const password = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@someone.com' },
    update: {},
    create: {
      email: 'admin@someone.com',
      password,
      name: 'Admin',
      roles: ['ADMIN'],
    },
  });

 
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

  // Seed roles
  await prisma.userRole.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrator role',
    },
  });

  await prisma.userRole.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
      description: 'Regular user role',
    },
  });

  console.log('Seeded admin user, roles, and permissions.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 