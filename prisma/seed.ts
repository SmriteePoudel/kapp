import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@someone.com'.toLowerCase().trim();
  const userEmail = 'user@someone.com'.toLowerCase().trim();

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: adminPassword,
      firstname: 'Admin',
      lastname: 'User',
      roles: [Role.ADMIN],
    },
  });

  const user = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      email: userEmail,
      password: userPassword,
      firstname: 'Regular',
      lastname: 'User',
      roles: [Role.USER],
    },
  });

  console.log('✅ Seed completed successfully.');
  console.log('🔐 Admin Login:', { email: admin.email, password: 'admin123' });
  console.log('👤 User Login:', { email: user.email, password: 'user123' });
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
