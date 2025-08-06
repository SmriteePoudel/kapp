const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: "admin@someone.com",
      password: await bcrypt.hash("admin123", 10),
      firstname: "Admin",
      lastname: "User",
      roles: ["ADMIN"],
    },
    {
      email: "user@someone.com",
      password: await bcrypt.hash("user123", 10),
      firstname: "Regular",
      lastname: "User",
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
          firstname: user.firstname,
          lastname: user.lastname,
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
