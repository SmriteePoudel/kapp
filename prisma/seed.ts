import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
 
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  
  await prisma.user.upsert({
    where: { email: 'admin@someone.com' },
    update: {},
    create: {
      email: 'admin@someone.com',
      password: adminPassword,
      firstname: 'Admin',
      lastname: 'User',
      role: 'ADMIN', 
    },
  });
  await prisma.user.upsert({
    where:{ email:'user@someone.com'},
    update: {},
    create:{
      email:'user@someone.com',
      password: userPassword,
      role: 'USER'

    },

  })

 
  await prisma.user.upsert({
    where: { email: 'user@someone.com' },
    update: {},
    create: {
      email: 'user@someone.com',
      password: userPassword,
      firstname: 'Regular',
      lastname: 'User',
      role: 'USER', 
    },
  });

  console.log('✅ Seed completed successfully.');
}

main().catch((e) => {
  console.error('❌ Seed error:', e);
  process.exit(1);
});
