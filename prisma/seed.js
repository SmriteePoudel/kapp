const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { email } = require("zod");

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: "admin@someone.com",
      password: await bcrypt.hash("admin123", 10),
      name: "Admin User",
      roles: ["ADMIN"],
    },
    {
      email: "user@someone.com",
      password: await bcrypt.hash("user123", 10),
      name: "Regular User",
      roles: ["USER"],
    },
    {
      email: "ram@someone.com",
      password: await bcrypt.hash("ram123", 10),
      name: "Ram Bahadur Khanal",
      roles: ["USER"],
    },
    {
      email: "sita@someone.com",
      password: await bcrypt.hash("sita123", 10),
      name: "Sita Devi Khanal",
      roles: ["USER"],
    },
    {
      email: "prakash@someone.com",
      password: await bcrypt.hash("prakash123", 10),
      name: "Prakash Khanal",
      roles: ["USER"],
    },
  ];

  for (const user of users) {
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existing) {
      await prisma.user.update({
        where: { email: user.email },
        data: {
          password: user.password,
          name: user.name,
          roles: user.roles,
        },
      });
      console.log(`🔁 Updated: ${user.email}`);
    } else {
      await prisma.user.create({ data: user });
      console.log(`✅ Created: ${user.email}`);
    }
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
